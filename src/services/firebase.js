import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

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
    query(collection(db, "messages"), orderBy("timestamp", "asc")),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("its mess", messages);
      callback(messages);
    }
  );
}

// export async function sendMessage(text) {
//   try {
//     await addDoc(collection(db, "messages"), {
//       // uid: user.uid,
//       // displayName: user.displayName,
//       text: text.trim(),
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

export default app;
