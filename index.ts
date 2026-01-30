import express from 'express'
import router from './src/router'

// user -> { id: uuid(), email: string, password: string } 
// bycrypt -> https://www.npmjs.com/package/bcrypt
// token -> https://www.npmjs.com/package/jsonwebtoken

// Login -> controllo credenziali -> { id, email } -> token

const app = express()
app.use(express.json())

app.use("/api", router)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})