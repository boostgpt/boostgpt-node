<div align="center">
    <h1>BoostGPT</h1>
    <p>Empower Your Projects with a Seamless AI Chatbot API Integration.</p>
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

## Supported AI Models

BoostGPT now supports multiple AI providers. Choose from:

### OpenAI Models
- `gpt-5.1` - Latest GPT-5 model (1M context)
- `gpt-5` - GPT-5 standard (1M context)
- `gpt-5-mini` - Efficient GPT-5 variant (1M context)
- `gpt-5-nano` - Most efficient GPT-5 (1M context)
- `gpt-4.1` - Latest GPT-4 iteration (1M context)
- `gpt-4.1-mini` - Efficient GPT-4.1 (1M context)
- `gpt-4o` - GPT-4 optimized (128K context)
- `gpt-4o-mini` - Efficient GPT-4o (128K context)

### Anthropic Claude Models
- `claude-sonnet-4-5` - Latest Claude Sonnet (200K context, 64K output)
- `claude-haiku-4-5` - Latest Claude Haiku (200K context, 64K output)
- `claude-opus-4-1` - Most capable Claude (200K context, 32K output)

### Google Gemini Models
- `gemini-3-pro-preview` - Latest Gemini preview (1M context)
- `gemini-2.5-pro` - Gemini 2.5 Pro (1M context, 65K output)
- `gemini-2.5-flash-lite` - Efficient Gemini (1M context, 65K output)
- `gemini-2.5-flash` - Fast Gemini (1M context, 65K output)

### xAI Grok Models
- `grok-4-1-fast-non-reasoning` - Latest Grok (2M context)
- `grok-4-fast-non-reasoning` - Fast Grok (2M context)
- `grok-3-mini` - Efficient Grok (131K context)
- `grok-3` - Standard Grok (131K context)


## Create a chatbot

Here is an example that creates a chatbot in your BoostGPT project


```javascript

let payload = {
    name: 'Example name',
    model: "gpt-4o-mini", // Choose from supported models above
    instruction: `I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.`, // Optional. An instruction to prompt the chatbot on how to respond
    status: 1 // Required: "1" = online, "0" = offline
}
let chatbot = await boostgpt.createBot(payload);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:


```json
{
    "bot": {
        "uuid": "fa155610-e2a2-11ed-8d7e-128759b35991",
        "name": "Example name",
        "model": "gpt-4o-mini",
        "max_reply_tokens": "1000",
        "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
        "status": 1,
        "updated_at": "2023-04-24T13:21:52.000Z"
    }
}

```


## Update a chatbot

Here is an example that updates a chatbot in your BoostGPT project


```javascript

let payload = {
    bot_id: "fa155610-e2a2-11ed-8d7e-128759b35991",
    name: 'Example name',
    model: "claude-sonnet-4-5", // You can switch between any supported models
    instruction: `I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.`, // Optional. An instruction to prompt the chatbot on how to respond
    status: 1 // Required: "1" = online, "0" = offline
}
let chatbot = await boostgpt.updateBot(payload);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:


```json
{
    "bot": {
        "uuid": "fa155610-e2a2-11ed-8d7e-128759b35991",
        "name": "Example name",
        "model": "claude-sonnet-4-5",
        "max_reply_tokens": "1000",
        "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
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
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "bot": {
        "uuid": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
        "model": "gpt-4o-mini", 
        "max_reply_tokens": "1000",
        "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
        "status": 1,
        "updated_at": "2023-04-26T10:26:33.000Z"
    }
}
```


## Fetch all chatbots

Here is an example that fetches all chatbots in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    page: 1,
    per_page: 10
}
let chatbots = await boostgpt.fetchBots(payload);

if (chatbots.err) {
   // Handle errors here.
}else{
   console.log(chatbots.response);
}

```

Response:

```json
{
    "total": 2,
    "bots": [
        {
            "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
            "model": "gpt-4o-mini",
            "max_reply_tokens": "1000",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 0,
            "updated_at": "2023-04-26T12:22:46.000Z",
            "tokenCount": null,
            "sourceCount": 0
        },
        {
            "uuid": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
            "model": "claude-sonnet-4-5",
            "max_reply_tokens": "8000",
            "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
            "status": 1,
            "updated_at": "2023-04-26T10:26:33.000Z",
            "tokenCount": "23152",
            "sourceCount": 5
        }
    ]
}
```



## Reset a chatbot

Here is an example that resets a chatbot in your BoostGPT project. Resetting a chatbot will delete all its training data.


```javascript

let bot_id = "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3";
let chatbot = await boostgpt.resetBot(bot_id);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "bot": {
        "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
        "model": "gpt-4o-mini",
        "max_reply_tokens": "1000",
        "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
        "status": 1,
        "updated_at": "2023-04-26T12:22:46.000Z"
    }
}
```



## Delete a chatbot

Here is an example that deletes a chatbot in your BoostGPT project. Deleting a chatbot will delete all its training data.



```javascript

