// import React from 'react';

// function Notifications() {
//   return (
//     <div>
//       <h1>Notifications</h1>
//       <form>
//         <div>
//           <label>Title:</label>
//           <input type="text" />
//         </div>
//         <div>
//           <label>Message:</label>
//           <textarea />
//         </div>
//         <div>
//           <label>Schedule Date:</label>
//           <input type="date" />
//         </div>
//         <button type="submit">Send Notification</button>
//       </form>
//     </div>
//   );
// }

// export default Notifications;
import React, { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    title: "Server Maintenance",
    message: "Scheduled maintenance on 2025-09-15 from 2 AM to 4 AM.",
    targetGroup: "All Users",
    scheduleDate: "2025-09-14",
  },
  {
    id: 2,
    title: "New Plan Launch",
    message: "Check out our new Premium Fiber plan available now!",
    targetGroup: "Subscribers",
    scheduleDate: "2025-08-25",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetGroup: "",
    scheduleDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotification = {
      id: notifications.length + 1,
      ...formData,
    };
    setNotifications([newNotification, ...notifications]);
    setFormData({
      title: "",
      message: "",
      targetGroup: "",
      scheduleDate: "",
    });
  };

  return (
    <div className="notifications-container p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {/* Form to send new notification */}
      <div className="form-container bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-4">Send New Notification</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Message:</label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="p-2 border rounded w-full"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Target Group:</label>
            <input
              type="text"
              value={formData.targetGroup}
              onChange={e => setFormData({ ...formData, targetGroup: e.target.value })}
              className="p-2 border rounded w-full"
              placeholder="e.g., All Users, Subscribers"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Schedule Date:</label>
            <input
              type="date"
              value={formData.scheduleDate}
              onChange={e => setFormData({ ...formData, scheduleDate: e.target.value })}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Send Notification</button>
        </form>
      </div>

      {/* List of past notifications */}
      <div className="history-container bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-4">Past Notifications</h3>
        <ul className="space-y-3">
          {notifications.map(notification => (
            <li key={notification.id} className="border p-3 rounded">
              <h4 className="font-semibold">{notification.title}</h4>
              <p><strong>Message:</strong> {notification.message}</p>
              <p><strong>Target Group:</strong> {notification.targetGroup}</p>
              <p><strong>Scheduled Date:</strong> {notification.scheduleDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
