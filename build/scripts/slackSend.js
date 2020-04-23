
const github = require('@actions/github');
const axios = require('axios').default;

const generateLinks = () => {
    console.log('Generating links...');
    const title = github.context.payload.issue.title;
    const prUrl = github.context.payload.issue.html_url;
    const jiraId = title.split(':')[0];
    return [`https://sailpoint.atlassian.net/browse/${jiraId}`, prUrl, 'www.demo.com/1', title]
}

const slackSend = (links) => {
    console.log(links);
    console.log('Sending Slack Notification');
    axios.post("http://postman.fmning.com/api/proxy",
        { "text": "Hello Hackamania!" },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    ).catch(error => console.log(error))
}

const links = generateLinks();
slackSend(links);