let bot_id = "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3";
let chatbot = await boostgpt.deleteBot(bot_id);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "bot": {
        "uuid": "dfd3b238-e41a-11ed-ad91-a2ce1f33a089",
        "model": "gpt-4o-mini",
        "max_reply_tokens": "1000",
        "instruction": "I want you to act as an AI assistant that I am having a conversation with. Your name is 'AI Assistant' and you always format your responses in Markdown. You will provide me with answers from the given context. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
        "status": 1,
        "updated_at": "2023-04-26T12:22:46.000Z"
    }
}
```





## Train chatbot with your data

Here is an example that adds training data to a chatbot in your BoostGPT project


```javascript

let payload = {
    bot_id: "fa155610-e2a2-11ed-8d7e-128759b35991",
    tags: [], // Use tags to segment your training data
    type: 'text', // Required: text, file, webpage, or website
    source: 'YOUR SOURCE DATA', // Required: your text content or an accessible link to your file, webpage, or website
}
let chatbot = await boostgpt.startTraining(payload);

if (chatbot.err) {
   // Handle errors here.
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
    tags: ["twitter","revue"], // Use tags to segment your training data
    type: 'text', // Required: text, file, webpage, or website
    source: `YOUR SOURCE DATA`, // Required: your text content or an accessible link to your file, webpage, or website
}
let chatbot = await boostgpt.updateTraining(payload);

if (chatbot.err) {
   // Handle errors here.
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
   // Handle errors here.
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


## Fetch chatbot training sources

Here is an example that fetches a chatbot's training sources in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    page: 1,
    per_page: 10
}
let chatbots = await boostgpt.fetchTrainings(payload);

if (chatbots.err) {
   // Handle errors here.
}else{
   console.log(chatbots.response);
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
        }
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
   // Handle errors here.
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

Here is an example that shows how you can engage a chatbot that has been trained with your data. 

