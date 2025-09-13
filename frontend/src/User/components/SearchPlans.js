//SearchPlans.jsx

// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function SearchPlans() {
//   const [plans, setPlans] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredPlans, setFilteredPlans] = useState([]);

//   // Load plans from local JSON API or static file
//   useEffect(() => {
//     // 👇 Replace this with API call if backend is ready
//     fetch("/plans.json") 
//       .then((res) => res.json())
//       .then((data) => {
//         setPlans(data);
//         setFilteredPlans(data);
//       });
//   }, []);

//   // Handle search input
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);

//     const filtered = plans.filter((plan) =>
//       plan.Name.toLowerCase().includes(value)
//     );
//     setFilteredPlans(filtered);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-3">Search Subscription Plans</h2>

//       {/* Search Bar */}
//       <input
//         type="text"
//         className="form-control mb-4"
//         placeholder="Search by plan name..."
//         value={search}
//         onChange={handleSearch}
//       />

//       {/* Display Plans */}
//       <div className="row">
//         {filteredPlans.map((plan) => (
//           <div className="col-md-4 mb-3" key={plan["Product Id"]}>
//             <div className="card shadow-sm">
//               <div className="card-body text-center">
//                 <h5 className="card-title">{plan.Name}</h5>
//                 <h6 className="text-primary">₹{plan.Price}</h6>
//                 <p>
//                   Auto Renewal: {plan["Auto Renewal Allowed"]} <br />
//                   Status: {plan.Status}
//                 </p>
//                 <button className="btn btn-success">Subscribe</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SearchPlans;



import React, { useState, useEffect } from "react";

function SearchPlans({ onSubscribe }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Load from static JSON in /public
    fetch("/plans.json")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Available Plans</h2>
      <div className="row">
        {plans.map((plan) => (
          <div className="col-md-4 mb-3" key={plan["Product Id"]}>
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{plan.Name}</h5>
                <h6 className="text-primary">₹{plan.Price}</h6>
                <p>
                  Auto Renewal: {plan["Auto Renewal Allowed"]} <br />
                  Status: {plan.Status}
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => onSubscribe(plan)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPlans;