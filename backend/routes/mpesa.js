const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const auth = Buffer.from(
  `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
).toString("base64");

const shortCode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const env = process.env.MPESA_ENV;
const callbackURL = process.env.CALLBACK_URL;

const getTimestamp = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  const h = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const s = ("0" + date.getSeconds()).slice(-2);
  return `${y}${m}${d}${h}${min}${s}`;
};

const getPassword = () => {
  const timestamp = getTimestamp();
  return Buffer.from(shortCode + passkey + timestamp).toString("base64");
};

const getAccessToken = async () => {
  try {
    const url =
      env === "sandbox"
        ? "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        : "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const response = await axios.get(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    return response.data.access_token;
  } catch (err) {
    console.log("Access token error:", err.response?.data || err.message);
    throw err;
  }
};

router.post("/stkpush", async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount)
    return res.status(400).json({ message: "Phone and amount are required" });

  try {
    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = getPassword();

    const url = env === "sandbox"
      ? "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: "EventBooking",
      TransactionDesc: "Event Booking Payment",
    };

    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.log("STK Push error:", err.response?.data || err.message);
    res.status(500).json({ message: "Payment failed", error: err.response?.data || err.message });
  }
});

module.exports = router;
