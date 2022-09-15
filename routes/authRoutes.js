const router = require("express").Router()
const express = require('express');

// importa o controller
const authController = require('../controller/authController')

// Private Route - Middleware de Verificação do token "checkTokenUser"
router.get("/users/:id", checkTokenUser, authController.searchUserID)

// Register User
router.post("/register", authController.registerUser)

// Login User - Validando usuários 
router.post("/login", authController.loginUser)

// Exportando as rotas
module.exports = router 