const express = require("express");
const fs= require("fs");

const app = express();
port= 8002
const list = require ("./list-edit-router");
const completados= require("./list-view-router");
const { urle, methods} = require("./middleware/middleware");


app.use(urle);
app.use(methods);
app.use(express.json());

app.use("/estado", completados)
app.use("/lista",list)


app.listen(port, function(){
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})