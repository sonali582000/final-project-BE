const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/route-guard.middleware");
SALT_ROUNDS = 13;

//Just for testing purpose
router.get("/", (req, res) => {
  res.json("All good in here in auth");
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const potentialUser = await User.findOne({
    email: payload.email.toLowerCase().trim(),
  });
  try {
    if (potentialUser) {
      res.status(500).json({ message: "user already signed up!" });
    } else {
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const passwordHash = bcrypt.hashSync(payload.password, salt);
      console.log(payload);
      const userToRegister = {
        email: payload.email,
        passwordHash: passwordHash,
        first_name: payload.first_name,
        username: payload.username,
        location: payload.location,
        profile_picture: payload.profile_picture,
      };
      const newUser = await User.create(userToRegister);

      //token for the new user
      const authToken = jwt.sign(
        { userId: newUser._id },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "6h" }
      );
      res.status(201).json({
        message: "User signed up and logged in successfully!",
        token: authToken,
        newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occurs" });
  }
});

router.post("/login", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const potentialUser = await User.findOne({
    email: payload.email.toLowerCase().trim(),
  });

  try {
    if (potentialUser) {
      //password check
      if (bcrypt.compareSync(payload.password, potentialUser.passwordHash)) {
        const authToken = jwt.sign(
          {
            userId: potentialUser._id,
          },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        res.status(200).json({ token: authToken });
      } else {
        // Incorrect password
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      // No user matching the email
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  console.log(req.tokenPayload);
  const currentUser = await User.findById(req.tokenPayload.userId);
  res.status(200).json(currentUser);
});

module.exports = router;
