const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");

//@desc Get Register User
//@router post /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Field are mandatory!");
  }

  const userAvailable = UserSchema.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hashpassword = await bcrypt.hash(password, 10);
  // console.log("hash password", hashpassword)
  const user = await UserSchema.create({
    username,
    email,
    password: hashpassword,
  });
  console.log(`Uaer Created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data us not valid");
  }

  // res.status(200).json(user);
  res.status(200).json({ message: "register" });
});

//@desc Login User
//@router post /api/user/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Field are mandatory!");
  }

  const userAvailable = await UserSchema.findOne({ email });
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const acessToken = jwt.sign(
      {
        username: userAvailable.username,
        email: userAvailable.email,
        id: userAvailable.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ acessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current User info
//@router post /api/user/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  // const user = await UserSchema.find();
  // res.status(200).json(user);
  res.status(200).json({message: "Current user information"});
});

//@desc Get All User
//@router Get /api/user
//@access public
const getUser = asyncHandler(async (req, res) => {
  const user = await UserSchema.find();
  res.status(200).json(user);
});
//@desc  Get One All User
//@router  Get One /api/user
//@access public
const getOneUser = asyncHandler(async (req, res) => {
  const user = await UserSchema.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("City not Found");
  }
  res.status(200).json(user);
});
//@desc Create All User
//@router Create /api/user
//@access public
const createUser = asyncHandler(async (req, res) => {
  //   console.log("Body", req.body);
  const { city_name } = req.body;
  if (!city_name) {
    res.status(400);
    throw new Error("All Field are mandatory!");
  }

  const user = await UserSchema.create({
    city_name,
  });

  res.status(201).json(user);
});
//@desc Update All User
//@router Update /api/user
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await UserSchema.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("City not Found");
  }
  const updateCity = await UserSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateCity);
});
//@desc Delete All User
//@router Delete /api/user
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserSchema.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("City not Found");
  }

  const deleteCity = await UserSchema.findByIdAndRemove(req.params.id, {
    new: true,
  });

  res.status(200).json(deleteCity);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
