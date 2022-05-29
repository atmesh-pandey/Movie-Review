var router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const fs = require("fs");
const path = require("path");

const upload = require("../middleware/multer");

// POST /admin/register
router.post("/register", (req, res, next) => {
  upload(req, res, (err) => {
    let { email, name, password } = req.body;
    let newUser = {
      email,
      name,
      password,
      avatar: req.file ? req.file.filename : "",
    };
    newUser.password = bcrypt.hashSync(password, 10);

    User.create(newUser)
      .then(() => res.redirect("/login"))
      .catch((err) => res.send(err));
  });
});

// POST /admin/login
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.send("Please provide email and password");
  }

  const usercomp = await User.findOne({ email }).select("+password");

  const user = await User.findOne({ email });

  if (!user) {
    res.send("User not found");
  }

  const isPasswordMatch = await bcrypt.compareSync(password, usercomp.password);

  if (!isPasswordMatch) {
    res.send("Incorrect Email or Password!");
  }

  res.redirect("/profile");
});

// GET /admin/users
router.get("/users", (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("profile", { users, title: "Registered Users" });
    })
    .catch((err) => res.send(err));
});

// GET /admin/delete/:id
router.get("/delete/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user.avatar) {
        fs.unlinkSync(
          path.join(__dirname, "..", "public", "uploads", user.avatar)
        );
      }
      User.findByIdAndDelete(req.params.id)
        .then(() => res.redirect("/admin/users"))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

// GET /admin/update/:id
router.get("/update/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("update", { title: "Update User", user });
    })
    .catch((err) => res.send(err));
});

// POST /admin/update/:id
router.post("/update/:id", (req, res, next) => {
  upload(req, res, (err) => {
    let { email, name, oldavatar } = req.body;

    if (req.file && req.file.filename) {
      fs.unlinkSync(path.join(__dirname, "..", "public", "uploads", oldavatar));
    }

    let updatedUser = {
      email,
      name,
      avatar: req.file ? req.file.filename : oldavatar,
    };

    User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true })
      .then(() => {
        res.redirect("/admin/users");
      })
      .catch((err) => res.send(err));
  });
});

// GET /admin/logout
router.get("/logout", (req, res, next) => {
  res.redirect("/login");
});

module.exports = router;