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

//Create SOLINST
app.post("/create_SOLINST", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: req.body.id,
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
    id: req.body.id,
    oldId: req.body.oldId,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    solInstId: req.body.solInstId,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
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
    id: req.body.id,
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
    id: req.body.id,
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

//Get all SUPPLCO
app.get("/get_all_SUPPLCO", async (req, res) => {
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

          if (decodedPayload.dataType.subType === "SUPPLCO") {
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

//Get all BENEFS
app.get("/get_all_BENEFS", async (req, res) => {
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

//Get Benef by Id
app.post("/get_BENEF_by_Id", async (req, res) => {
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
            decodedPayload.dataType.subType === "BENEF" &&
            decodedPayload.id === req.body.benefId
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

//Get Invoices
app.get("/get_all_INVOICES", async (req, res) => {
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

          if (decodedPayload.dataType.type === "INVOICE") {
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

//Get Orders
app.get("/get_all_ORDERS", async (req, res) => {
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

          if (decodedPayload.dataType.type === "ORDERS") {
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

  console.log(req.body);
  var payload = "";
  if (req.body.donorId) {
    payload = {
      id: uuidv4(),
      amount: req.body.amount,
      date: req.body.date,
      dataType: {
        type: "DONATION",
        subType: "DONATION",
      },
      eventId: req.body.eventId,
      donorId: req.body.donorId,
    };
  } else {
    payload = {
      id: uuidv4(),
      amount: req.body.amount,
      date: req.body.date,
      dataType: {
        type: "DONATION",
        subType: "DONATION",
      },
      eventId: req.body.eventId,
    };
  }

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
    id: req.body.id,
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

//Get all Users
app.get("/get_all_USERS", async (req, res) => {
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

          if (decodedPayload.dataType.type === "USER") {
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
app.post("/get_ORDERS_by_SUPPLCO", async (req, res) => {
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
            decodedPayload.supplCoId === req.body.supplCoId
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
app.post("/get_INVOICES_by_SUPPLCO", async (req, res) => {
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
            decodedPayload.dataType.type === "INVOICE" &&
            decodedPayload.supplCoId === req.body.supplCoId
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

//Get Invoices by Order
app.post("/get_INVOICE_by_ORDER", async (req, res) => {
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
            decodedPayload.dataType.type === "INVOICE" &&
            decodedPayload.orderId === req.body.orderId
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
    id: req.body.id,
    oldId: req.body.oldId,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    isPaid: req.body.isPaid,
    dataType: {
      type: "INVOICE",
      subType: "INVOICE",
    },
    misId: req.body.misId,
    supplCoId: req.body.supplCoId,
    eventId: req.body.eventId,
    orderId: req.body.orderId,
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

//Create Order
app.post("/create_ORDER", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: req.body.id,
    description: req.body.description,
    date: req.body.date,
    dataType: {
      type: "ORDERS",
      subType: "ORDERS",
    },
    misId: req.body.misId,
    supplCoId: req.body.supplCoId,
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

//TODO: MIS ENDPOINTS
//Create Event
app.post("/create_EVENT", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: req.body.id,
    oldId: req.body.oldId,
    name: req.body.name,
    description: req.body.description,
    targetReason: req.body.targetReason,
    targetAmount: req.body.targetAmount,
    currentAmount: req.body.currentAmount,
    beginDate: req.body.beginDate,
    endDate: req.body.endDate,
    isEnabled: req.body.isEnabled,
    dataType: {
      type: "EVENT",
      subType: "EVENT",
    },
    misId: req.body.misId,
    solInstId: req.body.solInstId,
    benefId: req.body.benefId,
    supplCoId: req.body.supplCoId,
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

//Create BENEFIT
app.post("/create_BENEFIT", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: req.body.id,
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
app.post("/get_EVENT_by_Id", async (req, res) => {
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
            decodedPayload.id === req.body.eventId
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

//Get Invoices by Mis Id
app.post("/get_INVOICES_by_MIS", async (req, res) => {
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
            decodedPayload.dataType.type === "INVOICE" &&
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

//Get Mis by Id
app.post("/get_MIS_by_Id", async (req, res) => {
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
            decodedPayload.dataType.subType === "MIS" &&
            decodedPayload.id === req.body.misId
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
app.post("/get_DONATIONS_by_DONOR", async (req, res) => {
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

//TODO: SOLINST ENDPOINTS
//Get SolInst by Id
app.post("/get_SOLINST_by_Id", async (req, res) => {
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
            decodedPayload.dataType.type === "SOLINST" &&
            decodedPayload.id === req.body.solInstId
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

//! Create Data on Blockchain Start
const createAdmin = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0001-0001-0001-0001",
    username: "admin",
    password: "admin",
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
const createSolInst = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0002-0002-0002-0002",
    name: "Caritas",
    email: "caritas@gamil.com",
    contact: "253250250",
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
    })
    .catch((error) => {
      console.error(error);
    });
};
const createMis = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0003-0003-0003-0003",
    username: "mis",
    password: "mis",
    name: "João Carvalho",
    address: "Rua da Formiga Nº102 APT 3",
    email: "joao.carvalho@hotmail.com",
    contact: "935675876",
    solInstId: "0002-0002-0002-0002",
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
    })
    .catch((error) => {
      console.error(error);
    });
};
const createSupplCo = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0004-0004-0004-0004",
    username: "supplco",
    password: "supplco",
    name: "Continente",
    address: "Avenida da Liberdade Nº342",
    email: "continente.caridade@gmail.com",
    contact: "210133150",
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
    })
    .catch((error) => {
      console.error(error);
    });
};
const createBenef = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0005-0005-0005-0005",
    username: "benef",
    password: "benef",
    name: "Rita Fernandes",
    birthdate: "25/04/1994",
    address: "Rua das Camélias Nº6 RC",
    email: "rita_fernandes2021@gmail.com",
    contact: "915678432",
    nacionality: "Portuguese",
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
    })
    .catch((error) => {
      console.error(error);
    });
};
const createEvent = () => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: "0006-0006-0006-0006",
    oldId: "0016-0016-0016-0016",
    name: "Angariação de fundos monetários para bens alimentares",
    description: "Angariação de 5000€ para bens alimentares",
    targetReason: "Alimentação",
    targetAmount: 5000.0,
    currentAmount: 1234.78,
    beginDate: "14/07/2021",
    endDate: "31/12/2021",
    isEnabled: 1,
    dataType: {
      type: "EVENT",
      subType: "EVENT",
    },
    misId: "0003-0003-0003-0003",
    solInstId: "0002-0002-0002-0002",
    benefId: "0005-0005-0005-0005",
    supplCoId: "0004-0004-0004-0004",
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
    })
    .catch((error) => {
      console.error(error);
    });
};

const createData = () => {
  createAdmin();
  createSolInst();
  createMis();
  createSupplCo();
  createBenef();
  createEvent();
};
createData();

app.listen(8080, () => console.log("Server started"));
