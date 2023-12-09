const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const chokidar = require("chokidar");
const { dirname } = require("path");
const { env } = require("process");
let Datastore = require("nedb"),
  db = new Datastore({ filename: "database.db", autoload: true });
const watcher = chokidar.watch("database.db");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dependencies", { root: __dirname }));
app.use(express.static("css", { root: __dirname }));
app.use(express.static("js"));
app.use(express.static("html", { root: __dirname }));
app.use(express.json());

/*let dbSchema = {
  let newDocument = {
    username: username,
    message: message,
    id: id
  }
}
*/
app.get("/", (req, res) => {
  res.sendFile("/HomePage.html", { root: __dirname });
});

app.get("/getEntries", (req, res) => {
  let results = db.find({ exist: true }, (err, results) => {
    if (results.length != 0) {
      res.json(results);
      console.log(results);
      console.log("There are/is " + results.length + " database entries!");
    } else {
      res.json([]);
    }
  });
  //let exampleJson = { hello: "world" };
});

app.post("/submit", (req, res) => {
  let username = req.body.username;
  let message = req.body.message;
  let newUserEntry = {
    username: username,
    message: message,
    exist: true,
  };
  db.insert(newUserEntry, (err, newDocumentToSave) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.post("/update", (req, res) => {
  const data = req.body;
  const newUpdateSchema = {
    username: data.username,
    message: data.message,
    exist: data.exist,
    _id: data._id,
  };
  db.update(
    { _id: newUpdateSchema._id },
    newUpdateSchema,
    {},
    function (err, result) {
      console.log(result);
    }
  );
  res.redirect("/");
});

app.delete("/deleteAll", (req, res) => {
  db.remove({}, { multi: true }, function (err, numRemoved) {});
  console.log("ALL DATABASE ENTRIES DELETED");
  res.redirect("/");
});

app.delete("/removeIndividual", (req, res) => {
  const userID = req.body;
  db.remove(
    { _id: userID._id },
    { multi: true },
    function (err, numRemoved) {}
  );
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});

module.exports = app;
