const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// ------ WRITE YOUR SOLUTION HERE BELOW ------//

const levelHighScores = []

//SIGNUP LOGIC
app.post("/signup", (req, res) => {
  const { userHandle, password } = req.body

  if (!password || !userHandle) {
    return res.status(400).send()
  }

  if (password.length < 6 || userHandle.length < 6) {
    return res.status(400).send()
  }

  res.status(201).send()
})

//LOGIN LOGIC
app.post("/login", (req, res) => {
  const { userHandle, password } = req.body

  if (!password || !userHandle) {
    return res.status(400).send()
  }

  if (typeof userHandle != "string" || typeof password != "string") {
    return res.status(400).send()
  }

  if ( userHandle != "DukeNukem" || password != "123456" ) {
    return res.status(401).send()
  }

  if (Object.keys(req.body).length > 2) {
    return res.status(400).send()
  }

  res.status(200).json({jsonWebToken: "randomString"})
})

//HIGHSCORE LOGIC
function authMiddlewear(req, res, next) {
  const { authorization }  = req.headers

  if (!authorization) {
    return res.status(401).send()
  }

  if ( authorization != "Bearer randomString") {
    return res.status(401).send()
  }

  next()
}

app.post("/high-scores", authMiddlewear, (req, res) => {
  const { level, userHandle, score, timestamp } = req.body

  if (!level || !userHandle || !score || !timestamp) {
    return res.status(400).send()
  }
  const item = { level, userHandle, score, timestamp }
  levelHighScores.push(item)

  res.status(201).send()
})

app.get("/high-scores", (req, res) => {
  const { level, page = 1 } = req.query
  
  const allResult = levelHighScores.filter((item) => level == item.level)

  allResult.sort((a, b) => b.score - a.score)

  const pageResult = allResult.slice((page-1)*20, page*20)

  res.status(200).json(pageResult)
})

//------ WRITE YOUR SOLUTION ABOVE THIS LINE ------//

let serverInstance = null;
module.exports = {
  start: function () {
    serverInstance = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  },
  close: function () {
    serverInstance.close();
  },
};
