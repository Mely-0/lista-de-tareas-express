const express = require("express");
const fs= require("fs");
const app = express();
port= 8002
const list = require ("./list-edit-router");
const completados= require("./list-view-router")
app.use("/estado", completados)
app.use("/lista",list)




app.listen(port, function(){
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})