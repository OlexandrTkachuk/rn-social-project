import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCI-6mUx_SZRpuTYvCf1dbkJxX4fnL9YRY",
	authDomain: "rn-socail-project.firebaseapp.com",
	databaseURL:
		"https://rn-socail-project-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "rn-socail-project",
	storageBucket: "rn-socail-project.appspot.com",
	messagingSenderId: "703519576286",
	appId: "1:703519576286:web:699e4d6ede94e4359a324f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
