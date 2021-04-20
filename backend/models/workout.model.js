const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: problably change this schema to include styrketräning etc
const workoutSchema = new Schema(
  {
    username: { type: String, required: true },
    typeOfWorkout: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
