
const actionsCore = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;


console.log(actionsCore.getInput('comment'));
console.log(github.context.payload);
// axios.post("https://hooks.slack.com/services/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") ///