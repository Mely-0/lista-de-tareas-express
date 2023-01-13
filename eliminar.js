const { json } = require("express");
const express= require("express")
const router = express.Router();
const fs = require("fs")

router.delete("/&:ide", (req, res)=>{
    const ide= parseInt(req.params.ide);
    console.log(ide)
    let delet;
    fs.readFile('tareas.json', (req , data)=>{
    let tarea = data.toString()
    delet = JSON.parse(tarea)
    let filtrar = delet.filter(task=> task.id != ide)
    console.log(filtrar);
    
    fs.unlink('tareas.json',(error)=>{
        if(error) throw error
    })
    
    fs.appendFile('tareas.json',JSON.stringify(filtrar),(error)=>{
        if(error)throw error
    })
    res.send(filtrar)
})

})

module.exports= router;