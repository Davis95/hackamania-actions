
const github = require('@actions/github');
const axios = require('axios').default;

const generateMessageInfo = () => {
    console.log('Generating links...');
    const title = github.context.payload.issue.title;
    const prUrl = github.context.payload.issue.html_url;
    const sender = github.context.payload.sender;
    const jiraId = title.split(':')[0];
    return {
        title: title,
        jiraLink:`https://sailpoint.atlassian.net/browse/${jiraId}`,
        prLink: prUrl,
        demoLink: 'www.google.com',
        senderName: sender.login
    };
}

const slackSend = (messageInfo) => {
    console.log(messageInfo);
    console.log('Sending Slack Notification');
    axios.post("http://postman.fmning.com/api/proxy",
        {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*${messageInfo.title}*\n ${messageInfo.senderName} is requesting a review.`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Github:*\n ${messageInfo.prLink}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Jira:*\n ${messageInfo.jiraLink}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Demo:*\n ${messageInfo.demoLink}`
                    }
                }
            ]
        },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    ).catch(error => console.log(error))
}

const messageInfo = generateMessageInfo();
slackSend(messageInfo);
