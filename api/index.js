const express = require('express')
const app = express()
const port = 3000

// read .env only in dev
if (process?.env?.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + '/.env' });
}

app.get('/', (req, res) => {
  const { id } = req.query;

  const db = require("./datasource")

  const docRef = db.collection("MyName").doc(id);

  docRef.get()
    .then((doc) => {
      if (doc.exists) {
        const { firstName, lastName } = doc.data();
        res.status(200).send(`Hello. My name is ${firstName} ${lastName}.`);
      } else {
        console.error("id not found");
        res.status(401).json(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json(result);
    });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
