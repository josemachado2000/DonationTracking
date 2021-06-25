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

const context = createContext("secp256k1");
const privateKey = context.newRandomPrivateKey();
const signer = new CryptoFactory(context).newSigner(privateKey);

const _hash = (x) =>
  crypto.createHash("sha512").update(x).digest("hex").toLowerCase();

const TP_FAMILY = "donation";
const TP_NAMESPACE = _hash(TP_FAMILY).substr(0, 6);
const TP_VERSION = "1.1";

app.listen(8080, () => console.log("Server started"));