**🔑 API Key Requirements:**
- For **OpenAI models** (gpt-*): Requires an [OpenAI API key](https://platform.openai.com/account/api-keys)
- For **Anthropic models** (claude-*): Requires an [Anthropic API key](https://console.anthropic.com/)
- For **Google models** (gemini-*): Requires a [Google AI API key](https://ai.google.dev/)
- For **xAI models** (grok-*): Requires an [xAI API key](https://console.x.ai/)

You can provide the API key in two ways:
1. **Per-request**: Pass `provider_key` in the chat payload (recommended for dynamic model switching)
2. **Stored with bot**: Configure API keys when creating/updating the bot


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3", // The bot to chat with
    provider_key: "YOUR-PROVIDER-API-KEY", // Optional: API key for the model's provider (OpenAI, Anthropic, Gemini, or xAI)
    model: "gpt-4o-mini", // Optional: The model to use for the chat response. Defaults to the bot's model.
    message: "How can I add a subscribe button to my twitter profile?", // The chat message
    source_ids: ["c26b16b4-d394-11ed-b5a3-33d8a09a24e3"], // Optional: The training source IDs you want the AI's knowledge to be limited to
    tags: ["twitter"], // Optional: Use tags to segment the training data the AI's knowledge is limited to
    top: 5, // Optional: The weight of training data used to form context. Defaults to 5. Recommended: 5-10 for better responses
    max_reply_tokens: 1000, // Optional: Maximum tokens for chat response. Defaults to the model's max output
    instruction: "", // Optional: Instruction to tell the AI how to reply. Defaults to the bot's instruction
    chat_id: "example-chat-id", // Optional: Specify a chat ID for conversational continuity. Should be unique per chat thread
    stream: false, // Optional: Enable streaming response
    vector: true // Optional: Enable vector search for context. Defaults to true
}

let chatbot = await boostgpt.chat(payload);

if (chatbot.err) {
   // Handle errors here.
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

### Examples with different providers:

```javascript
// Using OpenAI GPT-4o
let openai_chat = await boostgpt.chat({
    bot_id: "bot-123",
    model: "gpt-4o",
    provider_key: "sk-proj-...", // OpenAI API key
    message: "Hello!"
});

// Using Anthropic Claude
let claude_chat = await boostgpt.chat({
    bot_id: "bot-123",
    model: "claude-sonnet-4-5",
    provider_key: "sk-ant-...", // Anthropic API key
    message: "Hello!"
});

// Using Google Gemini
let gemini_chat = await boostgpt.chat({
    bot_id: "bot-123",
    model: "gemini-2.5-pro",
    provider_key: "AIza...", // Google AI API key
    message: "Hello!"
});

// Using xAI Grok
let grok_chat = await boostgpt.chat({
    bot_id: "bot-123",
    model: "grok-3",
    provider_key: "xai-...", // xAI API key
    message: "Hello!"
});

// Using bot's stored API key (no provider_key needed)
let stored_key_chat = await boostgpt.chat({
    bot_id: "bot-123",
    model: "gpt-4o-mini",
    // provider_key not needed if bot has stored OpenAI key
    message: "Hello!"
});
```



## Fetch a chatbot chat history

Here is an example that fetches a chatbot chat history in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    chat_id: "2f2fbca2-e436-11ed-ad91-a2ce1f33a089",
    page: 1,
    per_page: 10
};
let chatbot = await boostgpt.fetchChat(payload);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```

Response:

```json
{
    "total": 3,
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
            "role": "assistant",
            "tokens": 7
        },
        {
            "chat_id": "f385229f-d142-4c3b-997f-6a4ec6445a4d",
            "content": "I am thinking of writing a blog post around boostgpt, something that will bring traffic",
            "role": "user",
            "tokens": 15
        }
    ]
}
```


## Fetch a chatbot chats

Here is an example that fetches a chatbot's chats in your BoostGPT project. The example below fetches 10 items per page.


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
    page: 1,
    per_page: 10
}
let chatbots = await boostgpt.fetchChats(payload);

if (chatbots.err) {
   // Handle errors here.
}else{
   console.log(chatbots.response);
}

```

Response:

```json
{
    "total": 3,
    "chats": [
        {
            "chat_id": "50388f6b-9bce-4bb7-aef6-bafc151544df",
            "messages": 12,
            "latest": "2023-05-21T07:45:08.000Z"
        },
        {
            "chat_id": "test-id",
            "messages": 6,
            "latest": "2023-05-20T22:30:27.000Z"
        },
        {
            "chat_id": "1784709e-3ff9-432d-8683-08ec427a8b5b",
            "messages": 2,
            "latest": "2023-05-18T15:42:03.000Z"
        }
    ]
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
   // Handle errors here.
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
            "role": "assistant",
            "tokens": 7
        },
        {
            "chat_id": "f385229f-d142-4c3b-997f-6a4ec6445a4d",
            "content": "I am thinking of writing a blog post around boostgpt, something that will bring traffic",
            "role": "user",
            "tokens": 15
        }
    ]
}
```



## Search a chatbot

Here is an example that shows how you can search a chatbot that has been trained with your data.


```javascript

let payload = {
    bot_id: "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3", // The bot to search
    keywords: "How can I add a subscribe button to my twitter profile?", // The search keywords
    source_ids: ["c26b16b4-d394-11ed-b5a3-33d8a09a24e3"], // Optional: The training source IDs to limit the search to
    tags: ["twitter"], // Optional: Use tags to segment the training data the search is limited to
    top: 10, // Optional: The weight of training data used to form results. Defaults to 5. Recommended: 5-10
}

let chatbot = await boostgpt.search(payload);

if (chatbot.err) {
   // Handle errors here.
}else{
   console.log(chatbot.response);
}

```


Response:

```json
{
    "search": [
        {
            "id": 41775,
            "version": 5903,
            "score": 0.54020226,
            "payload": {
                "bot_id": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
                "content": "Adding a subscribe button to your Twitter profile can be a valuable strategy to grow your audience and keep them engaged with your content. While Twitter doesn't have a native "subscribe" button like some other social media platforms, there are several effective methods you can use to encourage users to follow your account and receive updates on your tweets.",
                "source_id": "c26b16b4-d394-11ed-b5a3-33d8a09a24e3",
                "tags": [
                    "twitter"
                ]
            },
            "vector": null
        },
        {
            "id": 40028,
            "version": 4159,
            "score": 0.5324362,
            "payload": {
                "bot_id": "8e9124a2-e0a3-11ed-b5a3-33d8a09a24e3",
                "content": "Promote Your Content Regularly: Consistently share high-quality content that resonates with your target audience. This could include insightful thoughts, industry news, behind-the-scenes glimpses, or exclusive offers. The more valuable and relevant your content is, the more likely users will want to follow you.",
                "source_id": "c26b16b4-d394-11ed-b5a3-33d8a09a24e3",
                "tags": [
                    "twitter"
                ]
            },
            "vector": null
        }
    ]
}
```


## Migration Guide for Existing Users

If you're upgrading from a previous version:

### Breaking Changes
- Old OpenAI models (`gpt-3.5-turbo-0301`, `gpt-3.5-turbo-16k`, `gpt-4-32k`, etc.) are no longer supported
- Use the new model names listed in the "Supported AI Models" section

### New Features
- ✅ Support for Anthropic Claude models
- ✅ Support for Google Gemini models
- ✅ Support for xAI Grok models
- ✅ Simplified API with `provider_key` parameter
- ✅ Larger context windows (up to 2M tokens with Grok)
- ✅ Higher output limits (up to 65K tokens with Gemini)

### Migrating Your Code

**Old way:**
```javascript
let payload = {
    bot_id: "bot-123",
    model: "gpt-3.5-turbo",
    openai_key: "sk-...",
    message: "Hello"
}
```

**New way (backwards compatible):**
```javascript
let payload = {
    bot_id: "bot-123",
    model: "gpt-4o-mini", // Updated model name
    provider_key: "sk-...", // Simplified key parameter
    message: "Hello"
}
```


## Conventions

All methods must be awaited, and return a BoostGPTResponse object - which only has two properties: `err` and `response`.

Always check for presence of `err`. If `err` is not null, then the response might not be valid.



## Questions?

[Join our Discord server.](https://discord.gg/KGhz5SnyXM)


### License

This package is licensed under the [MIT](https://github.com/boostgpt/boostgpt-node/blob/master/LICENSE).