const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const taskManage = require('./src/api/task')
const projectManage = require('./src/api/project')
const userManage = require('./src/api/user')
const inviteManage = require('./src/api/invite')

const app = express()
app.use(express());
dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB\n"))
  .catch((err) => console.log(err));


app.use('/api/task',taskManage)
app.use('/api',projectManage)
app.use('/api',userManage)
app.use('/api',inviteManage)

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`\n✅ Server running on port ${process.env.SERVER_PORT || 3000}`);
});
