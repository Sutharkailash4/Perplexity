import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY 
});

export const testAI = async () => {
    try {   
        model.invoke("What is AI explian under 1 word")
        .then((response) => {
            console.log(response.text);
        })
    } catch(error) {
        console.log(error.message);
    }
}