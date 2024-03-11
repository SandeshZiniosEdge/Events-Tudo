const { default: mongoose } = require("mongoose");
const { getDB } = require("../db");

async function createEvent(eventData) {
  const db = getDB();
  const eventsCollection = db.collection("events");

  try {
    const result = await eventsCollection.insertOne(eventData);
    return result;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

async function getEvents() {
  const db = getDB();
  const eventsCollection = db.collection("events");

  try {
    const events = await eventsCollection.find({}).toArray();
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    throw new Error("Failed to get events");
  }
}

async function updateEvent(eventId, eventData, res) {
  const db = getDB();
  const eventsCollection = db.collection("events");

  try {
    const result = await eventsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(eventId.toString()) },
      { $set: eventData }
    );
    return result;
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(400).json("Invalid Event Id");
  }
}

async function deleteEvent(req, res) {
  const eventId = req.params.id;
  const db = getDB();
  const eventsCollection = db.collection("events");
  try {
    const result = await eventsCollection.deleteOne({
      _id: new mongoose.Types.ObjectId(eventId.toString()),
    });
    return result;
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(400).json("Invalid Event Id");
  }
}

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
