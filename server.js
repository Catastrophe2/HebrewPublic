const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_secret = "gjhbnsfdghaBNJKSDB734HBJDFFXdfafssddsd";

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

const listedLessonSchema = new mongoose.Schema({
  lessonTitle: String,
  lessonDesc: String,
  lessonId: String,
  content: Array,
});

const userSchema = new mongoose.Schema(
  {
    email: { $type: String, required: true, unique: true },
    password: { $type: String },
    words: { $type: Array },
  },
  { typeKey: "$type" }
);

const Hebrew = mongoose.model("Hebrew", dicScehma);
const Lesson = mongoose.model("Lesson", listedLessonSchema);
const User = mongoose.model("User", userSchema);
mongoose.set("useFindAndModify", false);
app.use(bodyParser.json());

app.post("/user/register", async (req, res) => {
  const { emailData, passData } = req.body;

  const encPassword = await bcrypt.hash(passData, 10);

  try {
    await User.create({
      email: emailData,
      password: encPassword,
      words: [],
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "email is in use" });
    }
  }
  return res.json({ status: "ok", data: "Register completed" });
});

app.post("/user/login", async (req, res) => {
  const { usernameData, passwordData } = await req.body;
  const user = await User.findOne({ email: usernameData }).exec();
  if (!user) {
    return res.json({ status: "error", error: "wrong email/pass" });
  }
  if (await bcrypt.compare(passwordData, user.password)) {
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_secret);
    res.json({ status: "ok", data: token });
  } else {
    res.json({ status: "error", data: "wrong email/pass" });
  }
});

app.post("/user/savedwords", async (req, res) => {
  const { token } = await req.body;
  console.log("enter");
  try {
    const decoded = jwt.verify(token, JWT_secret);
    const wordsList = await User.find({ email: decoded.email });
    console.log(wordsList[0].words);
    res.json({ status: "ok", data: wordsList[0].words });
  } catch {}
});

app.post("/user/addword", async (req, res) => {
  const { word, token } = await req.body;
  try {
    const decoded = jwt.verify(token, JWT_secret);
    const savedWords = await User.find({ email: decoded.email });

    if (savedWords[0].words.find((word1) => word1 === word)) {
      let index = savedWords[0].words.findIndex((em) => em === word);
      savedWords[0].words.splice(index, 1);
      User.findByIdAndUpdate(
        savedWords[0]._id,
        { words: savedWords[0].words },
        (err) => {
          if (err) console.log(err);
          res.json({ status: "ok", data: "word removed" });
        }
      );
    } else {
      savedWords[0].words.push(word);
      User.findByIdAndUpdate(
        savedWords[0]._id,
        { words: savedWords[0].words },
        (err) => {
          if (err) console.log(err);
          res.json({ status: "ok", data: "word added" });
        }
      );
    }
  } catch {
    res.json({ status: "error", data: "please login again" });
  }
});

app.get("/:lessons", (req, res) => {
  Lesson.find({}, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/lessonNum/:lessonid", (req, res) => {
  let reqId = req.params.lessonid.slice(1);
  Lesson.find({ lessonId: reqId }, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/trans/:translated", async (req, res) => {
  let question = req.params.translated;
  let a = question.slice(1);
  let doesExist = await User.find({ email: "asdasdasd", words: a });

  Hebrew.find({ inflections: a }, async function (err, result) {
    if (err) console.log(err);
    result[0].samples = doesExist.length > 0 ? true : false;
    // console.log(result);
    res.send(result);
  });
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
