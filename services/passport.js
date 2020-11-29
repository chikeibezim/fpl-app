const passport = require('passport');
const CustomStrategy = require("passport-custom").Strategy;

const keys = require('../config/keys');
const User = mongoose.model("user");
