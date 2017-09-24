const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +"/views/partials");
app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));

app.use((req,res,next) =>
{
    var log = new Date().toString() + ` ${req.method} ${req.url}`;
    fs.appendFile("server.log",log +"\n",(err) =>
    {
        if (err)
            console.log("error");
    });
    next();
})

// app.use((req,res,next) =>
// {
//     res.render("maintain.hbs",{
//         pageTitle:"Maintainance Page",
//         bodyContent:"This page is under maintainance."
//     });
// });

hbs.registerHelper("currentYear",() =>
{
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt",(text) =>
{
    return text.toUpperCase();
})

app.get("/projects",(req,res) =>{
    res.render("projects.hbs",{
        pageTitle:"Projects",
        bodyContent:"Portfolio goes here"
    })
});

app.get("/",(req,res) => {
    res.render("home.hbs",{
        pageTitle:"Home Page",
        bodyContent:"This is the body of the page"
    })
});

app.get("/about",(req,res) => {
    res.render("about.hbs",{
        pageTitle:"About Page",
        //currentYear:new Date().getFullYear()
    })
});

app.get("/bad",(req,res) => {
    res.send({
        Request:"BAD",
        Status:"Nothing Loaded"
    });
});

app.listen(port,() =>
{
    console.log(`Server is running on port ${port}`);
});