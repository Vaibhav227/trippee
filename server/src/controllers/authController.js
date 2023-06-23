import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import database from "../database/db.js"
import { validateSignup } from "../validator.js"

export const signup = async (req, res) => {

    const signUpError = validateSignup(req.body);
    if (signUpError.error) {
        console.log(signUpError.error)
        return res.status(403).send(signUpError.error.details);
    }
    res.send("Successfully signed up")


    const user = req.body
    let hashed_password = await bcrypt.hash(user.password, 12)
    let users = await database("users")
        .insert({
            username: user.username,
            password: hashed_password
        })
        .returning("*")
    try {
        const user = users[0]
        console.log(users[0])
        res.json({ user })
    } catch (error) {
        res.json({ error: error.message })
    }

}

export const login = async (req, res) => {

    let user = req.body
    let retrievedUser = await database("users")
        .where({ username: user.username })
        .first()
    let results = await Promise.all([
        bcrypt.compare(user.password, retrievedUser.password),
        Promise.resolve(retrievedUser)
    ])
    const areSamePasswords = results[0]
    if (!areSamePasswords) throw new Error("wrong Password!")
    user = results[1]
    const payload = { username: user.username }
    const secret = "SECRET"
    jwt.sign(payload, secret, (error, token) => {
        if (error) throw new Error("Sign in error!")
        res.json({ token, user })
    })

}