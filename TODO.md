# @todo: ERROR and DEBUG

## On Load

- When the last moment from a previous iteration is stored in Firebase the moment 'text' will re-render for each agent. Need to clear all agents after the moment is done and all agents have finished reaching their final home positions.

## Moment Loading

When a moment is selected, the initial prompt for the primaryAgent takes a minute to fetch before any motion in the game is rendered. There should be a loading animation to give the user selection feedback.

<!-- ------------------------------------------------------------------ -->

# @todo: REFACTOR

## Show || Hide Flags

Update the App.jsx by moving all boolean useState objects into one object that can be easily passed down to each component. Destructure the necessary flags at the child component level.

## Agent Update

Combine the Agent Firebase update and Context State into one function call.

<!-- ------------------------------------------------------------------ -->

# @todo: STYLING

## Update :root Global Color Scheme

Choose the global color schemes and add them to the [Primary Index CSS Styles File](./src/index.css) in the `:root{}` class. Each color should be prepended with a `g_` to prevent style collisions where components have implemented a top level global color scheme of their own.

<!-- ------------------------------------------------------------------ -->

# Add Open Source License

Find and add the appropriate open source license to the repo before making it public.

<!-- ------------------------------------------------------------------ -->

# @todo: STORIES

## Translator Component

[Use Huggingface Translator Example for React](https://huggingface.co/docs/transformers.js/tutorials/react)

Unfortunately, the example uses a Class based example. You should implement a component using the following general guidelines:

1. Create a new Vite project in a directory of your choosing [Getting Started with Vite](https://vitejs.dev/guide/) NOTE: use `yarn create vite nameOfProjectHere` and select `React`, `JavaScript`
2. Follow the Huggingface example for React, use classes to make sure that the implementation is as close to the example as possible
3. Convert the component from a Class based implementation to a Functional implementation

## ElevenLabs or Huggingface Text to Speech

Add the text to speech AI Model by ElevenLabs and connect the MessageInterface Speech Icon to the model.

When the speech icon is clicked (onClick() event), the current message(s) should be sent to ElevenLabs for text-2-speech. Each persona name should have a different voice.

[ElevenLabs Generative Voice AI](https://elevenlabs.io/)

## Save Images Firebase

Add an additional firebase property for images created in the message interface using stable diffusion models. In addition to the current save to the 'messages' there should be a seperate images property where the created images could be pulled from on load. This would allow them to be overlayed on the game environment, say in the 'studio', and set them to display each image over 3s intervals for each.
