function urle (req, res , next){
    const url = req.originalUrl;
    console.log(url);
    const urlValid = [
        "/lista/listar",
        "/lista/agregar"
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

module.exports= {
    urle,
    methods
}