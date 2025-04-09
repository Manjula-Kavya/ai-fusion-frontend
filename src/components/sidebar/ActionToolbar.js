import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import "../../styles/AccessToolbar.css";

const ActionToolBar = (props) => {
  const [selectedOption, setSelectedOption] = useState("chat");
  const handleClickClosebar = () => {
    props.handleClosed();
  };

  const [isHoveringClose, setIsHoveringClose] = useState(false);

  const handleMouseEnterClose = () => {
    setIsHoveringClose(true);
  };

  const handleMouseLeaveClose = () => {
    setIsHoveringClose(false);
  };

  const [isHoveringAffliate, setIsHoveringAffliate] = useState(false);

  const handleMouseEnterAffliate = () => {
    setIsHoveringAffliate(true);
  };

  const handleMouseLeaveAffliate = () => {
    setIsHoveringAffliate(false);
  };

  const [isHoveringFeedback, setIsHoveringFeedback] = useState(false);

  const handleMouseEnterFeedback = () => {
    setIsHoveringFeedback(true);
  };

  const handleMouseLeaveFeedback = () => {
    setIsHoveringFeedback(false);
  };

  const [isHoveringAI, setIsHoveringAI] = useState(false);

  const handleMouseEnterAI = () => {
    setIsHoveringAI(true);
  };

  const handleMouseLeaveAI = () => {
    setIsHoveringAI(false);
  };

  const [isHoveringSummarize, setIsHoveringSummarize] = useState(false);

  const handleMouseEnterSummarize = () => {
    setIsHoveringSummarize(true);
  };

  const handleMouseLeaveSummarize = () => {
    setIsHoveringSummarize(false);
  };

  const [isHoveringSearch, setIsHoveringSearch] = useState(false);

  const handleMouseEnterSearch = () => {
    setIsHoveringSearch(true);
  };

  const handleMouseLeaveSearch = () => {
    setIsHoveringSearch(false);
  };

  const [isHoveringArt, setIsHoveringArt] = useState(false);

  const handleMouseEnterArt = () => {
    setIsHoveringArt(true);
  };

  const handleMouseLeaveArt = () => {
    setIsHoveringArt(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    props.handleSelectedOption(option);
  };
  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          height: "8vh",
        }}
      >
        <Tooltip
          title={
            <div
              style={{
                padding: "10px",
                whiteSpace: "normal",
                textAlign: "left",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              Close
            </div>
          }
          disableFocusListener
          disableTouchListener
          arrow
          placement="left-start"
          PopperProps={{
            style: { zIndex: 2147483647 },
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [10, -10],
                },
              },
            ],
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnterClose}
            onMouseLeave={handleMouseLeaveClose}
            onClick={handleClickClosebar}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: isHoveringClose ? "#f0f0f0" : "transparent",
                transition: "background-color 0.3s ease", // Smooth transition effect
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
                fill="#074737"
                style={{ visibility: isHoveringClose ? "visible" : "visible" }}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
          </div>
        </Tooltip>
        <Divider
          orientation="horizontal"
          sx={{
            width: "80%",
            margin: "auto",
            borderColor: "#79CBC5",
          }}
        />
      </Grid>
      <div style={{ paddingBottom: "15px" }}>
        <Grid
          item
          xs={12}
          sx={{
            height: "25vh",
            pb: 2,
          }}
        >
          <Grid container rowSpacing={4} justifyContent="center">
            {" "}
            {/* spacing is 1 if top and nottom icons are included*/}
          </Grid>
        </Grid>
      </div>

      <Grid
        item
        xs={12}
        sx={{
          height: "30vh",
          display: "flex",
          alignItems: "end",
          pb: 1,
        }}
      >
        <Grid container rowSpacing={1} justifyContent="center">
          <Grid
            item
            xs={12}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleOptionChange("chat")}
          >
            <Tooltip
              title={
                <div
                  style={{
                    padding: "10px",
                    whiteSpace: "normal",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  Ask AI anything
                </div>
              }
              disableFocusListener
              disableTouchListener
              arrow
              placement="left-start"
              PopperProps={{
                style: { zIndex: 2147483647 },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [10, -10],
                    },
                  },
                ],
              }}
            >
              <div
                className={`${
                  selectedOption === "chat" ? "selected-option" : "option"
                }`}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnterAI}
                  onMouseLeave={handleMouseLeaveAI}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: isHoveringAI ? "#f0f0f0" : "transparent",
                      transition: "background-color 0.3s ease", // Smooth transition effect
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                      fill="#074737"
                      style={{
                        visibility: isHoveringAI ? "visible" : "visible",
                      }}
                    >
                      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Grid>
          {/* <Grid
            item
            xs={12}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleOptionChange("summary")}
          >
            <Tooltip
              title={
                <div
                  style={{
                    padding: "10px",
                    whiteSpace: "normal",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>Summarize & ask about this page</div>
                  <div>Coming Soon...</div>
                </div>
              }
              disableFocusListener
              disableTouchListener
              arrow
              placement="left-start"
              PopperProps={{
                style: { zIndex: 2147483647 },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [10, -10],
                    },
                  },
                ],
              }}
            >
              <div
                className={`${
                  selectedOption === "summary" ? "selected-option" : "option"
                }`}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnterSummarize}
                  onMouseLeave={handleMouseLeaveSummarize}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: isHoveringSummarize
                        ? "#f0f0f0"
                        : "transparent",
                      transition: "background-color 0.3s ease", // Smooth transition effect
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                      fill="#074737"
                      style={{
                        visibility: isHoveringSummarize ? "visible" : "visible",
                      }}
                    >
                      <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Grid> */}
          {/* <Grid
            item
            xs={12}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleOptionChange("search")}
          >
            <Tooltip
              title={
                <div
                  style={{
                    padding: "10px",
                    whiteSpace: "normal",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>AI Powered Search</div>
                  <div>Coming Soon...</div>
                </div>
              }
              disableFocusListener
              disableTouchListener
              arrow
              placement="left-start"
              PopperProps={{
                style: { zIndex: 2147483647 },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [10, -10],
                    },
                  },
                ],
              }}
            >
              <div
                className={`${
                  selectedOption === "search" ? "selected-option" : "option"
                }`}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnterSearch}
                  onMouseLeave={handleMouseLeaveSearch}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: isHoveringSearch
                        ? "#f0f0f0"
                        : "transparent",
                      transition: "background-color 0.3s ease", // Smooth transition effect
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                      fill="#074737"
                      style={{
                        visibility: isHoveringSearch ? "visible" : "visible",
                      }}
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Grid> */}
          <Grid
            item
            xs={12}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleOptionChange("art")}
          >
            <Tooltip
              title={
                <div
                  style={{
                    padding: "10px",
                    whiteSpace: "normal",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>Create AI Art & Images</div>
                  <div>Coming Soon...</div>
                </div>
              }
              disableFocusListener
              disableTouchListener
              arrow
              placement="left-start"
              PopperProps={{
                style: { zIndex: 2147483647 },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [10, -10],
                    },
                  },
                ],
              }}
            >
              <div
                className={`${
                  selectedOption === "art" ? "selected-option" : "option"
                }`}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnterArt}
                  onMouseLeave={handleMouseLeaveArt}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: isHoveringArt
                        ? "#f0f0f0"
                        : "transparent",
                      transition: "background-color 0.3s ease", // Smooth transition effect
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                      fill="#074737"
                      style={{
                        visibility: isHoveringArt ? "visible" : "visible",
                      }}
                    >
                      <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{
          width: "80%",
          margin: "auto",
          marginBottom: "0px",
          marginTop: "0px",
        }}
      />
    </Grid>
  );
};

export default ActionToolBar;
