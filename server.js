const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// ------ WRITE YOUR SOLUTION HERE BELOW ------//

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

  res.status(200).json({jsonWebToken: "string"})
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
