//controller do produto
// importa o modelo do MongoDB
const Product = require("../models/Product");

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

exports.listAll = async(request, response) => {
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
}

exports.insertion = async(request, response) => {
    // request.body => desestruturação
    const { name, price, approved } = request.body;

    if(!name || !price) {
        //422 - A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.
        response.status(422).json({error: "O nome e o preço são obrigatórios."});
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
}

exports.searchID = async(request, response) => {
    const id = request.params.id;

    try {
        //db.collection.findOne(query, projection)
        //Retorna um documento que atende aos critérios de consulta especificados na collection or view.
        //const product = await Product.findOne({ _id: id });
        const product = await Product.findById(id);

        if(!Product) {
            response.status(422).json({message: "Produto não encontrado."});
            return
        }

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({error: error});
    }
}

exports.updateID = async(request, response) => {
    // pega o ID do params
    const id = request.params.id;
    // pega o name e price com desestruturação
    const { name, price, approved } = request.body;
    // crio um objeto usando o name e price
    const product = {
        name,
        price,
        approved,
    };

    try {
        //const criada para condição do produto não ser encontrado
	    //poderia ser Product.updateById( id, product);
        // se o id == id atualiza product
        const updateProduct = await Product.updateOne({_id: id}, product);
        //matchedCount - contém o número de documentos correspondentes 
        if(updateProduct.matchedCount === 0) {
            response.status(422).json({message: "Produto não encontrado."});
            return
        }

        response.status(200).json(product);       
    } catch (error) {
        response.status(500).json({error: error});
    }

}

exports.deleteID = async(request, response) => {
    const id = request.params.id;

    try {
        await Product.deleteOne({ _id: id });

        response.status(422).json({message: "Produto removido com sucesso."});

    } catch (error) {
        response.status(500).json({error: error});
    }
}