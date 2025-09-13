//MySubscriptions.jsx

import React from "react";

function MySubscriptions({ subscription, onCancel, onRenew, onUpgrade, onDowngrade }) {
  if (!subscription) {
    return <h3 className="text-center mt-5">No active subscriptions yet.</h3>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">My Subscription</h2>
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">{subscription.Name}</h5>
          <h6 className="text-primary">₹{subscription.Price}</h6>
          <p>
            Auto Renewal: {subscription["Auto Renewal Allowed"]} <br />
            Status: {subscription.Status}
          </p>

          <button className="btn btn-warning mx-2" onClick={onUpgrade}>
            Upgrade
          </button>
          <button className="btn btn-secondary mx-2" onClick={onDowngrade}>
            Downgrade
          </button>
          <button className="btn btn-danger mx-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-info mx-2" onClick={onRenew}>
            Renew
          </button>
        </div>
      </div>
    </div>
  );
}

export default MySubscriptions;