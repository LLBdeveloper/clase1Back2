import express from 'express'
import displayRoutes from 'express-routemap'
import cookieParser from 'cookie-Parser'

const app = express()
const PORT = 8080
const miAltaClave = "TinkiWinki"


//Middleware
app.use(express.json())
app.use(cookieParser(miAltaClave))

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
//LISTEN
app.listen(PORT, ()=> {
    displayRoutes(app)
    console.log(`Escuchando en el puerto: ${PORT}`)
})

