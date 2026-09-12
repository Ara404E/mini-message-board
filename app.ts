import  Express  from "express";
import path from "node:path";
import { indexRouter } from "./router/indexRouter";

const app = Express();
const PORT = 3000

app.set("views", path.join(__dirname, "views"),);

app.set("view engine", "ejs")


app.use(Express.static(path.join(__dirname, "public")))

app.use(Express.urlencoded({extended: true}))
app.use('/', indexRouter)



app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log("Mini Message Board app listining on port 3000")
})