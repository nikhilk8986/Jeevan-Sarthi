import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // so we can get token

export function UserDashboard() {
  const { userToken } = useAuth();
  const [localFeedData, setLocalFeedData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch appointments on load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/myAppointments", {
          headers: { token: userToken },
        });
        setLocalFeedData(res.data.feed || []);
        setError("");
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load your appointments");
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchAppointments();
    }
  }, [userToken]);

  // Remove item by index
  const handleReject = async (index) => {
  const request = localFeedData[index];

  try {
    await axios.post(
      "http://localhost:3000/user/cancelAppointment",
      {
        hospitalName: request.hospitalName,
        bloodGroup: request.bloodGroup,
        location: request.location,
      },
      { headers: { token: userToken } }
    );

    setLocalFeedData((prev) => prev.filter((_, i) => i !== index));

    alert(`Appointment removed successfully for ${request.hospitalName} - ${request.bloodGroup}`);
  } catch (err) {
    console.error("Error cancelling appointment:", err);
    alert("Failed to remove appointment. Please try again later.");
  }
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
          <div className="flex justify-center items-center mb-4">
            <img src="/src/assets/blood.svg" alt="Blood Donation" className="w-16 h-16 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Your Dashboard</h1>
          </div>
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
                          src="/src/assets/blood.svg"
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
