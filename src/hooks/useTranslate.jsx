import { useEffect, useState } from "react";
import { OpenAI } from "openai";
import Swal from "sweetalert2";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: "AIzaSyBN8iVqsG0ZcN511lbfKzU5MbOpwEI87Zg",
  dangerouslyAllowBrowser: true,
});

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async () => {
      try {
        // Call OpenAI API for translation
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              "${sourceText}". Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}.
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

        // Extract translated text from response
        const data = response.choices[0].message.content;
        if (data) {
          setTargetText(data);
        } else {
          throw new Error("No translation generated");
        }
      } catch (error) {
        console.error("Error translating text:", error);
        setTargetText("");

        Swal.fire({
          icon: "error",
          title: "Translation failed",
          text: "Sorry, translation failed. Please try again.",
        });
      }
    };

    // Trigger translation only if sourceText is not empty
    if (sourceText.trim()) {
      handleTranslate();
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
