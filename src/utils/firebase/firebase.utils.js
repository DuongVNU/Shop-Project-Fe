import {initializeApp} from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from 'firebase/auth'
import {collection, doc, getDoc, getFirestore, query, setDoc, writeBatch, getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrYeUgjT6xHBu1dm_49nVTTexMLL3JiPU",
  authDomain: "du-an-cuoi-khoa-9-2022.firebaseapp.com",
  projectId: "du-an-cuoi-khoa-9-2022",
  storageBucket: "du-an-cuoi-khoa-9-2022.appspot.com",
  messagingSenderId: "616354502985",
  appId: "1:616354502985:web:f4b233b60eba22cc946298"
};

initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: "select-account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object);
  })
  await batch.commit();
  console.log('DONE')
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

