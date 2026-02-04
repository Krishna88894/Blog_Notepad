const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
uuidv4();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
let posts = [
    {   id: uuidv4(),
        username: "broitskrishna",
        content: "This is the content of the first post."
    },
    {   id: uuidv4(),
        username: "ikrihueditz",
        content: "This is the content of the second post."
    },
    {   id: uuidv4(),
        username: "bhajanmarg",
        content: "This is the content of the third post."
    },
    {   id: uuidv4(),
        username: "bhaktipath",
        content: "This is the content of the fourth post."
    }
]
app.get('/posts', (req, res) => {
    res.render('index.ejs', {  posts });
});                                     
app.get("/posts/new", (req, res) => {
    res.render("new.ejs"); 
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
    
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    
    res.redirect("/posts");
});
   
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === (p.id));
    res.render("show.ejs", { post });
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});
app.get("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});