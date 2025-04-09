
import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Box, Typography, TextField } from "@mui/material";
// import AccessBar from "../sidebar/AccessBar"; // Adjust the path as needed
import NewAccessBar from "../sidebar/NewAccessBar";
import ActionToolBar from "../sidebar/ActionToolbar";

const SelectText = () => {
  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });
  const [selectedText, setSelectedText] = useState("");
  // const [isAccessBarOpen, setIsAccessBarOpen] = useState(false);
  const [textToSend, setTextToSend] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isAccessBarVisible, setIsAccessBarVisible] = useState(false); //false

  const handleMouseAction = () => {
    setIsAccessBarVisible(!isAccessBarVisible);
  };

  const handleCloseAccessToolBar = () => {
    setIsAccessBarVisible(false);
  };

  const handleKeepOpenAccessBar = () => {
    setIsAccessBarVisible(true);
  };
  const containerRef = useRef(null);
  // const actionToolBarRef = useRef(null); // Add a ref for ActionToolBar

  const updatePosition = (range) => {
    const { top, left, width } = range.getBoundingClientRect();
    setPosition({
      top: window.scrollY + top - 40, // Adjust this value to position the icon above the selected text
      left: window.scrollX + left, // Center the icon horizontally over the selected text
      visible: true,
    });
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      updatePosition(range);
      setSelectedText(selection.toString().trim());
    } else {
      setPosition({ top: 0, left: 0, visible: false });
      setSelectedText("");
    }
  };

  useEffect(() => {
    const handleMouseUp = (event) => {
      handleSelectionChange();
    };

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !window.getSelection().toString()
      ) {
        setPosition({ top: 0, left: 0, visible: false });
        setSelectedText("");
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleIconClick = () => {
    setIsAccessBarVisible(true);
    setTextToSend(selectedText);
    // setSearchClick(true);
    setPosition({ top: 0, left: 0, visible: false });
  };

  return (
    <>
      {position.visible && (
        <Box
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 123456789,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4fd1ba",
            borderRadius: isHovered ? "20px" : "50%",
            // boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            padding: isHovered ? "4px 8px" : "4px",
            transition:
              "padding 0.3s, width 0.3s, border-radius 0.3s, height 0.3s",
            minWidth: isHovered ? "auto" : "32px",
            minHeight: isHovered ? "24px" : "32px",
            cursor: "pointer",
            userSelect: "none",
            margin: 0,
            border: "none",
            outline: "none",
            textDecoration: "none",
            height: isHovered ? "2px" : "30px", // Adjust the height here
          }}
        >
          <IconButton
            style={{
              color: "black",
              padding: "4px",
              backgroundColor: "transparent", // Remove default background color
              boxShadow: "none", // Remove default shadow
            }}
            onClick={handleIconClick}
          >
            <SearchIcon />
            {isHovered && (
              <Typography
                variant="body2"
                style={{
                  marginLeft: "8px",
                  color: "black",
                }}
              >
                Search about it...
              </Typography>
            )}
          </IconButton>
        </Box>
      )}
      {isAccessBarVisible && (
        <NewAccessBar
          onMouseLeave={(e) => handleMouseAction(e)}
          onClose={handleCloseAccessToolBar}
          handleKeepOpenAccessBar={handleKeepOpenAccessBar}
          selectedText={textToSend}
        />
      )}
    </>
  );
};

export default SelectText;

