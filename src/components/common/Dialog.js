import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/Dialog.css";

const Dialog = ({ setIsDialogOpen, onResponseReceived }) => {
  const dialogRef = useRef(null);
  const textareaRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (dialogRef.current && event.target === dialogRef.current) {
        setIsDragging(true);
        const rect = dialogRef.current.getBoundingClientRect();
        setDragOffset({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - dragOffset.x,
          y: event.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleTextChage = (e) => {
    console.log("---------", e.target.value);
  };
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSend = async () => {
    if (text) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/claudeTxtGen/",
          {
            prompt:
              text +
              "\nWrite a LinkedIn post for the above context with hashtags and emojis. The response should only include the post content without any introductions or additional comments:",
          }
        );
        onResponseReceived(response.data);
        console.log(response.data);
        setText(""); // Clear the textarea after sending
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div tabIndex={-1} className="floating-container" aria-hidden="false">
      <div
        className="smooth-drag root-menu"
        aria-expanded="true"
        aria-haspopup="menu"
        aria-controls=":r7:"
        ref={dialogRef}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div className="close-button-container">
          <button
            type="button"
            className="close-button"
            aria-label="Close"
            onClick={() => setIsDialogOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
        <div className="attach-textarea-send-container">
          <div className="icon-container">
            <div className="upload-container">
              <button className="attach-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-paperclip"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="input-container">
            <div>
              <input onChange={(e) => handleTextChage(e)}></input>
            </div>
          </div>
          <div className="icon-container">
            <div className="send-container">
              <button className="send-button" onClick={handleSend}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
