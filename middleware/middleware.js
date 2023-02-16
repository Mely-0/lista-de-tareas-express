const jwt = require("jsonwebtoken");

const urle = (req, res, next) => {
    let url = req.originalUrl;
    const arrayUrl = url.split("/");
    console.log(arrayUrl);
    const valid = arrayUrl.some((url) => url == "estado" || url == "lista" || url == "login");
    console.log(valid);
    if (!valid) {
        return res.status(401).json({
            msg: "no tenés autorizacion",
        });
    }
    console.log(arrayUrl.length-1);
    if (arrayUrl[arrayUrl.length-1] === "&" || arrayUrl[arrayUrl.length-1] === "" ){
        return res.status(401).json({
            msg: "no tenés autorizacion",
        });
    }else{
        next();  
    }
};

function methods(req, res, next) {
    const method = req.method;
    if (method === "POST" || method === "GET" || method === "PUT" || method === "DELETE") {
        next()
    } else {

        return res.status(405).send("Invalid http request method");
    }
}
function validVacioPost(req, res, next) {
    const method = req.method;
    if (method === "POST") {
        if (Object.values(req.body).length === 0) {
            res.status(400).send("body is null")
        } else {
            next()
        }
    }
}
function validValidacionPost(req, res, next) {
    const datas = req.body;
    const method = req.method;
    if (method === "POST") {
        if (datas.id === "" || datas.tarea === "" || datas.completada === "" || datas.descripcion === "") {
            res.status(400).send("All fields are required")
        } else {
            next()
        }
    }
}
function validVacioPut(req, res, next) {
    const method = req.method;
    if (method === "PUT") {
        if (Object.values(req.body).length === 0) {
            res.status(400).send("body is null")
        } else {
            next()
        }
    }
}
function validValidacionPut(req, res, next) {
    const dat = req.body;
    const method = req.method;
    if (method === "PUT") {
        if (dat.id === "", dat.tarea === "" || dat.completada === "" || dat.descripcion === "") {
            res.status(400).send("All fields are required")
        } else {
            next()
        }
    }
}

function autenticacion(req, res, next) {

    const toke = req.header("Authorization")
    console.log(toke);
    try {
        const very = jwt.verify(toke, process.env.SECRET_KEY)
        console.log(very.user);
        if (very.user === "admi") {
            next()
        } else {
            return res.status(403).json({
                error: "Acces not allowed"
            })
        }
    } catch (error) {
        res.json({ error });
    }
}
function autentication(req, res, next) {

    const toke = req.header("Authorization")
    console.log(toke);
    try {
        const very = jwt.verify(toke, process.env.SECRET_KEY)
        console.log(very.user);
        if (very.user === "user") {
            next()
        } else {
            return res.status(403).json({
                error: "Acces not allowed"
            })
        }
    } catch (error) {
        res.json({ error });
    }
}

module.exports = {
    urle,
    methods,
    validVacioPost,
    validValidacionPost,
    validVacioPut,
    validValidacionPut,
    autenticacion,
    autentication
}

