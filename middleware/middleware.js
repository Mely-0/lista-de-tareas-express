function urle (req, res , next){
    const url = req.originalUrl;
    console.log(url);
    const urlValid = [
        "/lista",
        "/lista/listar",
        "/lista/agregar",
        "/lista/eliminar/&40",
        "/estado/&completada",
        "/estado/&incompleta"
];
    const validar = urlValid.some(ruta=> ruta === url);
    
    if(validar){
        next();
    }else{
        res.status(401).send("no estas autorizado")
    }
}
function methods (req,res,next){
    const method = req.method;
    if(method === "POST" || method === "GET" || method ==="PUT" || method === "DELETE"){
        next()
    }else{

        return res.status(405).send("Invalid http request method");
    }
}
function validVacioPost(req, res , next){
    const method = req.method;
    if(method === "POST"){
        if(Object.values(req.body).length === 0 ){
            res.status(400).send("body is null")
        }else{
            next()
        }
    }   
}
function validValidacionPost(req, res , next){
    const datas= req.body;
    const method = req.method;
    if(method === "POST"){
        if (datas.id === "" || datas.tarea === "" || datas.completada === "" || datas.descripcion === ""){
            res.status(400).send("All fields are required")
        }else{
            next()
        }
    }
}
function validVacioPut(req, res , next){
    const method = req.method;
    if(method === "PUT"){
        if(Object.values(req.body).length === 0 ){
            res.status(400).send("body is null")
        }else{
            next()
        }
    }
}
function validValidacionPut(req, res , next){
    const dat= req.body;
    const method = req.method;
    if(method === "PUT"){
        if (dat.id === "", dat.tarea === "" || dat.completada === "" || dat.descripcion === ""){
            res.status(400).send("All fields are required")
        }else{
            next()
        }
    }
}

module.exports= {
    urle,
    methods,
    validVacioPost,
    validValidacionPost,
    validVacioPut,
    validValidacionPut
}