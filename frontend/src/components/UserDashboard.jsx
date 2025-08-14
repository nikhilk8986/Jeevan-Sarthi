import { useState } from "react";

export function UserDashboard({ error, feedData }) {
  // Sample Data (matches DB structure exactly)
  const sampleFeedData = [
    {
      hospitalName: "City General Hospital",
      bloodGroup: "O+",
      location: { latitude: "19.076", longitude: "72.8777" },
    },
    {
      hospitalName: "Green Valley Medical Center",
      bloodGroup: "A-",
      location: { latitude: "28.7041", longitude: "77.1025" },
    },
    {
      hospitalName: "Sunrise Healthcare",
      bloodGroup: "B+",
      location: { latitude: "13.0827", longitude: "80.2707" },
    },
    {
      hospitalName: "Hope & Life Hospital",
      bloodGroup: "AB-",
      location: { latitude: "22.5726", longitude: "88.3639" },
    },
  ];

  // Keep feed in state so we can remove items dynamically
  const [localFeedData, setLocalFeedData] = useState(feedData || sampleFeedData);

  // Remove item by index
  const handleReject = (index) => {
    setLocalFeedData((prev) => prev.filter((_, i) => i !== index));
  };

  if (!localFeedData && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-md"></span>
          <p className="mt-4 text-gray-600">Loading your feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
          <p className="text-gray-600">
            You volunteered for the following requests! <br />
            Please be present at the hospital or take someone who is willing to
            contribute
          </p>
        </div>

        {/* Feed Content */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-red-600">
                <span className="text-2xl">🩸</span>
                Accepted Requests
              </h2>
              <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Active blood donation requests from hospitals
                </li>

                {localFeedData && localFeedData.length > 0 ? (
                  localFeedData.map((request, index) => (
                    <li key={index} className="list-row">
                      <div className="text-4xl font-thin opacity-30 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <img
                          className="size-10 rounded-box"
                          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                          alt="Hospital"
                        />
                      </div>
                      <div className="list-col-grow">
                        <div className="font-semibold">
                          {request.hospitalName || "Unknown Hospital"}
                        </div>
                        <div className="text-xs uppercase font-semibold opacity-60">
                          {request.bloodGroup}
                        </div>
                        <div className="text-xs opacity-50">
                          📍 Lat: {request.location?.latitude || "N/A"}, Long:{" "}
                          {request.location?.longitude || "N/A"}
                        </div>
                      </div>
                      <button
                        className="btn btn-accent"
                        onClick={() => handleReject(index)}
                      >
                        Reject
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-gray-500">
                    No blood requests available at the moment
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <span className="text-3xl">🩸</span>
              </div>
              <div className="stat-title">Total Accepted Requests</div>
              <div className="stat-value text-primary">
                {Array.isArray(localFeedData) ? localFeedData.length : 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <span className="text-3xl">🏥</span>
              </div>
              <div className="stat-title">Hospitals</div>
              <div className="stat-value text-secondary">
                {Array.isArray(localFeedData)
                  ? new Set(localFeedData.map((r) => r.hospitalName)).size
                  : 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <span className="text-3xl">📅</span>
              </div>
              <div className="stat-title">Last Updated</div>
              <div className="stat-value text-accent">Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
