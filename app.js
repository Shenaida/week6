const express = require('express')
const app = express()
const port = 3000
var path = require("path");

let data=require('./data')
const body_parser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

// parse JSON (application/json content-type)
app.use(body_parser.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.get("/klantgegevens", (req, res) => {
   //  res.json(data);
   //  data = JSON.parse(contents)
    res.render("klantgegevens.pug", { data: data })
 });

 app.get("/klantgegevens/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);
 
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
 });
 app.post("/klantgegevens", (req, res) => {
    const item = req.body;
    console.log('Adding new item: ', item);
 
    // add new item to array
    data.push(item)
 
    // return updated list
    res.json(data);
 });

 app.put("/klantgegevens/:email", (req, res) => {
   const itemEmail = req.params.email;
   const item = req.body;
   console.log("Editing item: ", itemEmail, " to be ", item);

   const updatedListItems = [];
   // loop through list to find and replace one item
   data.forEach(oldItem => {
      if (oldItem.email === itemEmail) {
         updatedListItems.push(item);
      } else {
         updatedListItems.push(oldItem);
      }
   });

   // replace old list with new one
   data = updatedListItems;

   res.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))