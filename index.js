const express = require("express");
const fs= require("fs");
const app = express();
port= 8002

app.get("/", express.json(), function(req, res){
let datos ;
fs.readFile('tareas.json', function(err, data) {
    let tarea = data.toString();
    datos = JSON.parse(tarea);
    res.send(datos)
})
})

app.post("/", express.json(), function(req,res){
    const datas= req.body;
        let tareas;
        let array = [];
        fs.readFile('tareas.json', function(err, data) {
        let tarea = data.toString();
        tareas = JSON.parse(tarea);
        
        tareas.push(datas)
        array= tareas
        console.log(array)
    
        fs.unlink('tareas.json' , function(error){
            if(error)throw error;
        });
        fs.appendFile('tareas.json', JSON.stringify(tareas), function(error){
            if(error)throw error;  

        })   
        });
        res.send("guardado")
})
app.listen(port, function(){
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})