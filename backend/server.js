const express = require("express");

const app = express();

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

//TODO: USERS ENDPOINTS
//Create Users
app.get("/create_DONOR", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    name: "José Machado",
    birthdate: "29/03/2000",
    address: "Rua da Formiga",
    email: "jose.machado@gmail.com",
    contact: "111222333",
    nacionality: "Portuguese",
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

app.get("/create_MIS", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    name: "Paulo Macedo",
    institution: "Caritas",
    address: "Rua das Laranjas",
    email: "paulo.macedo@gmail.com",
    contact: "999888777",
    isAdmin: 1,
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

app.get("/create_BENEF", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    name: "José Machado",
    birthdate: "29/03/2000",
    address: "Rua da Formiga",
    email: "jose.machado@gmail.com",
    contact: "111222333",
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

app.get("/create_SUPPLCO", async (req, res) => {
  let address = TP_NAMESPACE + _hash("sampleKey").substr(0, 64);

  const payload = {
    id: uuidv4(),
    name: "José Machado",
    address: "Rua da Formiga",
    email: "jose.machado@gmail.com",
    contact: "111222333",
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

//Get Users
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

//Get Users by dataType.subType
app.get("/get_all_DONOR", async (req, res) => {
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

          if (decodedPayload.dataType.subType === "DONOR") {
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

app.listen(8080, () => console.log("Server started"));
