require("dotenv").config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// importa o modelo do MongoDB
const Product = require("./models/Product");
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

/**
 * POST => Inserir um dado
 * GET => Buscar um ou mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para a aplicação
 * Params => /produtos/algumacoisa
 * Query => /produtos?id=456654545655&
 */

// rota inicial / endpoint
app.get("/", (require, response) => {
    //mostrar a requisição
    response.json({message: "Express conectado."});
})

// Create - Inserindo dados no MongoDB
 app.post("/product", async(request, response) => {
    // request.body => desestruturação
    const { name, price, approved } = request.body;

    if(!name) {
        //422 - A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.
        response.status(422).json({error: "O nome é obrigatório."});
        return
    }
    
    const product = {
        name,
        price,
        approved,
    };

    try {
        // criando dados
        await Product.create(product);
        
        //201 - A requisição foi bem sucedida e um novo recurso foi criado como resultado. 
        //Esta é uma tipica resposta enviada após uma requisição POST.
        response.status(201).json({message: "Produto inserido com sucesso."});
    } catch (error) {
        //500 - O servidor encontrou uma situação com a qual não sabe lidar.
        response.status(500).json({error: error});
    }
})

// Read - Lendo todos os dados do schema no MongoDB
app.get("/product", async(request, response) => {
    //Verificando o log com a requisição completa
    //console.log(request)

    try {
        /**
         * O método find() retorna o valor do primeiro elemento 
         * do array que satisfizer a função de teste provida. 
         * Caso contrário, undefined é retornado.
         */
        const product = await Product.find();
        
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({error: error});
    }
})

// Search - Busca o produto utilizando o parâmetro ID => request.params.id
app.get("/product/:id", async(request, response) => {
    const id = request.params.id;

    try {
        //db.collection.findOne(query, projection)
        //Retorna um documento que atende aos critérios de consulta especificados na collection or view.
        const product = await Product.findOne({ _id: id });

        if(!Product) {
            response.status(422).json({message: "O produto não foi encontrado."});
            return
        }

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({error: error});
    }
})

// Update - atualização dos dados (PUT, PATCH)
// PUT - Atualização completa, PATCH - Atualização parcial dos dados
app.patch("/product/:id", async(request, response) => {
    const id = request.params.id;

    const { name, price, approved } = request.body;

    const product = {
        name,
        price,
        approved,
    };

    try {
        const updateProduct = await Product.updateOne({_id: id}, product);
        //matchedCount 
        if(updateProduct.matchedCount === 0) {
            response.status(422).json({message: "O produto não foi encontrado."});
            return
        }

        response.status(200).json(product);       
    } catch (error) {
        response.status(500).json({error: error});
    }

})

// Delete - deletando dados
app.delete("/product/:id", async(request, response) => {
    const id = request.params.id;

    try {
        await Product.deleteOne({ _id: id });

        response.status(422).json({message: "Produto removido com sucesso."});

    } catch (error) {
        response.status(500).json({error: error});
    }
})

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