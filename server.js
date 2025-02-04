const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// ------ WRITE YOUR SOLUTION HERE BELOW ------//

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
