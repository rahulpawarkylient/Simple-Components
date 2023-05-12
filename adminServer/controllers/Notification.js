import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotificationById = async (req, res) => {
    try {
      const { id } = req.params; // get the ID from the request parameters
  
      const notification = await Notification.findById(id); // find the notification by ID
  
      if (!notification) {
        // if notification with given ID doesn't exist, return a 404 response
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.json(notification); // return the notification as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    // Create a new Notification object using the request body
    const notification = new Notification({
      title,
      message,
    });

    // Save the new notification to the database
    const savedNotification = await notification.save();

    // Return the saved notification as the response to the client
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { title, message } = req.body;
    const notificationId = req.params.id;

    // Find the existing notification by ID and update its fields
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        title,
        message,
      },
      { new: true } // Return the updated document instead of the original
    );

    // If no notification was found with the given ID, return a 404 error
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Return the updated notification as the response to the client
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    res.json(deletedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
