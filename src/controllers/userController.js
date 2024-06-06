import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.send({ title: "Join" });
export const postJoin = async (req, res) => {
  console.log(req.body.data);
  const { name, username, email, password, password2, location } =
    req.body.data;

  if (password !== password2) {
    return res
      .status(400)
      .json({ errorMessage: "Password confirmation does not match." });
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res
      .status(400)
      .json({ errorMessage: "This username is already taken" });
  }
  const emacilExists = await User.exists({ email });
  if (emacilExists) {
    return res
      .status(400)
      .json({ errorMessage: "This email is already taken" });
  }

  await User.create({
    name,
    username,
    email,
    password,
    password2,
    location,
  });
  return res.status(200).json();
};

export const getLogin = (req, res) => res.send({ title: "login" });

export const postLogin = async (req, res) => {
  const { email, password } = req.body.data;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ errorMessage: "An account with this email does not exists." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ errorMessage: "Wrong password" });
  }
  return res.status(200).json();
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
