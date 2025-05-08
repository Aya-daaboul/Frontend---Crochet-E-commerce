import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    EmailAddress: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE = "https://backend-crochet-e-commerce-production.up.railway.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setUser({ name: data.Name, email: data.EmailAddress });
        setFormData({
          Name: data.Name,
          EmailAddress: data.EmailAddress,
          Password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading profile. Please log in again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    if (
      formData.Password.trim() &&
      formData.Password !== formData.ConfirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      Name: formData.Name,
      EmailAddress: formData.EmailAddress,
    };
    if (formData.Password.trim()) {
      payload.Password = formData.Password;
    }

    const res = await fetch(`${BASE}/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Profile updated.");
      setEditing(false);

      const updatedUser = {
        ...user,
        name: formData.Name,
        email: formData.EmailAddress,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setFormData((prev) => ({ ...prev, Password: "" }));
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-[#FF4D8B] mb-10">
        My Profile
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-[#FF4D8B] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto border-2 border-pink-300 p-6 rounded-xl shadow-sm space-y-6">
          {!editing ? (
            <>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-lg font-medium text-pink-600">
                  {user?.name}
                </p>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-pink-600">
                  {user?.email}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-[#FF4D8B] hover:bg-[#e64479] text-white font-semibold px-6 py-2 rounded-full transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-600">
                Name
                <input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full border border-pink-300 rounded-md mt-1 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </label>

              <label className="block text-sm font-medium text-gray-600">
                Email
                <input
                  name="EmailAddress"
                  value={formData.EmailAddress}
                  onChange={handleChange}
                  className="w-full border border-pink-300 rounded-md mt-1 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </label>

              <label className="block text-sm font-medium text-gray-600">
                New Password{" "}
                <span className="text-gray-400 text-xs">(optional)</span>
                <input
                  name="Password"
                  type="password"
                  value={formData.Password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  className="w-full border border-pink-300 rounded-md mt-1 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </label>

              {formData.Password.trim() && (
                <label className="block text-sm font-medium text-gray-600">
                  Confirm New Password
                  <input
                    name="ConfirmPassword"
                    type="password"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={`w-full border rounded-md mt-1 p-2 mb-4 focus:outline-none focus:ring-2 ${
                      formData.Password !== formData.ConfirmPassword
                        ? "border-red-400 focus:ring-red-200"
                        : "border-pink-300 focus:ring-pink-200"
                    }`}
                  />
                  {formData.Password !== formData.ConfirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      Passwords do not match.
                    </p>
                  )}
                </label>
              )}

              <div className="flex justify-end gap-4">
                <button
                  onClick={saveChanges}
                  className="bg-[#FF4D8B] hover:bg-[#e64479] text-white font-semibold px-6 py-2 rounded-full transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
