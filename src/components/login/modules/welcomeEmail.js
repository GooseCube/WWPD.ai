export const welcomeEmail = (userEmail) => {
  const email = { to_email: userEmail };

  email.header = "Welcome to: What Would Portland Do?";
  email.message =
    "Thank you for joining us! We hope you have fun exploring this unique game and creating new Ai driven experiences.";

  return email;
};
