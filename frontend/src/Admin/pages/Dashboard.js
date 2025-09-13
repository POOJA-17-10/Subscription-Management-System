// import React from 'react';

// function Dashboard() {
//   const plans = [
//     { date: "2025-09-01", name: "Fibernet", active: 100, cancelled: 5, revenue: 2000, description: "High speed fiber plan" },
//     { date: "2025-09-02", name: "Broadband Copper", active: 80, cancelled: 7, revenue: 1500, description: "Reliable copper broadband" },
//     { date: "2025-09-03", name: "Premium Fiber", active: 60, cancelled: 3, revenue: 1200, description: "Premium fiber plan" },
//   ];
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
//           <p className="text-xl">{plans.length}</p>
//         </div>
//         <div className="widget bg-red-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Cancelled Subscriptions</h3>
//           <p className="text-xl">{plans.reduce((sum, p) => sum + p.cancelled, 0)}</p>
//         </div>
//         <div className="widget bg-yellow-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Revenue</h3>
//           <p className="text-xl">${plans.reduce((sum, p) => sum + p.revenue, 0)}</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="quick-actions space-x-4">
//         <button className="btn-primary">Add New Plan</button>
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
//         <div className="widget bg-yellow-100 p-4 rounded shadow">
//           <h3 className="font-semibold">Revenue</h3>
//           <p className="text-xl">${plans.reduce((sum, p) => sum + p.revenue, 0)}</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="quick-actions space-x-4 mb-6">
//         <button 
//           className="btn-primary" 
//           onClick={handleViewReports}
//         >
//           View Reports
//         </button>
//       </div>

//       {/* Add New Plan Form */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="font-bold mb-2">Create New Plan</h3>
//         <form onSubmit={handleAddNewPlan} className="space-y-3">
//           <div>
//             <label className="block mb-1">Plan Name</label>
//             <input type="text" className="border p-2 rounded w-full" placeholder="Enter plan name" required value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} />
//           </div>
//           <div>
//             <label className="block mb-1">Price</label>
//             <input type="number" className="border p-2 rounded w-full" placeholder="Enter price" required value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} />
//           </div>
//           <div>
//             <label className="block mb-1">Description</label>
//             <textarea className="border p-2 rounded w-full" placeholder="Enter description" value={newPlan.description} onChange={e => setNewPlan({ ...newPlan, description: e.target.value })} />
//           </div>
//           <button type="submit" className="btn-primary mt-2">Create Plan</button>
//         </form>
//       </div>

//       {/* Reports Table */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="font-bold mb-2">Reports Overview</h3>
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Plan</th>
//               <th className="border p-2">Active Users</th>
//               <th className="border p-2">Cancelled Users</th>
//               <th className="border p-2">Revenue</th>
//               <th className="border p-2">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plans.map((plan, idx) => (
//               <tr key={idx} className="text-center">
//                 <td className="border p-2">{plan.date}</td>
//                 <td className="border p-2">{plan.name}</td>
//                 <td className="border p-2">{plan.active}</td>
//                 <td className="border p-2">{plan.cancelled}</td>
//                 <td className="border p-2">${plan.revenue}</td>
//                 <td className="border p-2">{plan.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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
import React, { useState } from "react";

function Dashboard() {
  const [plans, setPlans] = useState([
    { date: "2025-09-01", name: "Fibernet", active: 100, cancelled: 5, revenue: 2000, description: "High speed fiber plan" },
    { date: "2025-09-02", name: "Broadband Copper", active: 80, cancelled: 7, revenue: 1500, description: "Reliable copper broadband" },
    { date: "2025-09-03", name: "Premium Fiber", active: 60, cancelled: 3, revenue: 1200, description: "Premium fiber plan" },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    "User John subscribed to Premium Fiber.",
    "Discount of 20% applied to Broadband Copper.",
    "Plan Fibernet renewed by 50 users.",
  ]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleAddNewPlan = (e) => {
    e.preventDefault();

    const plan = {
      date: new Date().toISOString().split("T")[0],
      name: newPlan.name,
      active: 0,
      cancelled: 0,
      revenue: parseFloat(newPlan.price),
      description: newPlan.description,
    };

    setPlans([plan, ...plans]);
    setRecentActivities([`New plan "${newPlan.name}" created.`, ...recentActivities]);
    setNewPlan({ name: "", price: "", description: "" });
  };

  const handleViewReports = () => {
    alert("Viewing reports! Scroll down to see the reports table.");
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
          <p className="text-xl">{plans.length}</p>
        </div>
        <div className="widget bg-red-100 p-4 rounded shadow">
          <h3 className="font-semibold">Cancelled Subscriptions</h3>
          <p className="text-xl">{plans.reduce((sum, p) => sum + p.cancelled, 0)}</p>
        </div>
        <div className="widget bg-yellow-100 p-4 rounded shadow">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-xl">${plans.reduce((sum, p) => sum + p.revenue, 0)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions space-x-4 mb-6">
        <button className="btn-primary" onClick={handleViewReports}>
          View Reports
        </button>
      </div>

      {/* Add New Plan Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-bold mb-2">Create New Plan</h3>
        <form onSubmit={handleAddNewPlan} className="space-y-3">
          <div>
            <label className="block mb-1">Plan Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Enter plan name"
              required
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Enter price"
              required
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Enter description"
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary mt-2">Create Plan</button>
        </form>
      </div>

      {/* Reports Table */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-bold mb-2">Reports Overview</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Active Users</th>
              <th className="border p-2">Cancelled Users</th>
              <th className="border p-2">Revenue</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{plan.date}</td>
                <td className="border p-2">{plan.name}</td>
                <td className="border p-2">{plan.active}</td>
                <td className="border p-2">{plan.cancelled}</td>
                <td className="border p-2">${plan.revenue}</td>
                <td className="border p-2">{plan.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
