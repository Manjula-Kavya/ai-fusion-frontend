import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Authentication(props) {
  const { isAuthenticated, setIsAuthenticated } = props;
  const [accessKeyValue, setAccessKeyValue] = useState("");

  const handleGoogleButtonClick = async () => {
    // Replace this URL with the URL to which you want to redirect
    const redirectUrl = "http://localhost:3000/";
    window.open(redirectUrl, "_blank");
  };

  const getValueFromChrome = (key) => {
    chrome.runtime.sendMessage({ action: "getValue", key }, (response) => {
      const value = response[key] || "";
      setAccessKeyValue(value);
      if (value) {
        setIsAuthenticated(true)
      }
    });
  };

  useEffect(() => {
    getValueFromChrome("search_ai_access_token");
  }, []);

  return (
    <div>
      <div className="authentication-root-container">
        <div className="inner-google-auth-container">
          <div className="authentication-search-ai-title">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="robot"
                width="40"
                height="40"
              >
                <g>
                  <g>
                    <ellipse
                      cx="24"
                      cy="45.5"
                      fill="#45413c"
                      opacity=".15"
                      rx="19.5"
                      ry="1.5"
                    ></ellipse>
                    <path
                      fill="#daedf7"
                      d="M42 40.5c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V27c0-9.9 8.1-18 18-18s18 8.1 18 18v13.5z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24 9C14.1 9 6 17.1 6 27v5c0-9.9 8.1-18 18-18s18 8.1 18 18v-5c0-9.9-8.1-18-18-18z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M42 40.5c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V27c0-9.9 8.1-18 18-18s18 8.1 18 18v13.5z"
                    ></path>
                    <path
                      fill="#c0dceb"
                      d="M30.5 44c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v8z"
                    ></path>
                    <path fill="#adc4d9" d="M17.5 38.5h13v2h-13z"></path>
                    <path
                      fill="#adc4d9"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M45.5 36.5l-3.5 2V26l3.5 2zM2.5 36.5l3.5 2V26l-3.5 2z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M24 9c.2-1 2.5-8 10.5-6.7"
                    ></path>
                    <circle
                      cx="36"
                      cy="3.5"
                      r="2.5"
                      fill="#ff6242"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></circle>
                    <path
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M30.5 44c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v8z"
                    ></path>
                    <path
                      fill="#ff6242"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M30.5 38.5h-13V36c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2.5z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      d="M33.5 11.8C30.7 10.1 27.5 9 24 9s-6.7 1-9.5 2.7V24h19V11.8z"
                    ></path>
                    <circle
                      cx="32.5"
                      cy="25"
                      r="5"
                      fill="#00dfeb"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="32.5"
                      cy="25"
                      r="2"
                      fill="#627b8c"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="15.5"
                      cy="25"
                      r="5"
                      fill="#00dfeb"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="15.5"
                      cy="25"
                      r="2"
                      fill="#627b8c"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></circle>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <h1
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontSize: "22px",
                  fontWeight: "800",
                }}
              >
                SearchAI
              </h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                lineHeight: "1.4",
                fontWeight: "450",
              }}
            >
              Join us to enjoy daily free AI queries
            </span>
            <button
              className="continue-with-google-button"
              onClick={handleGoogleButtonClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                    style={{ width: "30px", height: "30px" }}
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>Continue With Google</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Authentication.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
