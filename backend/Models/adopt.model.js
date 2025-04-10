import { Schema, model } from "mongoose";

const adopterSchema = new Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z\s]{3,}$/, // Only letters and spaces, min 3 chars
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Exactly 10 digits
  },
  govtId: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]{5,}$/, // Alphanumeric, min 5 chars
  },

  // Address Information
  streetAddress: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[1-9][0-9]{5}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid PIN code!`,
    },
  },

  // Housing Details
  residenceType: {
    type: String,
    enum: ["house", "apartment", "condo", "other"],
    required: true,
  },
  housingStatus: {
    type: String,
    enum: ["own", "rent"],
    required: true,
  },

  // Home Environment
  spaceSize: {
    type: String,
    enum: ["small", "medium", "large", "xlarge"],
    required: true,
  },
  hasYard: { type: Boolean, required: true },
  hasFence: {
    type: String,
    enum: ["yes", "no", "na"],
    required: true,
  },
  neighborhoodType: {
    type: String,
    enum: ["urban", "suburban", "rural"],
    required: true,
  },
  nearbyAreas: { type: String, trim: true }, // Optional
  timeAtHome: {
    type: String,
    enum: ["allday", "parttime", "fulltime", "variable"],
    required: true,
  },

  // Household Information
  totalMembers: { type: Number, required: true },
  hasChildren: { type: Boolean, required: true },
  allAgree: { type: Boolean, required: true }, // Does everyone agree?

  // Pet Experience
  hadPetsBefore: { type: Boolean, required: true },
  currentlyHasPets: { type: Boolean, required: true },
  adoptionReason: { type: String, required: true, trim: true },
  petCareKnowledge: [{ type: String }], // List of knowledge areas

  // Image upload (e.g., base64 string or file reference)
  image: { type: String, required: true },

  // Adoption Status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  // Pet reference (linked via petId)
  petId: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
}, {
  timestamps: true
});

const Adopter = model("Adopter", adopterSchema);
export default Adopter;
