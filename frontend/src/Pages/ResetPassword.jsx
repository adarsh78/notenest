import React, { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { handleError, handleSuccess } from "../toastMessage";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { token } = useParams();

  const { darkTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      return handleError("Please enter a password");
    }
    if (newPassword.length < 8) {
      return handleError("Password should be minimum 8 characters");
    }
    if (newPassword !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    try {
      // const url = `http://localhost:3010/password-recovery/reset-password/${token}`;
      const url = `https://notenest-api.vercel.app/password-recovery/reset-password/${token}`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      handleSuccess(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(`Error occurred while resetting password: ${error}`);
      handleError(error.message);
    }
  };

  return (
    <>
      <div
        className={`${
          darkTheme ? "bg-zinc-800 text-zinc-300" : "bg-zinc-300 text-zinc-800"
        } w-[20rem] mx-auto rounded-md mt-[5rem] p-4 shadow-[0_35px_60px_-15px_rgba(20,40,40,0.8)]`}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="password">Enter new password</label>
            <input
              className={`${
                darkTheme
                  ? "bg-zinc-700 border-zinc-400"
                  : "bg-zinc-100 border-zinc-700"
              } rounded-md border-[0.5px]  px-3 pt-1 pb-2 focus:outline-none`}
              type="password"
              name="password"
              id="password"
              placeholder="enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className={`${
                darkTheme
                  ? "bg-zinc-700 border-zinc-400"
                  : "bg-zinc-100 border-zinc-700"
              } rounded-md border-[0.5px]  px-3 pt-1 pb-2 focus:outline-none`}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${
              darkTheme
                ? "bg-zinc-300 hover:bg-white text-zinc-900"
                : "bg-zinc-700 hover:bg-zinc-800 text-zinc-200"
            } w-[100%] my-6 rounded-md p-2 font-medium`}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
