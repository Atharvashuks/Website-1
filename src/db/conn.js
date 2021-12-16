const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/websiteRegistrationdb"
 ).then(() => {
    console.log("Connection established.....")
}).catch((e) => {
    console.log("connection not established")
});