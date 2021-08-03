import { useState, useEffect } from "react";
import { projectFirestore} from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // .collection listens to changes in the firestore databse. this returns a function that we can use to stop listening to changes in the collection - we invoke this function in the cleanup of useEffect
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc') // order by date, newest first
      // 'snap' is listening to the images both initially added and updated in the image collection
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        })
        setDocs(documents) // update the docments with updated documents
      });

      // cleanup - whenever the <imageGrid/> component unmounts (i.e., no longer in use)
      return () => unsub(); // unsubscribe from the collection when we no longer use it
  }, [collection])

  return { docs }
}

export default useFirestore;
