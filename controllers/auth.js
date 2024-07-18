const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const express = require("express");
const router = express.Router();

//-------------------------------------------------------SIGN-UP ROUTE-------------------------------------------------------

// Render sign-up form
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// Handle sign-up form submission
router.post("/sign-up", async (req, res) => {
    // Verify new user does not already exist in DB
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    // Verify correct password entry
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    }

    // Encrypt password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hashedPassword;

    // Create the user in the database
    const user = await User.create(req.body);
    return res.send(`Thanks for signing up ${user.username}`);

    req.session.user = {
      username: user.username,
    };
    
    req.session.save(() => {
      res.redirect("/");
    });
    

});


//-------------------------------------------------------SIGN-IN ROUTE-------------------------------------------------------

// Render sign-in form
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// Handle sign-up form submission
router.post("/sign-up", async (req, res) => {
  // Verify new user does not already exist in DB
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
      return res.send("Username already taken.");
  }

  // Verify correct password entry
  if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
  }

  // Encrypt password
  const hashedPassword = bcrypt.hashSync(req.body.password, 12);
  req.body.password = hashedPassword;

  // Create the user in the database
  const user = await User.create(req.body);

  // Set session user and redirect
  req.session.user = {
      username: user.username,
  };

  return req.session.save(() => {
      res.redirect("/");
  });
});

//-------------------------------------------------------SIGN-OUT ROUTE-------------------------------------------------------

// Handle sign-out
router.get("/sign-out", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;
