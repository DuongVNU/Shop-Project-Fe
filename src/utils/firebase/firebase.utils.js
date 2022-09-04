import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrYeUgjT6xHBu1dm_49nVTTexMLL3JiPU",
  authDomain: "du-an-cuoi-khoa-9-2022.firebaseapp.com",
  projectId: "du-an-cuoi-khoa-9-2022",
  storageBucket: "du-an-cuoi-khoa-9-2022.appspot.com",
  messagingSenderId: "616354502985",
  appId: "1:616354502985:web:f4b233b60eba22cc946298"
};

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: "select-account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {displayName, email, createdAt})
    } catch (e) {
      console.log('error crerating the user', e.message)
    }
  }
  return userDocRef;
}
