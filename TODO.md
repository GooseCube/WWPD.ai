## Switch Huggingface API Token for Goose Cube

Create an account with Huggingface using goosecube1@gmail.com. Create an API Key and change current VITE_HUGGINGFACE_API_TOKEN in the `.env` file. Currently using Adams Huggingface API Token.

## Add Sidebar Huggingface API Token Input

In the sidebar, the user should be able to enter an API Key for Huggingface which will be stored in their user account on Firebase.

## Complete the Dropdown to Select AI Model

Add model api calls to other huggingface api endpoints (such as: Mistral, Zephyr) and use a global context object to switch the the model used for the MessageInterface.

## Translator Component

[Use Huggingface Translator Example for React](https://huggingface.co/docs/transformers.js/tutorials/react)

Unfortunately, the example uses a Class based example. You should implement a component using the following general guidelinces:

1. Create a new Vite project in a directory of your choosing [Getting Started with Vite](https://vitejs.dev/guide/) NOTE: use `yarn create vite nameOfProjectHere` and select `React`, `JavaScript`
2. Follow the Huggingface example for React, use classes to make sure that the implementation is as close to the example as possible
3. Convert the component from a Class based implementation to a Functional implementation

## Styled Components

Once a component fulfills style requirements, begin re-write of CSS styles to Styled Components.

[Styled Components Home Page](https://styled-components.com/)

## Sprite Character Animation

When releasing the arrow key the sprite character continues to move in the given arrow direction. Eliminate the additional arrow key direction movement which is the 'rapid fire of the arrow key event while holding a direction'. Using setTimeout() is not usually recommended but for this game it may be a simple implementation that resolves the issue.

## ElevenLabs Text to Speech

Add the text to speech AI Model by ElevenLabs and connect the MessageInterface Speech Icon to the model.

When the speech icon is clicked (onClick() event), the current message(s) should be sent to ElevenLabs for text-2-speech. Each persona name should have a different voice.

[ElevenLabs Generative Voice AI](https://elevenlabs.io/)

## Email Message

User should have the ability to email a current message using an Email Icon in the MessageInterface Toolbar. OnClick() the current message should be sent to the email address used to login to the application (the email in the Firebase DB)

Create an account with EmailJS using goosecube1@gmail.com. Create an API Key and change the private apiKey, serviceId, and templateId in the `.env` file.

## Update :root Global Color Scheme

Choose the global color schemes and add them to the [Primary Index CSS Styles File](./src/index.css) in the `:root{}` class

## Add and Remove Sprite Characters

Add a function to select and add or remove a sprite character from the game. This function event should be triggered from the sidebar. Each sprite character should use the second column and first row for the profile picture (facing down) and their full name should be displayed either above or below the character.

## Create or Modify Sprite Character Persona

User should have the ability to create their own sprite character persona: {name, personality}. This will require a new input interface or modification of the current MessageInterface allowing the input to push() a new Firebase instance of a sprite character persona.

## Add User Controlled Sprite Persona to Text Input Chat Messaging

When selecting an agent in the game their controlled boolean property is 'true'. This can be used with the text input interface to allow the model to use the agents name and personality when responding to user prompts. Make the changes in /Message.jsx and use modules/newFunction to add functionality as needed.

## Remove Players/Player [players, setPlayers] useState() and use the AuthProvided Context

In Players, a local useState() object 'players' & 'setPlayers' is being used. When updating to the context object 'agents' & 'setAgents' the local useState() objects need to be removed and the components need to reflect live changes using the Firebase updated global context. In other words, the current implementation is garbage (my bad).

## Sidebar Dropdown Menu Unexpected Behavior

When selecting a dropdown, like AI Model, the last list item covering the dropdown button below it will have strange behavior. This might be an incorrect implementation of the react-bootstrap Dropdown or the transition() css style.

## Add a (?) Help/Info Icon

Add a help icon in the sidebar to give basic information about the functionality of the game:

- When a sprite is selected, the 'moment' will use this sprites peronality to create the selected 'moment'. The message interface prompt (chat) will also use the selected agents personality for prompt responses.
- What does each sidebar button represent/do?

## Create Personas for Remaining Sprite Characters

Using the /assets/characters sprite animation names, continue the creation of new personas for each name in /personas/personas.js
