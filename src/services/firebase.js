import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  limit,
  limitToLast,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// import "firebase/firestore";
// import "firebase/auth";

const firebaseConfig = {
  // your config
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "cool-chat-react-app-1.firebaseapp.com",
  projectId: "cool-chat-react-app-1",
  storageBucket: "cool-chat-react-app-1.appspot.com",
  messagingSenderId: "646678934600",
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function getMessages(callback) {
  return onSnapshot(
    query(
      collection(db, "messages"),
      orderBy("timestamp", "asc"),
      limitToLast(30)
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

export function sendMessage(text, user, callback) {
  addDoc(collection(db, "messages"), {
    uid: user.uid,
    displayName: user.name,
    text: text.trim(),
    timestamp: serverTimestamp(),
    profileColor: user?.profileColor,
  })
    .then((res) => {
      callback("");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

// export function handleLogout() {
//   try {
//     signOut()
//   }
// }

export default app;
