import axios from "axios";
import { APP_CONFIG } from "../shared/app-config/index.js";
import { calmesePaHandler } from "./moderator/calmese-pa-handler.js";

export const naturalLanguageProcessor = () => {
  const completeText = async (message) => {
    const response = await axios.post(
      `${APP_CONFIG.OPENAI_ENDPOINT}/completions`,
      {
          model: "text-davinci-003",
          prompt: message,
          max_tokens: 100,
          temperature: 0.8,
      },
      {
        headers: {
          "Authorization": `Bearer ${APP_CONFIG.OPENAI_API_KEY}`,
          "Content-Type": "application/json",

        }}
    );

    return response.data.choices[0].text;
  }

  return {
    completeText: (msg) => calmesePaHandler(msg, completeText),
  }
}