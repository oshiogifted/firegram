import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timeStamp } from '../firebase/config';

// Custom Hook responsible for handling file uploads and returning useful values (such as, progress, errors, and image url after uploaded)

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');

    //upload the file to the reference
    // .on() -> listens for events 
    // we listen to whenever the state changes / progress changes and fire a function
    // 'snap' is a snapshot in time of the upload of that moment in time
    storageRef.put(file).on('state_changed', (snap) => {
      // figure out progress/percentage of upload
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage); // between 0-100
    }, (err) => {
      setError(err); // error - if any
    }, async () => {
      // get the download url from the file we uploaded
      const url = await storageRef.getDownloadURL();
      // store the url and time it was created in firebase firestore database
      const createdAt = timeStamp();
      collectionRef.add({ url, createdAt }); // key:value pairs (url: url - shorted to just url)
      setUrl(url); // download url
    })
  }, [file]);

  return { progress, url, error } // we access this values in another component
}

export default useStorage;