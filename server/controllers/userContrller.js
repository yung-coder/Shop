const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("../middlewear/asyncerrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

exports.registerUser = catchasyncerror(async (req, res, next) => {

  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchasyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.logoutUser = catchasyncerror(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.forgotPassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found ", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )} /api/v1/password/${resetToken}`;

  const message = `Your reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = catchasyncerror(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password dose not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.UpdateUserPassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPassword = await user.comparePassword(req.body.oldPassword);

  if (!isPassword) {
    return next(new ErrorHandler("old  password is inncorrect", 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password dose not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.UpdateUserProfile = catchasyncerror(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  sendToken(user, 200, res);
});

// --admin
exports.getAllUsers = catchasyncerror(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,

  });
});

//  --admin
exports.getSingleUser = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user dose not exists with Id: ${req.params.id} `)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.UpdateUserRole = catchasyncerror(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deletUser = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User dose not exist with Id: ${req.params.id}`)
    );
  }

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted",
  });
});
