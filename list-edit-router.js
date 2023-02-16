const express = require("express");
const router = express.Router();
const fs = require("fs");
const { validValidacionPost, validVacioPost, validValidacionPut, validVacioPut, autenticacion, autentication } = require("./middleware/middleware");


router.get("/", function (req, res) {
    let datos;
    fs.readFile('tareas.json', function (err, data) {
        let tarea = data.toString();
        datos = JSON.parse(tarea);
        res.json({ tareas: datos })

    }) 
})
router.post("/", validValidacionPost, validVacioPost, function (req, res) {
    const datas = req.body;
    console.log(datas);
    let tareas;
    fs.readFile('tareas.json', function (err, data) {
        let tarea = data.toString();
        tareas = JSON.parse(tarea);
        tareas.push(datas)
        console.log(tareas)

        fs.unlink('tareas.json', function (error) {
            if (error) throw error;
        });
        fs.appendFile('tareas.json', JSON.stringify(tareas), function (error) {
            if (error) throw error;
        })

    });
    res.status(201).json({mensaje: "la tarea ha agregada correctamente"})
})
router.delete("/:ide", (req, res) => {
    const url = req.originalUrl;
    console.log("esta es " + url);
    const ide = parseInt(req.params.ide);
    console.log(ide)
    let delet;
    fs.readFile('tareas.json', (req, data) => {
        let tarea = data.toString()
        delet = JSON.parse(tarea)
        const algo = delet.some(task => task.id === ide);
        if (algo) {
            let filtrar = delet.filter(task => task.id != ide)
            console.log(filtrar);
            fs.unlink('tareas.json', (error) => {
                if (error) throw error
            })

            fs.appendFile('tareas.json', JSON.stringify(filtrar), (error) => {
                if (error) throw error
            })
            res.status(200).json({msg: "Tarea ha sido eliminada"})
        } else {
            res.status(404).json({mensaje: "el id no ha sido encontrado"})
        }

    })


})
router.put("/:ide", validValidacionPut, validVacioPut, (req, res) => {
    const ide = parseInt(req.params.ide);
    let datos;
    const dat = req.body;

    fs.readFile('tareas.json', (req, data) => {
        let datas = data.toString();
        datos = JSON.parse(datas);

        let tarea = datos.filter(task => task.id === ide)
        tarea[0].tarea = dat.tarea;
        console.log(dat.tarea);
        tarea[0].completada = dat.completada;
        tarea[0].descripcion = dat.descripcion;

        let neww = datos.filter(task => task.id !== ide)
        neww.push(tarea[0])

        fs.unlink('tareas.json', (error) => {
            if (error) throw error
        })
        fs.appendFile('tareas.json', JSON.stringify(neww), (error) => {
            if (error) throw error
        })
    })
    res.status(200).json({msg: "Tarea actualizada"})

})



module.exports = router;