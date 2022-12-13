const express = require('express')
const cors = require("cors")
const app = express()
const port = 5000

app.use(cors())

// read .env only in dev
if (process?.env?.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + '/.env' })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello-world', (req, res) => {
  const { id } = req.query

  if (!id) {
    const msg = "Bad Request: Missing id."
    console.error(msg)
    res.status(400).json({error: msg})
    return
  }

  const db = require("./datasource")

  const docRef = db.collection("MyName").doc(id)

  docRef.get()
    .then((doc) => {
      if (doc.exists) {
        const { firstName, lastName } = doc.data()
        res.status(200).send({ firstName, lastName })
      } else {
        console.error("id not found")
        res.status(401).json(result)
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(401).json(result)
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
