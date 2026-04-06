const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection URI (নিজের MongoDB URI বসাও)
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Database & Collections
const db = client.db("efootballDB");
const playersCollection = db.collection("players");
const managersCollection = db.collection("managers");
const legendsCollection = db.collection("legends");
const eventsCollection = db.collection("events");

// Routes
app.get('/api/players', async (req, res) => {
  const players = await playersCollection.find({}).toArray();
  res.json(players);
});

app.get('/api/managers', async (req, res) => {
  const managers = await managersCollection.find({}).toArray();
  res.json(managers);
});

app.get('/api/legends', async (req, res) => {
  const legends = await legendsCollection.find({}).toArray();
  res.json(legends);
});

app.get('/api/events', async (req, res) => {
  const events = await eventsCollection.find({}).toArray();
  res.json(events);
});

// Admin Panel APIs (Add new player, manager, etc.)
app.post('/api/player', async (req, res) => {
  const newPlayer = req.body;
  await playersCollection.insertOne(newPlayer);
  res.json({ message: "Player added successfully!" });
});

app.post('/api/manager', async (req, res) => {
  const newManager = req.body;
  await managersCollection.insertOne(newManager);
  res.json({ message: "Manager added successfully!" });
});

app.post('/api/legend', async (req, res) => {
  const newLegend = req.body;
  await legendsCollection.insertOne(newLegend);
  res.json({ message: "Legend added successfully!" });
});

app.post('/api/event', async (req, res) => {
  const newEvent = req.body;
  await eventsCollection.insertOne(newEvent);
  res.json({ message: "Event added successfully!" });
});

// Server start
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
