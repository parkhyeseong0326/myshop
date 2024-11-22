const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;