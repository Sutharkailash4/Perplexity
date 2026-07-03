import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const generateResponse = async (message) => {
  try {
    const response = await model.invoke([
      new HumanMessage(message),
    ]);

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};