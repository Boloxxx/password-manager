import { generateRandomUsername } from "./generateRandomUser";

export const generateRandomEmail = () => {
  const domains = ["yahoo.com", "gmail.com", "outlook.com"];

  const username = generateRandomUsername(8);
  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${username}@${domain}`;
};
