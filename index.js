
const actionsCore = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;

const generateLinks = () => {
    console.log('Generating links...');
    const title = github.context.issue.title;
    const prUrl = github.context.issue.html_url;
    const jiraId = title.split(/^IDN.*\:/g)[0];
    return [`https://sailpoint.atlassian.net/browse/${jiraId}`, prUrl, 'www.demo.com/1', title]
}

const slackSend = (links) => {
    console.log(links);
    console.log('Sending Slack Notification');
    axios.post("https://hooks.slack.com/services/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",
        {
            text: "hello"
        },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    )
}


console.log(github.context);

const comment = github.context.payload.comment.body;
const args = comment.split(' ');

if (args.includes('!SailBot') && args.includes('autodeploy')) {
    console.log('Received autodeploy command');
    const links = generateLinks();
    slackSend(links);
}

// Get comment

// Determine if comment is asking for magic deploy
// @SailBot autodeploy pod=foo

// Yes -> run build script

// Generate values and links for Slack

// Send Slack comment with:
// jira link - need to get jira id
// demo url - need to get jira id
// pull request url - confirmed
