import deburr from 'lodash/deburr';

const normalizeText = (text) => {
  return deburr(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard: " + text);
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
      alert("Failed to copy text.");
    });
};

const issueLink = document.querySelector(".issue-link");
const summaryVal = document.getElementById("summary-val");

if (!issueLink || !summaryVal) {
  alert("Error: Cannot find elements.");
} else {
  const normalizedIssueLink = normalizeText(issueLink.innerText);
  const normalizedSummary = normalizeText(summaryVal.innerText);
  const branchName = `${normalizedIssueLink.toUpperCase()}-${normalizedSummary}`;
  copyToClipboard(branchName);
}
