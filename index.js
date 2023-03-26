import { naturalLanguageProcessor } from "./natural-language-processor/index.js";

(async () => {
  const response = await naturalLanguageProcessor()
    .completeText("Con Chat GPT podemos");

  console.log(response);
})();
