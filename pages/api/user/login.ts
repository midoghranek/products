import { NextApiHandler } from "next";
import users from "public/data/users.json";
import passwords from "public/data/passwords.json";

type Passwords = {
  [key: string]: string;
};

type Data = any;

const handler: NextApiHandler<Data> = (req, res) => {
  if (req.method === "POST") {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "USER_NOT_FOUND",
      });
    }

    const storedPassword = (passwords as Passwords)[user._id];

    if (password !== storedPassword) {
      return res.status(400).json({
        success: false,
        message: "INCORRECT_PASSWORD",
      });
    }

    return res.status(200).json({
      success: true,
      message: "login successful",
      user,
    });
  }
};

export default handler;
