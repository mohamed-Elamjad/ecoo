const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../models/contactModel");
exports.createContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    contact,
  });
});

exports.getAllContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json({
    success: true,
    contacts,
  });
});


// Delete a Contact
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }
  await contact.deleteOne(); // Corrected from 'product.deleteOne()' to 'contact.deleteOne()'
  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});;