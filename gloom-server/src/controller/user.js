const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/User");
const Project = require("../model/Task");

const generatePfCode = () => {
  let code;
  do {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
  } while (
    code.length < 6 ||
    code.match(/[A-Z]/g).length < 2 ||
    code.match(/\d/g).length < 2
  );
  return `#${code}`;
};
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const pfcode = generatePfCode();
    const newUser = new User({ username, password: hashedPassword, pfcode });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const userAllowed = await bcrypt.compare(password, user.password);

    if (!userAllowed) {
      return res.status(401).send("Incorrect !!");
    }

    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET
    );
    console.log(accessToken);

    res.status(200).send({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
  }
};

exports.getUserById = async (req,res) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);
		if(!user){
			return res.status(401).json({message:"no user : ", id})
		}
		res.status(200).send(user);
	}catch(e){
		console.log(e);
		res.status(500).send("Server error");

	}
}

exports.authMe = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired" });
      }

      try {
        if (!user.username) {
          console.error("User ID is missing in JWT payload");
          return res.status(400).json({ message: "Invalid JWT payload" });
        }

        // Check if the user exists in the database
        const foundUser = await User.findById(user.id)
        if (!foundUser) {
          console.error("User not found in database for ID:", user.id);
          return res.status(404).json({ message: "User not found" });
        }
        // User exists, return the user data
        res.status(200).json(foundUser);
      } catch (error) {
        console.error("Error finding user in database:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (e) {
    console.error("Error in authMe:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
