import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import  { useAuthState} from 'react-firebase-hooks/auth';
import  { useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCCvZcsDLgsRYe1zxgA228Dye-CCxqrQ20",
  authDomain: "piperchat-8f320.firebaseapp.com",
  databaseURL: "https://piperchat-8f320.firebaseio.com",
  projectId: "piperchat-8f320",
  storageBucket: "piperchat-8f320.appspot.com",
  messagingSenderId: "1019547675639",
  appId: "1:1019547675639:web:b84f1c090346767fd05cf2",
  measurementId: "G-FQSBPLW4NM"
});
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? <ChatRoom />: <SignIn />}
        </section>
      </header>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>
    </>
  )

}

function ChatMessage(props) {
  const {text, uid} = props.message;
  return <p>{text}  <SignOut /></p>
}

export default App;
