import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === "" || newCPassword === "" || newCPassword !== newPassword) {
      toast.error("Passwords do not match or fields are empty");
      return;
    }

    setLoading(true);

    try {
      // Verify the token
      let reg = await fetch(`/api/user/getuserbytoken/${token}`);
      reg = await reg.json();

      if (!reg) {
        toast.error("Invalid token");
        return;
      }

      const reg_no = reg.reg_no;

      // Change the password
      let res = await fetch("/api/auth/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_no, newPassword }),
      });

      res = await res.json();

      if (res?.message === "successfully updated password") {
        setDone(true);
        toast.success("Password successfully updated!");
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred while updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {done ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-500 mb-4">Password Changed</h1>
            <p className="text-gray-600">You can now log in with your new password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Reset Password
            </h1>
            <p className="text-sm text-center text-gray-500">
              Enter your new password to reset your account.
            </p>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="newCPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="newCPassword"
                placeholder="Re-enter new password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newCPassword}
                onChange={(e) => setNewCPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
