const express = require("express");
const fs= require("fs");
const app = express();
port= 8002
const list = require ("./list-edit-router");
const completados= require("./list-view-router")
app.use("/estado", completados)
app.use("/lista",list)

app.get("/", express.json(), function(req, res){
let datos ;
fs.readFile('tareas.json', function(err, data) {
    let tarea = data.toString();
    datos = JSON.parse(tarea);
    res.send({tareas: datos})

})

})


app.listen(port, function(){
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})