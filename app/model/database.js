const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/appname"
    // "mongodb+srv://dhanesh-malviya:dhanesh123@mastercluster.i7cpa.mongodb.net/userblog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err.message));