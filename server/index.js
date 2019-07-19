const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/formTest", (req, res) => {
  res.json({
    resposta: `<div><form action="http://algumaurl.com.br/submitform" method="POST"><input type="text"/><button type="submit">Enviar</button></form></div>`
  });
});

//app.get("/", (req, res) => res.send("Helow"));
app.get("/", (req, res) => {
  axios
    .get(req.query.url.replace(`\\`, "/"))
    .then(response => {
      res.json({ resposta: response.data });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
});

app.listen("4548", () => {
  console.log("Iniciado na porta 4548");
});
