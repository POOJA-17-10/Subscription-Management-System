import React, { useState } from "react";
import { monthlySubscriptions, planWiseUsage, reportsData } from "../data/analyticsData";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import DatePicker from "react-datepicker";
import '../../App.css';

export default function Analytics() {
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredReports = reportsData.filter(r =>
    (selectedPlan === "All" || r.plan === selectedPlan) &&
    (!startDate || new Date(r.date) >= startDate) &&
    (!endDate || new Date(r.date) <= endDate)
  );

  const COLORS = ["#82ca9d", "#ff6961"];

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)} className="p-2 border rounded">
          <option value="All">All Plans</option>
          <option value="Fibernet">Fibernet</option>
          <option value="Broadband Copper">Broadband Copper</option>
          <option value="Premium Fiber">Premium Fiber</option>
        </select>
        <DatePicker placeholderText="Start Date" selected={startDate} onChange={date => setStartDate(date)} className="p-2 border rounded" />
        <DatePicker placeholderText="End Date" selected={endDate} onChange={date => setEndDate(date)} className="p-2 border rounded" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Active vs Cancelled</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={[
                { name: "Active", value: filteredReports.reduce((sum, r) => sum + r.active, 0) },
                { name: "Cancelled", value: filteredReports.reduce((sum, r) => sum + r.cancelled, 0) },
              ]}
              dataKey="value"
              outerRadius={80}
            >
              {COLORS.map((color, index) => <Cell key={index} fill={color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Monthly Subscriptions</h3>
          <LineChart width={400} height={250} data={monthlySubscriptions}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="active" stroke="#82ca9d" />
            <Line type="monotone" dataKey="cancelled" stroke="#ff6961" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h3 className="font-bold mb-2">Plan-wise Usage</h3>
          <BarChart width={600} height={250} data={planWiseUsage}>
            <XAxis dataKey="plan" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Reports</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Active Users</th>
              <th className="border p-2">Cancelled Users</th>
              <th className="border p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((row, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{row.date}</td>
                <td className="border p-2">{row.plan}</td>
                <td className="border p-2">{row.active}</td>
                <td className="border p-2">{row.cancelled}</td>
                <td className="border p-2">${row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
