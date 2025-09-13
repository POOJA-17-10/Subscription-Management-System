// import React from 'react';

// function Discounts() {
//   return (
//     <div>
//       <h1>Manage Discounts</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Offer Name</th>
//             <th>Discount %</th>
//             <th>Valid Till</th>
//             <th>Applied Plans</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Summer Sale</td>
//             <td>20%</td>
//             <td>2025-09-30</td>
//             <td>All Plans</td>
//             <td>
//               <button>Edit</button>
//               <button>Delete</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Discounts;
import React, { useState } from "react";

const initialDiscounts = [
  {
    id: 1,
    name: "Summer Sale",
    percentage: "20%",
    validTill: "2025-09-30",
    appliedPlans: "All Plans",
    conditions: "Seasonal offer",
  },
  {
    id: 2,
    name: "New Year Offer",
    percentage: "15%",
    validTill: "2025-12-31",
    appliedPlans: "Fibernet, Premium Fiber",
    conditions: "Limited time offer",
  },
];

function Discounts() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    validTill: "",
    appliedPlans: "",
    conditions: "",
  });

  const handleEdit = (discount) => {
    setEditingDiscount(discount.id);
    setFormData({
      name: discount.name,
      percentage: discount.percentage,
      validTill: discount.validTill,
      appliedPlans: discount.appliedPlans,
      conditions: discount.conditions,
    });
  };

  const handleSave = () => {
    setDiscounts(discounts.map(d =>
      d.id === editingDiscount ? { ...d, ...formData } : d
    ));
    setEditingDiscount(null);
    setFormData({ name: "", percentage: "", validTill: "", appliedPlans: "", conditions: "" });
  };

  const handleCancel = () => {
    setEditingDiscount(null);
    setFormData({ name: "", percentage: "", validTill: "", appliedPlans: "", conditions: "" });
  };

  const handleDelete = (id) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  return (
    <div className="discounts-container p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Discounts</h1>

      {/* Discounts Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Offer Name</th>
            <th className="border p-2">Discount %</th>
            <th className="border p-2">Valid Till</th>
            <th className="border p-2">Applied Plans</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map(discount => (
            <tr key={discount.id} className="text-center">
              <td className="border p-2">{discount.name}</td>
              <td className="border p-2">{discount.percentage}</td>
              <td className="border p-2">{discount.validTill}</td>
              <td className="border p-2">{discount.appliedPlans}</td>
              <td className="border p-2 space-x-2">
                <button className="btn-edit" onClick={() => handleEdit(discount)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(discount.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Discount Form */}
      {editingDiscount !== null && (
        <div className="form-container bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-4">Edit Discount</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Offer Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Discount %"
              value={formData.percentage}
              onChange={e => setFormData({ ...formData, percentage: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Valid Till"
              value={formData.validTill}
              onChange={e => setFormData({ ...formData, validTill: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Applied Plans"
              value={formData.appliedPlans}
              onChange={e => setFormData({ ...formData, appliedPlans: e.target.value })}
              className="p-2 border rounded"
            />
          </div>
          <textarea
            placeholder="Conditions"
            value={formData.conditions}
            onChange={e => setFormData({ ...formData, conditions: e.target.value })}
            className="p-2 border rounded w-full mb-4"
          />
          <div className="flex gap-4">
            <button className="btn-primary" onClick={handleSave}>Save</button>
            <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* Notifications Setup Placeholder */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Notifications Setup</h3>
        <p>Here you can configure notifications related to discounts (coming soon).</p>
      </div>
    </div>
  );
}

export default Discounts;
