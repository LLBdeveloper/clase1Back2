import express from 'express'

const app = express()
const PORT = 8080

//Middleware
app.use(express.json())


//Rutas
app.get("/", (req, res) => {
    res.send("CLASE !")
})

app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})