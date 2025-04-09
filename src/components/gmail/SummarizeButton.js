import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Dialog.css";
import LoaderComp from "./Loader";
import StreamingText from "./StreamingText";

export default function GmailSummarizeButton() {
  const [mailContent, setMailContent] = useState("");
  const [summaryResponse, setSummaryResponse] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 100, left: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const summarize = () => {
    const rootContainer = document.querySelector(".adF");
    if (rootContainer) {
      const summaryContainer = document.querySelector(".hj");
      if (
        summaryContainer &&
        !summaryContainer.querySelector(".custom-summarizes-root")
      ) {
        const summarizeButton = document.createElement("button");
        summarizeButton.innerText = "Summarize";
        summarizeButton.className = "custom-summarize-button";
        const rootDiv = document.createElement("div");
        rootDiv.addEventListener("click", () => {
          const emailContentElement = document.querySelector(".a3s.aiL");
          if (emailContentElement) {
            const content = emailContentElement.innerText;
            setMailContent(content);
            sendContentToBackend(content);
            setShowPopup(true);
            setIsLoading(true);
          } else {
            console.log("Email content not found.");
          }
        });

        rootDiv.className = "custom-summarizes-root";
        rootDiv.appendChild(summarizeButton);
        summaryContainer.insertBefore(rootDiv, summaryContainer.firstChild);
        // summaryContainer.appendChild(rootDiv);
      } else {
        console.log("Button already exists or summaryContainer not found.");
      }
    }
  };

  const sendContentToBackend = async (content) => {
    const data = {
      prompt:
        content +
        " summarize the content in an efficient and user-understandable manner",
      model: "openai",
      model_type: "gpt-4o",
      generation_type: "text",
      new_chat: "new",
    };
    if (userId) {
      data["user_id"] = userId;
    }

    if (chatId) {
      data["chat_id"] = chatId;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/root/",
        data
      );
      setSummaryResponse(response.data.text);
      setUserId(response.data.user_id);
      setChatId(response.data.chat_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending content to backend:", error);
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - popupPosition.left,
      y: e.clientY - popupPosition.top,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPopupPosition({
        top: e.clientY - offset.y,
        left: e.clientX - offset.x,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          summarize();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    summarize();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      observer.disconnect();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {showPopup && (
        <div
          className="popup"
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="popup-content"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "move",
              }}
            >
              <div style={{ color: "#4fd1ba", paddingLeft: "10px" }}>
                <h3>Summarized Content</h3>
              </div>
              <div
                style={{
                  height: "35px",
                  cursor: "move",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  X
                </button>
              </div>
            </div>

            <div>
              {isLoading ? (
                <LoaderComp />
              ) : (
                <StreamingText fullText={summaryResponse} speed={20} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
