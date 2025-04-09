import "../../styles/AccessBar.css";

import React, { useState } from "react";
import axios from "axios";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

import ActionToolBar from "./ActionToolbar";
import Search from "./actionToolBarComponents/Search";
import ChatWindow from "./actionToolBarComponents/ChatWindow";
import Summary from "./actionToolBarComponents/Summary";
import Art from "./actionToolBarComponents/Art";

const AccessBar = ({ isOpen, handleSidePanel }) => {
  const [prompt, setPrompt] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [requestType, setRequestType] = useState("user");
  const [clearMessages, setClearMessages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState("search");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const aiModels = [
    {
      id: 1,
      svgTag: `<svg
				xmlns="http://www.w3.org/2000/svg"
				shape-rendering="geometricPrecision"
				text-rendering="geometricPrecision"
				image-rendering="optimizeQuality"
				fill-rule="evenodd"
				clip-rule="evenodd"
				viewBox="0 0 512 512"
			>
				<rect
					fill="#10A37F"
					width="512"
					height="512"
					rx="104.187"
					ry="105.042"
				/>
				<path
					fill="#fff"
					fill-rule="nonzero"
					d="M378.68 230.011a71.432 71.432 0 003.654-22.541 71.383 71.383 0 00-9.783-36.064c-12.871-22.404-36.747-36.236-62.587-36.236a72.31 72.31 0 00-15.145 1.604 71.362 71.362 0 00-53.37-23.991h-.453l-.17.001c-31.297 0-59.052 20.195-68.673 49.967a71.372 71.372 0 00-47.709 34.618 72.224 72.224 0 00-9.755 36.226 72.204 72.204 0 0018.628 48.395 71.395 71.395 0 00-3.655 22.541 71.388 71.388 0 009.783 36.064 72.187 72.187 0 0077.728 34.631 71.375 71.375 0 0053.374 23.992H271l.184-.001c31.314 0 59.06-20.196 68.681-49.995a71.384 71.384 0 0047.71-34.619 72.107 72.107 0 009.736-36.194 72.201 72.201 0 00-18.628-48.394l-.003-.004zM271.018 380.492h-.074a53.576 53.576 0 01-34.287-12.423 44.928 44.928 0 001.694-.96l57.032-32.943a9.278 9.278 0 004.688-8.06v-80.459l24.106 13.919a.859.859 0 01.469.661v66.586c-.033 29.604-24.022 53.619-53.628 53.679zm-115.329-49.257a53.563 53.563 0 01-7.196-26.798c0-3.069.268-6.146.79-9.17.424.254 1.164.706 1.695 1.011l57.032 32.943a9.289 9.289 0 009.37-.002l69.63-40.205v27.839l.001.048a.864.864 0 01-.345.691l-57.654 33.288a53.791 53.791 0 01-26.817 7.17 53.746 53.746 0 01-46.506-26.818v.003zm-15.004-124.506a53.5 53.5 0 0127.941-23.534c0 .491-.028 1.361-.028 1.965v65.887l-.001.054a9.27 9.27 0 004.681 8.053l69.63 40.199-24.105 13.919a.864.864 0 01-.813.074l-57.66-33.316a53.746 53.746 0 01-26.805-46.5 53.787 53.787 0 017.163-26.798l-.003-.003zm198.055 46.089l-69.63-40.204 24.106-13.914a.863.863 0 01.813-.074l57.659 33.288a53.71 53.71 0 0126.835 46.491c0 22.489-14.033 42.612-35.133 50.379v-67.857c.003-.025.003-.051.003-.076a9.265 9.265 0 00-4.653-8.033zm23.993-36.111a81.919 81.919 0 00-1.694-1.01l-57.032-32.944a9.31 9.31 0 00-4.684-1.266 9.31 9.31 0 00-4.684 1.266l-69.631 40.205v-27.839l-.001-.048c0-.272.129-.528.346-.691l57.654-33.26a53.696 53.696 0 0126.816-7.177c29.644 0 53.684 24.04 53.684 53.684a53.91 53.91 0 01-.774 9.077v.003zm-150.831 49.618l-24.111-13.919a.859.859 0 01-.469-.661v-66.587c.013-29.628 24.053-53.648 53.684-53.648a53.719 53.719 0 0134.349 12.426c-.434.237-1.191.655-1.694.96l-57.032 32.943a9.272 9.272 0 00-4.687 8.057v.053l-.04 80.376zm13.095-28.233l31.012-17.912 31.012 17.9v35.812l-31.012 17.901-31.012-17.901v-35.8z"
				/>
			</svg>`,
      text: "gpt-3.5-turbo",
      modelName: "openai",
      model: "gpt-3.5-turbo-16k",
      description:
        "Powered by OpenAI. 16,384 max tokens. OpenAI's fastest model, great for most everyday tasks.",
    },
    {
      id: 2,
      svgTag: `<svg
					viewBox="0 0 512 512"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					clip-rule="evenodd"
					stroke-linejoin="round"
					stroke-miterlimit="2"
				>
					<path
						d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z"
						fill-rule="nonzero"
					/>
				</svg>`,
      text: "gpt-4o",
      modelName: "openai",
      model: "gpt-4o",
      description:
        "Powered by OpenAI. 128,000 max tokens. OpenAI's newest and fastest multimodal flagship model. Seamlessly combining text, audio, and image inputs and outputs, GPT-4o delivers near-human response times and exceptional performance across languages, vision, and audio understanding, setting a new standard for AI versatility and natural interaction.",
    },
    {
      id: 3,
      svgTag: `<svg
					xmlns="http://www.w3.org/2000/svg"
					shape-rendering="geometricPrecision"
					text-rendering="geometricPrecision"
					image-rendering="optimizeQuality"
					fill-rule="evenodd"
					clip-rule="evenodd"
					viewBox="0 0 512 512"
				>
					<rect
						fill="#ab68ff"
						width="512"
						height="512"
						rx="104.187"
						ry="105.042"
					/>
					<path
						fill="#fff"
						fill-rule="nonzero"
						d="M378.68 230.011a71.432 71.432 0 003.654-22.541 71.383 71.383 0 00-9.783-36.064c-12.871-22.404-36.747-36.236-62.587-36.236a72.31 72.31 0 00-15.145 1.604 71.362 71.362 0 00-53.37-23.991h-.453l-.17.001c-31.297 0-59.052 20.195-68.673 49.967a71.372 71.372 0 00-47.709 34.618 72.224 72.224 0 00-9.755 36.226 72.204 72.204 0 0018.628 48.395 71.395 71.395 0 00-3.655 22.541 71.388 71.388 0 009.783 36.064 72.187 72.187 0 0077.728 34.631 71.375 71.375 0 0053.374 23.992H271l.184-.001c31.314 0 59.06-20.196 68.681-49.995a71.384 71.384 0 0047.71-34.619 72.107 72.107 0 009.736-36.194 72.201 72.201 0 00-18.628-48.394l-.003-.004zM271.018 380.492h-.074a53.576 53.576 0 01-34.287-12.423 44.928 44.928 0 001.694-.96l57.032-32.943a9.278 9.278 0 004.688-8.06v-80.459l24.106 13.919a.859.859 0 01.469.661v66.586c-.033 29.604-24.022 53.619-53.628 53.679zm-115.329-49.257a53.563 53.563 0 01-7.196-26.798c0-3.069.268-6.146.79-9.17.424.254 1.164.706 1.695 1.011l57.032 32.943a9.289 9.289 0 009.37-.002l69.63-40.205v27.839l.001.048a.864.864 0 01-.345.691l-57.654 33.288a53.791 53.791 0 01-26.817 7.17 53.746 53.746 0 01-46.506-26.818v.003zm-15.004-124.506a53.5 53.5 0 0127.941-23.534c0 .491-.028 1.361-.028 1.965v65.887l-.001.054a9.27 9.27 0 004.681 8.053l69.63 40.199-24.105 13.919a.864.864 0 01-.813.074l-57.66-33.316a53.746 53.746 0 01-26.805-46.5 53.787 53.787 0 017.163-26.798l-.003-.003zm198.055 46.089l-69.63-40.204 24.106-13.914a.863.863 0 01.813-.074l57.659 33.288a53.71 53.71 0 0126.835 46.491c0 22.489-14.033 42.612-35.133 50.379v-67.857c.003-.025.003-.051.003-.076a9.265 9.265 0 00-4.653-8.033zm23.993-36.111a81.919 81.919 0 00-1.694-1.01l-57.032-32.944a9.31 9.31 0 00-4.684-1.266 9.31 9.31 0 00-4.684 1.266l-69.631 40.205v-27.839l-.001-.048c0-.272.129-.528.346-.691l57.654-33.26a53.696 53.696 0 0126.816-7.177c29.644 0 53.684 24.04 53.684 53.684a53.91 53.91 0 01-.774 9.077v.003zm-150.831 49.618l-24.111-13.919a.859.859 0 01-.469-.661v-66.587c.013-29.628 24.053-53.648 53.684-53.648a53.719 53.719 0 0134.349 12.426c-.434.237-1.191.655-1.694.96l-57.032 32.943a9.272 9.272 0 00-4.687 8.057v.053l-.04 80.376zm13.095-28.233l31.012-17.912 31.012 17.9v35.812l-31.012 17.901-31.012-17.901v-35.8z"
					/>
				</svg>`,
      text: "gpt-4-turbo",
      modelName: "openai",
      model: "gpt-4-turbo",
      description:
        "Powered by OpenAI. 128,000 max tokens. Also known as GPT-4 with Vision, or GPT-4V, represents OpenAI's most advanced iteration yet, combining robust image processing capabilities with the latest GPT-4 Turbo model, enabling it to interpret and respond to visual inputs in tandem with text.",
    },
    {
      id: 4,
      svgTag: `<svg
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
						fill="url(#prefix__paint0_radial_980_20147)"
					/>
					<defs>
						<radialGradient
							id="prefix__paint0_radial_980_20147"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
						>
							<stop
								offset=".067"
								stop-color="#9168C0"
							/>
							<stop
								offset=".343"
								stop-color="#5684D1"
							/>
							<stop
								offset=".672"
								stop-color="#1BA1E3"
							/>
						</radialGradient>
					</defs>
				</svg>`,
      text: "gemini-1.5-pro",
      modelName: "gemini",
      model: "gemini-1.5-pro",
      description: "gemini",
    },
    {
      id: 4,
      svgTag: `<svg
					  fill="none"
					  xmlns="http://www.w3.org/2000/svg"
					  viewBox="0 0 16 16"
				  >
					  <path
						  d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
						  fill="url(#prefix__paint0_radial_980_20147)"
					  />
					  <defs>
						  <radialGradient
							  id="prefix__paint0_radial_980_20147"
							  cx="0"
							  cy="0"
							  r="1"
							  gradientUnits="userSpaceOnUse"
							  gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
						  >
							  <stop
								  offset=".067"
								  stop-color="#9168C0"
							  />
							  <stop
								  offset=".343"
								  stop-color="#5684D1"
							  />
							  <stop
								  offset=".672"
								  stop-color="#1BA1E3"
							  />
						  </radialGradient>
					  </defs>
				  </svg>`,
      text: "gemini-1.5-flash",
      modelName: "gemini",
      model: "gemini-1.5-flash",
      description: "gemini",
    },
    {
      id: 5,
      svgTag: `<svg
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
						fill="url(#prefix__paint0_radial_980_20147)"
					/>
					<defs>
						<radialGradient
							id="prefix__paint0_radial_980_20147"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
						>
							<stop
								offset=".067"
								stop-color="#9168C0"
							/>
							<stop
								offset=".343"
								stop-color="#5684D1"
							/>
							<stop
								offset=".672"
								stop-color="#1BA1E3"
							/>
						</radialGradient>
					</defs>
				</svg>`,
      text: "gemini-pro",
      modelName: "gemini",
      model: "gemini-1.0-pro",
      description: "gemini pro",
    },
    {
      id: 6,
      svgTag: `<svg xmlns="http://www.w3.org/2000/svg"
       shape-rendering="geometricPrecision" text-rendering="geometricPrecision" 
       image-rendering="optimizeQuality" 
       fill-rule="evenodd" clip-rule="evenodd" 
       viewBox="0 0 512 512">
       <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042"/>
       <path fill="#1F1F1E" fill-rule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"/></svg>`,
      text: "claude-3-opuso",
      modelName: "claude",
      model: "claude-3-opus-20240229",
      description: "claude-3-opus",
    },
    {
      id: 7,
      svgTag: `<svg xmlns="http://www.w3.org/2000/svg"
       shape-rendering="geometricPrecision" text-rendering="geometricPrecision" 
       image-rendering="optimizeQuality" 
       fill-rule="evenodd" clip-rule="evenodd" 
       viewBox="0 0 512 512">
       <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042"/>
       <path fill="#1F1F1E" fill-rule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"/></svg>`,
      text: "claude-3-sonet",
      modelName: "claude",
      model: "claude-3-sonnet-20240229",
      description: "claude-3-sonet",
    },
    {
      id: 8,
      svgTag: `<svg xmlns="http://www.w3.org/2000/svg"
       shape-rendering="geometricPrecision" text-rendering="geometricPrecision" 
       image-rendering="optimizeQuality" 
       fill-rule="evenodd" clip-rule="evenodd" 
       viewBox="0 0 512 512">
       <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042"/>
       <path fill="#1F1F1E" fill-rule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"/></svg>`,
      text: "claude-3-haiku",
      modelName: "claude",
      model: "claude-3-haiku-20240307",
      description: "claude-3-haiku",
    },
  ];

  const [showAiDescription, setShowAiDescription] = useState(aiModels[0]);

  const [selectedAiModel, setSelectedAiModel] = useState(aiModels[0]);

  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [newChat, setNewChat] = useState(true);

  const handleClose = () => {
    handleSidePanel();
  };

  const handleRefresh = () => {
    // setMessages([]);
  };

  const handleSelectAI = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const handleClickAway = (e) => {
    setAnchorEl(null);
  };

  const showDiv = (text) => {
    setShowAiDescription(text);
  };

  const setAiModel = (item) => {
    setSelectedAiModel(item);
  };

  const handleSelectedOption = (option) => {
    setSelectedOption(option);
  };

  const handlePromptChange = (e) => {
    setClearMessages(false);
    setPrompt(e.target.value);
  };

  const handleSend = () => {
    setNewMessage(prompt);
    setRequestType("user");
    sendPrompt();
    setPrompt("");
  };

  const sendPrompt = () => {
    const data = {
      prompt: prompt,
      model: selectedAiModel.modelName,
      model_type: selectedAiModel.model,
      generation_type: "text",
      new_chat: newChat,
    };
    if (userId) {
      data["user_id"] = userId;
    }

    if (chatId) {
      data["chat_id"] = chatId;
    }
    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/root/", data)
      .then((response) => {
        setRequestType("system");
        setNewMessage(response.data.text);
        setUserId(response.data.user_id);
        setChatId(response.data.chat_id);
        setNewChat(response.data.new_chat);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline being added in textarea
      handleSend();
    }
  };

  const handleNewChat = () => {
    setClearMessages(true);
  };
  return (
    <div className={`access-bar ${isOpen ? "open" : ""}`}>
      <div className="search-ai-root-wrapper">
        <Grid
          container
          style={{
            height: "100vh",
            border: "1px solid #e5e4e2",
          }}
        >
          <Grid
            item
            xs={10.5}
            sx={{
              borderRight: "1px solid #e5e4e2",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  height: "8vh",
                  borderBottom: "1px solid #e5e4e2",
                  display: "flex",
                }}
              >
                <div className="title-logo-section">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#4fd1ba"
                    className="bi bi-stars search-ai-logo"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                  </svg>
                  <h1 className="search-ai-title">SearchAI</h1>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: "60vh",
                }}
              >
                {selectedOption === "search" ? (
                  <Search
                    message={newMessage}
                    requestType={requestType}
                    clearMessages={clearMessages}
                  />
                ) : null}
                {selectedOption === "chat" ? <ChatWindow /> : null}
                {selectedOption === "summary" ? <Summary /> : null}
                {selectedOption === "art" ? <Art /> : null}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: "8vh",
                }}
              >
                <Grid
                  container
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      cursor: "pointer",
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
                          }}
                        >
                          Create New Chat
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
                      <AddCommentOutlinedIcon
                        sx={{
                          height: "25px",
                          width: "25px",
                          color: "black",
                          backgroundColor: "#4fd1ba",
                          padding: "8px",
                          borderRadius: "8px",
                        }}
                        onClick={() => handleNewChat()}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <TuneRoundedIcon
                      sx={{
                        height: "25px",
                        width: "25px",
                        color: "black",
                        backgroundColor: "#4fd1ba",
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: "24vh",
                  padding: "10px",
                }}
              >
                <Grid
                  container
                  sx={{
                    border: "1px solid #e5e4e2",
                    borderRadius: "5px",
                    height: "100%",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "70%",
                    }}
                  >
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        height="20%"
                        sx={{
                          margin: "10px 5px",
                          fontSize: "1rem",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <textarea
                        value={prompt}
                        onChange={handlePromptChange}
                        onKeyDown={handleKeyPress}
                        className="text-area"
                        placeholder="Ask the web..."
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "30%",
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        p: 1,
                      }}
                    >
                      <Grid item xs={6}>
                        <ClickAwayListener onClickAway={handleClickAway}>
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
                                }}
                              >
                                Switch AI Model
                              </div>
                            }
                            disableFocusListener
                            disableTouchListener
                            arrow
                            placement="top"
                            PopperProps={{
                              style: {
                                zIndex: 2147483647,
                              },
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
                            <button
                              className="select-button"
                              id={id}
                              onClick={(e) => handleSelectAI(e)}
                            >
                              <div
                                style={{
                                  height: "20px",
                                  width: "20px",
                                }}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: selectedAiModel.svgTag,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  height: "20px",
                                  marginLeft: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontFamily: "Roboto",
                                  fontWeight: 400,
                                  fontSize: "15px",
                                }}
                              >
                                {selectedAiModel.text}
                              </div>
                              <div>
                                <KeyboardArrowDownIcon
                                  sx={{
                                    pl: 0.5,
                                  }}
                                />
                              </div>
                              <Popper
                                sx={{
                                  zIndex: 2147483647,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                placement={"top-start"}
                                transition
                              >
                                {({ TransitionProps }) => (
                                  <Fade {...TransitionProps} timeout={350}>
                                    <Paper
                                      sx={{
                                        backgroundColor: "white",
                                        marginBottom: "10px",
                                        width: "400px",
                                        height: "200px",
                                      }}
                                    >
                                      <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                          height: "100%",
                                        }}
                                      >
                                        <Grid
                                          item
                                          xs={6}
                                          sx={{
                                            height: "100%",
                                          }}
                                        >
                                          <div
                                            style={{
                                              height: "100%",
                                              overflowY: "auto",
                                            }}
                                          >
                                            {aiModels.map((item) => {
                                              return (
                                                <div
                                                  style={{
                                                    height: "20px",
                                                    padding: "5px",
                                                    display: "flex",
                                                    cursor: "pointer",
                                                  }}
                                                  onMouseEnter={() =>
                                                    showDiv(item)
                                                  }
                                                  onClick={() =>
                                                    setAiModel(item)
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      height: "20px",
                                                      width: "20px",
                                                    }}
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.svgTag,
                                                      }}
                                                    />
                                                  </div>
                                                  <div
                                                    style={{
                                                      height: "20px",
                                                      marginLeft: "10px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      fontFamily: "Roboto",
                                                      fontWeight: 400,
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {item.text}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                          {showAiDescription ? (
                                            <div>
                                              <div
                                                style={{
                                                  height: "40px",
                                                  display: "flex",
                                                  mb: 2,
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    height: "25px",
                                                    width: "25px",
                                                  }}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        showAiDescription.svgTag,
                                                    }}
                                                  />
                                                </div>
                                                <div
                                                  style={{
                                                    height: "25px",
                                                    marginLeft: "10px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontFamily: "Roboto",
                                                    fontWeight: 400,
                                                    fontSize: "18px",
                                                  }}
                                                >
                                                  {showAiDescription.text}
                                                </div>
                                              </div>
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
                                                    }}
                                                  >
                                                    {
                                                      showAiDescription.description
                                                    }
                                                  </div>
                                                }
                                                disableFocusListener
                                                disableTouchListener
                                                arrow
                                                placement="top"
                                                PopperProps={{
                                                  style: {
                                                    zIndex: 2147483647,
                                                  },
                                                  modifiers: [
                                                    {
                                                      name: "offset",
                                                      options: {
                                                        offset: [50, -10],
                                                      },
                                                    },
                                                  ],
                                                }}
                                              >
                                                <div className="block-with-text">
                                                  {
                                                    showAiDescription.description
                                                  }
                                                </div>
                                              </Tooltip>
                                            </div>
                                          ) : null}
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Fade>
                                )}
                              </Popper>
                            </button>
                          </Tooltip>
                        </ClickAwayListener>
                      </Grid>
                      <Grid item xs={6} container justifyContent="flex-end">
                        <div className="send-icon">
                          {loading ? (
                            <CircularProgress
                              size={24}
                              style={{
                                color: "#000000",
                              }}
                            />
                          ) : (
                            <SendIcon onClick={() => handleSend()} />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1.5}
            sx={{
              backgroundColor: "#F4F4F4",
            }}
          >
            <ActionToolBar
              handleClosed={handleClose}
              handleSelectedOption={handleSelectedOption}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AccessBar;
