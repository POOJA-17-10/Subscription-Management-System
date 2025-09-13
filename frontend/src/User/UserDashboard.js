import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPlans from "./components/SearchPlans";
import MySubscriptions from "./components/MySubscriptions";
import About from "./components/About";

function UserDashboard() {
  return (
    <div className="user-dashboard bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Welcome, User!</h1>
        <SearchPlans />
        <MySubscriptions />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default UserDashboard;
