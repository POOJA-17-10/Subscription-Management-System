// import React from 'react';

// function Dashboard() {
//   const recentActivities = [
//     "User John subscribed to Premium Fiber.",
//     "Discount of 20% applied to Broadband Copper.",
//     "Plan Fibernet renewed by 50 users.",
//   ];

//   return (
//     <div className="dashboard p-6 space-y-6">
//       {/* Welcome Message */}
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard!</h1>
//         <p>Manage your plans, view analytics, and track subscriptions easily.</p>
//       </div>

//       {/* Overview Widgets */}
//       <div className="widgets grid grid-cols-4 gap-4">
//         <div className="widget bg-green-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Total Users</h3>
//           <p className="text-xl">1200</p>
//         </div>
//         <div className="widget bg-blue-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Active Plans</h3>
//           <p className="text-xl">10</p>
//         </div>
//         <div className="widget bg-red-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Cancelled Subscriptions</h3>
//           <p className="text-xl">30</p>
//         </div>
//         <div className="widget bg-yellow-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Revenue</h3>
//           <p className="text-xl">$45,000</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="quick-actions space-x-4">
//         <button className="btn-primary">Add New Plan</button>
//         <button className="btn-secondary">View Reports</button>
//       </div>

//       {/* Recent Activity Feed */}
//       <div className="recent-activity bg-white p-4 rounded shadow">
//         <h3 className="font-bold mb-2">Recent Activity</h3>
//         <ul className="list-disc list-inside">
//           {recentActivities.map((activity, index) => (
//             <li key={index}>{activity}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React from 'react';

function Dashboard() {
  const recentActivities = [
    "User John subscribed to Premium Fiber.",
    "Discount of 20% applied to Broadband Copper.",
    "Plan Fibernet renewed by 50 users.",
  ];

  // Handler for adding a new plan
  const handleAddNewPlan = () => {
    alert("Add New Plan clicked! Redirecting to plan creation page...");
    // You can replace this alert with navigation, e.g.,
    // navigate("/plans/new") if using react-router
  };

  // Handler for viewing reports
  const handleViewReports = () => {
    alert("View Reports clicked! Redirecting to analytics page...");
    // You can replace this alert with navigation, e.g.,
    // navigate("/analytics") if using react-router
  };

  return (
    <div className="dashboard p-6 space-y-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard!</h1>
        <p>Manage your plans, view analytics, and track subscriptions easily.</p>
      </div>

      {/* Overview Widgets */}
      <div className="widgets grid grid-cols-4 gap-4">
        <div className="widget bg-green-100 p-4 rounded shadow">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-xl">1200</p>
        </div>
        <div className="widget bg-blue-100 p-4 rounded shadow">
          <h3 className="font-semibold">Active Plans</h3>
          <p className="text-xl">10</p>
        </div>
        <div className="widget bg-red-100 p-4 rounded shadow">
          <h3 className="font-semibold">Cancelled Subscriptions</h3>
          <p className="text-xl">30</p>
        </div>
        <div className="widget bg-yellow-100 p-4 rounded shadow">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-xl">$45,000</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions space-x-4">
        <button 
          className="btn-primary" 
          onClick={handleAddNewPlan}
        >
          Add New Plan
        </button>
        <button 
          className="btn-secondary" 
          onClick={handleViewReports}
        >
          View Reports
        </button>
      </div>

      {/* Recent Activity Feed */}
      <div className="recent-activity bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside">
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
