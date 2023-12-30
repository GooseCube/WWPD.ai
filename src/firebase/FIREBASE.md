# Firebase

Deployment Resource for Firebase: [Host & Deploy App with Firebase](https://www.freecodecamp.org/news/how-to-deploy-a-react-app-with-firebase/)

## Environment Variables for Firebase

You will need to create a new file `.env` at the /root of the application and add the following environment variable as:

```js
VITE_FIREBASE_API_KEY="aStringGoesHere"
// remaining firebaseConfig variables using same VITE_FIREBASE naming convention
VITE_FIREBASE_APP_ID="aStringGoesHere"
```

If you want to change the Firebase configuration (i.e. use your own database) then you will need to create a Firebase Realtime Database project using your credentials. Create a new project, and add `</>` a web app as the option. After creating the new project and `</>` web app, you will need to open the 'Project Overview' options for 'Project Settings' to copy the 'npm' firebaseConfig object containing the following information:

```js
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "astringOfGivenValues",
  authDomain: "astringOfGivenValues.firebaseapp.com",
  databaseURL: "https://forYourGivenURL.firebaseio.com",
  projectId: "astringOfGivenValues",
  storageBucket: "astringOfGivenValues.appspot.com",
  messagingSenderId: "astringOfGivenValues",
  appId: "astringOfGivenValues",
  measurementId: "thisOneIsOptional",
};
```

## Firebase SDK Version 7.20.0

SDK's for Firebase, allowing quick interaction with your database. The initalizeApp and getAnalytics are part of the Firebase SDK.

```bash
yarn add firebase
```

## Login Page

The only login currently Authorized for Firebase is:

```js
email: goosecube1@gmail.com
password: Green_Flat_Cart_$ky_double
```
