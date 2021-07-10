const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Need to be modulirized later
 * Sigining and forwarding transaction
 */

const API_URL = "http://localhost:8008";

const { createContext, CryptoFactory } = require("sawtooth-sdk/signing");
const { createHash } = require("crypto");
const crypto = require("crypto");
const { protobuf } = require("sawtooth-sdk");
const axios = require("axios").default;
const uuidv4 = require("uuid/v4");

const context = createContext("secp256k1");
const privateKey = context.newRandomPrivateKey();
const signer = new CryptoFactory(context).newSigner(privateKey);

const _hash = (x) =>
  crypto.createHash("sha512").update(x).digest("hex").toLowerCase();

const TP_FAMILY = "donation";
const TP_NAMESPACE = _hash(TP_FAMILY).substr(0, 6);
const TP_VERSION = "1.1";

//TODO: ADMIN ENDPOINTS
//Create ADMIN
app.post("/create_ADMIN", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    dataType: {
      type: "USER",
      subType: "ADMIN",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Create ADMIN
app.post("/create_SOLINST", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    dataType: {
      type: "SOLINST",
      subType: "SOLINST",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Create MIS
app.post("/create_MIS", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);
  console.log(req.body);
  const payload = {
    id: uuidv4(),
    oldId: req.body.oldId,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    solInstId: req.body.solInstId,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    isEnabled: req.body.isEnabled,
    dataType: {
      type: "USER",
      subType: "MIS",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Create BENEF
app.post("/create_BENEF", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    birthdate: req.body.birthdate,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    nacionality: req.body.nacionality,
    dataType: {
      type: "USER",
      subType: "BENEF",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Create SUPPLCO
app.post("/create_SUPPLCO", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    dataType: {
      type: "USER",
      subType: "SUPPLCO",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Get all ADMIN
app.get("/get_all_ADMIN", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.subType === "ADMIN") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get all MIS
app.get("/get_all_MIS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.subType === "MIS") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get all BENEF
app.get("/get_all_BENEF", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.subType === "BENEF") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Invoices by Supplco Id
app.get("/get_INVOICES_by_SUPPLCO", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "INVOICES" &&
            decodedPayload.supplcoId === req.body.supplcoId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//TODO: BENEF ENDPOINTS
//Get Benefits
app.post("/get_BENEFITS_by_BENEF", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "BENEFIT" &&
            decodedPayload.benefId === req.body.benefId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//TODO: ANONYMOUS/DONOR ENDPOINTS
//Get Solidarity Institutions
app.get("/get_all_SOLINSTS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.type === "SOLINST") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Events
app.get("/get_all_EVENTS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.type === "EVENT") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Benefits
app.get("/get_all_BENEFITS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.type === "BENEFIT") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Events by Solidarity Institution by Id
app.post("/get_EVENTS_by_SOLINST", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "EVENT" &&
            decodedPayload.solInstId === req.body.solInstId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Events by Mis by Id
app.post("/get_EVENTS_by_MIS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "EVENT" &&
            decodedPayload.misId === req.body.misId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Event by id
app.get("/get_EVENT_by_Id", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "EVENT" &&
            decodedPayload.id === req.body.id
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Create Donation
app.post("/create_DONATION", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    amount: req.body.amount,
    date: req.body.date,
    dataType: {
      type: "DONATION",
      subType: "DONATION",
    },
    eventId: req.body.eventId,
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Register User as Donor
app.post("/create_DONOR", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    birthdate: req.body.birthdate,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    nacionality: req.body.nacionality,
    dataType: {
      type: "USER",
      subType: "DONOR",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Register User as Solidarity Institution
app.post("/create_SOLINST", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    dataType: {
      type: "SOLINST",
      subType: "SOLINST",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//TODO: DONOR ENDPOINTS
//Get Donations by Donor Id
app.get("/get_DONATIONS_by_DONOR", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "DONATION" &&
            decodedPayload.donorId === req.body.donorId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//TODO: USERS ENDPOINTS
//Get Profile by id
app.post("/get_USER_by_Id", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "USER" &&
            decodedPayload.id === req.body.id
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Login
app.post("/get_LOGIN", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "USER" &&
            decodedPayload.username === req.body.username &&
            decodedPayload.password === req.body.password
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//TODO: SUPPLCO ENDPOINTS
//Get Orders by Supplco Id
app.get("/get_ORDERS_by_SUPPLCO", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "ORDERS" &&
            decodedPayload.supplcoId === req.body.supplcoId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Invoices by Supplco Id
app.get("/get_INVOICES_by_SUPPLCO", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "INVOICES" &&
            decodedPayload.supplcoId === req.body.supplcoId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Payments by Supplco Id
app.get("/get_PAYMENTS_by_SUPPLCO", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "PAYMENTS" &&
            decodedPayload.supplcoId === req.body.supplcoId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Create Invoice
app.post("/create_INVOICE", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    dataType: {
      type: "INVOICE",
      subType: "INVOICE",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//TODO: MIS ENDPOINTS
//Create Event
app.post("/create_EVENT", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    oldId: req.body.oldId,
    name: req.body.name,
    description: req.body.description,
    targetReason: req.body.targetReason,
    targetAmount: req.body.targetAmount,
    currentAmount: req.body.currentAmount,
    beginDate: req.body.beginDate,
    endDate: req.body.endDate,
    dataType: {
      type: "EVENT",
      subType: "EVENT",
    },
    misId: req.body.misId,
    solInstId: req.body.solInstId,
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Create BENEFITS
app.post("/create_BENEFITS", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    date: req.body.date,
    description: req.body.description,
    value: req.body.value,
    dataType: {
      type: "BENEFIT",
      subType: "BENEFIT",
    },
    benefId: req.body.benefId,
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Get Event by id
app.get("/get_EVENT_by_Id", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "EVENT" &&
            decodedPayload.eventId === req.body.eventId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//TODO: DONATIONS ENDPOINTS
//Create Donation
app.get("/create_DONATION", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    amount: 125.5,
    date: Date(Date.now()),
    dataType: {
      type: "DONATION",
      subType: "DONATION",
    },
    eventId: req.body.eventId,
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      res.send({
        message: "submitted",
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        message: "submitted",
        error: error.response.data,
      });
    });
});

//Get Donations
app.get("/get_all_DONATIONS", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (decodedPayload.dataType.type === "DONATION") {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Donations by Event Id
app.get("/get_DONATIONS_by_EVENT", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "DONATION" &&
            decodedPayload.eventId === req.body.eventId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Donations by Donor Id
app.get("/get_DONATIONS_by_DONOR", async (req, res) => {
  axios
    .get(`${API_URL}/transactions`)
    .then((response) => {
      return response.data.data;
    })
    .then((data) => {
      let resPayloads = [];
      data.forEach((element) => {
        if (
          element != data[data.length - 1] &&
          element != data[data.length - 2] &&
          element != data[data.length - 3]
        ) {
          let payload = element.payload;

          let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
          console.log(
            decodedPayload +
              "\n---------------------------------------------------------------------"
          );

          decodedPayload = JSON.parse(decodedPayload);

          if (
            decodedPayload.dataType.type === "DONATION" &&
            decodedPayload.donorId === req.body.donorId
          ) {
            resPayloads.push(decodedPayload);
          }
        }
      });

      console.log(
        "--------------------------- PAYLOADS ARRAY --------------------------\n" +
          JSON.stringify(resPayloads) +
          "\n---------------------------------------------------------------------\n"
      );
      res.send(resPayloads);
    })
    .catch((error) => {
      console.log(error);
    });
});

//! Create ADMIN on Blockchain Start
const createAdmin = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    username: "admin",
    password: "admin123",
    name: "José Cid",
    email: "josecid@outlook.pt",
    contact: "967843245",
    dataType: {
      type: "USER",
      subType: "ADMIN",
    },
  };

  // Input for one transaction
  const payloadBytes = Buffer.from(JSON.stringify(payload));

  // Output we created with this transaction input

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: TP_FAMILY,
    familyVersion: TP_VERSION,
    // Needs to be same as the expected address we create in contract
    // If diffrent we wont get access to put state and get state of the address
    inputs: [address],
    outputs: [address],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
  }).finish();

  const signature = signer.sign(transactionHeaderBytes);

  // Sign the transaction
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  });

  // Wrap it into list of transaction
  const transactions = [transaction];

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();

  // Wrap the transaction list into batch
  const batchSignature = signer.sign(batchHeaderBytes);

  // And sign it
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });

  // Wrap them in batch list
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  axios
    .post(`${API_URL}/batches`, batchListBytes, {
      headers: { "Content-Type": "application/octet-stream" },
    })
    .then((response) => {
      console.log({
        address,
        TP_NAMESPACE,
      });
      console.log(response.data);

      // res.send({
      //   message: "submitted",
      //   data: response.data,
      // });
    })
    .catch((error) => {
      console.error(error);
      // res.send({
      //   message: "submitted",
      //   error: error.response.data,
      // });
    });
};
createAdmin();

app.listen(8080, () => console.log("Server started"));
