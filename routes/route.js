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
  const result = await updateEvent(eventId, eventData, res);
  if (result?.matchedCount === 0) {
    // Event with the specified ID does not exist
    res
      .status(404)
      .json({ message: "Event with the specified ID does not exist" });
  } else {
    // Event deleted successfully
    result !== undefined &&
      res.status(200).json({ message: "Event updated successfully" });
  }
});

// Delete an event
router.delete("/events/:id", async (req, res) => {
  const result = await deleteEvent(req, res);
  if (result?.deletedCount === 0) {
    // Event with the specified ID does not exist
    res
      .status(404)
      .json({ message: "Event with the specified ID does not exist" });
  } else {
    // Event deleted successfully
    result !== undefined &&
      res.status(200).json({ message: "Event deleted successfully" });
  }
});

module.exports = router;
