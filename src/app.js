import express from 'express'
import displayRoutes from 'express-routemap'
import cookieParser from 'cookie-Parser'
import session from 'express-session'

const app = express()
const PORT = 8080
const miAltaClave = "TinkiWinki"


//Middleware
app.use(express.json())
app.use(cookieParser(miAltaClave))
app.use(session({
    secrete: 'secretCoder',
    resave: true, 
    saveUnitialized: true 
}))

//Rutas
    //home
app.get("/", (req, res) => {
    res.send("CLASE !")
})

    //Setear una cookie
app.get("/setcookie", (req, res) => {
    res.cookie("coderCookie", "Mi primera chamba con cookies").send("Cookie seteada!")
    
})

    //Leer el valor de una cookie
    app.get("/leercookie", (req, res) => {
        res.send(req.cookies)
    })

    //Borrar cookie
    app.get("/borrarcookie", (req, res) => {
        res.clearCookie("coderCookie").send("Cookie Eliminada")
    })

    //Enviamos una cookie firmada
    app.get("/cookiefirmada", (req, res) => {
        res.cookie("cookieFirmada", "esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada")
    })

    //Recuperamos una cookie firmada
    app.get("/recuperamoscookiefirmada", (req, res) => {
        let valorCookie = req.signedCookies.cookieFirmada
        if (valorCookie) {
            res.send("Cookie recuperada:" + valorCookie)
        } else {
            res.send("Cookie invalida")
        }
    })
    

    //creamos session
    app.get("/session",(req, res) => {
        if(req.session.counter){
            req.session.counter++
            res.send("visitaste este sitio esta cantidad de veces" + req.session.counter)
        } else{
            req.session.counter = 1
            res.send("Bienvenido, unite al club de session!")
        }
    })

    //Eliminamos la session
    app.get("/logout", (req, res) => {
        req.session.destroy( (error) => {
            if(!error) res.send("Sesion cerrada")
            else res.send("Tenemos un error")
        })    
    })

    //login con session
    app.get("/login", (req,res) => {
        let {usuario, pass} = req.query
        if(usuario === "tinki" && pass === "winki"){
            req.session.user = usuario
            res.send("inicio de sesion exitoso")
        }else {
            res.send("datos incorrectos")
        }

        })


//LISTEN
app.listen(PORT, ()=> {
    displayRoutes(app)
    console.log(`Escuchando en el puerto: ${PORT}`)
})

