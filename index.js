const express = require("express");
const fs = require("fs");
const cors = require('cors')
const app = express();
port = 8002
const router = require("./list-edit-router");
const completados = require("./list-view-router");
const { urle, methods, autenticacion } = require("./middleware/middleware");
const jwt = require("jsonwebtoken")
const env = require("dotenv");
env.config();
/* app.use(urle); */
app.use(methods);
app.use(express.json());
app.use("/estado", completados)
app.use("/lista", router)

app.post("/login", express.json(), (req, res) => {
    const user = req.body.nombre;
    let datas;
    let veri;
    fs.readFile("usuarios.json", (error, data) => {
        let dta = data.toString()
        datas = JSON.parse(dta)
        veri = datas.filter((userr) => {
            console.log(user.nombre);
            if (userr.nombre === user) {
                return true
            } else {
                return false
            }
        })
        if (veri.length !== 0) {

            const token = jwt.sign({
                nombre: veri[0].nombre,
                user: veri[0].user
            }
                , process.env.SECRET_KEY
                , {
                    algorithm: "HS256"
                })
            res.json({ token })
        } else {
            res.status(401).json({
                error: "doesn't exist any user with thist name account"
            })
        }
    })
})
app.post("/agregarUsuario", autenticacion, (req, res) => {
    const { body } = req;
    console.log(body);
    let user;
    fs.readFile("usuarios.json", function (err, data) {
        let usuario = data.toString();
        user = JSON.parse(usuario)
        user.push(body)
        console.log(body);

        fs.unlink("usuarios.json", function (error) {
            if (error) throw error
        })
        fs.appendFile("usuarios.json", JSON.stringify(user), function (error) {
            if (error) throw error
        })
        res.send("agregado")
    })
})
app.get("/lista", (req, res) => {
    res.send("hola,bienvenidos")
})
app.listen(port, function () {
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})