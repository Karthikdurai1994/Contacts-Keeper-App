const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
// @route   GET api/contacts
// @desc    Get All contacts
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST api/contacts
// @desc    Save Contact
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("name", "Please Enter name").notEmpty(),
      check("email", "Please enter a valid email").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// @path     PUT api/contacts/:id
// @desc     update a user contact
// @access   Private
router.put("/:id", authMiddleware, async (req, res) => {
  // Getting id from the request paramters
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) {
    contactFields.name = name;
  }
  if (email) {
    contactFields.email = email;
  }
  if (phone) {
    contactFields.phone = phone;
  }
  if (type) {
    contactFields.type = type;
  }
  try {
    var contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    // Check if user is the owner of that particular contact
    // toString is used because req.user.id is string, but contacts.user is object, so we are converting it to string
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    contact = await Contact.findByIdAndUpdate(id, contactFields, { new: true });
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @path    DELETE api/contacts/:id
// @desc    Deleting a contact
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "No Contact found" });
    }
    // check if the user is the owner of this particular contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    await Contact.findByIdAndRemove(id);
    res.json({ message: "Contact Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
