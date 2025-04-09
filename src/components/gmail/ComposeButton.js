import React, { useEffect, useState } from "react";
import SimpleDialog from "./Dialog"; // Make sure the path is correct

export default function GmailComposeButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [responseData, setResponseData] = useState(""); // State to handle response data

  const composeButton = () => {
    const composeContainer = document.querySelector(".btC");
    if (
      composeContainer &&
      !composeContainer.querySelector(".gmail-compose-button")
    ) {
      const composeButton = document.createElement("button");
      composeButton.textContent = "Compose";
      composeButton.className = "gmail-compose-button";
      composeButton.onclick = () => setIsDialogOpen(true);
      const customTD = document.createElement("td");
      customTD.className = "compose-td";
      customTD.appendChild(composeButton);
      const existingTds = composeContainer.querySelectorAll("td");
      if (existingTds.length > 0) {
        composeContainer.insertBefore(customTD, existingTds[0].nextSibling);
      } else {
        composeContainer.appendChild(customTD);
      }
    }
  };

  const setEmailContent = (data) => {
    const subjectMatch = data.match(/Subject:\s*(.*)/i);
    const subject = subjectMatch ? subjectMatch[1] : "No Subject";
    const message = data
      .replace(/Subject:\s*(.*)/i, "")
      .trim()
      .replace(/\n/g, "<br>");

    const subjectElement = document.querySelector("input[name='subjectbox']");
    const messageElement = document.querySelector(
      ".Am.Al.editable.LW-avf.tS-tW"
    );

    if (subjectElement) {
      subjectElement.value = subject;
    }

    if (messageElement) {
      messageElement.innerHTML = message;
    }
  };

  const handleResponseReceived = (data) => {
    setResponseData(data);
    setIsDialogOpen(false);
    setEmailContent(data);
  };

  useEffect(() => {
    composeButton();
    const observer = new MutationObserver(composeButton);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <SimpleDialog
        open={isDialogOpen}
        onClose={handleClose}
        onResponseReceived={handleResponseReceived} // Pass the function to SimpleDialog
      />
    </>
  );
}
