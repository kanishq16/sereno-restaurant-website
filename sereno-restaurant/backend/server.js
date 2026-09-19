const express = require("express");
const cors = require("cors");
const path = require("path");

const menuRoutes = require("./routes/menu");
const reservationRoutes = require("./routes/reservations");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);

// Serve the frontend as static files (so you can run the whole site from one server)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Sereno server running at http://localhost:${PORT}`);
});
