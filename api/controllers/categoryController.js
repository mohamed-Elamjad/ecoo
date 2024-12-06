const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/categoryModel");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const category = await Category.create(req.body);
  res.status(200).json({
    success: true,
    message: "Create category",
    category,
  });
});
