// index.js
const core = require("@actions/core");

try {
  // Get the commit message input from the workflow file
  const commitMessage = core.getInput("COMMIT_MESSAGE", { required: true });
  console.log(`Commit Message: ${commitMessage}`);
} catch (error) {
  core.setFailed(`Action failed with error ${error}`);
}
