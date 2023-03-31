import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const register = async (req: any, res: any) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      const user: any = await prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { username: username }],
        },
      });

      if (user) {
        return res.status(400).json({ error: "Email/Username already exist" });
      }
      const hash = await bcrypt.hash(password, 0);
      await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hash,
        },
      });

      return res.status(200).end();
    } catch (err: any) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};

export default register;
