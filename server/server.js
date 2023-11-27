const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

app.use(cors());

require('dotenv').config({ path: __dirname + '/.env' });

// Connect to Database
connectDB();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api/forms', formRoutes); // Prefix all form routes

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)
});
