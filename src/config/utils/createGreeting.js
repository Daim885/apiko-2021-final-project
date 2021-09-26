export const createGreeting = (fullName) => {
  if (fullName?.split(" ").length === 1) return `Welcome, ${fullName}!`;
  else if (!fullName) return "Welcome, Anonymous!";
  else return `Welcome, ${fullName?.slice(fullName.lastIndexOf(" "))}!`;
};
