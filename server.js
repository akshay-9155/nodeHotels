const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config()
const {passport} = require('./auth.js')
// Configuring body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Person = require("./models/Person.js");
const { jwtAuthMiddleware, generateToken} = require('./jwt.js');

// Middleware Function: 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request sent to : ${req.originalUrl}`);
    next();
}

// This way we can use a middleware before any specific route
// app.get("/", logRequest, (req, res) => {
//     res.send(" Welcome to my hotel! ")
// })

//But logRequest middleware is generally used before all the routes
app.use(logRequest);    // Using logRequest middleware

// Writing authentication function



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false})

app.get("/", (req, res) => {
    res.send(" Welcome to my hotel! ")
})

app.post("/register", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedData = await newPerson.save();
        // const result = savedData.toObject();
        // delete result.password;
        const {password, ...result} = savedData.toObject();

        console.log("data saved");
        const payload = {
            id: result.id,
            unername: result.username
        }
        const token = generateToken(payload);
        res.status(200).json({user: result, token: token});
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await Person.findOne({username: username});
        if(!user || !await user.comparePassword(password)) res.status(404).send("Incorret Username or Password!");
        const payload = {
            id: user.id,
            unername: user.username
        }
        const token = generateToken(payload);
        res.status(200).json(token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

const personRoutes = require('./routes/personRoutes.js')
const menuRoutes = require('./routes/menuRoutes.js');


app.use("/person", jwtAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);


// app.get("/chicken",(req,res)=>{
//     res.send("Sure sir! I would love to serve chicken!");
// })
// app.get("/idli",(req,res)=>{
//     const customizedIDLI = {
//         name: "rava IDLI",
//         size: "10 cm diameter",
//         is_sambhar: true,
//         is_chutney: false
//     }
//     res.send(customizedIDLI);
// })
// app.get("/wadapaw",(req,res)=>{
//     res.send("Sure sir! I would love to serve WADAPAW!");
// })

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}`);
});