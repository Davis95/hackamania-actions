
const github = require('@actions/github');
const actionsCore = require('@actions/core');
const axios = require('axios').default;

const generateMessageInfo = () => {
    actionsCore.info('Generating links...');
    const title = github.context.payload.issue.title;
    const prUrl = github.context.payload.issue.html_url;
    const sender = github.context.payload.sender;
    const jiraId = title.split(':')[0];
    const buildNumber = jiraId.split('-').join('');
    return {
        title: `[${process.env.MODULE_NAME}] ${title}`,
        jiraLink:`https://sailpoint.atlassian.net/browse/${jiraId}`,
        prLink: prUrl,
        demoLink: `https://${process.env.DEMO_ORG}.identitysoon.com/u/d/dashboard?ui=${buildNumber}`,
        senderName: sender.login
    };
}

const slackSend = (messageInfo) => {
    actionsCore.info(messageInfo);
    actionsCore.info('Sending Slack Notification');
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
    ).catch(error => {
        actionsCore.setFailed(error);
    })
}

const messageInfo = generateMessageInfo();
slackSend(messageInfo);
