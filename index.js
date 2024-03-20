import express from "express";
import path from "path";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://bank-apis.justinclicks.com/API/V1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let username,userifsc,content;
// Define routes
app.get("/", (req, res) => {
    // Render your EJS template
    res.render("index.ejs",{content:content});
});


app.post("/submit", async(req,res)=>{
    username=req.body.name;
    userifsc=req.body.IFSCcode;
    console.log(username);
    console.log(userifsc);
    try{
        const result=await axios.get(API_URL+"IFSC/"+userifsc+"/");
        console.log(result);
        res.render("result.ejs",{name:username,ifsc:userifsc,result:result.data});

    } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
