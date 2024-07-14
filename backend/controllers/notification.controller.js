import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "from", select: "username profileImg" });

    await Notification.updateMany({ to: userId }, { $set: { read: true } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getNotifications controller", error.message);
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in deleteNotifications controller", error.message);
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findById(id);
    
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this notification" });
    }
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in deleteOneNotification controller", error.message);
  }
};
