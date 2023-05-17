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
    source: 'My quest for a good SEO meta tag implementation in Laravel drove me tech mad to write a package that will add standard SEO meta tags to my application with ease. However, I had to go the extra mile to research important meta tags and the role they play when it comes to SEO and how they can be used to improve SEO, So literally I had to do most of the heavy lifting. Lets quickly take a detour to what meta tags are and how they can improve SEO before we unveil the package. Why do meta tags matter? As previously mentioned, meta tags offer more details about your site to search engines and website visitors who encounter your site in the SERP. They can be optimized to highlight the most important elements of your content and make your website stand out in search results. Search engines increasingly value good user experience, and that includes making sure that your site satisfies a user’s query as best as it possibly can. Meta tags help with this by making sure that the information searchers need to know about your site is displayed upfront in a concise and useful fashion.',//Require your text content or an accessible link to your file, webpage, or website
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
    source: `How to add a subscribe button to your Twitter Profile to grow your subscribers. Update: This article is now obsolete due to Revue shutting down its service. Please ignore this and move on to more interesting topics. You have probably seen a subscribe button on some Twitter profiles or wondered how they were implemented. If yes, then you’re in the right place because I will be sharing some info on how you can achieve that to convert your Twitter audience to your subscribers straight from your Tweets and Twitter profile. Introduction: We are going to be using a platform called Revue to set up this flow. Revue is a platform by Twitter. Revue makes it easy for writers and publishers to send editorial newsletters — and get paid. It has a powerful new way to allow your Twitter followers to subscribe to your newsletter directly from your Tweets and Twitter profile. Below are 3 steps that you can follow to set up your own subscribe button on your Twitter profile. Step 1: Create a Revue Account. Go to https://getrevue.co and create an account using your Twitter or email address. Step 2: Go to Account Settings. After creating and verifying your account, the next thing to do will be to configure your account to fit the newsletter digest you want your subscribers to see. Head over to Account Settings to begin this configuration. Step 3: Configure your Account. Once in Account settings, You will notice that there are 6 tabs with different titles to help you configure your account well. Start by configuring the settings in the first tab which is Profile. You will be tweaking some basic things here like your: Newsletter Profile Image, Title, Author, Issue Description, Welcome Text, and so on. Head over to the next tab once you’re done which is the Settings tab. Here, you will be able to hide your subscriber's count and also set up your custom domain. The instructions beside each field are clear enough to help you comprehend what to do. Now, The Design tab has some customization options like; Themes, Email header type, primary color, and secondary color to help tailor your digest page. The next tab will be Integrations which contains a variety of third-party services to help improve how you make use of Revue. This is where you will be able to enable the feature which lets your followers subscribe to your newsletter from your Twitter profile. You have to connect your Twitter account here for you to see the settings to enable it. Click on the Settings button next to the disconnect button on the Twitter integration card after connecting your account. Next tick the option where it says: ENABLE NEWSLETTER SUBSCRIBE and save. That’s it, you now have a subscribe button feature showing on your Twitter profile page. Head over to your Twitter profile to make sure your button displays properly.Conclusion: I am happy I could help you enable this feature. Feel free to reach out to me if you have any questions. David Oti is the publisher of this blog.`,//Require your text content or an accessible link to your file, webpage, or website
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
    chat_id: "example-chat-id" //Optional. Specify a chat id if you want to engage the AI in a conversational manner. Chat id should be unique per chat thread with the AI.
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
        "reply": "To add a subscribe button to your Twitter profile, you can follow these three steps:\n\n1. Connect your Twitter account to Revue by going to https://www.getrevue.co/app/integrations/twitter and clicking on \"Connect Twitter Account\".\n2. Enable the newsletter subscribe feature by clicking on the Settings button next to the disconnect button on the Twitter integration card after connecting your account. Next tick the option where it says: ENABLE NEWSLETTER SUBSCRIBE and save.\n3. Head over to your Twitter profile to make sure your button displays properly. That’s it, you now have a subscribe button feature showing on your Twitter profile page.\n\nBy following these steps, you will be able to enable the feature which lets your followers subscribe to your newsletter from your Twitter profile.",
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



## Conventions

All methods must be awaited, and return a BoostGPTResponse object - which only has two properties: `err` and `response`.

Always check for presence of `err`.  If `err` is not null, then the response might not be valid.



## Questions?

[Join our Discord server.](https://discord.gg/KGhz5SnyXM)


### License

This package is licensed under the [MIT](https://github.com/boostgpt/boostgpt-node/blob/master/LICENSE).
