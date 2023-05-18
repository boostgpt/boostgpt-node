<div align="center">
    <img src="https://boostgpt.co/hero-demo.png" alt="BoostGPT"/>
    <br>
    <h1>BoostGPT</h1>
    <p>Develop intelligent chatbots to enhance your business.</p>
    <a href="https://www.npmjs.com/package/boostgpt"><img src="https://img.shields.io/npm/v/boostgpt" alt="NPM Version"></a>
    <a href="https://discord.gg/FPTmDNjA"><img src="https://img.shields.io/discord/1100801013121822770?color=%bbccff&label=Discord" alt="Discord"></a>
    <a href="https://docs.boostgpt.co"><img src="https://img.shields.io/badge/Docs-BoostGPT" alt="Documentation"></a>
    <br>
    <br>
</div>


## Prerequisite

[Requires an API Key for BoostGPT which can be found here.](https://app.boostgpt.co/account/api-keys)


## Installation

`npm install boostgpt`


## Quick Start

Use it in your project:

```javascript

const { BoostGPT } = require("boostgpt")

const boostgpt = new BoostGPT({
    key: "YOUR API KEY",
    project_id: "YOUR PROJECT ID"
});

```

## Create a chatbot

Here is an example that creates a chatbot in your BoostGPT project


```javascript

let payload = {
    model: "gpt-3.5-turbo", //Require any of : text-davinci-002, text-davinci-003, gpt-3.5-turbo, gpt-3.5-turbo-0301, gpt-4
    instruction: `I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.`,//Optional. An instreuction to prompt the chatbot on how to respond
    status: 1 //Require any string of [ "1" or "0"]. Status 1 = online, Status 0 = offline
}
let chatbot = await boostgpt.createBot(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:


```json
    {
        "bot": {
            "uuid": "fa155610-e2a2-11ed-8d7e-128759b35991",
            "model": "gpt-3.5-turbo",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-24T13:21:52.000Z"
        }
    }

```


## Fetch a chatbot

Here is an example that fetches the details of a chatbot in your BoostGPT project


```javascript

let bot_id = "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3";
let chatbot = await boostgpt.fetchBot(bot_id);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
    {
        "bot": {
            "uuid": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
            "model": "text-davinci-002",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-26T10:26:33.000Z"
        }
    }
```


## Fetch all chatbots

Here is an example that fetches all chatbot in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    page: 1,
    per_page: 10
}
let chatbots = await boostgpt.fetchBots(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "total": 2,
    "bots": [
        {
            "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
            "model": "gpt-3.5-turbo",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 0,
            "updated_at": "2023-04-26T12:22:46.000Z",
            "tokenCount": null,
            "sourceCount": 0
        },
        {
            "uuid": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
            "model": "text-davinci-003",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-26T10:26:33.000Z",
            "tokenCount": "23152",
            "sourceCount": 5
        }
    ]
}
```



## Reset a chatbot

Here is an example that resets a chatbot in your BoostGPT project. Reseting a chatbot will delete all it's training data.


```javascript

let bot_id = "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3";
let chatbot = await boostgpt.resetBot(bot_id);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
    {
        "bot": {
            "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
            "model": "gpt-3.5-turbo",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-26T12:22:46.000Z"
        }
    }
```



## Delete a chatbot

Here is an example that deletes a chatbot in your BoostGPT project. Deleting a chatbot will delete all it's training data.



```javascript

let bot_id = "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3";
let chatbot = await boostgpt.deleteBot(bot_id);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
    {
        "bot": {
            "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
            "model": "gpt-3.5-turbo",
            "max_reply_tokens": "300",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always formats your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-26T12:22:46.000Z"
        }
    }
```





## Train chatbot with your data

Here is an example that adds a training data to a chatbot in your BoostGPT project


```javascript

let payload = {
    bot_id: "fa155610-e2a2-11ed-8d7e-128759b35991"
    tags: [], //Use tags to segment your training data
    type: 'text', //Require any of : text, file, webpage, website
    source: 'YOUR SOURCE DATA',//Require your text content or an accessible link to your file, webpage, or website
}
let chatbot = await boostgpt.startTraining(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:


```json
    {
        "source": {
            "uuid": "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
            "source": "",
            "type": "text",
            "links_crawled": [],
            "links_crawled_count": "0",
            "tags": [],
            "tokens": 199
        }
    }
```



## Update chatbot training source

Here is an example that updates a training source on a chatbot in your BoostGPT project

```javascript

let payload = {
    bot_id: "fa155610-e2a2-11ed-8d7e-128759b35991",
    source_id: "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
    tags: ["twitter","revue"], //Use tags to segment your training data
    type: 'text', //Require any of : text, file, webpage, website
    source: `YOUR SOURCE DATA`,//Require your text content or an accessible link to your file, webpage, or website
}
let chatbot = await boostgpt.updateTraining(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:


```json
    {
        "source": {
            "uuid": "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
            "source": "",
            "type": "text",
            "links_crawled": [],
            "links_crawled_count": "0",
            "tags": [
                "twitter",
                "revue"
            ],
            "tokens": 516
        }
    }
```




## Fetch a chatbot training source

Here is an example that fetches the details of a chatbot training source in your BoostGPT project


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    source_id: "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
};
let chatbot = await boostgpt.fetchTraining(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
    {
        "source": {
            "uuid": "832146d2-e43c-11ed-ad91-a2ce1f33a089",
            "source": "",
            "type": "text",
            "links_crawled": [],
            "links_crawled_count": "0",
            "tags": [
                "twitter",
                "revue"
            ],
            "tokens": 516
        }
    }
```


## Fetch a chatbot training sources

Here is an example that fetches a chatbot training sources in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    page: 1,
    per_page: 10
}
let chatbots = await boostgpt.fetchTrainings(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "total": 2,
    "sources": [
        {
            "uuid": "832146d2-e43c-11ed-ad91-a2ce1f33a089",
            "source": "",
            "type": "text",
            "links_crawled": [],
            "links_crawled_count": "0",
            "tags": [
                "twitter",
                "revue"
            ],
            "tokens": 516
        },
        {
            "uuid": "654ba956-e3a4-11ed-ad91-a2ce1f33a089",
            "source": "https://packnpay.com.ng",
            "type": "website",
            "links_crawled": [
                {
                    "url": "https://packnpay.com.ng",
                    "tokens": 4492
                }
            ],
            "links_crawled_count": "1",
            "tags": [
                "ecommerce"
            ],
            "tokens": 4492
        },
    ]
}
```

## Delete a chatbot training data

Here is an example that deletes a chatbot training data in your BoostGPT account


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    source_id: "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
};

let chatbot = await boostgpt.deleteTraining(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```


Response:

```json
    {
        "source": {
            "uuid": "1f2fbbd2-e436-11ed-ad91-a2ce1f33a089",
            "source": "",
            "type": "text",
            "links_crawled": [],
            "links_crawled_count": "0",
            "tags": [
                "twitter",
                "revue"
            ],
            "tokens": 516
        }
    }
```








## Engage a chatbot

Here is an example that shows how you can engage a chatbot that has been trained with your data. You will need an [Openai API key](https://platform.openai.com/account/api-keys) to chat with a bot. 


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",//The collection to chat
    openai_key: "YOUR-OPENAI-APIKEY",
    model: "gpt-3.5-turbo", //The model to use for the chat response. Defaults to the bot model.
    message: "How can I add a subscribe button to my twitter profile?", //The chat message
    source_ids: ["c26b16b4-d394-11ed-b5a3-33d8a09a24e3"], //The training source id's you want the AI's knowledge to be limited to.
    tags: ["twitter"], //Use tags to get the segment of the training data you want the AI's knowledge to be limited to.
    top: 10, //Optional. The weight of training data used to form a context. Defaults to 10. Recommended settings between : 10 - 15 give better response from the AI.
    max_reply_tokens: 300, // Optional. The maximum number of tokens allowed for the chat response. By default, the number of tokens the model can return will be (300 - tokens).
    instruction: "", //Optional. An instruction to tell the AI how to reply. Defaults to the bot instruction.
    chat_id: "example-chat-id", //Optional. Specify a chat id if you want to engage the AI in a conversational manner. Chat id should be unique per chat thread with the AI.
    stream: false
}

let chatbot = await boostgpt.chat(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```


Response:

```json

{
    "chat": {
        "reply": "THE BOT REPLY.",
        "meta": [
            {
                "source_id": "832146d2-e43c-11ed-ad91-a2ce1f33a089",
                "tags": [
                    "twitter",
                    "revue"
                ]
            }
        ],
        "usage": {
            "prompt_tokens": 380,
            "completion_tokens": 82,
            "total_tokens": 462
        }
    }
}

```



## Delete a chatbot chat history

Here is an example that deletes a chatbot chat history in your BoostGPT account


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    chat_id: "example-chat-id",
};

let chatbot = await boostgpt.deleteChat(payload);

if (chatbot.err) {
   //Handle errors here.
}else{
   console.log(chatbot.response);
}

```


Response:

```json
    {
        "conversation": [
            {
                "chat_id": "f385229f-d142-4c3b-997f-6a4ec6445a4d",
                "content": "hi",
                "role": "user",
                "tokens": 1
            },
            {
                "chat_id": "f385229f-d142-4c3b-997f-6a4ec6445a4d",
                "content": "Hello! How can I assist you today?",
                "role": "system",
                "tokens": 7
            },
            {
                "chat_id": "f385229f-d142-4c3b-997f-6a4ec6445a4d",
                "content": "I am thinking of writing a blog post around boostgpt, something that will bring traffic",
                "role": "user",
                "tokens": 15
            },
        ]
    }
```





## Conventions

All methods must be awaited, and return a BoostGPTResponse object - which only has two properties: `err` and `response`.

Always check for presence of `err`.  If `err` is not null, then the response might not be valid.



## Questions?

[Join our Discord server.](https://discord.gg/KGhz5SnyXM)


### License

This package is licensed under the [MIT](https://github.com/boostgpt/boostgpt-node/blob/master/LICENSE).
