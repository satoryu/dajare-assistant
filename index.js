const express = require('express')
const bodyParser = require('body-parser')
const {dialogflow, Suggestions} = require('actions-on-google')
const request = require('request-promise-native')
const _ = require('underscore')

const app = dialogflow({debug: true})

const fetch = async function(text) {
    const options = {
        json: true,
        body: {
            text: text
        }
    }
    try {
        const response = await request.post(process.env.DAJARE_API_URL, options);

        return response['puns'];
    } catch(err) {
        throw err;
    }
};

app.intent('Default Welcome Intent', (conv) => {
    conv.ask(`<speak>こんにちわ、駄洒落ボットです。何か喋ってください。</speak>`)
});

app.intent('Default Fallback Intent', async (conv) => {
    const puns = await fetch(conv.input.raw)
    const pun = _.sample(puns)

    conv.contexts.set('plus_one', 1, { pun: pun });

    conv.ask(`<speak>${pun}</speak>`)
    conv.ask(new Suggestions('おもろい', 'おもろくない'))
})

app.intent('Fun', (conv) => {
    conv.ask(`<speak>${conv.input.raw}</speak>`)
    conv.ask(`<speak>せやろ</speak>`)
})

express().use(bodyParser.json(), app).listen(process.env.PORT || 3000)
