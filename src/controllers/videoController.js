import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.send({ title: "Home", videos });
  } catch (error) {
    console.error(error);
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.send({ title: "watch", video });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.send({ title: "edit", video });
  }
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.send(null);
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags2(hashtags),
  });

  return res.status(200).json({ message: "Edit successful" });
};

export const getUpload = (req, res) => {
  res.status(200);
  return res.send({ title: "Upload Page" });
};

export const postUpload = async (req, res) => {
  const { sendTitle, sendDescription, sendHash } = req.body;
  try {
    await Video.create({
      title: sendTitle,
      description: sendDescription,
      hashtags: Video.formatHashtags(sendHash),
    });
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: error._message });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.send({ title: "delete" });
};
