import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../styles/GmailButtons.css";

export default function Button() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef(null);

  const toggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsBoxVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const responsePrompts = {
    yes: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in you are ok with that and accepting that.",
    no: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in you are not ok with that and reply mail in polite way.",
    thanks: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in thankfull manner and positive way.",
    sorry: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in apology manner.",
    more_info: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in that you are seeking more information abot that one.",
    joke: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail in that include some humor content in formal way.",
    follow_up: "Reply precisely in 2 to 5 lines. The above content is a email contnet in gmail. Act you are like a human and write the replay mail the mail is about to followp the above mail."
};


  const ActualReplyFunction = (responseType) => {
    setIsLoading(true);

    const emailContainers = document.querySelectorAll("[role='listitem']");
    let emailTextContent = "";
    let actualReplyButton = null;

    emailContainers.forEach((container) => {
      if (container.contains(document.activeElement)) {
        actualReplyButton = container.querySelector("[aria-label='Reply']");
        const textElements = container.querySelectorAll(".a3s.aiL");
        textElements.forEach((element) => {
          emailTextContent += element.textContent + " ";
        });
      }
    });

    emailTextContent = emailTextContent.trim();
    emailTextContent += responsePrompts[responseType] || "";

    if (emailTextContent) {
      const data = {
        prompt: emailTextContent,
        model: "openai",
        model_type: "gpt-4o",
        generation_type: "text",
        new_chat: true,
        user_id: userId || undefined,
        chat_id: chatId || undefined,
      };

      axios
        .post("http://127.0.0.1:8000/api/root/", data)
        .then((response) => {
          let replyContent = response.data.text.replace(/\n/g, "<br>");
          setUserId(response.data.user_id);
          setChatId(response.data.chat_id);

          const replyDiv = document.querySelector(
            ".Am.aiL.aO9.Al.editable.LW-avf.tS-tW"
          );
          if (replyDiv) {
            replyDiv.innerHTML = replyContent;
          } else {
            console.error("Reply div not found.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      if (actualReplyButton) {
        actualReplyButton.click();
      } else {
        console.error("Reply button not found for the currently active email.");
      }
    }
  };

  return (
    <div className="button-container">
      <button className="reply-button" onClick={toggleBox} disabled={isLoading}>
        Quick Reply
      </button>
      {isBoxVisible && (
        <div className="box" ref={boxRef}>
          <div className="reply-popup-title-container">
            <p className="title-reply-popup-box">Instant Reply</p>
          </div>
          {Object.keys(responsePrompts).map((key) => (
            <button
              key={key}
              className="box-button"
              onClick={() => ActualReplyFunction(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
