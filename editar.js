const express = require("express")
const router = express.Router()
const fs = require("fs")

router.put("/", express.json(), function(req, res){
    let datos ;
    fs.readFile('tareas.json', function(err, data) {
        let tarea = data.toString();
        datos = JSON.parse(tarea);
        res.send({"tareas actuales": datos})
    
    })
    
    })

module.exports= router;