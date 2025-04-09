import { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

const GmailReplyButton = () => {
  const replyButton = () => {
    const replyContainer = document.querySelector(".amn");
    if (replyContainer && !replyContainer.querySelector(".customReplyButton")) {
      const replyButtonTag = document.createElement("div");
      replyButtonTag.className = "customReplyButton";
      replyContainer.appendChild(replyButtonTag);
      ReactDOM.render(<Button />, replyButtonTag);
    }
  };

  useEffect(() => {
    replyButton();
    const observer = new MutationObserver(replyButton);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default GmailReplyButton;
