import { useState, useEffect } from "react";


const useStream = ({ path, maxMessages }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [latestMessage, saveMessage] = useState("");

  useEffect(() => {
    if (isPaused) {
      console.log(latestMessage);
      return;
    }
    if (messageList.length < maxMessages) {
      setMessageList(oldMessages => oldMessages.concat(latestMessage));
    } else {
      setMessageList(oldMessages => [...oldMessages.slice(1), latestMessage]);
    }
  }, [latestMessage, isPaused]);

  const initSocket = () => {
    window.__sockets__[path].ws.onopen = () => console.log("socket open");
    window.__sockets__[path].ws.onclose = () => console.log("socket closed");
    window.__sockets__[path].ws.addEventListener("message", message =>
      saveMessage(JSON.parse(message.data))
    );
  };

  useEffect(() => {
    initSocket();
  }, []);

  return { isPaused, setIsPaused, messageList };
};

export default useStream
