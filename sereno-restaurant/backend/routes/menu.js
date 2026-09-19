const express = require("express");
const router = express.Router();
const { readData } = require("../db");

// GET /api/menu - full menu, optionally filtered by ?category=Pasta
router.get("/", (req, res) => {
  const menu = readData("menu");
  const { category } = req.query;
  if (category) {
    return res.json(menu.filter(item => item.category.toLowerCase() === category.toLowerCase()));
  }
  res.json(menu);
});

// GET /api/menu/categories - distinct category list, in menu order
router.get("/categories", (req, res) => {
  const menu = readData("menu");
  const categories = [...new Set(menu.map(item => item.category))];
  res.json(categories);
});

module.exports = router;
