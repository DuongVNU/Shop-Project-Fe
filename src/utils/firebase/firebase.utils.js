import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: "select-account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return ;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      
      })
    } catch (e) {
      console.log('error crerating the user', e.message)
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}
