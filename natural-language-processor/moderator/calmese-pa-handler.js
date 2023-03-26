import axios from "axios";
import {APP_CONFIG} from "../../shared/app-config/index.js";

export const calmesePaHandler = async (message, service) => {
  const responseTextMap = {
    "hate": "odio",
    "hate/threatening": "amenaza",
    "self-harm": "autolesión",
    "sexual": "desmadrito , viejo cachondo",
    "sexual/minors": "marranero viejo raboverde",
    "violence": "violencia",
    "violence/graphic": "violencia gráfica",
  }

  const response = await axios.post(
    `${APP_CONFIG.OPENAI_ENDPOINT}/moderations`,
    {
      input: message,
    },
    {
      headers: {
        "Authorization": `Bearer ${APP_CONFIG.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      }}
  );

  const categories = response.data.results[0].categories;

  const flags = Object
    .entries(categories)
    .filter(([_, value]) => {
      return value;
    })
    .map(([key, _]) => {
      return responseTextMap[key];
    });

    if (flags.length === 0) {
      return service(message);
    }

  const responseText = flags.join(", ");

  return `¡Hey! Cálmese con su ${responseText} pa!.`
}