import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"; 
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const Geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

export const generateResponse = async (message) => {
  try {
    const response = await Geminimodel.invoke([
      new HumanMessage(message),
    ]);

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    throw error;
  }
};

export const generateTitle = async (message) => {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`You are a helpful assistant that generate concise and descriptive titles for chat conversations.
        User will provide you with the fisrt message of a chat conersations, and you will generate a title that captures the essense of the conversations in 3 to 4 words. The title should be clear, relaven, and engaging, giving users a quick understanding of the chat's topic.
        `),
        new HumanMessage(`Generate a title for a chat conversations based n the following first message : 
          "${message}"
          `)
    ]);

    console.log(response.text);
    return response.text;

  } catch (error) {
    console.error("Error generating response from Mistral:", error);
    throw error;
  }
}

export const testAI = async () => {
  try {
    const sample = "Hello from testAI";
    const response = await generateResponse(sample);
    console.log("testAI - generateResponse:", response);
    const title = await generateTitle(sample);
    console.log("testAI - generateTitle:", title);
  } catch (error) {
    console.error("testAI error:", error);
  }
};

