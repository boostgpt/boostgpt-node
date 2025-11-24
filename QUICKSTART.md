# Quick Start Guide

## Installation

```bash
npm install boostgpt
```

## Basic Usage

### ES Modules (Recommended)

```javascript
import { BoostGPT } from 'boostgpt';

const client = new BoostGPT({
    project_id: 'your-project-id',
    key: 'your-api-key'
});

// Create a bot
const bot = await client.createBot({
    name: 'My Assistant',
    model: 'gpt-4',
    instruction: 'You are a helpful assistant'
});

// Chat
const response = await client.chat({
    bot_id: bot.response.data.id,
    message: 'Hello!'
});

console.log(response.response.data.message);
```

### CommonJS

```javascript
const { BoostGPT } = require('boostgpt');

const client = new BoostGPT({
    project_id: 'your-project-id',
    key: 'your-api-key'
});

// Use with async/await
(async () => {
    const bot = await client.createBot({
        name: 'My Assistant',
        model: 'gpt-4',
        instruction: 'You are a helpful assistant'
    });
    
    const response = await client.chat({
        bot_id: bot.response.data.id,
        message: 'Hello!'
    });
    
    console.log(response.response.data.message);
})();
```

## Development Setup

### For Package Users

Just install and use - no setup needed!

```bash
npm install boostgpt
```

### For Package Contributors

```bash
# Clone the repo
git clone https://github.com/boostgpt/boostgpt-node.git
cd boostgpt-node

# Install dependencies
npm install

# Make changes in src/
vim src/index.js

# Build CommonJS version
npm run build

# Test
node test-esm.mjs
node test-cjs.cjs
```

## Project Structure

```
boostgpt/
├── src/              # ES Module source (edit these)
│   ├── index.js
│   └── request.js
├── dist/             # Built CommonJS (auto-generated)
│   ├── index.cjs
│   └── request.cjs
├── build.js          # Build script
├── package.json      # Package config
└── README.md         # Full docs
```

## Common Tasks

### Create a Bot
```javascript
const bot = await client.createBot({
    name: 'Bot Name',
    model: 'gpt-4',
    instruction: 'System instruction',
    status: 'active'
});
```

### Send a Message
```javascript
const response = await client.chat({
    bot_id: 'bot-id',
    message: 'Your message',
    vector: true
});
```

### Search Knowledge Base
```javascript
const results = await client.search({
    bot_id: 'bot-id',
    keywords: 'search terms',
    top: 5
});
```

### Add Training Data
```javascript
const training = await client.startTraining({
    bot_id: 'bot-id',
    type: 'text',
    source: 'Training content here'
});
```

## Error Handling

All methods return a response object with `err` and `response`:

```javascript
const result = await client.createBot({ name: 'Test' });

if (result.err) {
    console.error('Error:', result.err.message);
    // Handle error
} else {
    console.log('Success:', result.response.data);
    // Use response
}
```

## Module System Notes

### Using ESM

**Option 1: .mjs extension**
```javascript
// myfile.mjs
import { BoostGPT } from 'boostgpt';
```

**Option 2: package.json type**
```json
{
  "type": "module"
}
```
```javascript
// myfile.js (now treated as ESM)
import { BoostGPT } from 'boostgpt';
```

### Using CommonJS

Just use `.js` or `.cjs` extension:
```javascript
// myfile.js or myfile.cjs
const { BoostGPT } = require('boostgpt');
```

## Building from Source

```bash
# Install deps
npm install

# Build CJS from ESM source
npm run build

# Output: dist/index.cjs and dist/request.cjs
```

The build process:
1. Reads `src/*.js` (ESM)
2. Converts syntax (import → require)
3. Writes `dist/*.cjs` (CommonJS)

## Publishing (Contributors)

```bash
# The prepublishOnly hook auto-builds
npm publish

# Or manually:
npm run build
npm publish
```

## Requirements

- Node.js >= 12.20.0
- npm >= 6.0.0

## Links

- 📦 [npm package](https://www.npmjs.com/package/boostgpt)
- 📖 [Full documentation](./README.md)
- 🐛 [Report issues](https://github.com/boostgpt/boostgpt-node/issues)

## Need Help?

- Read the [full README](./README.md)
- [Open an issue](https://github.com/boostgpt/boostgpt-node/issues)

---

**That's it!** You're ready to use BoostGPT with either ES Modules or CommonJS. 🚀