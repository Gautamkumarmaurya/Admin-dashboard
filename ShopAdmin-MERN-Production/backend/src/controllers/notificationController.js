import Notification from "../models/Notification.js";
import { success } from "../utils/response.js";

// Get user notifications
export const list = async (req, res) =>
  success(
    res,
    "Notifications fetched",
    await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 })
  );

// Mark notification as read
export const read = async (req, res) =>
  success(
    res,
    "Notification marked read",
    await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    )
  );

// Mark all notifications as read
export const readAll = async (req, res) => {
  await Notification.updateMany(
    {
      user: req.user._id,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return success(
    res,
    "All notifications marked read"
  );
};

// Delete notification
export const remove = async (req, res) =>
  success(
    res,
    "Notification deleted",
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
  );

// Get unread notification count
export const unread = async (req, res) =>
  success(
    res,
    "Unread count",
    {
      count: await Notification.countDocuments({
        user: req.user._id,
        isRead: false,
      }),
    }
  );