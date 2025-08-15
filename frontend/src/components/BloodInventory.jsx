import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../config/config";

export function BloodInventory() {
  const { hospitalToken, userToken } = useAuth();
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bloodTypes, setBloodTypes] = useState([]);
  const [expandedType, setExpandedType] = useState(null);
  const [useAmount, setUseAmount] = useState("");

  useEffect(() => {
    const bloodlevels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          API_ENDPOINTS.HOSPITAL_BLOOD_LEVELS,
          { headers: { token: hospitalToken } }
        );
        console.log("fetched data from backend", response.data);
        setFeedData(response.data);
        setError("");

        // Initialize bloodTypes when data is fetched
        setBloodTypes([
          { type: "A+", level: response.data.Aplus, color: "text-red-600", bgColor: "bg-red-100" },
          { type: "A-", level: response.data.Aminus, color: "text-red-600", bgColor: "bg-red-50" },
          { type: "B+", level: response.data.Bplus, color: "text-blue-600", bgColor: "bg-blue-100" },
          { type: "B-", level: response.data.Bminus, color: "text-blue-600", bgColor: "bg-blue-50" },
          { type: "AB+", level: response.data.ABplus, color: "text-purple-600", bgColor: "bg-purple-100" },
          { type: "AB-", level: response.data.ABminus, color: "text-purple-600", bgColor: "bg-purple-50" },
          { type: "O+", level: response.data.Oplus, color: "text-green-600", bgColor: "bg-green-100" },
          { type: "O-", level: response.data.Ominus, color: "text-green-600", bgColor: "bg-green-50" }
        ]);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Failed to load feed data");
      } finally {
        setLoading(false);
      }
    };

    if (hospitalToken) bloodlevels();
  }, [hospitalToken]);

  const handleUseBlood = async (bloodType, amount) => {
  if (!amount || amount <= 0) return;

  // Map bloodTypes to ensure consistent order
  const typeOrder = ["A+", "A-", "B+", "O+", "O-", "B-", "AB+", "AB-"];

  // Prepare updateArray with all zeros except the selected blood type
  const updateArray = typeOrder.map(type =>
    type === bloodType ? parseFloat(amount) : 0
  );

  try {
    await axios.post(
      API_ENDPOINTS.HOSPITAL_BLOOD_UPDATE,
      { updateArray },
      { headers: { token: hospitalToken } }
    );
    const updatedBloodTypes = bloodTypes.map(blood => {
      if (blood.type === bloodType) {
        const newLevel = Math.max(0, blood.level - amount);
        return { ...blood, level: newLevel };
      }
      return blood;
    });

    setBloodTypes(updatedBloodTypes);
    setUseAmount("");
    setExpandedType(null);
  } catch (err) {
    console.error("Error updating blood:", err);
    setError("Failed to update blood data");
  }
};


  const toggleExpand = (type) => {
    if (expandedType === type) {
      setExpandedType(null);
      setUseAmount("");
    } else {
      setExpandedType(type);
      setUseAmount("");
    }
  };

  const handleRequestBlood = async (bloodType) => {
  try {
    await axios.post(
      API_ENDPOINTS.HOSPITAL_REQUEST_BLOOD,
      {
        bloodGroup: bloodType,
        // if hospital location is known in frontend
        latitude: feedData.latitude,  
        longitude: feedData.longitude
      },
      { headers: { token: hospitalToken } }
    );

    console.log(`Request for ${bloodType} sent successfully`);
    alert(`Blood request for ${bloodType} submitted successfully`);
  } catch (err) {
    console.error("Error sending blood request:", err);
    setError("Failed to send blood request");
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!feedData) return null; // Safety check

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Blood Inventory</h1>
          <p className="text-gray-600">Current blood stock levels across all blood types</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((blood) => (
            <div key={blood.type} className={`${blood.bgColor} p-6 rounded-2xl shadow-lg border border-gray-200`}>
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${blood.color} mb-4`}>{blood.type}</h3>
                <div className="flex justify-center mb-4">
                  <div
                    className="radial-progress"
                    style={{ "--value": blood.level }}
                    aria-valuenow={blood.level}
                    role="progressbar"
                  >
                    {blood.level}%
                  </div>
                </div>
                <div className="mb-4">
                  {blood.level >= 80 && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Excellent
                    </span>
                  )}
                  {blood.level >= 50 && blood.level < 80 && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      Good
                    </span>
                  )}
                  {blood.level >= 20 && blood.level < 50 && (
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                      Low
                    </span>
                  )}
                  {blood.level < 20 && (
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      Critical
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Available: {Math.floor(blood.level * 2.5)} units</p>
                  <p>Last Updated: Today</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => toggleExpand(blood.type)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {expandedType === blood.type ? "Cancel" : "Use"}
                  </button>
                  <button
                    onClick={() => handleRequestBlood(blood.type)}
                    className="w-full my-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Request
                  </button>

                  {expandedType === blood.type && (
                    <div className="mt-3 space-y-3">
                      <textarea
                        value={useAmount}
                        onChange={(e) => setUseAmount(e.target.value)}
                        placeholder="Enter amount to use..."
                        className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUseBlood(blood.type, parseFloat(useAmount))}
                          disabled={!useAmount || parseFloat(useAmount) <= 0 || parseFloat(useAmount) > blood.level}
                          className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Confirm Use
                        </button>
                        <button
                          onClick={() => toggleExpand(blood.type)}
                          className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {bloodTypes.filter(b => b.level >= 80).length}
              </div>
              <div className="text-gray-600">Excellent Levels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {bloodTypes.filter(b => b.level >= 50 && b.level < 80).length}
              </div>
              <div className="text-gray-600">Good Levels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {bloodTypes.filter(b => b.level < 50).length}
              </div>
              <div className="text-gray-600">Low/Critical</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
