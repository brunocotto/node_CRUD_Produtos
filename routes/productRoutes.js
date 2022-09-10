const router = require("express").Router()
const express = require('express');

// importa o controller
const productController = require('../controller/productController')

// Read - Lendo todos os dados do schema no MongoDB
router.get("/", productController.listAll)

// Create - Inserindo dados no MongoDB
router.post("/", productController.insertion)

// Search - Busca o produto utilizando o parâmetro ID => request.params.id
router.get("/:id", productController.searchID)

// Update - atualização dos dados (PUT, PATCH)
// PUT - Atualização completa, PATCH - Atualização parcial dos dados
router.patch("/:id", productController.updateID)

// Delete - deletando dados
router.delete("/:id", productController.deleteID)

// Exportando as rotas
module.exports = router