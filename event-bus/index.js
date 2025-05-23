const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event).catch(err => {
    console.log("Error sending event to posts service:", err.message);
  });
  axios.post("http://localhost:4001/events", event).catch(err => {
    console.log("Error sending event to comments service:", err.message);
  });
  axios.post("http://localhost:4002/events", event).catch(err => {
    console.log("Error sending event to query service:", err.message);
  });
  axios.post("http://localhost:4003/events", event).catch(err => {
    console.log("Error sending event to moderation service:", err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Event bus is listening on port 4005");
});
