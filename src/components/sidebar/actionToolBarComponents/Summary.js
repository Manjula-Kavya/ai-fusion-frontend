import React from "react";
import axios from "axios";

const Summary = async () => {
  const currentWindowUrl = window.location.href;
  if (currentWindowUrl) {
    const window_content_response =await axios.post(
      "http://127.0.0.1:8000/api/root/",
      { currentWindowUrl }
    );
  }
  return <div>{currentWindowUrl}</div>;
}

export default Summary;
