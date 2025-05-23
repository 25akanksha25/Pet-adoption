import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: { 
    type: String, 
  },
  approvedStatus: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['dog', 'cat'],
  },
  breed: { 
    type: String, 
  },
  gender: { 
    type: String, 
    enum: ["male", "female"], 
  },
  age: { 
    type: String, 
  },
  color: { 
    type: String, 
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
  },
  weight: { 
    type: String, 
  },
  height: { 
    type: String, 
  },
  images: [{
    path: { type: String },
    filename: { type: String }
  }],
  location: { 
    city: { 
      type: String, 
    },
    state: { 
      type: String, 
    },
    country: { 
      type: String, 
    },
    pincode: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: props => `${props.value} is not a valid PIN code!`
      }
    }
  },
  vaccinated: { 
    type: String, 
    default: "no"
  },
  spayed: { 
    type: String, 
    default: "no" 
  },
  microchipped: { 
    type: String, 
    default: "no"
  },
  houseTrained: { 
    type: String, 
    default: "no"
  },
  story: { 
    type: String, 
  },
  photos: [String],
  status: { 
    type: String, 
    enum: ["Available", "Adopted", "Pending" , "Draft"], 
    default: "Available" 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  adoptedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  adoptionDate: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

const Pet = model("Pet", petSchema);
export default Pet;
