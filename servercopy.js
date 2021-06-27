const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const dictionary = require("./he-en-dic-nikkudless.json");
const lessonslist = require("./try.json");

console.log("running");

mongoose.connect(
  "mongodb+srv://yedidya:AnorLondo2@cluster0.x9tym.mongodb.net/hebrews?authSource=admin&replicaSet=atlas-g2j302-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  const hebSchema = new mongoose.Schema({
    part_of_speech: String,
    synonyms: Array,
    samples: Array,
    translated: String,
    translation: Array,
    inflections: String,
    id: String,
  });
  const Hebrew = mongoose.model("Hebrew", hebSchema);

  Hebrew.find({ inflections: "שמח" }, function (err, word) {
    if (err) console.log(err);
    console.log(word);
  });

  // word.save((err, word) => {
  //   if (err) console.log(err);
  //   console.log("saved");
  // });

  //kitties
  // const kittySchema = new mongoose.Schema({
  //   name: String,
  // });
  // kittySchema.methods.speak = function () {
  //   const greeting = this.name
  //     ? "Meow name is " + this.name
  //     : "I don't have a name";
  //   console.log(greeting);
  // };
  // const Kitten = mongoose.model("Kitten", kittySchema);
  // const silence = new Kitten({ name: "Silence" });
  // console.log(silence.name);
  // const fluffy = new Kitten({ name: "fluffy" });
  // fluffy.speak();

  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   fluffy.speak();
  // });
  // silence.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  // });

  // Kitten.find({ name: "Silence" }, function (err, cat) {
  //   if (err) console.log(err);
  //   console.log(cat);
  // });
});
