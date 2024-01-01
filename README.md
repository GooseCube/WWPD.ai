# AI Generative Agent Live Interaction

A Portland State University (PSU) Undergrad Capstone Project for Computer Science.

This application is inspired by the Generative Agents program created by [Joon Sung Park PH.D. Student in Computer Science at Stanford](https://profiles.stanford.edu/joon-sung-park). His [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) expresses the idea that "believable proxies of human behavior can empower interactive applications ranging from immersive environments to rehearsal spaces for interpersonal communication to prototyping tools". The original project can be viewed on [GitHub: Generative Agents](https://github.com/joonspk-research/generative_agents).

## Premise

Create a limited version of the Generative Agent interactive experience using free open source ai models through [Huggingface](https://huggingface.co/). Where the original generative agent program uses a paid model which holds memory and the ineraction with the game environment requires the program to run and be played back, this limited version attempts to achieve a live interaction between a user and active agents as created by the AI Models.

## Game Environment

To achieve a live experience and agent interaction where conversations are started and ideas are created we have limited the program to `moments`. A `moment` is similar to the original Generative Agent `whisper` where an agent is given an idea to play out. Agents are given a name and personality created in a static file. When a `moment` is chosen by a user, a random agent is chosen to initiate the `moment`. From there, each agent is given the prompt and can choose to engage in the experience or opt out.

Several `moments` will be created for the user to choose from which should inspire the user to create their own `moment`. Within the application is a Message Interface that allows the user to prompt the AI Model and try to create a meaningful `moment` of their own.

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

## Resource Citations

The sidebar icons have been sourced from: [VectorStock: Generative AI Vector Set](https://www.vectorstock.com/royalty-free-vector/generative-ai-artificial-intelligence-icon-set-vector-47405050)