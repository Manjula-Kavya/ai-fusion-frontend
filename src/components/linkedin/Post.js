import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const QuickPostBox = ({ onGet, textareaRef, onClose }) => {
  const boxRef = useRef(null);
  const [text, setText] = useState("");
  const [boxHeight, setBoxHeight] = useState(150);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleTextChange = (e) => {
    setText(e.target.value);

    const lines = e.target.value.split("\n").length;
    const minHeight = 150; // initial height
    const lineHeight = 20; // approximate height of one line of text
    const newHeight = lines > 3 ? minHeight + (lines - 3) * lineHeight : minHeight;

    setBoxHeight(newHeight);
  };

  const isDisabled = !text;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <Modal
      open
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "123456"
      }}
    >
      <Box
        ref={boxRef}
        className="quick-post-box"
        sx={{
          position: "relative",
          backgroundColor: "white",
          border: "1px solid #ccc",
          zIndex: "123456",
          width: 600,
          height: boxHeight,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          outline: 0,
        }}
        onClick={() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }}
      >
        <textarea
          ref={textareaRef}
          placeholder="Give context of the post...."
          value={text}
          onChange={handleTextChange}
          style={{
            width: "100%",
            boxShadow: "none",
            outline: "none",
            border: "none",
            resize: "none",
            padding: "10px",
            fontSize: "14px",
            overflow: "hidden",
            flexGrow: 1, // Allow textarea to grow and fill available space
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={onGet}
            disabled={isDisabled}
            style={{
              minHeight: "1rem",
              maxWidth: "300px",
              fontSize: "small",
              lineHeight: 0,
              color: "black",
              outline: "none",
              border: "none",
              padding: 0,
              backgroundColor: "inherit",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "50%",
                transition: "background-color 0.3s",
                backgroundColor: isDisabled ? "inherit" : "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4fd1ba";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "inherit";
              }}
            >
              <SendIcon
                style={{
                  fontSize: "3rem",
                  color: isDisabled ? "gray" : "black",
                }}
              />
            </div>
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default QuickPostBox;
