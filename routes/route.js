// routes.js

const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("./eventController");

// Create a new event
router.post("/events", async (req, res) => {
  const eventData = req.body;
  const result = await createEvent(eventData);
  res.json(result);
});

// Get all events
router.get("/events", async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

// Update an event
router.put("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const eventData = req.body;
  const result = await updateEvent(eventId, eventData);
  res.json(result);
});

// Delete an event
router.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;

  const result = await deleteEvent(eventId);
  res.json(result);
});

module.exports = router;
