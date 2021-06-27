const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yedidya:AnorLondo2@cluster0.x9tym.mongodb.net/hebrews?authSource=admin&replicaSet=atlas-g2j302-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dicScehma = new mongoose.Schema({
  part_of_speech: String,
  synonyms: Array,
  samples: Array,
  translated: String,
  translation: Array,
  inflections: String,
  id: Number,
});

const Hebrew = mongoose.model("Hebrew", dicScehma);

const dictionary = require("./he-en-dic-nikkudless.json");
const lessonslist = require("./try.json");

app.get("/:lessons", (req, res) => {
  console.log("req");
  res.send(lessonslist);
});

app.get("/try/try2", (req, res) => {
  Hebrew.find()
    .exec()
    .then((dic) => {
      res.send(dic);
    });
});

app.get("/lessonNum/:lessonid", (req, res) => {
  let b = req.params.lessonid.slice(1);
  let result = lessonslist.find((entry) => entry[0].lessonId === b);
  res.send(result);
});

app.get("/trans/:translated", (req, res) => {
  let question = req.params.translated;
  let a = question.slice(1);
  let result = dictionary.find((entry) => entry.inflections === a);
  res.send(result);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });
});

//the code used to mutate the json to have the no nikkud word. there is a better way to do it for sure...
// let bbb = JSON.stringify(dictionary);
// fs.writeFile("he-en-dic-nikkudless.json", bbb, function (err, result) {
//   if (err) console.log("error", err);
// });
// const fs = require("fs");
// for (let i = 0; i < dictionary.length; i++) {
//   dictionary[i].inflections = dictionary[i].translated;
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05c1/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05c2/g, "");

//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b0/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b1/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b2/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b3/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b4/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b5/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b6/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b7/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b8/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05b9/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bA/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bB/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bC/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bD/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bE/g, "");
//   dictionary[i].inflections = dictionary[i].inflections.replace(/\u05bF/g, "");
// }
