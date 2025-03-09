import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import helmet from "helmet"
import dotenv from "dotenv"
import * as dynamoose from "dynamoose"

// ROUTE IMPORTS



//CONFIGURATIONS
dotenv.config()

const isProduction = process.env.NODE_ENV === "production";

if(!isProduction) {
    dynamoose.aws.ddb.local();
}

const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());


//ROUTES
app.get("/", (req, res) => {
    res.send("Hello World")
})


//SERVER
const port = process.env.PORT || 3000
if(!isProduction) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}