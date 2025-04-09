import { useState, useEffect } from "react";

const StreamingText = ({ fullText, speed }) => {
    const [displayedText, setDisplayedText] = useState("");
  
    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [fullText, speed]);
  
    return (
      <div className="stream-text-container"
        style={{
          paddingTop: "4px",
          padding: "10px", 
          color: "#333", 
          fontFamily: "'Arial', sans-serif", 
          fontSize: "16px", 
          lineHeight: "1.5",
        }}
      >
        {displayedText}
      </div>
    );
  };

  
  export default StreamingText;