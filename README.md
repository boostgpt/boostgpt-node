<div align="center">
    <h1>BoostGPT Node.js Client</h1>
    <p>Official BoostGPT client library for Node.js with full ES Modules (ESM) and CommonJS (CJS) support..</p>
    <a href="https://www.npmjs.com/package/boostgpt"><img src="https://img.shields.io/npm/v/boostgpt" alt="NPM Version"></a>
    <a href="https://discord.gg/FPTmDNjA"><img src="https://img.shields.io/discord/1100801013121822770?color=%bbccff&label=Discord" alt="Discord"></a>
    <a href="https://docs.boostgpt.co"><img src="https://img.shields.io/badge/Docs-BoostGPT" alt="Documentation"></a>
    <br>
    <br>
</div>


## Requirements

- Node.js >= 12.20.0
- For ES Modules: Node.js >= 14.0.0 recommended
- BoostGPT [API Key](https://app.boostgpt.co/account/api-keys)


## Installation

```bash
npm install boostgpt
```

## Usage

### ES Modules (Recommended)

```javascript
import { BoostGPT } from 'boostgpt';

const client = new BoostGPT({
    project_id: 'your-project-id',
    key: 'your-api-key'
});

// Create a bot
const botResponse = await client.createBot({
    name: 'My Bot',
    model: 'gpt-4',
    instruction: 'You are a helpful assistant',
    max_reply_tokens: 1000,
    status: 'active'
});

if (botResponse.err) {
    console.error('Error:', botResponse.err);
} else {
    console.log('Bot created:', botResponse.response);
}

// Chat with the bot
const chatResponse = await client.chat({
    bot_id: 'bot-id',
    message: 'Hello, how are you?',
    vector: true
});

console.log('Response:', chatResponse.response);
```

### CommonJS (Legacy Support)

```javascript
const { BoostGPT } = require('boostgpt');

const client = new BoostGPT({
    project_id: 'your-project-id',
    key: 'your-api-key'
});

// Use async/await or promises
(async () => {
    const botResponse = await client.createBot({
        name: 'My Bot',
        model: 'gpt-4',
        instruction: 'You are a helpful assistant'
    });
    
    console.log(botResponse.response);
})();
```

## API Reference

### Constructor

```javascript
const client = new BoostGPT({
    project_id: 'your-project-id',  // Required
    key: 'your-api-key'              // Required
});
```

### Bot Management

#### Create Bot
```javascript
await client.createBot({
    name: 'Bot Name',
    model: 'gpt-4',
    instruction: 'System instruction',
    max_reply_tokens: 1000,
    top: 0.9,
    welcome_message: 'Hello!',
    status: 'active'
});
```

#### Fetch Bot
```javascript
await client.fetchBot(bot_id);
```

#### Fetch All Bots
```javascript
await client.fetchBots({
    page: 1,
    per_page: 10
});
```

#### Update Bot
```javascript
await client.updateBot({
    bot_id: 'bot-id',
    name: 'Updated Name',
    model: 'gpt-4',
    instruction: 'Updated instruction',
    max_reply_tokens: 1500,
    top: 0.8,
    welcome_message: 'Hi there!',
    status: 'active'
});
```

#### Reset Bot
```javascript
await client.resetBot(bot_id);
```

#### Delete Bot
```javascript
await client.deleteBot(bot_id);
```

### Chat Operations

#### Send Chat Message
```javascript
await client.chat({
    bot_id: 'bot-id',
    model: 'gpt-4',
    provider_key: 'optional-provider-key',
    instruction: 'Optional override instruction',
    source_ids: ['source1', 'source2'],
    message: 'Your message here',
    tags: ['tag1', 'tag2'],
    top: 0.9,
    max_reply_tokens: 1000,
    chat_id: 'optional-chat-id',
    stream: false,
    vector: true
});
```

#### Search
```javascript
await client.search({
    bot_id: 'bot-id',
    source_ids: ['source1', 'source2'],
    keywords: 'search terms',
    tags: ['tag1', 'tag2'],
    top: 5
});
```

#### Fetch Chat
```javascript
await client.fetchChat({
    bot_id: 'bot-id',
    chat_id: 'chat-id',
    page: 1,
    per_page: 10
});
```

#### Fetch All Chats
```javascript
await client.fetchChats({
    bot_id: 'bot-id',
    page: 1,
    per_page: 10
});
```

#### Delete Chat
```javascript
await client.deleteChat({
    chat_id: 'chat-id',
    bot_id: 'bot-id'
});
```

### Training/Source Management

#### Start Training
```javascript
await client.startTraining({
    bot_id: 'bot-id',
    tags: ['tag1', 'tag2'],
    type: 'text',
    source: 'Training content here'
});
```

#### Fetch Training
```javascript
await client.fetchTraining({
    source_id: 'source-id',
    bot_id: 'bot-id'
});
```

#### Fetch All Trainings
```javascript
await client.fetchTrainings({
    bot_id: 'bot-id',
    page: 1,
    per_page: 10
});
```

#### Update Training
```javascript
await client.updateTraining({
    source_id: 'source-id',
    bot_id: 'bot-id',
    tags: ['updated-tag'],
    type: 'text',
    source: 'Updated content'
});
```

#### Delete Training
```javascript
await client.deleteTraining({
    source_id: 'source-id',
    bot_id: 'bot-id'
});
```

## Response Format

All methods return a `BoostGPTResponse` object:

```javascript
{
    err: null | Error,        // Error object if request failed
    response: null | Object   // Response data if request succeeded
}
```

Example error handling:

```javascript
const result = await client.createBot({ name: 'My Bot' });

if (result.err) {
    console.error('Request failed:', result.err.message);
} else {
    console.log('Success:', result.response);
}
```

## Development

### Building the Package

```bash
# Install dependencies
npm install

# Build CommonJS files from ESM source
npm run build
```

The build process converts the ES Module source files in `src/` to CommonJS in `dist/`.

### Project Structure

- **`src/`** - ES Module source code (edit these files)
- **`dist/`** - Generated CommonJS build (don't edit, auto-generated)
- **`build.js`** - Build script that transpiles ESM to CJS
- **`package.json`** - Configured with `"type": "module"` and dual exports


### Making Changes

1. Edit files in `src/` (ESM format)
2. Run `npm run build` to generate CJS in `dist/`
3. Test both ESM and CJS usage
4. The `prepublishOnly` script automatically builds before publishing


## TypeScript Support

While this package is written in JavaScript, it works with TypeScript. Type definitions may be added in a future release.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes in `src/`
4. Run `npm run build`
5. Test both ESM and CJS usage
6. Submit a Pull Request

## License

MIT

## Links

- [GitHub Repository](https://github.com/boostgpt/boostgpt-node)
- [Issue Tracker](https://github.com/boostgpt/boostgpt-node/issues)
- [BoostGPT Documentation](https://boostgpt.co)

## Support

For support, please visit the [GitHub Issues](https://github.com/boostgpt/boostgpt-node/issues) page.