import express from "express";
import {
  getNotifications,
  deleteNotifications,
  deleteOneNotification
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteOneNotification);

export default router;
