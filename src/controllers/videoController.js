export const home = (req, res) => res.send({ title: "Home" });

export const watch = (req, res) => {
  const { id } = req.params;
  return res.send({ title: "watch" });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.send({});
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.status(200).json({ message: "Edit successful" });
};

export const getUpload = (req, res) => {
  res.status(200);
  return res.send({ title: "Upload Page" });
};

export const postUpload = (req, res) => {
  return res.status(200).json();
};

export const search = (req, res) => res.send("search");
