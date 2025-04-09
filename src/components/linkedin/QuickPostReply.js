import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import QuickPostBox from "./Post";

const QuickPostReply = () => {
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [quickPostBox, setQuickPostBox] = useState(null); // State to manage quick post box
  const textareaRef = useRef(null);

  useEffect(() => {
    const createQuickReplyButton = (navBar) => {
      if (
        navBar.matches(".comments-comment-social-bar--cr") &&
        navBar.closest(".comments-replies-list")
      ) {
        return; // Do not create the button in this case
      }

      if (
        navBar.matches(".comments-comment-social-bar.display-flex") &&
        navBar.closest(".comments-social-activity__nested-items")
      ) {
        return; // Do not create the button in this case
      }

      if (navBar.querySelector(".quick-reply-button-wrapper")) {
        return; // Button already exists, do not create another one
      }

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className =
        "feed-shared-social-action-bar__action-button quick-reply-button-wrapper";

      const button = document.createElement("button");
      button.innerText = "QuickReply";
      button.className =
        "artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary";
      button.style.backgroundColor = "#4fd1ba";
      button.style.fontSize = "14px";
      button.style.padding = "5px 10px"; // Make the button smaller
      button.style.minHeight = "3rem";
      buttonWrapper.appendChild(button);
      buttonWrapper.style.padding = "10px";
      button.addEventListener("click", (event) => {
        event.stopPropagation();

        if (navBar.matches(".feed-shared-social-action-bar--full-width")) {
          const commentButton = navBar.querySelector(
            'button[aria-label^="Comment"]'
          );
          if (commentButton) {
            commentButton.click();
          }
        } 

        if (navBar.matches(".comments-comment-social-bar--cr") || navBar.matches(".comments-comment-social-bar.display-flex")) {
          const replyButton = navBar.querySelector('button[aria-label^="Reply"]');
          if (replyButton) {
            replyButton.click();
          }
        }
        

        document.querySelector(".quick-reply-dropdown")?.remove();

        const dropdown = document.createElement("div");
        dropdown.className = "quick-reply-dropdown";
        Object.assign(dropdown.style, {
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid #4fd1ba",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1000",
          width: "150px", // Decrease the width of the dropdown
        });

        const replies = [
          // {
          //   text: "Improve My Reply",
          //   response: "improvise the above LinkedIn reply",
          // },
          // { isSeparator: true },
          {
            text: "🙌 Thank",
            response:
              "Reply precisely (less than 4 sentences) to the above text belong to a LinkedIn post in thankful way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "🤝 Congratulate",
            response:
              "Reply precisely (less than 4 sentences) to the above text belong to a LinkedIn post in congratulatory way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "👏 Appreciate ",
            response:
              "Reply precisely (less than 4 sentences) to the above content of LinkedIn post in an appreciative way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "👌 Show Suprise",
            response:
              "Reply precisely (less than 4 sentences) to the above text belong to a LinkedIn post in surprising way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "👍 Support/Agree",
            response:
              "Reply precisely (less than 4 sentences) to the above text belong to a LinkedIn post in supportive way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "👎 Oppose/Disagree",
            response:
              "Reply precisely in less than 5 sentences to the above text belong to a LinkedIn post in opposing/disagreeing way. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
          {
            text: "🤚 Show Interest",
            response:
              "Reply precisely in less than 3 sentences to the above text belong to a LinkedIn post. Show interest to the Job/Event. Just give the reply and don't add 'Here is the reply:' kind of text. Don't add hashtags",
          },
        ];

        replies.forEach((reply) => {
          const item = document.createElement("div");
          item.innerText = reply.text;
          Object.assign(item.style, {
            padding: "5px", // Decrease the padding of the dropdown items
            cursor: "pointer",
            fontSize: "14px", // Match the font size of the button
          });

          item.addEventListener("click", () => {
            const postElement = navBar.closest(
              "div[data-id], article[data-id], div[data-urn]"
            );
            let postTextSpan = null;
            let commentBoxP = null;

            if (postElement) {
              if (
                navBar.matches(".feed-shared-social-action-bar--full-width")
              ) {
                //unique post
                postTextSpan = postElement.querySelector(
                  ".break-words.tvm-parent-container span[dir]"
                );
                commentBoxP = postElement.querySelector(
                  ".comments-comment-box.comments-comment-box--has-avatar .ql-editor.ql-blank p"
                );

                if (!commentBoxP) {
                  commentBoxP = postElement.querySelector(
                    ".comments-comment-box--cr.comments-comment-box--has-avatar .ql-editor.ql-blank p"
                  );
                }
              } else if (navBar.matches(".comments-comment-social-bar--cr")) {
                // matched reply section
                const commentItem = navBar.closest(
                  "article.comments-comment-item, article.comments-comment-entity, article.comments-comment-item .comments-reply-item .reply-item"
                );
                const updateTextDiv = commentItem?.querySelector(
                  "div.update-components-text.relative"
                );
                postTextSpan = updateTextDiv?.querySelector("span[dir='ltr']");
                commentBoxP = commentItem?.querySelector(
                  ".comments-comment-box.comments-comment-box--has-avatar.comments-comment-item__comment-box .ql-editor p"
                );
                if (!commentBoxP) {
                  commentBoxP = commentItem?.querySelector(
                    ".comments-comment-texteditor .ql-editor p"
                  );
                }
              } else if (
                navBar.matches(".comments-comment-social-bar.display-flex")
              ) {
                //matches reply section
                const commentItem = navBar.closest(
                  "article.comments-comment-item, article.comments-comment-item .comments-reply-item .reply-item"
                );
                const updateTextDiv = commentItem?.querySelector(
                  "div.update-components-text.relative"
                );
                postTextSpan = updateTextDiv?.querySelector("span[dir='ltr']");
                commentBoxP = commentItem?.querySelector(
                  ".comments-comment-box.comments-comment-box--has-avatar.comments-comment-item__comment-box .ql-editor p"
                );
                if (!commentBoxP) {
                  commentBoxP = commentItem?.querySelector(
                    ".comments-comment-texteditor .ql-editor p"
                  );
                }
              }
            } else {
              const postElementByUrn = navBar.closest(
                "div[data-urn], div[data-chameleon-result-urn]"
              );

              if (postElementByUrn) {
                postTextSpan = postElementByUrn.querySelector(
                  "span.break-words.tvm-parent-container .text-view-model"
                );
                if (!postTextSpan) {
                  postTextSpan = postElementByUrn.querySelector("p.relative");
                }
                commentBoxP = postElementByUrn.querySelector(
                  ".comments-comment-box--cr.comments-comment-box--has-avatar .ql-editor.ql-blank p"
                );

                if (!commentBoxP) {
                  commentBoxP = postElementByUrn.querySelector(
                    ".comments-comment-box.comments-comment-box--has-avatar .ql-editor.ql-blank p"
                  );
                }
              }
            }

            if (postTextSpan && commentBoxP) {
              const extractedText = postTextSpan.innerText;
              const fullPrompt =
                reply.text === "Improve My Reply"
                  ? `${commentBoxP.innerText}\n${reply.response}`
                  : `${extractedText}\n${reply.response}`;

              commentBoxP.innerHTML = "<b>Getting ready...</b>";
              commentBoxP.style.color = "green";

              const data = {
                prompt: fullPrompt,
                model: "openai",
                model_type: "gpt-3.5-turbo-16k",
                generation_type: "text",
                new_chat: "new",
              };
              if (userId) {
                data["user_id"] = userId;
              }

              if (chatId) {
                data["chat_id"] = chatId;
              }

              const simulateStreamingResponse = (text) => {
                const words = text.split(" ");
                let index = 0;
                const intervalId = setInterval(() => {
                  if (index < words.length) {
                    commentBoxP.innerText += ` ${words[index]}`;
                    index++;
                  } else {
                    clearInterval(intervalId);
                    commentBoxP.style.color = "black";
                  }
                }, 200); // Adjust the interval time as needed
              };

              axios
                .post(
                  "http://127.0.0.1:8000/api/root/",
                  data
                )
                .then((response) => {
                  commentBoxP.innerText = ""; // Clear the initial "SearchAI typing..." text
                  simulateStreamingResponse(
                    response.data.text || "Response from API"
                  );
                  commentBoxP.style.color = "black";
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
            dropdown.remove();
          });

          item.addEventListener("mouseover", () => {
            item.style.backgroundColor = "#4fd1ba";
          });
          item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "white";
          });

          dropdown.appendChild(item);
        });

        const rect = button.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(dropdown);

        const handleClickOutside = (event) => {
          if (!dropdown.contains(event.target)) {
            dropdown.remove();
            document.removeEventListener("mousedown", handleClickOutside);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
      });

      navBar.appendChild(buttonWrapper);
    };

    const createQuickPostButton = (footer) => {
      if (footer.querySelector(".quick-post-button-wrapper")) {
        return; // Button already exists, do not create another one
      }

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "quick-post-button-wrapper";

      const button = document.createElement("button");
      button.innerText = "QuickPost";
      button.className =
        "artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary";
      button.style.backgroundColor = "#4fd1ba";
      button.style.fontSize = "14px";
      button.style.padding = "5px 10px"; // Make the button smaller
      button.style.minHeight = "3rem";
      buttonWrapper.appendChild(button);
      buttonWrapper.style.padding = "10px";

      button.addEventListener("click", () => {
        const shareBox = footer.closest(".share-box");

        if (shareBox && !shareBox.querySelector(".quick-post-box")) {
          const handleGet = () => {
            const prompt = `${textareaRef.current.value}\nWrite a LinkedIn post for the above context with hashtags and emojis. The response should only include the post content without any introductions or additional comments:`;
            if (prompt) {
              const editorContentP = shareBox.querySelector(
                "div.editor-content.ql-container p"
              );

              if (editorContentP) {
                editorContentP.innerHTML = "<b>Getting ready..</b>";
                editorContentP.style.color = "green";

                const loadingMessages = [
                  "<b>Getting ready</b>",
                  "<b>Getting ready...</b>",
                  "<b>Getting ready.....</b>",
                ];
                let loadingIndex = 0;

                const loadingInterval = setInterval(() => {
                  loadingIndex = (loadingIndex + 1) % loadingMessages.length;
                  editorContentP.innerHTML = loadingMessages[loadingIndex];
                }, 500); // Change every second

                const data = {
                  prompt: prompt,
                  model: "openai",
                  model_type: "gpt-3.5-turbo-16k",
                  generation_type: "text",
                  new_chat: "new",
                };
                if (userId) {
                  data["user_id"] = userId;
                }

                if (chatId) {
                  data["chat_id"] = chatId;
                }

                axios
                  .post(
                    "http://127.0.0.1:8000/api/root/",
                    data
                  )
                  .then((response) => {
                    clearInterval(loadingInterval);
                    const filteredResponse = response.data.text
                      .split("\n")
                      .filter(
                        (sentence) =>
                          !sentence.startsWith("Here is a draft......")
                      )
                      .join("\n");

                    const formattedResponse = filteredResponse.replace(
                      /\n/g,
                      "\n"
                    );
                    editorContentP.innerText = " ";
                    editorContentP.innerHTML =
                      formattedResponse || "Response from API";
                    editorContentP.style.color = "black";
                  })
                  .catch((error) => {
                    clearInterval(loadingInterval);
                    editorContentP.innerText = "Error fetching response";
                    editorContentP.style.color = "red";
                  });
              } else {
                console.error("Editor content <p> element not found.");
              }
            }
            setQuickPostBox(null);
          };

          setQuickPostBox(
            <QuickPostBox
              onGet={handleGet}
              textareaRef={textareaRef}
              onClose={() => setQuickPostBox(null)}
            />
          );
        }
      });

      footer.appendChild(buttonWrapper);
    };

    const applyQuickReplyButtons = (selector) => {
      document
        .querySelectorAll(selector)
        .forEach((navBar) => createQuickReplyButton(navBar));
    };

    const applyQuickPostButton = (selector) => {
      document
        .querySelectorAll(selector)
        .forEach((footer) => createQuickPostButton(footer));
    };

    applyQuickReplyButtons(
      ".feed-shared-social-action-bar.feed-shared-social-action-bar--full-width"
    );
    applyQuickReplyButtons(".comments-comment-social-bar.display-flex");
    applyQuickReplyButtons(".comments-comment-social-bar--cr");
    applyQuickPostButton(".share-creation-state__footer.justify-flex-end");
    applyQuickPostButton(".share-creation-state__footer");

    const intervalId = setInterval(() => {
      applyQuickReplyButtons(
        ".feed-shared-social-action-bar.feed-shared-social-action-bar--full-width"
      ); // for comment button
      applyQuickReplyButtons(".comments-comment-social-bar.display-flex"); // for reply button
      applyQuickReplyButtons(".comments-comment-social-bar--cr"); // for updated reply button
      applyQuickPostButton(".share-creation-state__footer.justify-flex-end"); // for post button
      applyQuickPostButton(".share-creation-state__footer"); // for updated post button
    }, 3000); // Check every 3 seconds

    return () => {
      clearInterval(intervalId);
      document
        .querySelectorAll(".quick-reply-button-wrapper")
        .forEach((button) => button.remove());
      document
        .querySelectorAll(".quick-reply-dropdown")
        .forEach((dropdown) => dropdown.remove());
      document
        .querySelectorAll(".quick-post-button-wrapper")
        .forEach((button) => button.remove());
      document
        .querySelectorAll(".quick-post-box")
        .forEach((box) => box.remove());
    };
  }, []);

  return <>{quickPostBox}</>;
};

export default QuickPostReply;
