## Add Open Source License

Find and add the appropriate open source license to the repo before making it public.

## Switch Huggingface API Token for Goose Cube

Create an account with Huggingface using goosecube1@gmail.com. Create an API Key and change current VITE_HUGGINGFACE_API_TOKEN in the `.env` file. Currently using Adams Huggingface API Token.

## Switch EmailJS Account for Goose Cube

Create a new account and add the `.env` variables using goosecube1@gmail.com.

## Add Sidebar Huggingface API Token Input

In the sidebar, the user should be able to enter an API Key for Huggingface which will be stored in their user account on Firebase. This can only happen if a safe mechanism to encrypt and decrypt is used, otherwise it will have to be a manual add to the .env file.

## Styled Components

Once a component fulfillsi functionality and style requirements, begin re-write of CSS styles to Styled Components, or at the very least replace as much of the css styles with the react-bootstrap class names as possible.

[Styled Components Home Page](https://styled-components.com/)
[React Bootstrap 5+ Docs](https://react-bootstrap.github.io/)

## Sprite Character Animation

When releasing the arrow key the sprite character continues to move in the given arrow direction. Eliminate the additional arrow key direction movement which is the 'rapid fire of the arrow key event while holding a direction'. Using setTimeout() is not usually recommended but for this game it may be a simple implementation that resolves the issue.

## Update :root Global Color Scheme

Choose the global color schemes and add them to the [Primary Index CSS Styles File](./src/index.css) in the `:root{}` class. Each color should be prepended with a `g_` to prevent style collisions where components have implemented a top level global color scheme of their own.

## Create or Modify Sprite Character Persona

User should have the ability to create their own sprite character persona: {name, personality}. This will require a new input interface or modification of the current MessageInterface allowing the input to push() a new Firebase instance of a sprite character persona.

## Create Personas for Remaining Sprite Characters

Using the /assets/characters sprite animation names, continue the creation of new personas for each name in /personas/personas.js

<!-- STORIES | Added Features -->

## Translator Component

[Use Huggingface Translator Example for React](https://huggingface.co/docs/transformers.js/tutorials/react)

Unfortunately, the example uses a Class based example. You should implement a component using the following general guidelines:

1. Create a new Vite project in a directory of your choosing [Getting Started with Vite](https://vitejs.dev/guide/) NOTE: use `yarn create vite nameOfProjectHere` and select `React`, `JavaScript`
2. Follow the Huggingface example for React, use classes to make sure that the implementation is as close to the example as possible
3. Convert the component from a Class based implementation to a Functional implementation

## ElevenLabs Text to Speech

Add the text to speech AI Model by ElevenLabs and connect the MessageInterface Speech Icon to the model.

When the speech icon is clicked (onClick() event), the current message(s) should be sent to ElevenLabs for text-2-speech. Each persona name should have a different voice.

[ElevenLabs Generative Voice AI](https://elevenlabs.io/)

## Save Images Firebase

Add an additional firebase property for images created in the message interface using stable diffusion models. In addition to the current save to the 'messages' there should be a seperate images property where the created images could be pulled from on load. This would allow them to be overlayed on the game environment, say in the 'studio', and set them to display each image over 3s intervals for each.
