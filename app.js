require("dotenv").config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

const mongoose = require("mongoose");
const { response } = require("express");
const express = require("express");

const app = express();

//utilizado para a extensão REST Client funcionar corretamente "content-type: application/json"
//Forma de ler JSON / Middleware
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

// rotas da API
const productRoutes = require("./routes/productRoutes")

app.use("/product", productRoutes)

// conection MongoDB
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pyywseu.mongodb.net/bancodaapi?retryWrites=true&w=majority}`
    )
    .then( () => {
        console.log("Conexão com o MongoDB bem sucedida.");
        app.listen(4002);
    })
    .catch((err) => console.log(err));


