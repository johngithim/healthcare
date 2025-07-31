const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server Working!")
})

app.listen(3000)
console.log("Server listening on http://localhost:3000")