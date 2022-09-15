// importa o model User
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.searchUserID = async(request, response) => {
    const id = request.params.id

    //check if user exists
    const user = await User.findById(id, '-password')

    if(!user) {
        response.status(404).json({ msg: 'Usuário não encontrado.' });
        return
    }

    response.status(200).json({ user });
}
//Middleware - Verificação do token - next(se der tudo certo prossiga)
checkTokenUser = function checkToken(request, response, next) {
    //authorization é o token tipo: bearer #$@*$JDFHD
    const authHeader = request.headers['authorization'];
    //splitando e extraindo apenas o token
    const token = authHeader && authHeader.split(" ")[1];
   //se não vier o token
    if (!token) {
        response.status(403).json({ msg: 'Acesso negado.' });
        return
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret)

        next()
        
    } catch (error) {
        response.status(400).json({ msg: 'Token inválido.' });
        return
    }
}

exports.registerUser = async (request, response) => {
    //destructuring
    const { name, email, password, confirmpassword } = request.body;

    // validations
    if (!name) {
        response.status(422).json({ msg: 'O nome é obrigatório' });
        return
    }

    if (!email) {
        response.status(422).json({ msg: 'O email é obrigatório' });
        return
    }

    if (!password) {
        response.status(422).json({ msg: 'A senha é obrigatória' });
        return
    }

    if (password !== confirmpassword) {
        response.status(422).json({ msg: 'Senha Inválida' });
        return
    }

    //check se o user já existe
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        response.status(422).json({ msg: 'Email Existente.' });
        return
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })
    // se tudo der certo salva o usuário no banco e retorna status 201
    try {
        await user.save()

        response.status(201).json({ msg: 'Usuário criado com sucesso.' })

    } catch (error) {
        console.log(error)

        response
            .status(500)
            .json({ msg: error })
    }
}

exports.loginUser = async (request, response) => {
    const { email, password } = request.body;

    // validations
    if (!email) {
        response.status(422).json({ msg: 'O nome é obrigatório' });
        return
    }

    if (!password) {
        response.status(422).json({ msg: 'O email é obrigatório' });
        return
    }

    // check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
        response.status(422).json({ msg: 'Usuário não encontrado.' });
        return
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        response.status(422).json({ msg: 'Senha inválida.' });
        return
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        response.status(200).json({ msg: 'Autenticação realizada com sucesso.', token });
    } catch (error) {
        console.log(error)

        response
            .status(500)
            .json({ msg: error })
    }
}