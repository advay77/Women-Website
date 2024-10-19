const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname))); 


const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE userData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
});


app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    db.run('INSERT INTO userData (name, email, message) VALUES (?, ?, ?)', [name, email, message], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error saving message.' });
        }
        res.status(200).json({ message: 'Message received and stored!', id: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM userData', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving messages.' });
        }
        res.json(rows);
    });
});
