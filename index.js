
const actionsCore = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;

const generateLinks = () => {
    console.log('Generating links...');
    return ['www.jira.com/f1', 'www.github.com/pull/1', 'www.demo.com/1', 'IDNHACK-1: Pull Request Title']
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

const comment = github.context.payload;
const args = comment.split(' ');

console.log(actionsCore.getInput('comment'));
console.log(github.context.payload);
// axios.post("https://hooks.slack.com/services/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") ///

