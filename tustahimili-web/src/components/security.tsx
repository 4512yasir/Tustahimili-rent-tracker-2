import React, { useState } from "react";

const SecurityPage: React.FC = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Call your API to change password
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleTwoFA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    alert(`Two-Factor Authentication ${!twoFAEnabled ? "enabled" : "disabled"}`);
  };

  const logoutEverywhere = () => {
    alert("Logged out from all sessions!");
  };

  const deleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700">Security Settings</h1>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Change Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Two-Factor Authentication (2FA)</h2>
          <p className="text-gray-500">Adds extra security to your account</p>
        </div>
        <button
          onClick={toggleTwoFA}
          className={`px-4 py-2 rounded-lg font-semibold ${
            twoFAEnabled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          {twoFAEnabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Recent Login Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-2">
        <h2 className="text-xl font-semibold">Recent Login Activity</h2>
        <ul className="text-gray-600">
          <li>2025-12-09 09:34 - Nairobi, Kenya - Chrome</li>
          <li>2025-12-08 18:21 - Mombasa, Kenya - Firefox</li>
          <li>2025-12-07 21:10 - Kisumu, Kenya - Safari</li>
        </ul>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <button
          onClick={logoutEverywhere}
          className="w-full bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
        >
          Logout Everywhere
        </button>
        <button
          onClick={deleteAccount}
          className="w-full bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
