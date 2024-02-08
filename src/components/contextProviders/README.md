# Show Provider

This provider allows flags that are used or could be used in several places within the application to become easily and globally accessible.

## React Documentation

- [useReducer](https://react.dev/reference/react/useReducer)
- [Scaling with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)

## SetUp

In `main.jsx` I have wrapped the `<App />` with the `<ShowProvider />` to pass down the {children} to the rest of the tree. This eliminates the need to push each object down the tree commonly referred to as `prop drilling`.

```js
<AuthProvider>
  <ShowProvider>
    <App />
  </ShowProvider>
</AuthProvider>
```

The implementation ensures that the AuthProvider is still preventing login until a valid username and password are entered. Then, ShowProvider will give access to the objects globally.

## Use Show and Dispatch

To use a particular flag in your component you will import `useShow` from the ShowContext file path.

Destructure the call to `useShow` which gives you `show` and `dispatch`. The `dispatch` is a function call to set the flag/object which requires that the `type: 'FLAG_NAME'` is specific to the flag you want to change and must match the switch () case: in the ShowProvider file.

Here is a simple example of how to use the ShowProvider:

```js
import { useShow } from "./path/to/ShowProvider";

function YourBadAssComponent() {
  const { show, dispatch } = useShow();

  const handleThatClick = (event) => {
    event.preventDefault(); // if you want to prevent unnecessary render

    // Calls switch to find 'FLAG_NAME' and changes the boolean value
    dispatch({ type: "FLAG_NAME", payload: !show.myFlag });
  };

  return (
    <div>
      <button onClick={(event) => handleThatClick(event)}>Click This</button>
    </div>
  );
}
```

## Use Show.myFlag to Hide Component

Quick example of how to use `show` to hide or show a component:

```js
import { useShow } from "./path/to/ShowProvider";

function YourBadAssComponent() {
  const { show, dispatch } = useShow();

  // some other statements or useEffect() . . .

  return show.myFlag && <div>Things to show if 'show.myFlag' is 'true'</div>;
}
```

OR, you can use a flag as a ternary:

```js
import { useShow } from "./path/to/ShowProvider"

function YourBadAssComponent() {
  const { show, dispatch } = useShow();

  // some other statements or useEffect() . . .

  // Ternary operator for 'expression === true ? if true : if false'
  return show.myFlag ? (
    <div>Things to show if 'show.myFlag' is 'true'</div>
    :
    <div>Something to show if 'false'</div>
  )
}
```

## Where to Import ShowProvider

Try to import `useShow` at the top level of your specific component to give the remainder of the child nodes access by passing down `show, dispatch` rather than importing `useShow` everywhere. Then, pass `show, dispatch` down to each sub-component 'child node' that requires a show.flag.

## Adding a New Flag

In the ShowProvider.jsx you will need to add the name of your flag to the `initialState` object.

Add a new case to the `showReducer` function giving it a name that follows the current syntax with all upper case and that's it. Your flag is now part of the show.someFlag global context.

```

```
