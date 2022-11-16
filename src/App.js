import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import ChatRoom from "./components/ChatRoom/ChatRoom";

import { auth } from "./services/firebase";
import { v4 as uuid } from "uuid";

function App() {
  const [user, setUser] = useState(null);

  const [userName, setUserName] = useState("");

  const userProfileColors = [
    "#F49D1A",
    "#432C7A",
    "#395144",
    "#EA047E",
    "#2192FF",
    "#F96666",
  ];

  const handleSubmit = () => {
    const userData = {
      name: userName,
      uid: uuid(),
      profileColor:
        userProfileColors[Math.floor(Math.random() * userProfileColors.length)],
    };

    setUser(userData);
    localStorage.setItem("cool-chat-temp-user", JSON.stringify(userData));
    setUserName("");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cool-chat-temp-user"));

    if (user) {
      console.log(user);
      setUser(user);
    }
  }, []);

  const handleChangeName = () => {
    localStorage.removeItem("cool-chat-temp-user");
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          {user ? (
            <ChatRoom auth={auth} user={user} changeName={handleChangeName} />
          ) : (
            <div className="set-name-input-container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="set-user-name" />
                <input
                  id="set-user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button
                  disabled={!userName}
                  className={`${!userName && "disabled"}`}
                  type="submit"
                >
                  start 💬
                </button>
              </form>
            </div>
          )}
        </>
      </header>
    </div>
  );
}

export default App;

// function SignIn() {
//   signInAnonymously(auth)
//     .then(() => {
//       // Signed in..
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//       // ...
//     });

//   return <button onClick={signInAnonymously}>Sign in with Google</button>;
// }
