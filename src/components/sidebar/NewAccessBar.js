import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import "../../styles/AccessToolbar.css";
import ActionToolBar from "./ActionToolbar";
import ChatWindow from "./actionToolBarComponents/ChatWindow";
import Search from "./actionToolBarComponents/Search";
import Summary from "./actionToolBarComponents/Summary";
import Art from "./actionToolBarComponents/Art";

import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CircularProgress from "@mui/material/CircularProgress";
import Authentication from "./Authentication";

const NewAccessBar = ({ onMouseLeave, onClose, handleKeepOpenAccessBar,selectedText }) => {
  const [accessBar, showAccessBar] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const [clearMessages, setClearMessages] = useState(false);

  // const [model, setModel] = useState("");
  // const [modelType, setModelType] = useState("");
  // const [generationType, setGenerationType] = useState("");

  const [loading, setLoading] = useState(false);
  const [artSize, setArtSize] = useState("");
  const [artType, setArtType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [responseImage, setResponseImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [prompt, setPrompt] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [requestType, setRequestType] = useState("user");

  const [selectedOption, setSelectedOption] = useState("");

  const [isHoveringModels, setIsHoveringModels] = useState(false);
  const [hoverAnchorEl, setHoverAnchorEl] = useState(null);
  const [isHoveringArtFilter, setIsHoveringArtFilter] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
        setIsImageVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtType = (event) => {
    setArtType(event.target.value);
  };

  const handleArtSize = (event) => {
    setArtSize(event.target.value);
  };

  const handleArtFilterMouseEnter = (event) => {
    setIsHoveringArtFilter(true);
    setHoverAnchorEl(event.currentTarget);
  };

  const handleArtFilterMouseLeave = () => {
    setIsHoveringArtFilter(false);
    setHoverAnchorEl(null);
  };

  const handleMouseEnterModels = (event) => {
    setIsHoveringModels(true);
    setHoverAnchorEl(event.currentTarget);
  };

  const handleMouseLeaveModels = () => {
    setIsHoveringModels(false);
    setHoverAnchorEl(null);
  };

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

  const handleClickClose = () => {
    onMouseLeave();
    onClose();
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

  const handleOptionSelect = (option) => {
    handleKeepOpenAccessBar();
    showAccessBar(true);
    setSelectedOption(option);
  };

  const handleMouseLeaveAccessToolBar = () => {
    if (accessBar) {
      handleKeepOpenAccessBar();
    } else {
      onMouseLeave();
    }
  };

  const handleNewChat = () => {
    setClearMessages(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline being added in textarea
      handleSend();
    }
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

  const handleDataValidation = () => {
    let generationType = "";
    let model = "";
    let modelType = "";

    if (selectedOption === "chat") {
      generationType = "text";
      model = selectedAiModel.modelName;
      modelType = selectedAiModel.model;
    } else if (selectedOption === "art") {
      generationType = "image";
      model = "openai";
      modelType = "dall-e-3";
    }

    return { generationType, model, modelType };
  };

  useEffect(() => {
    if (selectedText && !accessBar) {
        showAccessBar(true);
        setSelectedOption("chat")
    }
    setPrompt(selectedText);
    // Update prompt whenever selectedText changes 
  }, [selectedText]);

  const sendPrompt = () => {
    const { generationType, model, modelType } = handleDataValidation();
    const data = {
      prompt: prompt,
      model: model,
      model_type: modelType,
      generation_type: generationType,
      new_chat: newChat,
      image_size: artSize,
      image_type: artType,
    };

    if (userId) {
      data["user_id"] = userId;
    }

    if (chatId) {
      data["chat_id"] = chatId;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/root/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setRequestType("system");
        setNewMessage(response.data.text);
        setUserId(response.data.user_id);
        setChatId(response.data.chat_id);
        setNewChat(response.data.new_chat);
        setLoading(false);
        setIsImageVisible(false);
        setUserImage(null);
        setImageFile(null);
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
        setLoading(false);
      });
  };

  return (
    <div className="accesstoolbar-box">
      <Grid container className="accesstoolbar-container" columnSpacing={2}>
        <Grid item xs={10.5}>
          <div className="accesstoolbar-main">
            {accessBar ? (
              <div className="accesstoolbar-column1">
                {isAuthenticated ? (
                  <div>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: "8vh",
                          borderBottom: "1px solid #40B5AD",
                          display: "flex",
                          paddingLeft: "10px",
                        }}
                      >
                        <div className="title-logo-section">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            width="20"
                            height="20"
                            fill="#40B5AD"
                            className="bi bi-stars search-ai-logo"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
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
                        {selectedOption === "search" ? <Search /> : null}
                        {selectedOption === "chat" ? (
                          <ChatWindow
                            message={newMessage}
                            requestType={requestType}
                            clearMessages={clearMessages}
                            svgId={selectedAiModel.id}
                          />
                        ) : null}
                        {selectedOption === "summary" ? <Summary /> : null}
                        {selectedOption === "art" ? (
                          <Art
                            clearMessages={clearMessages}
                            message={newMessage}
                            requestType={requestType}
                            userImage={userImage}
                            resposeImage={responseImage}
                          />
                        ) : null}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{
                          height: "8vh",
                        }}
                      >
                        {selectedOption === "chat" ? (
                          <Grid
                            container
                            sx={{
                              height: "100%",
                              display: "flex",
                              alignItems: "end",
                              padding: "0 10px",
                            }}
                          >
                            <Grid item xs={3}></Grid>
                            <Grid item xs={9}>
                              <Grid
                                container
                                style={{
                                  height: "100%",
                                }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    height: "100%",
                                  }}
                                >
                                  <div
                                    onMouseEnter={handleMouseEnterModels}
                                    onMouseLeave={handleMouseLeaveModels}
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
                                          marginLeft: "5px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          fontFamily: "Roboto",
                                          fontWeight: 400,
                                          fontSize: "15px",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {selectedAiModel.text}
                                      </div>
                                      <div>
                                        <KeyboardArrowDownIcon
                                          sx={{
                                            pl: 0.5,
                                            transform: isHoveringModels
                                              ? "rotate(180deg)"
                                              : "rotate(0deg)",
                                            transition: "transform 0.1s",
                                          }}
                                        />
                                      </div>
                                    </button>

                                    <Popper
                                      sx={{
                                        zIndex: 2147483647,
                                      }}
                                      open={isHoveringModels}
                                      anchorEl={hoverAnchorEl}
                                      placement={"top-start"}
                                      transition
                                    >
                                      {({ TransitionProps }) => (
                                        <Fade
                                          {...TransitionProps}
                                          timeout={350}
                                        >
                                          <Paper
                                            sx={{
                                              backgroundColor: "white",
                                              marginBottom: "10px",
                                              width: "170px",
                                              height: "120px",
                                            }}
                                          >
                                            <Grid
                                              container
                                              spacing={2}
                                              sx={{ height: "100%" }}
                                            >
                                              <Grid
                                                item
                                                xs={12}
                                                sx={{ height: "100%" }}
                                              >
                                                <div
                                                  style={{
                                                    height: "100%",
                                                    overflowY: "auto",
                                                  }}
                                                >
                                                  {aiModels.map((item) => (
                                                    <div
                                                      key={item.text} // Ensure you use a unique key for each item
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
                                                          justifyContent:
                                                            "center",
                                                          alignItems: "center",
                                                          fontFamily: "Roboto",
                                                          fontWeight: 400,
                                                          fontSize: "15px",
                                                        }}
                                                      >
                                                        {item.text}
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </Grid>
                                            </Grid>
                                          </Paper>
                                        </Fade>
                                      )}
                                    </Popper>
                                  </div>

                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      width: "36px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "8px",
                                      backgroundColor: "#79CBC5",
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
                                            fontSize: "14px",
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
                                      <div style={{ width: "45px" }}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="23"
                                          height="23"
                                          class="bi bi-chat-left-text"
                                          style={{
                                            paddingTop: "5px",
                                          }}
                                          viewBox="0 0 16 16"
                                          onClick={() => handleNewChat()}
                                        >
                                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                      </div>
                                    </Tooltip>
                                  </div>

                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      width: "36px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "8px",
                                      backgroundColor: "#79CBC5",
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
                                          Filter
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
                                      <div
                                        style={{
                                          width: "45px",
                                          padding: "5px",
                                        }}
                                      >
                                        <svg
                                          class="svg-icon filter-settings-svg"
                                          viewBox="0 0 1034 1034"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M640 288a64 64 0 1 1 0.032-128.032A64 64 0 0 1 640 288z m123.456-96c-14.304-55.04-64-96-123.456-96s-109.152 40.96-123.456 96H128v64h388.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896V192h-132.544zM640 864a64 64 0 1 1 0.032-128.032A64 64 0 0 1 640 864m0-192c-59.456 0-109.152 40.96-123.456 96H128v64h388.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896v-64h-132.544c-14.304-55.04-64-96-123.456-96M384 576a64 64 0 1 1 0.032-128.032A64 64 0 0 1 384 576m0-192c-59.456 0-109.152 40.96-123.456 96H128v64h132.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896v-64H507.456c-14.304-55.04-64-96-123.456-96" />
                                        </svg>
                                      </div>
                                    </Tooltip>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}

                        {selectedOption === "art" ? (
                          <Grid
                            container
                            sx={{
                              height: "100%",
                              display: "flex",
                              alignItems: "end",
                              padding: "0 10px",
                            }}
                          >
                            <Grid item xs={3}></Grid>
                            <Grid item xs={9}>
                              <Grid
                                container
                                style={{
                                  height: "100%",
                                }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    height: "100%",
                                  }}
                                >
                                  <div>
                                    <button
                                      className="select-button"
                                      style={{
                                        width: "135px",
                                        justifyContent: "center",
                                      }}
                                      id={id}
                                      onClick={(e) => handleSelectAI(e)}
                                    >
                                      <div
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 47.5 47.5"
                                          id="art"
                                        >
                                          <defs>
                                            <clipPath id="a">
                                              <path d="M0 38h38V0H0v38Z"></path>
                                            </clipPath>
                                          </defs>
                                          <g
                                            clip-path="url(#a)"
                                            transform="matrix(1.25 0 0 -1.25 0 47.5)"
                                          >
                                            <path
                                              fill="#d99e82"
                                              d="M21.849 9.41c-.395-1.346-2.46-1.924-4.613-1.291-2.153.632-3.578 2.234-3.183 3.581.395 1.346 2.461 1.924 4.613 1.29 2.154-.631 3.579-2.233 3.183-3.58M19 33.857c-9.941 0-18-6.908-18-15.428 0-1.067.127-2.108.367-3.113C3.146 12.256 4.377 14.188 10 17c5.727 2.864 0-4-2-8-.615-1.231-.281-2.272.56-3.124C11.506 4.072 15.104 3 19 3c9.942 0 18 6.907 18 15.429 0 8.52-8.058 15.428-18 15.428"
                                            ></path>
                                            <path
                                              fill="#5c913b"
                                              d="M14 26a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
                                            ></path>
                                            <path
                                              fill="#269"
                                              d="M24 28a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
                                            ></path>
                                            <path
                                              fill="#dd2e44"
                                              d="M33 22a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
                                            ></path>
                                            <path
                                              fill="#ffcc4d"
                                              d="M32 13a3.001 3.001 0 0 0-6 0 3.001 3.001 0 0 0 6 0"
                                            ></path>
                                          </g>
                                        </svg>
                                      </div>
                                      <div
                                        style={{
                                          height: "20px",
                                          marginLeft: "5px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          fontFamily: "Roboto",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          whiteSpace: "nowrap",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        DALL E 3
                                      </div>
                                    </button>
                                  </div>

                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      width: "36px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "8px",
                                      backgroundColor: "#79CBC5",
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
                                            fontSize: "14px",
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
                                      <div style={{ width: "45px" }}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="23"
                                          height="23"
                                          class="bi bi-chat-left-text"
                                          style={{
                                            paddingTop: "5px",
                                          }}
                                          viewBox="0 0 16 16"
                                          onClick={() => handleNewChat()}
                                        >
                                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                      </div>
                                    </Tooltip>
                                  </div>

                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      width: "36px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "8px",
                                      backgroundColor: "#79CBC5",
                                      cursor: "pointer",
                                    }}
                                    onMouseEnter={handleArtFilterMouseEnter}
                                    onMouseLeave={handleArtFilterMouseLeave}
                                  >
                                    <Tooltip>
                                      <div
                                        style={{
                                          width: "45px",
                                          padding: "5px",
                                        }}
                                      >
                                        <svg
                                          className="svg-icon filter-settings-svg"
                                          viewBox="0 0 1034 1034"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M640 288a64 64 0 1 1 0.032-128.032A64 64 0 0 1 640 288z m123.456-96c-14.304-55.04-64-96-123.456-96s-109.152 40.96-123.456 96H128v64h388.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896V192h-132.544zM640 864a64 64 0 1 1 0.032-128.032A64 64 0 0 1 640 864m0-192c-59.456 0-109.152 40.96-123.456 96H128v64h388.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896v-64h-132.544c-14.304-55.04-64-96-123.456-96M384 576a64 64 0 1 1 0.032-128.032A64 64 0 0 1 384 576m0-192c-59.456 0-109.152 40.96-123.456 96H128v64h132.544c14.304 55.04 64 96 123.456 96s109.152-40.96 123.456-96H896v-64H507.456c-14.304-55.04-64-96-123.456-96" />
                                        </svg>
                                      </div>
                                    </Tooltip>
                                    <Popper
                                      sx={{
                                        zIndex: 2147483647,
                                      }}
                                      open={isHoveringArtFilter}
                                      anchorEl={hoverAnchorEl}
                                      placement={"top-start"}
                                      transition
                                    >
                                      {({ TransitionProps }) => (
                                        <Fade
                                          {...TransitionProps}
                                          timeout={350}
                                        >
                                          <Paper
                                            sx={{
                                              borderRadius: "3vh",
                                              boxShadow:
                                                "0 4px 30px rgba(0, 0, 0, 0.1)",
                                              backdropFilter: "blur(20px)",
                                              WebkitBackdropFilter:
                                                "blur(20px)",
                                              background:
                                                "rgba(255, 255, 255, 0.8)",
                                              marginBottom: "10px",
                                              width: "300px",
                                              height: "140px",
                                              zIndex: 2147483647, // Ensure zIndex is set here as well
                                            }}
                                          >
                                            <div className="art-filter-root-container">
                                              <div className="art-filter-title">
                                                Creative Options
                                              </div>
                                              <div className="art-size-dropdown-container">
                                                <select
                                                  id="size-dropdown"
                                                  value={artSize}
                                                  onChange={handleArtSize}
                                                  className="art-size-dropdown"
                                                >
                                                  <option value="" disabled>
                                                    Choose Image Size..
                                                  </option>
                                                  <option value="square">
                                                    Square
                                                  </option>
                                                  <option value="widescreen">
                                                    Wide Screen
                                                  </option>
                                                  <option value="portrait">
                                                    Portrait
                                                  </option>
                                                </select>
                                              </div>

                                              <div className="art-type-dropdown-container">
                                                <select
                                                  id="type-dropdown"
                                                  value={artType}
                                                  onChange={handleArtType}
                                                  className="art-type-dropdown"
                                                >
                                                  <option value="" disabled>
                                                    Choose Image Type..
                                                  </option>
                                                  <option value="vivid">
                                                    Art
                                                  </option>
                                                  <option value="natural">
                                                    Photo
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </Paper>
                                        </Fade>
                                      )}
                                    </Popper>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: "20vh",
                          padding: "10px",
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            border: "1px solid #40B5AD",
                            borderRadius: "0 0 25px 25px",
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
                                className="chat-text-area"
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
                              <Grid
                                item
                                xs={12}
                                container
                                justifyContent="flex-end"
                                gap={"10px"}
                                height={"40px"}
                              >
                                {selectedOption === "art" ? (
                                  <div className="image-attach-file-icon">
                                    <label style={{ cursor: "pointer" }}>
                                      {isImageVisible && userImage ? (
                                        <img
                                          src={userImage}
                                          alt="Uploaded"
                                          style={{
                                            maxWidth: "40px",
                                            maxHeight: "40px",
                                          }}
                                        />
                                      ) : (
                                        <Tooltip
                                          title="Attach file"
                                          placement="top"
                                          disableFocusListener
                                          disableTouchListener
                                          arrow
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
                                          <div style={{ paddingTop: "5px" }}>
                                            <AttachFileIcon />
                                          </div>
                                        </Tooltip>
                                      )}
                                      <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                      />
                                    </label>
                                  </div>
                                ) : (
                                  ""
                                )}

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
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "5vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Authentication isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </Grid>

        <Grid
          item
          xs={1.5}
          onMouseLeave={(e) => handleMouseLeaveAccessToolBar(e)}
          sx={{
            cursor: "pointer",
          }}
        >
          <div className="accesstoolbar-main">
            <div className="accesstoolbar-column2">
              <ActionToolBar
                handleSelectedOption={handleOptionSelect}
                handleClosed={handleClickClose}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewAccessBar;
