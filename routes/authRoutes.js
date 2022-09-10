const router = require("express").Router()
const express = require('express');

// importa o controller
const authController = require('../controller/authController')

// Private Route
router.get("/users/:id", checkToken, authController.privateUserID)

// Register User
router.post("/register", authController.registerUser)

// Login User - Validando usuários 
router.post("/login", authController.loginUser)

// Exportando as rotas
module.exports = router 