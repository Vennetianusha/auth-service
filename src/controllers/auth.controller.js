const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    // 🔹 Ensure body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { name, email, password } = req.body;

    // 🔹 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // 🔹 Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔹 Hash password (bcryptjs is Docker-safe)
    const password_hash = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash, // MUST match Prisma schema
        role: "user",
      },
    });

    // 🔹 Success response (never return password)
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // 🔥 THIS PREVENTS SOCKET HANG UP
    console.error("REGISTER ERROR ↓↓↓");
    console.error(error);

    // Prisma-specific error (optional but helpful)
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
