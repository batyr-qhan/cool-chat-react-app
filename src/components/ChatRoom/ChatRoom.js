import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { db, getMessages, sendMessage } from "../../services/firebase";

import "./styles.css";

import {
  collection,
  addDoc,
  FieldValue,
  query,
  getDocs,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function ChatRoom({ user, changeName }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    const unsubscribe = getMessages(setMessages);
    return unsubscribe;
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    sendMessage(formValue, user, setFormValue);

    // addDoc(collection(db, "messages"), {
    //   uid: user.uid,
    //   displayName: user.name,
    //   text: formValue.trim(),
    //   timestamp: serverTimestamp(),
    //   profileColor: user?.profileColor,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setFormValue("");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="chat-room-container">
      <section className="messages-header">
        <div>welcome to 🔥 chat</div>
        <button onClick={changeName}>Change Name</button>
      </section>
      <section className="messages-container" ref={containerRef}>
        {messages &&
          messages.map((msg) => (
            <MemoizedChatMessage
              key={msg.id}
              message={msg}
              isOwnMessage={msg.uid === user.uid}
              userName={msg.displayName}
            />
          ))}

        {/* <span ref={dummy}></span> */}
      </section>

      <form onSubmit={handleSendMessage} className="input-field-wrapper">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="let's chat"
          className="input-field-wrapper__field"
        />

        <button
          type="submit"
          disabled={!formValue}
          className={`input-field-wrapper__button ${
            !formValue && "disabledBtn"
          }`}
        >
          <span>🕊️</span>
        </button>
      </form>
    </div>
  );
}

const MemoizedChatMessage = memo(ChatMessage);

function ChatMessage({ isOwnMessage, message, userName }) {
  const { text, uuid, photoURL } = message;
  const firstLetter = userName.charAt(0);

  return (
    <>
      <div className={`message ${isOwnMessage && "own-message"}`}>
        {/* <img src={photoURL} /> */}
        <span
          className="message__avatar"
          style={{
            backgroundColor: message?.profileColor,
          }}
        >
          {firstLetter}
        </span>
        <p>{text}</p>
      </div>
    </>
  );
}
