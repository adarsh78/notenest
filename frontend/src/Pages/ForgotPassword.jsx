import React, { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { handleError, handleSuccess } from "../toastMessage.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { darkTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return handleError("email is required");
    }
    try {
      // const url = "http://localhost:3010/password-recovery/forgot-password";
      const url = "https://notenest-api.vercel.app/password-recovery/forgot-password";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      handleSuccess(data.message);
      console.log(data);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      handleError(error.message);
    }
    setEmail("")
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
            <label htmlFor="email">Enter your email</label>
            <input
              className={`${
                darkTheme
                  ? "bg-zinc-700 border-zinc-400"
                  : "bg-zinc-100 border-zinc-700"
              } rounded-md border-[0.5px]  px-3 pt-1 pb-2 focus:outline-none`}
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
