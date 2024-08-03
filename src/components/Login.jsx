import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import env from "../env.js";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const token = Cookies.get("AdminToken");
    if (token !== undefined) {
      navigate("/", { replace: true });
    } else {
      setCheckingToken(false);
    }
  }, [navigate]);

  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");

  const submitClicked = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userDetails = { rollno, password };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      if (userDetails.rollno === "" || userDetails.password === "") {
        setIncorrectCredentials(true);
        setErrorMessage("Please fill in both fields."); // Set error message
        setLoading(false);
        return;
      }
      // alert(JSON.stringify(env));
      const res = await axios.post(`${env.SERVER_URI}/authenticateAdmin`, userDetails, options);
      const data = res.data;
      console.log(res);

      if (res.status === 200) {
        submitSuccess(data.token);
      } else {
        setIncorrectCredentials(true);
        setErrorMessage("Wrong credentials. Please try again."); // Set error message
      }
    } catch (error) {
      console.log(error);
      setIncorrectCredentials(true);
      // alert(JSON.stringify(error));
      setErrorMessage(error.response.data.data); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const submitSuccess = (jwtToken) => {
    Cookies.set("AdminToken", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/", { replace: true });
  };

  if (checkingToken) {
    return null; // Render nothing while checking for the token
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="drop-shadow-md max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="/logo.svg"
              className="w-16 mx-auto"
            />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Roll No"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading || rollno === "" || password === "" ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={submitClicked}
                  disabled={loading || rollno === "" || password === ""}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                {incorrectCredentials && (
                  <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                )}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by CodeSense's <br/>
                    Terms of Service and its Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://merakiui.com/images/components/Email-campaign-bro.svg")'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Login;