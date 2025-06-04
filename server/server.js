const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables for Google OAuth credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET';

// Initialize SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'codenia.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create members table if not exists
db.run(
  "CREATE TABLE IF NOT EXISTS members (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "google_id TEXT UNIQUE," +
  "email TEXT," +
  "name TEXT," +
  "member_id TEXT UNIQUE," +
  "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
  ")"
);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend URL
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'codenia-session',
  keys: ['secretkey1', 'secretkey2'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.google_id);
});

passport.deserializeUser((id, done) => {
  db.get('SELECT * FROM members WHERE google_id = ?', [id], (err, row) => {
    if (err) return done(err);
    done(null, row);
  });
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Check if user exists in DB, if not insert
  db.get('SELECT * FROM members WHERE google_id = ?', [profile.id], (err, row) => {
    if (err) return done(err);
    if (row) {
      // User exists
      return done(null, row);
    } else {
      // Generate unique Member ID (e.g., CODE + timestamp + random)
      const memberId = 'CODE' + Date.now() + Math.floor(Math.random() * 1000);
      // Insert new member
      db.run('INSERT INTO members (google_id, email, name, member_id) VALUES (?, ?, ?, ?)',
        [profile.id, profile.emails[0].value, profile.displayName, memberId],
        function (err) {
          if (err) return done(err);
          db.get('SELECT * FROM members WHERE id = ?', [this.lastID], (err, newRow) => {
            if (err) return done(err);
            return done(null, newRow);
          });
        });
    }
  });
}
));

// Routes
app.get('/', (req, res) => {
  res.send('Codeunia Backend Server is running.');
});

// Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Successful authentication, redirect to frontend with user info
    res.redirect('http://localhost:3000/membership?user=' + encodeURIComponent(JSON.stringify(req.user)));
  });

app.get('/auth/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

// API to get current logged in user
app.get('/api/current_user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Create events table if not exists
db.run(
  "CREATE TABLE IF NOT EXISTS events (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "title TEXT," +
  "date TEXT," +
  "description TEXT," +
  "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
  ")"
);

// API to get all events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY date ASC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
    res.json(rows);
  });
});

// Admin API to add new event (no auth for now)
app.post('/api/admin/events', (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.run('INSERT INTO events (title, date, description) VALUES (?, ?, ?)', [title, date, description], function(err) {
    if (err) {
      console.error('Error adding event:', err);
      return res.status(500).json({ error: 'Failed to add event' });
    }
    res.json({ id: this.lastID, title, date, description });
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
