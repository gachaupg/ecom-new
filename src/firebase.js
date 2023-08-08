  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import firebase from 'firebase/app'
  import 'firebase/auth'
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAD_pg-tcZgTGUdYaCdjGhB0PwK2WacThs",
    authDomain: "tp-demo-b0e72.firebaseapp.com",
    projectId: "tp-demo-b0e72",
    storageBucket: "tp-demo-b0e72.appspot.com",
    messagingSenderId: "665099579458",
    appId: "1:665099579458:web:c9e54677845ab8657d7ddb"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase