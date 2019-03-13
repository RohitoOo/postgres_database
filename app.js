const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cons = require("consolidate")
const dust = require("dustjs-helpers")
const { Client } = require("pg")

const app = express()
const credentials = require("./credentials")
// DB Connect String
const connect = `postgres://owner:${
  credentials.password
}@localhost/recipebookdb`

const client = new Client({
  connectionString: connect
})
client.connect()

// Assign Dust Engine To .dust files

app.engine("dust", cons.dust)

// Set .dust As Default Engine

app.set("view engine", "dust")

app.set("views", __dirname + "/views")

// Set Public Folder

app.use(express.static(path.join(__dirname, "public")))

// Body Parser Middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  client.query("SELECT * from recipes", (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.render("index", { recipes: results.rows })
    }
  })
})

const port = 3000
app.listen(port, () => {
  console.log("We Are Live On Port ", port)
})
