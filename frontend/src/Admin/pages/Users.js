// import React from 'react';

// function Users() {
//   return (
//     <div>
//       <h1>User Management</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Plan</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>John Doe</td>
//             <td>john@example.com</td>
//             <td>Premium</td>
//             <td>Active</td>
//             <td>
//               <button>View</button>
//               <button>Block</button>
//               <button>Delete</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Users;
import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    status: "Active",
    contact: "123-456-7890",
    subscriptionHistory: ["Subscribed to Premium - 2024-01-15", "Renewed - 2024-06-10"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Basic",
    status: "Blocked",
    contact: "987-654-3210",
    subscriptionHistory: ["Subscribed to Basic - 2023-11-20"],
  },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || user.status === statusFilter)
  );

  const handleBlock = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" } : user
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null);
    }
  };

  return (
    <div className="users-container p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.plan}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2 space-x-2">
                <button className="btn-view" onClick={() => setSelectedUser(user)}>View Details</button>
                <button className="btn-block" onClick={() => handleBlock(user.id)}>
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
                <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Details Panel */}
      {selectedUser && (
        <div className="user-details bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">User Details</h3>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Contact:</strong> {selectedUser.contact}</p>
          <p><strong>Plan:</strong> {selectedUser.plan}</p>
          <p><strong>Status:</strong> {selectedUser.status}</p>
          <h4 className="font-semibold mt-4">Subscription History:</h4>
          <ul className="list-disc list-inside">
            {selectedUser.subscriptionHistory.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
