let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Text";

// userName = userInput;
if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

generateError("An error occurred!", 500);
