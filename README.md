# Generative Agent Moment Environment (GAME)

<div style="width: 55em; display: block; margin: 0 auto;">
  <img src="./src/assets/readme/game_bg.png" style="width: 100%; height: auto;" />
</div>

A Portland State University (PSU) Undergrad Capstone Project for Computer Science.

This application is inspired by the Generative Agents program created by [Joon Sung Park PH.D. Student in Computer Science at Stanford](https://profiles.stanford.edu/joon-sung-park). His [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) expresses the idea that "believable proxies of human behavior can empower interactive applications ranging from immersive environments to rehearsal spaces for interpersonal communication to prototyping tools". The original project can be viewed on [GitHub: Generative Agents](https://github.com/joonspk-research/generative_agents).

## Premise

Create a limited version of the Generative Agent interactive experience using free open source ai models through [Huggingface](https://huggingface.co/). Where the original generative agent program uses a paid model which holds memory and the ineraction with the game environment requires the program to run and be played back, this limited version attempts to achieve a live interaction between a user and active agents as created by the AI Models.

## GAME

To achieve a live experience with agent interaction we have limited the program to `moments`. A `moment` is similar to the original Generative Agent `whisper` where an agent is given an idea to play out. Agents are given a name and personality created in a static file. When a `moment` is chosen by a user, a specified agent will initiate the `moment`. From there, each agent is given this `moment` and based on their persona, they will give feedback, advice, or help in some creative way to make that `moment` happen.

Several `moments` will be created for the user to choose from which should inspire the user to create their own `moment`. Within the application is a Message Interface that allows the user to prompt the AI Model and try to create a meaningful `moment` of their own.

## User Interaction | Message Interface

The `interface` allows you to test out various methods of prompting. When selecting an agent in the game, you take control of that character. When you open the `interface`, any input (prompt) that you create will have a response based on the persona of the character you have selected. In the sidebar you will see the profile of the agent, including their age, career, and personality.

The `lightbulb` icon will switch the view to `moments`, allowing an easy method of viewing the entire conversation.

<div style="padding-top: 1em; width: 10em; margin: 0 auto">
  <img src="./src/assets/readme/interface.png" style="width: 100%; height: auto;" />
</div>

## Sidebar

- Open / Close the message `interface`
- Select and begin a `moment`
- Change the Huggingface AI Model: ["Mistral Instruct", "Mixtral", "Zephyr"]
- View the currently selected agent profile

<div style="width: 10em; margin: 0 auto;">
  <img src="./src/assets/readme/sidebar.png" style="display: block; margin: auto; width: 100%; height: auto;" />
</div>

## Program Requirements | Environment Variables

This application requires the following accounts be created to run the program, but each of these offer a free version which the application used during testing and build:

- [Huggingface](https://huggingface.co/)
- [Firebase](https://firebase.google.com/)
- [EmailJS: Optional](https://www.emailjs.com/)

You will need to add a `.env` file to the /root of this repository and create the following environment variables which you will have after creating your accounts listed above:

```js
VITE_HUGGINGFACE_API_TOKEN = "";
VITE_FIREBASE_API_KEY = "";
VITE_FIREBASE_AUTH_DOMAIN = "";
VITE_FIREBASE_DB_URL = "";
VITE_FIREBASE_PROJECT_ID = "";
VITE_FIREBASE_STORAGE_BUCKET = "";
VITE_FIREBASE_MESSAGING_SENDER_ID = "";
VITE_FIREBASE_APP_ID = "";
VITE_EMAILJS_API_KEY = "";
VITE_EMAILJS_SERVICE_ID = "";
VITE_EMAILJS_TEMPLATE_ID = "";
```

## Download & Install Dependencies

You can fork the project, download a zip file, or use a bash command line to copy this GitHub repository.

Using `Node v20` and the `yarn` package manager.

```bash
# Install the package.json dependencies
yarn
```

```bash
# run the program
yarn dev
```

## Why Not Python?

The original code base is in Python and most of the programs dealing with AI Models also use Python due to the large number of available libraries that help fine tune the models and allow simple SDK's that create the API calls for you. As we are not trying to fine tune ai models and have found ways of prompting the models to achieve our goal it was unecessary to bring in the large number of libraries that python often requires.

As undergrad computer scientists, we wanted to accomplish a little more than the norm. Building this application in React will expand the ai model community to include another arena of brilliant devs that may want to tear this repo apart and make something truly unique. Our hope is that the application is easy to set up and easy to understand.

## Resource Citations

1. The background map is created by Steven Ochs: [Steven Ochs "Imagination Sculpts Reality"](https://goosecubeproject.com/)

2. The main logo and sidebar icons have been sourced from: [VectorStock: Generative AI Vector Set](https://www.vectorstock.com/royalty-free-vector/generative-ai-artificial-intelligence-icon-set-vector-47405050)

3. The agent sprite characters are from the original Generative Agents github repo: [GitHub: Generative Agents](https://github.com/joonspk-research/generative_agents)
