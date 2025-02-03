import dotenv from "dotenv";
import express from "express";
import { pipeline } from "@xenova/transformers";

dotenv.config();
const app = express();
const port = process.env.PORT;

class MyTranslationPipeline {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}
async function runModel(inputText) {
  let translator = await MyTranslationPipeline.getInstance((x) => {
    console.log(x);
  });
  const output = await translator(inputText, {
    src_lang: "eng_Latn",
    tgt_lang: "tur_Latn",
  });
  const translation = output?.[0]?.translation_text;
  return translation;
}

app.use(express.json());
app.use(express.static("public"));

app.post("/translate", async (req, res) => {
  const userInput = req.body.text;

  const translation = await runModel(userInput);
  res.json({ translation });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
