export const getEmailValidate = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const shuffle = (array) => {
  return Array.from(array).sort(() => Math.random() - 0.5);
};

export const parsingHTML = (inputString) => {
  const parser = new DOMParser();

  // Parse the input string as HTML
  const parsedHTML = parser.parseFromString(inputString, "text/html");

  // Get the decoded text from the parsed HTML
  const decodedText = parsedHTML.body.textContent;
  return decodedText;
};