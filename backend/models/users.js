const Mongoose = require("mongoose");

const UsersSchema = Mongoose.Schema(
    {
        email: String,
        message: String,
        otp:Number   
    }
);
var usersModel = Mongoose.model("Users", UsersSchema);
module.exports = usersModel;
