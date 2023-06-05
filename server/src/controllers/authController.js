import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import database from "../database/db.js"
import { validateSignup } from "../validator.js"
// const signToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });
//   };

// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user._id);
//     const cookieOptions = {
//       expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//       httpOnly: true,
//     };
//     // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//     res.cookie('jwt', token, cookieOptions);

//     // Remove password from output
//     user.password = undefined;

//     res.status(statusCode).json({
//       status: 'success',
//       token,
//       data: {
//         user,
//       },
//     });
//   };

// const createUser = (user) => {
//     return database.raw(
//       "INSERT INTO users (username, password_digest, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, username, created_at, token",
//       [user.username, user.password_digest, user.token, new Date()]
//     )
//     .then((data) => data.rows[0])
// }

// const findUser = (userReq) => {
//     return database.raw("SELECT * FROM users WHERE username = ?", [userReq.username])
//       .then((data) => data.rows[0])
// }


export const signup = async (req, res) => {

    const x = validateSignup(req.body);
    if (x.error) {
        console.log(x.error)
        return res.send(x.error.details);
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
    // bcrypt.hash(user.password, 12)
    //     .then(hashed_password => {
    //         return database("users")
    //             .insert({
    //                 username: user.username,
    //                 password: hashed_password
    //             })
    //             .returning("*")
    //             .then(users => {
    //                 const user = users[0]
    //                 res.json({ user })
    //             }).catch(error => {
    //                 res.json({ error: error.message })
    //             })
    //     })
}

export const login = async (req, res) => {
    // const { email, password } = req.body
    // if (!email || !password) {
    //     return next(new AppError('Please provide email and password!', 400));
    // }
    // let user 
    // findUser(email)
    // .then(foundUser => {
    //   user = foundUser
    //   return checkPassword(password, foundUser)
    // })
    // .then((res) => createSendToken())
    // .catch((err) => console.error(err))
    let user = req.body
    // database("users")
    //     .where({ username: user.username })
    //     .first()
    //     .then(retrievedUser => {
    //         if (!retrievedUser) throw new Error("user not found!")
    //         return Promise.all([
    //             bcrypt.compare(user.password, retrievedUser.password),
    //             Promise.resolve(retrievedUser)
    //         ]).then(results => {
    //             const areSamePasswords = results[0]
    //             if (!areSamePasswords) throw new Error("wrong Password!")
    //             const user = results[1]
    //             const payload = { username: user.username }
    //             const secret = "SECRET"
    //             jwt.sign(payload, secret, (error, token) => {
    //                 if (error) throw new Error("Sign in error!")
    //                 res.json({ token, user })
    //             })
    //         })
    //     })
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
// export function signup;plokjhgfcdvcfdxcfdsxcfvbhjkdfrcxvbjklopiughfcdx