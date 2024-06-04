import mongoose, { mongo } from "mongoose";

// export const formatHashtags = (hashtags) =>
//   hashtags.split(",").map((word) => `#${word}`);

// export const formatHashtags2 = (hashtags) =>
//   hashtags.map((word) => (word.startsWith("#") ? word : `#${word}`));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => `#${word}`);
});

videoSchema.static("formatHashtags2", function (hashtags) {
  return hashtags.map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
