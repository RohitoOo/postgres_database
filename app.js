const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cons = require("consolidate")
const dust = require("dustjs-helpers")
const pg = require("pg")

const app = express()

// DB Connect String
const connect = `postgres://owner:Test12345!@localhost/recipebookdb`

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
  res.render("index")
})

const port = 3000
app.listen(port, () => {
  console.log("We Are Live On Port ", port)
})
