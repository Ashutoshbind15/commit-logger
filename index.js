// index.js
const core = require("@actions/core");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_API_KEY);

const generateSingleTextResponse = async (
  prompt = "Write a story about a magic backpack."
) => {
  const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `Give me 3 labels for this github commit message: ${prompt}`
  );
  const response = await result.response;
  const text = response.text();
  return text;
};

const helper = async () => {
  const commitMessage = core.getInput("COMMIT_MESSAGE", { required: true });
  console.log(`Commit Message: ${commitMessage}`);
  const labelString = await generateSingleTextResponse(commitMessage);
  console.log(labelString);
};

helper().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
