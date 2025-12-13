const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const Payment = require("../models/Payment");

// Sandbox defaults
const shortCode = "174379"; // typical sandbox Paybill
const passkey = "bfb279f9aaa..."; // sandbox passkey
const env = "sandbox";
const callbackURL = process.env.CALLBACK_URL || "https://example.com/callback"; // replace with your ngrok URL

const consumerKey = "sandbox-somekey"; // temporary sandbox Consumer Key
const consumerSecret = "sandbox-somesecret"; // temporary sandbox Consumer Secret

// Convert your phone number to international format
const USER_PHONE_NUMBER = "254757090860";

// Utility functions
const getTimestamp = () => {
  const d = new Date();
  return (
    "" +
    d.getFullYear() +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    ("0" + d.getDate()).slice(-2) +
    ("0" + d.getHours()).slice(-2) +
    ("0" + d.getMinutes()).slice(-2) +
    ("0" + d.getSeconds()).slice(-2)
  );
};

const getPassword = () => {
  const ts = getTimestamp();
  return Buffer.from(shortCode + passkey + ts).toString("base64");
};

const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const url =
    env === "sandbox"
      ? "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const response = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
};


// Callback route to handle STK Push response
router.post("/callback", async (req, res) => {
  try {
    const data = req.body;

    // Log the data for now
    console.log("M-Pesa callback data:", JSON.stringify(data, null, 2));

    // TODO: Save payment status to MongoDB
    // Example:
    // const payment = new Payment({
    //   phone: data.Body.stkCallback.CallbackMetadata.Item[4].Value,
    //   amount: data.Body.stkCallback.CallbackMetadata.Item[0].Value,
    //   status: data.Body.stkCallback.ResultCode === 0 ? "Success" : "Failed",
    // });
    // await payment.save();

    // Respond quickly to Safaricom
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing callback" });
  }

const payment = new Payment({
  phone: data.Body.stkCallback.CallbackMetadata.Item[4].Value,
  amount: data.Body.stkCallback.CallbackMetadata.Item[0].Value,
  status: data.Body.stkCallback.ResultCode === 0 ? "Success" : "Failed",
});
await payment.save();

});



// STK Push route
router.post("/stkpush", async (req, res) => {
  const { amount } = req.body; // amount from frontend
  try {
    const token = await getAccessToken();
    const password = getPassword();
    const timestamp = getTimestamp();

    const stkUrl =
      env === "sandbox"
        ? "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: USER_PHONE_NUMBER,
      PartyB: shortCode,
      PhoneNumber: USER_PHONE_NUMBER,
      CallBackURL: callbackURL,
      AccountReference: "EventBooking",
      TransactionDesc: "Payment for event tickets",
    };

    const response = await axios.post(stkUrl, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "M-Pesa STK Push failed" });
  }
});

module.exports = router;
