import express from "express";
import {
  getPieChart,
  getPriceRangeData,
  getProductStatistics,
  getProductTransactions,
} from "../controllers/products.js";

const router = express.Router();

router.get("/transactions", getProductTransactions);
router.get("/statistics", getProductStatistics);
router.get("/barchart", getPriceRangeData);
router.get("/piechart", getPieChart);

export default router;
