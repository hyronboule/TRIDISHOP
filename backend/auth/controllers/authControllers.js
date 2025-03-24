const User = require("../models/User");
const { generateToken } = require("../utils/tokenUtils");
const { checkPassword, hashPassword } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
const { verifyEmail } = require("../utils/verifyEmail");
dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const pseudoRegex = /^[a-zA-Z0-9]{1,10}$/;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or password empty" });
    }
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password && !passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Invalid password format. Must contain at least 8 characters, including uppercase, lowercase, number, and special characters",
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Cet utilisateur n'existe pas" });

    const match = await checkPassword(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    if (user.isActived === false) {
      verifyEmail(user.email)
      return res.status(401).json({message : "Votre compte n'est pas activé. Un email de vérification vous a été envoyé."})
    }

    const token = generateToken({
      id: user._id,
      pseudo: user.pseudo,
      email,
      role: user.role,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { pseudo, email, password, role } = req.body;

    if (!pseudo || !email || !password) {
      return res
        .status(400)
        .json({ message: "email, pseudo and password are required" });
    }

    const newUser = new User({ pseudo, email, password, role });

    const savedUser = await newUser.save();

    await verifyEmail(email);

    const userToReturn = {
      id: savedUser._id,
      pseudo: savedUser.pseudo,
      email: savedUser.email,
      role: savedUser.role,
    };

    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verificationAccount = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(401).json({ message: "Email manquant." });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    await User.updateOne({ email: email }, { $set: { isActived: true } });

    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="3; url=https://tridishop.site/login">
        </head>
        <body>
          <h1>Compte vérifié avec succès !</h1>
          <p>Vous allez être redirigé vers la page de connexion...</p>
        </body>
      </html>
    `);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la vérification du compte.",
      });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userInfo = {
      id: req.auth.userId,
      role: req.auth.role,
    };
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(404).json({
      message: "Utilisateur introuvable",
    });
  }
};

const updateUser = async (req, res) => {
  const { pseudo, email, newEmail, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email of the user is required" });
  }

  const updateData = {};

  if (pseudo) {
    if (!pseudoRegex.test(pseudo)) {
      return res.status(400).json({ message: "Invalid pseudo format" });
    }
    const existingPseudo = await User.findOne({ pseudo });
    if (existingPseudo) {
      return res.status(400).json({ message: "Pseudo is already in use" });
    }
    updateData.pseudo = pseudo;
  }

  if (newEmail) {
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: "Invalid new email format" });
    }
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "New email is already in use" });
    }
    updateData.email = newEmail;
  }

  if (password) {
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    try {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ message: "Error hashing password" });
    }
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // find user with id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `User not found ${userId}` });
    }
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // delete all products of user
    try {
      const productsResponse = await axios.get(
        `${process.env.URL_GET_ALL_PRODUCTS_USER}`,
        {
          params: { name: user.pseudo },
        }
      );

      const products = productsResponse.data.data;

      if (products && products.length > 0) {
        // If products are found, delete them
        const deleteProductsResponse = await axios.delete(
          `${process.env.URL_DELETE_ALL_PRODUCT_USER}${user.pseudo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Products deletion response:", deleteProductsResponse.data);
      } else {
        console.log(`No products found for user ${user.pseudo}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(
          `No products found for user ${user.pseudo}, skipping deletion.`
        );
      } else {
        console.error("Error managing user products:", error.message);
        return res.status(500).json({
          message: "Failed to manage user products",
          error: error.message,
        });
      }
    }

    // delete Profil
    try {
      const profileResponse = await axios.delete(
        `${process.env.URL_DELETE_PROFIL}${user.pseudo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile deletion response:", profileResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User profile not found, skipping deletion");
      } else {
        console.error("Error deleting user profile:", error.message);
        return res.status(500).json({
          message: "Failed to delete user profile",
          error: error.message,
        });
      }
    }

    // delete user of the database auth
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User, associated products, and profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  login,
  register,
  getUserInfo,
  updateUser,
  deleteUser,
  verificationAccount,
};
