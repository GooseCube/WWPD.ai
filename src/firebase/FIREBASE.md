# Firebase

Deployment Resource for Firebase: [Host & Deploy App with Firebase](https://www.freecodecamp.org/news/how-to-deploy-a-react-app-with-firebase/)

## Environment Variables for Firebase

You will need to create a new file `.env` at the /root of the application and add the following environment variable as:

```js
VITE_FIREBASE_API_KEY = "aStringGoesHere";
// remaining firebaseConfig variables using same VITE_FIREBASE naming convention
VITE_FIREBASE_APP_ID = "aStringGoesHere";
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

## Available Firebase Functions

firebase/database package:
Please note that this is not an exhaustive list and there are other functions available as well. You can find more details in the [Firebase Database Documentation](https://firebase.google.com/docs/reference/js/database)

```js
ref(database: Database, path?: string): Reference // Returns a Reference representing the location in the Database corresponding to the provided path. If no path is provided, the Reference will point to the root of the Database.

push(parent: Reference, value?: unknown): ThenableReference // Generates a new child location using a unique key and returns its Reference.

set(ref: Reference, value: unknown): Promise<void> // Writes data to this Database location.

update(ref: Reference, value: object): Promise<void> //- Updates data at this Database location.

remove(ref: Reference): Promise<void> //- Removes the data at this Database location.

onValue(ref: Reference, callback: (snapshot: DataSnapshot) => void): () => void //- Listens for data changes at a particular location.

off(ref: Reference, eventType?: EventType, callback?: (a: DataSnapshot, b?: string | null) => unknown, context?: object | null): void //- Detaches a callback previously attached with onValue().

get(ref: Reference): Promise<DataSnapshot> //- Fetches the data from this Database location.

child(parent: Reference, path: string): Reference //- Returns a reference to a relative path from this location.

parent(ref: Reference): Reference | null //- Returns a reference to the parent of the current location.

root(ref: Reference): Reference //- Returns a reference to the root of the Database.

transaction(ref: Reference, transactionUpdate: (a: unknown) => unknown, onComplete?: ((a: Error | null, b: boolean, c: DataSnapshot | null) => void) | null, applyLocally?: boolean): Promise<TransactionResult> //- Atomically modifies the data at this location.

```
