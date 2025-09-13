import React, { useState } from "react";

const initialPlans = [
  { id: 1, name: "Basic Plan", description: "50 GB data", quota: "50 GB", price: "$10", validity: "Monthly", status: "Active" },
  { id: 2, name: "Premium Plan", description: "200 GB data", quota: "200 GB", price: "$30", validity: "Monthly", status: "Inactive" },
];

function Plans() {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quota: "",
    price: "",
    validity: "",
  });

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || plan.status === statusFilter)
  );

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setFormData({
      name: plan.name,
      description: plan.description,
      quota: plan.quota,
      price: plan.price,
      validity: plan.validity,
    });
  };

  const handleSave = () => {
    setPlans(plans.map(plan =>
      plan.id === editingPlan ? { ...plan, ...formData } : plan
    ));
    setEditingPlan(null);
    setFormData({ name: "", description: "", quota: "", price: "", validity: "" });
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setFormData({ name: "", description: "", quota: "", price: "", validity: "" });
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="plans-container p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Plans</h1>

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
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Plans Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Quota</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Validity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.map(plan => (
            <tr key={plan.id} className="text-center">
              <td className="border p-2">{plan.name}</td>
              <td className="border p-2">{plan.quota}</td>
              <td className="border p-2">{plan.price}</td>
              <td className="border p-2">{plan.validity}</td>
              <td className="border p-2">{plan.status}</td>
              <td className="border p-2 space-x-2">
                <button className="btn-edit" onClick={() => handleEdit(plan)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(plan.id)}>Delete</button>
                <button className="btn-view">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Plan Form */}
      {editingPlan !== null && (
        <div className="form-container bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-4">Edit Plan</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Quota"
              value={formData.quota}
              onChange={e => setFormData({ ...formData, quota: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Validity"
              value={formData.validity}
              onChange={e => setFormData({ ...formData, validity: e.target.value })}
              className="p-2 border rounded"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="p-2 border rounded w-full mb-4"
          />
          <div className="flex gap-4">
            <button className="btn-primary" onClick={handleSave}>Save</button>
            <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Plans;
