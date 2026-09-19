const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../db");

// GET /api/reservations - list all (admin use)
router.get("/", (req, res) => {
  const reservations = readData("reservations");
  res.json(reservations.sort((a, b) => new Date(a.date) - new Date(b.date)));
});

// POST /api/reservations - create a booking
router.post("/", (req, res) => {
  const { name, email, phone, date, time, partySize, notes } = req.body;

  if (!name || !email || !date || !time || !partySize) {
    return res.status(400).json({ error: "name, email, date, time and partySize are required." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (Number(partySize) < 1 || Number(partySize) > 20) {
    return res.status(400).json({ error: "Party size must be between 1 and 20. For larger groups, please call us." });
  }

  const reservations = readData("reservations");
  const newReservation = {
    id: Date.now(),
    name,
    email,
    phone: phone || "",
    date,
    time,
    partySize: Number(partySize),
    notes: notes || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  reservations.push(newReservation);
  writeData("reservations", reservations);

  res.status(201).json({ message: "Reservation received.", reservation: newReservation });
});

// PATCH /api/reservations/:id - update status (confirm/cancel), admin use
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "cancelled"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${allowed.join(", ")}` });
  }

  const reservations = readData("reservations");
  const index = reservations.findIndex(r => r.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: "Reservation not found." });
  }

  reservations[index].status = status;
  writeData("reservations", reservations);
  res.json({ message: "Reservation updated.", reservation: reservations[index] });
});

// DELETE /api/reservations/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const reservations = readData("reservations");
  const filtered = reservations.filter(r => r.id !== Number(id));

  if (filtered.length === reservations.length) {
    return res.status(404).json({ error: "Reservation not found." });
  }

  writeData("reservations", filtered);
  res.json({ message: "Reservation deleted." });
});

module.exports = router;
