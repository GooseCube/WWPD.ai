## Switch Huggingface API Token for Goose Cube

Create an account with Huggingface using goosecube1@gmail.com. Create an API Key and change current VITE_HUGGINGFACE_API_TOKEN in the `.env` file.

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

When releasing the arrow key the sprite character continues to move in the given arrow direction. Eliminate the additional arrow key direction movement.

## ElevenLabs Text to Speech

Add the text to speech AI Model by ElevenLabs and connect the MessageInterface Speech Icon to the model.

When the speech icon is clicked (onClick() event), the current message(s) should be sent to ElevenLabs for text-2-speech. Each persona name should have a different voice.

[ElevenLabs Generative Voice AI](https://elevenlabs.io/)

## Email Message

User should have the ability to email a current message using an Email Icon in the MessageInterface Toolbar. OnClick() the current message should be sent to the email address used to login to the application (the email in the Firebase DB)

Create an account with EmailJS using goosecube1@gmail.com. Create an API Key and change the private apiKey, serviceId, and templateId in the `.env` file.

## Update :root Global Color Scheme

Choose the global color schemes and add them to the [Primary Index CSS Styles File](./src/index.css) in the `:root{}` class
