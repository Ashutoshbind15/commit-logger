// index.js
const core = require("@actions/core");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const github = require("@actions/github");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_API_KEY);

const generateSingleTextResponse = async (
  prompt = "Write a story about a magic backpack."
) => {
  const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `Give me 3 labels for this github commit message as a comma separated string : ${prompt}`
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

  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);

  const context = github.context;
  if (context.payload.pull_request == null) {
    core.setFailed("No pull request found.");
    return;
  }

  const prNumber = context.payload.pull_request.number;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  const labels = labelString.split(",").map((label) => label.trim());

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: prNumber,
    labels: labels,
  });

  console.log(`Labels added: ${labels}`);
};

helper().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
