import React, { useState, useRef, useEffect } from "react";
import Artimage from "../../../styles/images/searchAI_art_title.png";

function Art(props) {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (props.clearMessages) {
      setMessages([]);
    }
  }, [props.clearMessages]);

  useEffect(() => {
    if (props.message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: props.requestType,
          message: props.message,
          userImage: props.userImage,
          responseImage: props.responseImage,
        },
      ]);
    }
  }, [props.message]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return messages.length > 0 ? (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        width: "100%",
        marginBottom: "30px",
      }}
    >
      {messages.map((item, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          style={{
            margin: "5px 10px",
            display: "flex",
            justifyContent: item.role !== "user" ? "end" : "start",
            whiteSpace: "pre-wrap",
          }}
        >
          {item.role === "user" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "75%",
              }}
            >
              {item.userImage !== null ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#D8F0EE",
                    border: "1px solid #e5e4e2",
                    borderRadius: "10px",
                    minHeight: "40px",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      paddingBottom: "0px",
                    }}
                  >
                    <img
                      src={item.userImage}
                      alt="image"
                      style={{
                        maxWidth: "40px",
                        maxHeight: "40px",
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        color: "black",
                        textAlign: "left",
                        lineHeight: "20px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#D8F0EE",
                    border: "1px solid #e5e4e2",
                    borderRadius: "10px",
                    minHeight: "40px",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      textAlign: "left",
                      lineHeight: "20px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {item.message}
                  </p>
                </div>
              )}

              <div style={{ width: "30px", height: "30px", marginTop: "3px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  style={{
                    width: "25px",
                    height: "25px",
                    fill: "#074737",
                    paddingLeft: "5px",
                  }}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
            </div>
          ) : (
            <div style={{ height: "300px", width: "300px" }}>
              <img
                src={item.message}
                alt="image"
                style={{ height: "100%", width: "100%" }}
              ></img>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div style={{justifyContent:"center", alignItems:"center", display:"flex", width:"100%", height:"100%"}}>
      <div>
        <img src={Artimage} alt="logo title" style={{width:"270px", height:"70px"}}></img>
      </div>
    </div>
  );
}

export default Art;
