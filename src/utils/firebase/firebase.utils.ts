import {initializeApp} from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
  NextOrObserver
} from 'firebase/auth'
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  writeBatch,
  getDocs
} from 'firebase/firestore'
import {Category} from "../../store/categories/category.types";

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

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object);
  })
  await batch.commit();
  console.log('DONE')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as Category)

}

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  email: string;
  createdAt: Date;
  displayName: string;
}


export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
        displayName, email, createdAt, ...additionalInformation

      })
    } catch (e) {
      console.log('error creating the user', e)
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth)
      },
      reject
    )
  })
}