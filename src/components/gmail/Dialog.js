import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoaderComp from "./Loader";
import BasicSelect from "./ComposeDropdown";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "../../styles/Dialog.css";

function SimpleDialog(props) {
  const { onClose, open, onResponseReceived } = props;
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAge, setSelectedAge] = useState(""); // State for selected dropdown value

  const handleSend = async () => {
    if (text && selectedAge) {
      const data = {
        prompt:
          text +
          "Write an email by using above points and following tone" +
          selectedAge,
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
        setIsLoading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/root/",
          data
        );
        onResponseReceived(response.data.text);
        setUserId(response.data.user_id);
        setChatId(response.data.chat_id);
        setText("");
        handleClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "100vh",
            },
          },
        }}
      >
        {isLoading && (
          <div className="loading-overlay">
            <LoaderComp />
          </div>
        )}
        <div className={`compose-dialog-title ${isLoading ? "blur" : ""}`}>
          <DialogTitle>Compose Email</DialogTitle>
        </div>
        <div
          className={`attach-textarea-send-container ${
            isLoading ? "blur" : ""
          }`}
        >
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
              <textarea
                ref={textareaRef}
                className="input-field"
                placeholder="Enter Your Thoughts...."
                onInput={handleInput}
                onKeyPress={handleKeyPress}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>
          </div>
          
          <BasicSelect
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
          />

          <div className="icon-container">
            <div className="send-container">
              <button
                className="send-button"
                onClick={handleSend}
                disabled={isLoading}
              >
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
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onResponseReceived: PropTypes.func.isRequired,
};

export default SimpleDialog;
