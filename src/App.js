import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import ChatRoom from "./components/ChatRoom/ChatRoom";

import { auth } from "./services/firebase";
import { v4 as uuid } from "uuid";
import { useAuth } from "./hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

function App() {
  const { user } = useAuth();

  console.log(user);

  // const [user, setUser] = useState(null);

  // const [userName, setUserName] = useState("");

  // const userProfileColors = [
  //   "#F49D1A",
  //   "#432C7A",
  //   "#395144",
  //   "#EA047E",
  //   "#2192FF",
  //   "#F96666",
  // ];

  // const handleSubmit = () => {
  //   const userData = {
  //     name: userName,
  //     uid: uuid(),
  //     profileColor:
  //       userProfileColors[Math.floor(Math.random() * userProfileColors.length)],
  //   };

  //   setUser(userData);
  //   localStorage.setItem("cool-chat-temp-user", JSON.stringify(userData));
  //   setUserName("");
  // };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("cool-chat-temp-user"));

  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);

  // const handleChangeName = () => {
  //   localStorage.removeItem("cool-chat-temp-user");
  //   setUser(null);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <>
          {user ? (
            <ChatRoom auth={auth} user={user} changeName={() => {}} />
          ) : (
            <UnauthenticatedApp />
          )}
        </>
      </header>
    </div>
  );
}

export default App;

function UnauthenticatedApp() {
  const { login } = useAuth();
  return (
    <div className="app-container">
      <h2>Log in to join a chat room!</h2>
      <button onClick={login} className="app-container__login">
        <FaGoogle color="#282c34" style={{ marginRight: 10 }} />
        Login with Google
      </button>
    </div>
  );
}
