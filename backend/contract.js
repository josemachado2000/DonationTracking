const { TransactionProcessor } = require("sawtooth-sdk/processor");

const DonationHandler = require("./donation_handler");

const VALIDATOR_URL = process.env.VALIDATOR_URL || "tcp://localhost:4004";

const transactionProcessor = new TransactionProcessor(VALIDATOR_URL);

transactionProcessor.addHandler(new DonationHandler());
transactionProcessor.start();

console.log("Started Transaction Processor");
