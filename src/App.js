import "./App.css";
import AccessButtons from "./components/sidebar/AccessButtons";
import GmailComposeButton from "./components/gmail/ComposeButton";
import GmailReplyButton from "./components/gmail/ReplyButton";
import GmailSummarizeButton from "./components/gmail/SummarizeButton";
import "../src/styles/GmailButtons.css";
import QuickPostReply from "./components/linkedin/QuickPostReply";
import SelectText from "./components/selectedText/SelectedText";

function App() {
  const currentPath = window.location.href;
  const isLinkedInFeed = currentPath === "https://www.linkedin.com/feed/";
  return (
    <div className="App">
      <AccessButtons />
      <GmailComposeButton />
      <GmailReplyButton />
      <GmailSummarizeButton />
      <SelectText />
      {isLinkedInFeed && <QuickPostReply />}
    </div>
  );
}

export default App;
