// import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
// NEXT_PUBLIC_FIREBASE_APP_ID=1: 435859134143: web: 1190ab7a3db362e0cbd80a

// const app = initializeApp(firebaseConfig);

//   const storage = getStorage(app);

//   export const uploadImage = (file: any): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const name = Date.now() + file.name;
//       const storageRef = ref(storage, name);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//             default:
//           }
//         },
//         (error) => {
//           // Handle upload error if needed
//           reject(error);
//         },
//         () => {
//           // Upload completed successfully, now get the download URL
//           getDownloadURL(uploadTask.snapshot.ref)
//             .then((downloadURL) => {
//               console.log("File available at", downloadURL);
//               resolve(downloadURL); // Resolve the Promise with the download URL
//             })
//             .catch((error) => {
//               reject(error); // Reject the Promise if there's an error getting the download URL
//             });
//         }
//       );
//     });
//   };

//   // Upload image from React Native URI (Expo ImagePicker)
//   export const uploadImageFromUri = async (uri: string, folder: string = "fuel-slips"): Promise<string> => {
//     try {
//       // Fetch the image as blob
//       const response = await fetch(uri);
//       const blob = await response.blob();

//       // Create unique filename
//       const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
//       const storageRef = ref(storage, filename);

//       // Upload the blob
//       const uploadTask = uploadBytesResumable(storageRef, blob);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress.toFixed(0)}% done`);
//           },
//           (error) => {
//             console.error("Upload error:", error);
//             reject(error);
//           },
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             console.log("File uploaded successfully:", downloadURL);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };



import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// ✅ Correct Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ Prevent multiple app init (Next.js issue fix)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Storage init
const storage = getStorage(app);

// ✅ Upload from file input (WEB)
export const uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filename = `products/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress.toFixed(0)}% done`);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at:", downloadURL);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

// ✅ Upload from URI (ONLY client-side / React Native)
export const uploadImageFromUri = async (
  uri: string,
  folder: string = "products"
): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const filename = `${folder}/${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}.jpg`;

    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(0)}% done`);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};