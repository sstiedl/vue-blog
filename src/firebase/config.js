import {initializeApp } from 'firebase/app'
import {getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_YbY0JGV9uRrXtgee-k8Zqfr9J-GYpyE",
  authDomain: "vuex-blog-7e396.firebaseapp.com",
  projectId: "vuex-blog-7e396",
  storageBucket: "vuex-blog-7e396.appspot.com",
  messagingSenderId: "611692087623",
  appId: "1:611692087623:web:d10485474b5fe7e1d32462"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore service
/* OLD

const projectFirestore = firebase.firestore()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp */

const db = getFirestore()


//init auth
const auth = getAuth()

// export firestore
export { db, auth,  }