import mongoose from "mongoose";

const FeaturesSchema = new mongoose.Schema({
    board: {
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    list: {
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    card: {
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      checkbox: { type: Boolean, default: false },
      upload: { type: Boolean, default: false },
    },
});

export default mongoose.model("Features", FeaturesSchema);