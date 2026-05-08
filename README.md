<div align="center">
    <h1>BoostGPT Node.js Client</h1>
    <p>Official BoostGPT client library for Node.js with full ES Modules (ESM) and CommonJS (CJS) support.</p>
    <a href="https://www.npmjs.com/package/boostgpt"><img src="https://img.shields.io/npm/v/boostgpt" alt="NPM Version"></a>
    <a href="https://discord.gg/FPTmDNjA"><img src="https://img.shields.io/discord/1100801013121822770?color=%bbccff&label=Discord" alt="Discord"></a>
    <a href="https://docs.boostgpt.co"><img src="https://img.shields.io/badge/Docs-BoostGPT" alt="Documentation"></a>
    <br>
    <br>
</div>

## Features

- Full ES Modules (ESM) and CommonJS (CJS) support
- Complete API coverage for all BoostGPT endpoints
- Bot/Agent management (create, read, update, delete)
- Chat operations with streaming support
- Memory source/training management
- User memory management (per-user semantic, episodic, procedural memories)
- Workflows (create, run, and monitor multi-step automations)
- Heartbeats (scheduled autonomous agent runs with cron support)
- Workspaces (sandbox file system — read, write, publish)
- Email inbox management (read, reply, configure)
- CRM (contacts, custom fields, pipelines, deals, tasks)
- MCP connector management (deploy from catalog, OpenAPI, or Postman)
- Tools management (MCP server integration)
- Message voting and feedback
- Subscriber management
- Comprehensive analytics and statistics
- TypeScript-friendly (type definitions coming soon)

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Bot Management](#bot-management)
  - [Chat Operations](#chat-operations)
  - [Training/Source Management](#trainingsource-management)
  - [Tools Management](#tools-management)
  - [User Memory](#user-memory)
  - [Workflows](#workflows)
  - [Heartbeats](#heartbeats)
  - [Workspaces](#workspaces)
  - [Email Inbox](#email-inbox)
  - [CRM](#crm)
  - [MCP Connectors](#mcp-connectors)
  - [Subscribers](#subscribers)
  - [Analytics](#analytics)
- [Response Format](#response-format)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

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
    model: 'gpt-4o-min',
    instruction: 'You are a helpful assistant',
    max_reply_tokens: 1000,
    status: 1
});

if (botResponse.err) {
    console.error('Error:', botResponse.err);
} else {
    console.log('Bot created:', botResponse.response);
}

// Chat with the bot
const chatResponse = await client.chat({
    bot_id: 'bot-id',
    message: 'Hello, how are you?'
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
        model: 'gpt-4o-min',
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
    model: 'gpt-4o-min',
    instruction: 'System instruction',
    max_reply_tokens: 1000,
    status: 1
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
    model: 'gpt-5.1',
    instruction: 'Updated instruction',
    max_reply_tokens: 1500,
    status: "0" // 1 = online, 0 = offline
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
    model: 'gpt-4o-min',  //Optional
    provider_key: 'optional-provider-key', //Optional
    provider_host: 'optionl-provider-host', // Only needed and required when using ollama models
    instruction: 'Optional override instruction',
    reasoning_mode: 'optional-reasoning-mode', //Default to standard
    source_ids: ['source1', 'source2'], //Optional
    message: 'Your message here',
    max_reply_tokens: 1000,  //Optional
    chat_id: 'optional-chat-id',
    stream: false,  //Optional
    memory: false // Optional: Disables the agents memory
});
```

#### Search
```javascript
await client.search({
    bot_id: 'bot-id',
    source_ids: ['source1', 'source2'],
    keywords: 'search terms'
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

#### Execute Tool
```javascript
await client.executeTool({
    bot_id: 'bot-id',
    chat_id: 'chat-id',
    tool_calls: [
        {
            tool_name: 'calculator',
            parameters: { operation: 'add', a: 5, b: 3 }
        }
    ]
});
```

#### Vote on Message
```javascript
await client.voteMessage({
    bot_id: 'bot-id',
    message_id: 'message-id',
    voter_id: 'user-id',
    voter_type: 'member',
    vote_type: 'upvote' // or 'downvote'
});
```

#### Fetch Vote Status
```javascript
await client.fetchVoteStatus({
    bot_id: 'bot-id',
    message_id: 'message-id',
    voter_id: 'user-id',
    voter_type: 'member'
});
```

#### Delete Message
```javascript
await client.deleteMessage({
    bot_id: 'bot-id',
    chat_id: 'chat-id',
    message_id: 'message-id'
});
```

### Training/Source Management

#### Start Training
```javascript
await client.startTraining({
    bot_id: 'bot-id',
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

### Tools Management

#### Fetch Tools
```javascript
await client.fetchTools({
    bot_id: 'bot-id',
    page: 1,
    per_page: 10,
    filter: { type: 'mcp' } // Optional filter
});
```

#### Create Tool
```javascript
await client.createTool({
    bot_id: 'bot-id',
    name: 'My Tool',
    description: 'Tool description',
    config: {
        url: 'https://api.example.com',
        auth: 'bearer_token'
    },
    type: 'mcp'
});
```

#### Fetch Tool
```javascript
await client.fetchTool({
    tool_id: 'tool-id',
    bot_id: 'bot-id'
});
```

#### Update Tool
```javascript
await client.updateTool({
    tool_id: 'tool-id',
    bot_id: 'bot-id',
    name: 'Updated Tool Name',
    description: 'Updated description',
    config: { /* updated config */ },
    type: 'mcp'
});
```

#### Delete Tool
```javascript
await client.deleteTool({
    tool_id: 'tool-id',
    bot_id: 'bot-id'
});
```

#### Configure Tools
```javascript
await client.configureTools({
    tool_id: 'tool-id',
    bot_id: 'bot-id',
    settings: {
        enabled: true,
        timeout: 30000
    }
});
```

#### Refresh Tools
```javascript
await client.refreshTools({
    tool_id: 'tool-id',
    bot_id: 'bot-id'
});
```

#### Toggle Tool
```javascript
await client.toggleTool({
    tool_id: 'tool-id',
    bot_id: 'bot-id',
    tool_name: 'specific-tool',
    active: true
});
```

#### Test Tool Connection
```javascript
await client.testToolConnection({
    tool_id: 'tool-id',
    bot_id: 'bot-id'
});
```

### User Memory

#### List Memories
```javascript
await client.fetchMemories({
    bot_id: 'bot-id',
    user_uuid: 'user-uuid',  // optional: filter by user
    type: 'semantic',         // optional: 'semantic' | 'episodic' | 'procedural' | 'all'
    page: 1,
    per_page: 50
});
```

#### Count Memories
```javascript
await client.countMemories({
    bot_id: 'bot-id',
    user_uuid: 'user-uuid'
});
```

#### Delete a Memory
```javascript
await client.deleteMemory({
    bot_id: 'bot-id',
    memory_id: 'mem-uuid'
});
```

### Workflows

#### Fetch Workflow Catalog
```javascript
await client.fetchWorkflowCatalog({ bot_id: 'bot-id' });
```

#### List Workflows
```javascript
await client.fetchWorkflows({ bot_id: 'bot-id' });
```

#### Get a Workflow
```javascript
await client.fetchWorkflow({ bot_id: 'bot-id', workflow_id: 'wf-id' });
```

#### Create a Workflow
```javascript
await client.createWorkflow({
    bot_id: 'bot-id',
    name: 'Lead Qualification',
    trigger: 'webhook',
    steps: [/* step objects */]
});
```

#### Update a Workflow
```javascript
await client.updateWorkflow({
    bot_id: 'bot-id',
    workflow_id: 'wf-id',
    enabled: true
});
```

#### Delete a Workflow
```javascript
await client.deleteWorkflow({ bot_id: 'bot-id', workflow_id: 'wf-id' });
```

#### Run a Workflow
```javascript
await client.runWorkflow({ bot_id: 'bot-id', workflow_id: 'wf-id' });
```

#### Fetch Workflow Logs
```javascript
await client.fetchWorkflowLogs({ bot_id: 'bot-id' });
```

### Heartbeats

#### Create / Update a Heartbeat
```javascript
await client.createHeartbeat({
    bot_id: 'bot-id',
    prompt: 'Check for new support tickets and summarize urgent ones',
    cron_pattern: '0 9 * * 1-5',   // weekdays at 9am
    enabled: true,
    timezone: 'America/New_York',
    credit_budget: 100,
    max_consecutive_errors: 5
});
```

#### Get a Heartbeat
```javascript
await client.fetchHeartbeat({ bot_id: 'bot-id', heartbeat_id: 'hb-id' });
```

#### List Heartbeats
```javascript
await client.fetchHeartbeats({ bot_id: 'bot-id' });
```

#### Enable / Disable
```javascript
await client.enableHeartbeat({ bot_id: 'bot-id', heartbeat_id: 'hb-id' });
await client.disableHeartbeat({ bot_id: 'bot-id', heartbeat_id: 'hb-id' });
```

#### Trigger Manually
```javascript
await client.triggerHeartbeat({ bot_id: 'bot-id', heartbeat_id: 'hb-id' });
```

#### Delete a Heartbeat
```javascript
await client.deleteHeartbeat({ bot_id: 'bot-id', heartbeat_id: 'hb-id' });
```

#### Fetch Logs & Stats
```javascript
await client.fetchHeartbeatLogs({ bot_id: 'bot-id' });
await client.fetchHeartbeatStats({ bot_id: 'bot-id' });
```

### Workspaces

#### List Workspaces
```javascript
await client.fetchWorkspaces({ bot_id: 'bot-id' });
```

#### Create / Delete Workspace
```javascript
await client.createWorkspace({ bot_id: 'bot-id', name: 'My Workspace' });
await client.deleteWorkspace({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
```

#### File Operations
```javascript
// List files
await client.fetchFiles({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });

// Read a file
await client.readFile({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid', file_uuid: 'file-uuid' });

// Create a file
await client.createFile({
    bot_id: 'bot-id',
    workspace_uuid: 'ws-uuid',
    file_path: '/src/app.js',
    content: 'console.log("hello");',
    language: 'javascript'
});

// Update a file
await client.updateFile({
    bot_id: 'bot-id',
    workspace_uuid: 'ws-uuid',
    file_uuid: 'file-uuid',
    content: '// updated content'
});

// Rename / move a file
await client.renameFile({
    bot_id: 'bot-id',
    workspace_uuid: 'ws-uuid',
    old_path: '/src/app.js',
    new_path: '/src/main.js'
});

// Delete a file
await client.deleteFile({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid', file_uuid: 'file-uuid' });

// Download workspace as ZIP
await client.downloadWorkspace({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
```

#### Publishing
```javascript
await client.suggestSubdomain({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
await client.publishWorkspace({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid', subdomain: 'my-app' });
await client.unpublishWorkspace({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });

// Custom domain
await client.addCustomDomain({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid', domain: 'app.example.com' });
await client.removeCustomDomain({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
await client.refreshDomainStatus({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
await client.getDomainInfo({ bot_id: 'bot-id', workspace_uuid: 'ws-uuid' });
```

### Email Inbox

#### Get Email Address
```javascript
await client.fetchEmailAddress({ bot_id: 'bot-id' });
```

#### Update Settings
```javascript
await client.updateEmailSettings({
    bot_id: 'bot-id',
    auto_reply: true,
    signature: 'Best, Support Team'
});
```

#### Stats, List, Read, Reply, Delete
```javascript
await client.fetchEmailStats({ bot_id: 'bot-id' });

await client.fetchEmails({ bot_id: 'bot-id', page: 1, per_page: 20 });

await client.fetchEmail({ bot_id: 'bot-id', email_id: 'email-uuid' });

await client.replyToEmail({
    bot_id: 'bot-id',
    email_id: 'email-uuid',
    content: 'Thanks for reaching out!'
});

await client.deleteEmail({ bot_id: 'bot-id', email_id: 'email-uuid' });
```

### CRM

#### Contacts
```javascript
// List / search
await client.fetchContacts({ bot_id: 'bot-id', page: 1, per_page: 20, status: 'lead' });
await client.searchContacts({ bot_id: 'bot-id', query: 'jane', limit: 10 });
await client.fetchContactStatuses({ bot_id: 'bot-id' });

// CRUD
await client.createContact({
    bot_id: 'bot-id',
    email: 'jane@example.com',
    status: 'lead',
    fields: { first_name: 'Jane', company: 'Acme' }
});
await client.fetchContact({ bot_id: 'bot-id', contact_id: 'con-id' });
await client.updateContact({ bot_id: 'bot-id', contact_id: 'con-id', status: 'customer' });
await client.deleteContact({ bot_id: 'bot-id', contact_id: 'con-id' });           // soft delete
await client.deleteContact({ bot_id: 'bot-id', contact_id: 'con-id', permanent: true }); // hard delete

// Export & notes
await client.exportContacts({ bot_id: 'bot-id' });
await client.addContactNote({ bot_id: 'bot-id', contact_id: 'con-id', content: 'Called.', type: 'call' });
```

#### Custom Fields
```javascript
await client.fetchCRMFields({ bot_id: 'bot-id' });
await client.createCRMField({ bot_id: 'bot-id', label: 'Company Size', field_type: 'select', options: ['1-10', '11-50'] });
await client.updateCRMField({ bot_id: 'bot-id', field_id: 'fld-id', label: 'Headcount' });
await client.deleteCRMField({ bot_id: 'bot-id', field_id: 'fld-id' });
```

#### Setup & Templates
```javascript
await client.fetchCRMSetup({ bot_id: 'bot-id' });
await client.fetchCRMTemplates({ bot_id: 'bot-id' });
await client.applyCRMTemplate({ bot_id: 'bot-id', template_key: 'sales', name: 'Q3 Pipeline' });
```

#### Pipelines
```javascript
await client.fetchPipelines({ bot_id: 'bot-id' });
await client.createPipeline({ bot_id: 'bot-id', name: 'Enterprise', default_currency: 'USD' });
await client.updatePipeline({ bot_id: 'bot-id', pipeline_id: 'pipe-id', is_default: true });
await client.deletePipeline({ bot_id: 'bot-id', pipeline_id: 'pipe-id' });
await client.fetchPipelineBoard({ bot_id: 'bot-id', pipeline_id: 'pipe-id' });

// Stages
await client.createPipelineStage({ bot_id: 'bot-id', name: 'Proposal', pipeline_id: 'pipe-id' });
await client.updatePipelineStage({ bot_id: 'bot-id', stage_id: 'stg-id', closed_status: 'won' });
await client.deletePipelineStage({ bot_id: 'bot-id', stage_id: 'stg-id', move_deals_to_stage_id: 'stg-other' });
```

#### Deals
```javascript
await client.fetchDeals({ bot_id: 'bot-id', status: 'open', pipeline_id: 'pipe-id' });
await client.createDeal({ bot_id: 'bot-id', title: 'Acme Corp — Pro', status: 'open' });
await client.updateDeal({ bot_id: 'bot-id', deal_id: 'deal-id', status: 'won' });
await client.deleteDeal({ bot_id: 'bot-id', deal_id: 'deal-id' });
```

#### Tasks
```javascript
await client.fetchTasks({ bot_id: 'bot-id', status: 'todo' });
await client.createTask({ bot_id: 'bot-id', title: 'Follow up with Jane', priority: 'high' });
await client.updateTask({ bot_id: 'bot-id', task_id: 'tsk-id', status: 'done' });
await client.snoozeTask({ bot_id: 'bot-id', task_id: 'tsk-id' });
await client.deleteTask({ bot_id: 'bot-id', task_id: 'tsk-id' });
await client.fetchCRMReport({ bot_id: 'bot-id' });
```

### MCP Connectors

#### Connector Catalog
```javascript
// List all available connectors
await client.fetchConnectors();

// Get connector details (auth requirements, tools)
await client.fetchConnector('jamendo');
```

#### Deploy MCP Servers
```javascript
// From a pre-built connector
await client.createMcpFromPredefined({
    name: 'My Jamendo Server',
    connectorName: 'jamendo',
    credentials: { client_id: 'your_client_id' }
});

// From an OpenAPI spec
await client.createMcpFromOpenApi({
    name: 'My API Server',
    openApiSpec: { /* OpenAPI 3.0 object */ },
    credentials: { api_key: 'sk-xxx' }
});

// From a Postman collection
await client.createMcpFromPostman({
    name: 'My Postman Server',
    postmanCollection: { /* Postman Collection v2.1 */ }
});
```

#### Manage Servers
```javascript
await client.fetchMcpServers();
await client.fetchMcpServer('server-uuid');
await client.updateMcpServer({ id: 'server-uuid', name: 'Renamed' });
await client.cloneMcpServer({ id: 'server-uuid', name: 'Clone' });
await client.deleteMcpServer('server-uuid');
await client.fetchMcpUsage('server-uuid');
```

#### Validate Specs
```javascript
await client.validateOpenApi({ spec: openApiObject });
await client.validatePostman({ collection: postmanObject });
```

### Subscribers

#### Fetch Subscribers
```javascript
await client.fetchSubscribers({
    page: 1,
    per_page: 10
});
```

### Analytics

#### Fetch Vote Statistics
```javascript
await client.fetchVoteStats({
    bot_id: 'bot-id'
});
```

#### Fetch Summary Statistics
```javascript
await client.fetchSummaryStats({
    bot_id: 'bot-id'
});
```

#### Fetch Dashboard Statistics
```javascript
await client.fetchDashboardStats({
    bot_id: 'bot-id'
});
```

#### Fetch Tool Usage Statistics
```javascript
await client.fetchToolUsageStats({
    bot_id: 'bot-id'
});
```

#### Fetch Workflow Statistics
```javascript
await client.fetchWorkflowStats({
    bot_id: 'bot-id'
});
```

#### Fetch Performance Metrics
```javascript
await client.fetchPerformanceMetrics({
    bot_id: 'bot-id'
});
```

#### Fetch User Behavior Statistics
```javascript
await client.fetchBehaviorStats({
    bot_id: 'bot-id'
});
```

#### Fetch Error Analysis
```javascript
await client.fetchErrorAnalysis({
    bot_id: 'bot-id'
});
```

#### Fetch Reasoning Summary
```javascript
await client.fetchReasoningSummary({
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
