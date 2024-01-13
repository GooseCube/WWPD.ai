# EmailJS | Free Version

This component uses the [Emailjs](https://dashboard.emailjs.com/admin/templates/gfwd2g6) library. You will need to create your own account with EmailJS to use the application.

EmailJS free version allows 200 emails per month (as of Jan 1 2024).

The `yarn` package manager will install the required dependency for EmailJS.

## EmailJS Environment Variables

You will need to create a `.env` file at /root. Create an account with EmailJS and add the following to the `.env`:

```json
VITE_API_KEY="yourKeyFromEmailJS"
VITE_SERVICE_ID="yourIdFromEmailJS"
VITE_TEMPLATE_ID="theTemplateIdYouAreUsing/Created"

```

## EmailJS Template SetUp

You will need to create an account with EmailJS. This component uses Gmail as the Email Service.

The Email Template uses has the following variables:
(change the variables to match your requirements)

```js
Subject: New message from {{from_name}}

Content:
  Hello {{to_name}},

  You have a new message from {{from_name}}:

    {{message}}

  Best wishes,
```

Also, the `To Email` variables are:

```js
To Email: {{to_email}}

From Name: my initials here

Replay To: {{reply_to}}
```
