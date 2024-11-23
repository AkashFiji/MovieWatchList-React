const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy-image", async (req, res) => {
  const imageUrl = req.query.url;
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  res.set("Content-Type", "image/jpeg"); // Or appropriate type
  res.set("Access-Control-Allow-Origin", "*");
  res.send(buffer);
});

app.listen(3001, () => console.log("Proxy running on port 3001"));
