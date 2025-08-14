import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function UserFeed() {
  const { token } = useAuth();
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track which requests have been accepted
  const [acceptedRequests, setAcceptedRequests] = useState({});

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/user/feed", {
          headers: { token },
        });
        console.log("fetched data from backend", response.data);
        setFeedData(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Failed to load feed data");
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    if (token) fetchFeed();
  }, [token]);

  const toggleAccept = (index) => {
    setAcceptedRequests((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle between true and false
    }));
  };

  if (loading) {
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
          <button onClick={() => window.location.reload()} className="btn btn-primary">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Feed</h1>
          <p className="text-gray-600">Stay updated with the latest information</p>
        </div>

        {/* Feed Content */}
        <div className="space-y-6">
          {/* Blood Requests Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-red-600">
                <span className="text-2xl">🩸</span>
                Blood Requests
              </h2>
              <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Active blood donation requests from hospitals
                </li>

                {feedData && feedData.length > 0 ? (
                  feedData.map((request, index) => (
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
                        <div className="font-semibold">{request.hospitalName || "Unknown Hospital"}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">
                          {request.bloodGroup} - {request.hospitalUsername}
                        </div>
                        <div className="text-xs opacity-50">
                          📍 Lat: {request.location?.latitude}, Long: {request.location?.longitude}
                        </div>
                      </div>
                      <button
                        className={`btn ${acceptedRequests[index] ? "btn-error" : "btn-accent"}`}
                        onClick={() => toggleAccept(index)}
                      >
                        {acceptedRequests[index] ? "Reject" : "Accept"}
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

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <span className="text-3xl">🩸</span>
              </div>
              <div className="stat-title">Total Requests</div>
              <div className="stat-value text-primary">
                {Array.isArray(feedData) ? feedData.length : 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <span className="text-3xl">🏥</span>
              </div>
              <div className="stat-title">Hospitals</div>
              <div className="stat-value text-secondary">
                {Array.isArray(feedData) ? new Set(feedData.map((r) => r.hospitalUsername)).size : 0}
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
