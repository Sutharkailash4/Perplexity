import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const Geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model : "mistral-small-latest",
  apiKey : process.env.MISTRAL_API_KEY
});

export const generateResponse = async (message) => {
  try {
    const response = await Geminimodel.invoke([
      new HumanMessage(message),
    ]);

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.log("Error generating response:", error);
    throw error;
  }
};

export const generateTitle = async (message) => {
  try {

  } catch (error) {
    console.log("Error generating response:", error);
    throw error;
  }
}