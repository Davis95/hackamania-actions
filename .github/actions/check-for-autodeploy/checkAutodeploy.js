
const actionsCore = require('@actions/core');
const github = require('@actions/github');

const comment = github.context.payload.comment.body;
const args = comment.split(' ');

if (args.includes('!sailbot') && args.includes('autodeploy')) {
    console.log('Received autodeploy command');
} else {
    actionsCore.setFailed('Did not find autodeploy command. Halting workflow.');
}
