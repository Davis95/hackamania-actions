
const actionsCore = require('@actions/core');
const github = require('@actions/github');

const comment = github.context.payload.comment.body;
const args = comment.split(' ');

if (args.includes('!sailbot') && args.includes('autodeploy')) {
    actionsCore.info('Received autodeploy command');
    const autodeployCommandArgs = {
        pod: 'tahiti',
        notify: 'true'
    }
    
    Object.keys(autodeployCommandArgs).forEach(key => {
        let argValue = autodeployCommandArgs[key];
        const arg = args.find(arg => arg.includes(key));
        if (arg) {
            argValue = arg.split('=')[1];
        }
        actionsCore.exportVariable(key.toUpperCase(), argValue);
    });

    actionsCore.info('Command Parsed Successfully');
} else {
    actionsCore.setFailed('Did not find autodeploy command. Halting workflow.');
}
