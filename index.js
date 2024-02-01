// index.js
const core = require("@actions/core");
const github = require("@actions/github");
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
  const token = process.env.GITHUB_TOKEN;

  const octokit = github.getOctokit(token);
  const { context } = github;
  const { owner, repo } = context.repo;

  if (context.payload.pull_request == null) {
    core.setFailed("No pull request found.");
    return;
  }

  console.log(`Commit Message: ${commitMessage}`);
  const labelString = await generateSingleTextResponse(commitMessage);
  console.log(labelString);
};

helper().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
