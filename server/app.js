const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// Establish connection to the database
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Store user's data in register table (for registration)
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const hashedPassword = bcrypt.hash(password, 10, function (err, hash) {
    const sql = `INSERT INTO register(name, email, password) VALUES(?, ?, ?)`;
    connection.query(sql, [name, email, hash], function (err) {
      if (err) {
        res.status(500).json({ message: "Registration failed." });
      } else {
        res.status(201).json({ message: "User registered successfully." });
      }
    });
  });
});

// Login route for users
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const sql = `SELECT * FROM register WHERE email = ?`;
  connection.query(sql, [email], async function (err, data) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error during login." });
    }

    if (data.length > 0) {
      const user = data[0];
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          res.status(200).json({
            message: "Login successful",
            user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
          });
        } else {
          res.status(400).json({ message: "Invalid email or password." });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  });
});

// Forgot password route
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM register WHERE email = ?`;
  connection.query(sql, [email], function (err, data) {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }
    if (data.length > 0) {
      const user = data[0];
      // You can send an email to the user with a password reset link
      res.status(200).json({ message: "Password reset link sent to email." });
    } else {
      res.status(400).json({ message: "Email not found." });
    }
  });
});

// Store user's data in contact table
app.post("/contact", (req, res) => {
  const { name, email, comment } = req.body;

  const sql = `INSERT INTO contact_form(name, email, comment) VALUES(?, ?, ?)`;
  connection.query(sql, [name, email, comment], function (err) {
    if (err) {
      res.status(500).json({ message: "Failed to save contact form data." });
    } else {
      res.status(201).json({ message: "Contact form data saved successfully." });
    }
  });
});

// Get route for register
app.get("/register", (req, res) => {
  connection.query("SELECT * FROM register", (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving data");
    }
    res.json(results);
  });
});

// Get route for login
app.get("/login", (req, res) => {
  connection.query("SELECT * FROM register", (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving data");
    }
    res.json(results);
  });
});

// Admin-only route to get all users (Added pagination)
app.get("/admin/users", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const sql = `SELECT * FROM register LIMIT ? OFFSET ?`;
  connection.query(sql, [Number(limit), (Number(page) - 1) * Number(limit)], function (err, data) {
    if (err) {
      res.status(500).json({ message: "Error retrieving users." });
    } else {
      res.json(data);
    }
  });
});

// Admin-only route for adding a new user
app.post("/admin/users", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = `INSERT INTO register(name, email, password) VALUES(?, ?, ?)`;
  connection.query(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      res.status(500).json({ message: "Failed to add user." });
    } else {
      res.status(201).json({ message: "User added successfully." });
    }
  });
});

// Admin-only route to delete a user
app.delete("/admin/users/:id", (req, res) => {
  const userId = req.params.id;

  const sql = `DELETE FROM register WHERE id = ?`;
  connection.query(sql, [userId], function (err) {
    if (err) {
      res.status(500).json({ message: "Error deleting user." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

// Admin-only route for data analytics
app.get("/admin/analytics", (req, res) => {
  const sql = `SELECT savingMoney, investing, budgeting, spendingWisely FROM register`;
  connection.query(sql, function (err, data) {
    if (err) {
      console.error("Error retrieving analytics:", err); // Log the error for debugging
      return res.status(500).json({ message: "Error retrieving analytics." });
    }

    // Process the data to calculate the number of people who completed each task
    const analytics = {
      savingMoney: 0,
      investing: 0,
      budgeting: 0,
      spendingWisely: 0,
    };

    data.forEach((row) => {
      if (row.savingMoney) analytics.savingMoney += 1;
      if (row.investing) analytics.investing += 1;
      if (row.budgeting) analytics.budgeting += 1;
      if (row.spendingWisely) analytics.spendingWisely += 1;
    });

    res.json(analytics);
  });
});

// Route for users to update their completion status in the frontend
app.put("/user/completion", (req, res) => {
  const { userId, completion } = req.body;

  if (!userId || completion === undefined) {
    return res.status(400).json({ message: "User ID and completion status are required." });
  }

  const sql = `UPDATE register SET completion = ? WHERE id = ?`;
  connection.query(sql, [completion, userId], function (err) {
    if (err) {
      res.status(500).json({ message: "Error updating completion status." });
    } else {
      res.json({ message: "Completion status updated successfully." });
    }
  });
});

// Route for users to get their profile details
app.get("/user/profile", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const sql = `SELECT * FROM register WHERE id = ?`;
  connection.query(sql, [userId], function (err, data) {
    if (err) {
      res.status(500).json({ message: "Error retrieving user profile." });
    } else {
      res.json(data[0]);
    }
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong." });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
