const express = require('express');
const jwt = require('jsonwebtoken'); // JSON Web Token
const bcrypt = require('bcryptjs'); // Security for password hashing
const cors = require('cors');
require('dotenv').config();

// Middleware
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Temporary in-memory user storage (to be replaced with a database later)
const users = [];

// Middleware for authenticating and authorizing admin access
const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = users.find(u => u.id === decoded.id && u.role === 'admin');
    if (!user) {
      return res.status(403).send('Access denied. Admins only.');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Authentication failed.');
  }
};

// Register route for creating an admin user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      completion: 0  // Completion percentage or other metrics
    };

    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET);
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login route for admins
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid email or password.');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Admin-only route to get all users
app.get('/admin/users', authenticateAdmin, (req, res) => {
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Admin-only route to add a new user
app.post('/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      completion: 0, // Assume default completion status
    };

    users.push(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Admin-only route to delete a user
app.delete('/admin/users/:id', authenticateAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).send('User not found.');
    }

    users.splice(userIndex, 1);
    res.send('User deleted.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Admin-only route for data analytics
app.get('/admin/analytics', authenticateAdmin, (req, res) => {
  try {
    const analytics = users.map(user => ({ name: user.name, completion: user.completion }));
    res.send(analytics);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route for users to update their completion status in the frontend
app.put('/user/completion', (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const { completion } = req.body; // Completion value in the frontend
    if (completion !== undefined && completion >= 0 && completion <= 100) {
      user.completion = completion;  // Update user's completion status
      res.send({ message: 'Completion status updated', user });
    } else {
      res.status(400).send('Invalid completion value.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route for users to get their profile details
app.get('/user/profile', (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
