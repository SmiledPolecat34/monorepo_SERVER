import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (p) {
        return /^\d{10,20}$/.test(p);
      },
      message: (props) =>
        `${props.value} n'est pas un numéro de téléphone valide !`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// etre sur qu'il y ait qu'un seul num par user
contactSchema.index({ user: 1, phone: 1 }, { unique: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
