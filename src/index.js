import { body_request, url_request } from "./request.js";

const base_url = "https://api.boostgpt.co/v1/";

export const BoostGPTResponse = function(response) {
    this.err = response[0];
    this.response = response[1];
}

export const BoostGPT = function({ project_id = null, key = null } = {}) {
    this.host = base_url;
    this.apiKey = key;
    this.body = {
        project_id: project_id
    };
}

BoostGPT.prototype.createBot = async function({ name = null, model = null, instruction = null, max_reply_tokens = null, top = null, status = null } = {}) {
    let url = `${this.host}bot/create`;
    this.body.name = name;

    // Check and assign optional parameters
    if (model) this.body.model = model;
    if (instruction) this.body.instruction = instruction;
    if (max_reply_tokens) this.body.max_reply_tokens = max_reply_tokens;
    if (top) this.body.top = top;
    if (status) this.body.status = status;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchBot = async function(id) {
    let url = `${this.host}bot/read?project_id=${this.body.project_id}&bot_id=${id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchBots = async function({ page = 1, per_page = 10 }) {
    let url = `${this.host}bot/readall?project_id=${this.body.project_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.updateBot = async function({ bot_id = null, name = null, model = null, instruction = null, max_reply_tokens = null, top = null, status = null } = {}) {
    let url = `${this.host}bot/update`;
    this.body.bot_id = bot_id;
    // Check and assign optional parameters
    if (name) this.body.name = name;
    if (model) this.body.model = model;
    if (instruction) this.body.instruction = instruction;
    if (max_reply_tokens) this.body.max_reply_tokens = max_reply_tokens;
    if (top) this.body.top = top;
    if (status) this.body.status = status;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.resetBot = async function(id) {
    let url = `${this.host}bot/reset`;
    this.body.bot_id = id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteBot = async function(id) {
    let url = `${this.host}bot/delete?project_id=${this.body.project_id}&bot_id=${id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.chat = async function({ bot_id = null, model = null, provider_key = null, provider_host = null, instruction = null, source_ids = [], message = '', tags = [], top = null, max_reply_tokens = null, chat_id = undefined, stream = false, memory = true, reasoning_mode = '' } = {}) {
    let url = `${this.host}bot/chat`;
    this.body.bot_id = bot_id;
    this.body.message = message;
    // Check and assign optional parameters
    if (model) this.body.model = model;
    if (provider_key) this.body.provider_key = provider_key;
    if (provider_host) this.body.provider_host = provider_host;
    if (instruction) this.body.instruction = instruction;
    if (source_ids.length > 0) this.body.source_ids = source_ids;
    if (tags.length > 0) this.body.tags = tags;
    if (top) this.body.top = top;
    if (max_reply_tokens) this.body.max_reply_tokens = max_reply_tokens;
    if (chat_id) this.body.chat_id = chat_id;
    if (stream) this.body.stream = stream;
    if (memory) this.body.memory = memory;
    if (reasoning_mode) this.body.reasoning_mode = reasoning_mode;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.search = async function({ bot_id = null, source_ids = [], keywords = '', tags = [], top = null } = {}) {
    let url = `${this.host}bot/search`;
    this.body.bot_id = bot_id;
    this.body.keywords = keywords;
    if (source_ids.length > 0) this.body.source_ids = source_ids;
    if (tags.length > 0) this.body.tags = tags;
    if (top) this.body.top = top;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchChat = async function({ bot_id = null, chat_id = null, page = 1, per_page = 10 } = {}) {
    let url = `${this.host}bot/chat/read?project_id=${this.body.project_id}&bot_id=${bot_id}&chat_id=${chat_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchChats = async function({ bot_id = null, page = 1, per_page = 10 }) {
    let url = `${this.host}bot/chat/readall?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.deleteChat = async function({ chat_id = '', bot_id = null } = {}) {
    let url = `${this.host}bot/chat/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&chat_id=${chat_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.startTraining = async function({ bot_id = '', tags = [], type = '', source = '', title = '', description = '', forget_after='never', sync_frequency = 'never' } = {}) {
    let url = `${this.host}bot/source/create`;
    this.body.bot_id = bot_id;
    this.body.type = type;
    this.body.title = title;
    this.body.source = source;
    // Check and assign optional parameters
    if (tags.length > 0) this.body.tags = tags;
    if (description) this.body.description = description;
    if (forget_after) this.body.forget_after = forget_after;
    if (sync_frequency) this.body.sync_frequency = sync_frequency;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchTraining = async function({ source_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/source/read?project_id=${this.body.project_id}&bot_id=${bot_id}&source_id=${source_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchTrainings = async function({ bot_id = null, page = 1, per_page = 10 }) {
    let url = `${this.host}bot/source/readall?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.updateTraining = async function({ source_id = null, bot_id = null, tags = [], source = null, title = '', description = '', forget_after='', sync_frequency = '' } = {}) {
    let url = `${this.host}bot/source/update`;
    this.body.bot_id = bot_id;
    this.body.source_id = source_id;
    // Check and assign optional parameters
    if (tags.length > 0) this.body.tags = tags;
    if (source) this.body.source = source;
    if (title) this.body.title = title;
    if (description) this.body.description = description;
    if (forget_after) this.body.forget_after = forget_after;
    if (sync_frequency) this.body.sync_frequency = sync_frequency;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteTraining = async function({ source_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/source/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&source_id=${source_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// Tools Management
BoostGPT.prototype.fetchTools = async function({ bot_id = null, page = 1, per_page = 10, filter = null } = {}) {
    let url = `${this.host}bot/tool?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    if (filter) url += `&filter=${encodeURIComponent(JSON.stringify(filter))}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createTool = async function({ bot_id = null, name = null, description = null, config = null, type = null } = {}) {
    let url = `${this.host}bot/tool`;
    this.body.bot_id = bot_id;
    this.body.name = name;

    // Check and assign optional parameters
    if (description) this.body.description = description;
    if (config) this.body.config = config;
    if (type) this.body.type = type;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchTool = async function({ tool_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.updateTool = async function({ tool_id = null, bot_id = null, name = null, description = null, config = null, type = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}`;
    this.body.bot_id = bot_id;

    // Check and assign optional parameters
    if (name) this.body.name = name;
    if (description) this.body.description = description;
    if (config) this.body.config = config;
    if (type) this.body.type = type;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteTool = async function({ tool_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.configureTools = async function({ tool_id = null, bot_id = null, settings = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}/configure`;
    this.body.bot_id = bot_id;
    if (settings) this.body.settings = settings;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.refreshTools = async function({ tool_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}/refresh?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'POST'));
}

BoostGPT.prototype.toggleTool = async function({ tool_id = null, bot_id = null, tool_name = null, active = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}/toggle`;
    this.body.bot_id = bot_id;
    if (tool_name) this.body.tool_name = tool_name;
    if (active !== null) this.body.active = active;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.testToolConnection = async function({ tool_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/tool/${tool_id}/test?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'POST'));
}

// Advanced Chat Methods
BoostGPT.prototype.executeTool = async function({ bot_id = null, chat_id = null, tool_calls = [] } = {}) {
    let url = `${this.host}bot/chat/execute-tool`;
    this.body.bot_id = bot_id;
    this.body.chat_id = chat_id;
    if (tool_calls.length > 0) this.body.tool_calls = tool_calls;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.voteMessage = async function({ bot_id = null, message_id = null, voter_id = null, voter_type = 'member', vote_type = null } = {}) {
    let url = `${this.host}bot/chat/message/vote`;
    this.body.bot_id = bot_id;
    this.body.message_id = message_id;
    this.body.voter_id = voter_id;
    this.body.voter_type = voter_type;
    if (vote_type) this.body.vote_type = vote_type;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.fetchVoteStatus = async function({ bot_id = null, message_id = null, voter_id = null, voter_type = 'member' } = {}) {
    let url = `${this.host}bot/chat/message/vote-status?bot_id=${bot_id}&message_id=${message_id}&voter_id=${voter_id}&voter_type=${voter_type}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.deleteMessage = async function({ bot_id = null, chat_id = null, message_id = null } = {}) {
    let url = `${this.host}bot/chat/message/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&chat_id=${chat_id}&message_id=${message_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// Subscribers
BoostGPT.prototype.fetchSubscribers = async function({ page = 1, per_page = 10 } = {}) {
    let url = `${this.host}bot/subscriber/readall?project_id=${this.body.project_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// Analytics
BoostGPT.prototype.fetchVoteStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/votes?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchSummaryStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/summary?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchDashboardStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/dashboard?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchToolUsageStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/tools?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchWorkflowStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/workflows?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchPerformanceMetrics = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/performance?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchBehaviorStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/behavior?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchErrorAnalysis = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/errors?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchReasoningSummary = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/stats/reasoning-summary?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// Memory Management
BoostGPT.prototype.fetchMemories = async function({ bot_id = null, user_uuid = null, type = null, page = 1, per_page = 10 } = {}) {
    let url = `${this.host}bot/memory/readall?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    if (user_uuid) url += `&user_uuid=${user_uuid}`;
    if (type) url += `&type=${type}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.countMemories = async function({ bot_id = null, user_uuid = null } = {}) {
    let url = `${this.host}bot/memory/count?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    if (user_uuid) url += `&user_uuid=${user_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.deleteMemory = async function({ bot_id = null, memory_id = null } = {}) {
    let url = `${this.host}bot/memory/${memory_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// Advanced Chat
BoostGPT.prototype.renameChat = async function({ bot_id = null, chat_id = null, name = null } = {}) {
    let url = `${this.host}bot/chat/rename`;
    this.body.bot_id = bot_id;
    this.body.chat_id = chat_id;
    this.body.name = name;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.setChatMode = async function({ bot_id = null, chat_id = null, mode = null } = {}) {
    let url = `${this.host}bot/chat/mode`;
    this.body.bot_id = bot_id;
    this.body.chat_id = chat_id;
    this.body.mode = mode;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

// Workflows
BoostGPT.prototype.fetchWorkflowCatalog = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/workflow/catalog?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchWorkflows = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/workflow/readall?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchWorkflow = async function({ bot_id = null, workflow_id = null } = {}) {
    let url = `${this.host}bot/workflow/read?project_id=${this.body.project_id}&bot_id=${bot_id}&workflow_id=${workflow_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createWorkflow = async function({ bot_id = null, name = null, ...rest } = {}) {
    let url = `${this.host}bot/workflow/create`;
    this.body.bot_id = bot_id;
    this.body.name = name;
    Object.assign(this.body, rest);
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateWorkflow = async function({ bot_id = null, workflow_id = null, ...rest } = {}) {
    let url = `${this.host}bot/workflow/update`;
    this.body.bot_id = bot_id;
    this.body.workflow_id = workflow_id;
    Object.assign(this.body, rest);
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteWorkflow = async function({ bot_id = null, workflow_id = null } = {}) {
    let url = `${this.host}bot/workflow/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&workflow_id=${workflow_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.runWorkflow = async function({ bot_id = null, workflow_id = null } = {}) {
    let url = `${this.host}bot/workflow/run`;
    this.body.bot_id = bot_id;
    this.body.workflow_id = workflow_id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchWorkflowLogs = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/workflow/logs?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// Heartbeats
BoostGPT.prototype.createHeartbeat = async function({ bot_id = null, prompt = null, cron_pattern = null, enabled = null, timezone = null, credit_budget = null, max_consecutive_errors = null, member_id = null, chat_mode = null } = {}) {
    let url = `${this.host}bot/heartbeat/configure`;
    this.body.bot_id = bot_id;
    this.body.prompt = prompt;
    if (cron_pattern) this.body.cron_pattern = cron_pattern;
    if (enabled !== null) this.body.enabled = enabled;
    if (timezone) this.body.timezone = timezone;
    if (credit_budget) this.body.credit_budget = credit_budget;
    if (max_consecutive_errors) this.body.max_consecutive_errors = max_consecutive_errors;
    if (member_id) this.body.member_id = member_id;
    if (chat_mode) this.body.chat_mode = chat_mode;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchHeartbeat = async function({ bot_id = null, heartbeat_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/read?project_id=${this.body.project_id}&bot_id=${bot_id}&heartbeat_id=${heartbeat_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchHeartbeats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/readall?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.enableHeartbeat = async function({ bot_id = null, heartbeat_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/enable`;
    this.body.bot_id = bot_id;
    this.body.heartbeat_id = heartbeat_id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.disableHeartbeat = async function({ bot_id = null, heartbeat_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/disable`;
    this.body.bot_id = bot_id;
    this.body.heartbeat_id = heartbeat_id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.triggerHeartbeat = async function({ bot_id = null, heartbeat_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/trigger`;
    this.body.bot_id = bot_id;
    this.body.heartbeat_id = heartbeat_id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteHeartbeat = async function({ bot_id = null, heartbeat_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&heartbeat_id=${heartbeat_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.fetchHeartbeatLogs = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/logs?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchHeartbeatStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/heartbeat/stats?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// Workspaces
BoostGPT.prototype.fetchWorkspaces = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/workspace/readall?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createWorkspace = async function({ bot_id = null, name = null } = {}) {
    let url = `${this.host}bot/workspace/create`;
    this.body.bot_id = bot_id;
    this.body.name = name;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteWorkspace = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.fetchFiles = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/files?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.readFile = async function({ bot_id = null, workspace_uuid = null, file_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/file?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}&file_uuid=${file_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createFile = async function({ bot_id = null, workspace_uuid = null, file_path = null, content = null, language = null } = {}) {
    let url = `${this.host}bot/workspace/file`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    this.body.file_path = file_path;
    if (content !== null) this.body.content = content;
    if (language) this.body.language = language;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateFile = async function({ bot_id = null, workspace_uuid = null, file_uuid = null, content = null, language = null } = {}) {
    let url = `${this.host}bot/workspace/file`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    this.body.file_uuid = file_uuid;
    if (content !== null) this.body.content = content;
    if (language) this.body.language = language;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteFile = async function({ bot_id = null, workspace_uuid = null, file_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/file?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}&file_uuid=${file_uuid}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.downloadWorkspace = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/download?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.renameFile = async function({ bot_id = null, workspace_uuid = null, old_path = null, new_path = null } = {}) {
    let url = `${this.host}bot/workspace/file/rename`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    this.body.old_path = old_path;
    this.body.new_path = new_path;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.suggestSubdomain = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/suggest-subdomain?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.publishWorkspace = async function({ bot_id = null, workspace_uuid = null, subdomain = null } = {}) {
    let url = `${this.host}bot/workspace/publish`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    this.body.subdomain = subdomain;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.unpublishWorkspace = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/unpublish`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.addCustomDomain = async function({ bot_id = null, workspace_uuid = null, custom_domain = null } = {}) {
    let url = `${this.host}bot/workspace/domain/add`;
    this.body.bot_id = bot_id;
    this.body.workspace_uuid = workspace_uuid;
    this.body.custom_domain = custom_domain;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.removeCustomDomain = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/domain/remove?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.refreshDomainStatus = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/domain/status?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.getDomainInfo = async function({ bot_id = null, workspace_uuid = null } = {}) {
    let url = `${this.host}bot/workspace/domain/info?project_id=${this.body.project_id}&bot_id=${bot_id}&workspace_uuid=${workspace_uuid}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// Email
BoostGPT.prototype.fetchEmailAddress = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/email/address?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.updateEmailSettings = async function({ bot_id = null, ...rest } = {}) {
    let url = `${this.host}bot/email/settings`;
    this.body.bot_id = bot_id;
    Object.assign(this.body, rest);
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.fetchEmailStats = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/email/stats?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchEmails = async function({ bot_id = null, page = 1, per_page = 10 } = {}) {
    let url = `${this.host}bot/email/readall?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchEmail = async function({ bot_id = null, email_id = null } = {}) {
    let url = `${this.host}bot/email/read?project_id=${this.body.project_id}&bot_id=${bot_id}&email_id=${email_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.replyToEmail = async function({ bot_id = null, email_id = null, content = null } = {}) {
    let url = `${this.host}bot/email/reply`;
    this.body.bot_id = bot_id;
    this.body.email_id = email_id;
    this.body.content = content;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteEmail = async function({ bot_id = null, email_id = null } = {}) {
    let url = `${this.host}bot/email/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&email_id=${email_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// CRM — Contacts
BoostGPT.prototype.fetchContacts = async function({ bot_id = null, page = 1, per_page = 10, status = null, status_id = null, status_key = null } = {}) {
    let url = `${this.host}bot/crm/contacts?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    if (status) url += `&status=${status}`;
    if (status_id) url += `&status_id=${status_id}`;
    if (status_key) url += `&status_key=${status_key}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.searchContacts = async function({ bot_id = null, query = null, status = null, status_id = null, status_key = null, limit = null } = {}) {
    let url = `${this.host}bot/crm/contacts/search?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    if (query) url += `&query=${encodeURIComponent(query)}`;
    if (status) url += `&status=${status}`;
    if (status_id) url += `&status_id=${status_id}`;
    if (status_key) url += `&status_key=${status_key}`;
    if (limit) url += `&limit=${limit}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchContactStatuses = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/contacts/statuses?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createContact = async function({ bot_id = null, email = null, status = null, status_id = null, status_key = null, fields = null } = {}) {
    let url = `${this.host}bot/crm/contacts`;
    this.body.bot_id = bot_id;
    if (email) this.body.email = email;
    if (status) this.body.status = status;
    if (status_id) this.body.status_id = status_id;
    if (status_key) this.body.status_key = status_key;
    if (fields) this.body.fields = fields;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.fetchContact = async function({ bot_id = null, contact_id = null } = {}) {
    let url = `${this.host}bot/crm/contacts/${contact_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.updateContact = async function({ bot_id = null, contact_id = null, email = null, status = null, status_id = null, status_key = null, fields = null } = {}) {
    let url = `${this.host}bot/crm/contacts/${contact_id}`;
    this.body.bot_id = bot_id;
    if (email) this.body.email = email;
    if (status) this.body.status = status;
    if (status_id) this.body.status_id = status_id;
    if (status_key) this.body.status_key = status_key;
    if (fields) this.body.fields = fields;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteContact = async function({ bot_id = null, contact_id = null, permanent = false } = {}) {
    let url = `${this.host}bot/crm/contacts/${contact_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    if (permanent) url += `&permanent=true`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.exportContacts = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/contacts/export?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.addContactNote = async function({ bot_id = null, contact_id = null, content = null, type = 'note' } = {}) {
    let url = `${this.host}bot/crm/contacts/${contact_id}/notes`;
    this.body.bot_id = bot_id;
    this.body.content = content;
    if (type) this.body.type = type;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

// CRM — Custom Fields
BoostGPT.prototype.fetchCRMFields = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/fields?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createCRMField = async function({ bot_id = null, label = null, field_type = null, options = null, is_required = false } = {}) {
    let url = `${this.host}bot/crm/fields`;
    this.body.bot_id = bot_id;
    this.body.label = label;
    if (field_type) this.body.field_type = field_type;
    if (options) this.body.options = options;
    if (is_required) this.body.is_required = is_required;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateCRMField = async function({ bot_id = null, field_id = null, label = null, field_type = null, options = null, is_required = null } = {}) {
    let url = `${this.host}bot/crm/fields/${field_id}`;
    this.body.bot_id = bot_id;
    if (label) this.body.label = label;
    if (field_type) this.body.field_type = field_type;
    if (options) this.body.options = options;
    if (is_required !== null) this.body.is_required = is_required;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteCRMField = async function({ bot_id = null, field_id = null } = {}) {
    let url = `${this.host}bot/crm/fields/${field_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// CRM — Templates & Setup
BoostGPT.prototype.fetchCRMSetup = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/setup?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchCRMTemplates = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/templates?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.applyCRMTemplate = async function({ bot_id = null, template_key = null, replace = false, create_new = false, name = null } = {}) {
    let url = `${this.host}bot/crm/templates/apply`;
    this.body.bot_id = bot_id;
    this.body.template_key = template_key;
    if (replace) this.body.replace = replace;
    if (create_new) this.body.create_new = create_new;
    if (name) this.body.name = name;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

// CRM — Pipelines
BoostGPT.prototype.fetchPipelines = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/pipelines?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createPipeline = async function({ bot_id = null, name = null, default_currency = null } = {}) {
    let url = `${this.host}bot/crm/pipelines`;
    this.body.bot_id = bot_id;
    this.body.name = name;
    if (default_currency) this.body.default_currency = default_currency;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updatePipeline = async function({ bot_id = null, pipeline_id = null, name = null, default_currency = null, is_default = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/${pipeline_id}`;
    this.body.bot_id = bot_id;
    if (name) this.body.name = name;
    if (default_currency) this.body.default_currency = default_currency;
    if (is_default !== null) this.body.is_default = is_default;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deletePipeline = async function({ bot_id = null, pipeline_id = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/${pipeline_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.fetchPipelineBoard = async function({ bot_id = null, pipeline_id = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/board?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    if (pipeline_id) url += `&pipeline_id=${pipeline_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createPipelineStage = async function({ bot_id = null, name = null, pipeline_id = null, closed_status = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/stages`;
    this.body.bot_id = bot_id;
    this.body.name = name;
    if (pipeline_id) this.body.pipeline_id = pipeline_id;
    if (closed_status) this.body.closed_status = closed_status;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updatePipelineStage = async function({ bot_id = null, stage_id = null, closed_status = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/stages/${stage_id}`;
    this.body.bot_id = bot_id;
    if (closed_status) this.body.closed_status = closed_status;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deletePipelineStage = async function({ bot_id = null, stage_id = null, move_deals_to_stage_id = null } = {}) {
    let url = `${this.host}bot/crm/pipelines/stages/${stage_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    if (move_deals_to_stage_id) url += `&move_deals_to_stage_id=${move_deals_to_stage_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// CRM — Deals
BoostGPT.prototype.fetchDeals = async function({ bot_id = null, page = 1, per_page = 10, status = null, pipeline_id = null } = {}) {
    let url = `${this.host}bot/crm/deals?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    if (status) url += `&status=${status}`;
    if (pipeline_id) url += `&pipeline_id=${pipeline_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createDeal = async function({ bot_id = null, title = null, status = 'open' } = {}) {
    let url = `${this.host}bot/crm/deals`;
    this.body.bot_id = bot_id;
    if (title) this.body.title = title;
    if (status) this.body.status = status;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateDeal = async function({ bot_id = null, deal_id = null, status = null } = {}) {
    let url = `${this.host}bot/crm/deals/${deal_id}`;
    this.body.bot_id = bot_id;
    if (status) this.body.status = status;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteDeal = async function({ bot_id = null, deal_id = null } = {}) {
    let url = `${this.host}bot/crm/deals/${deal_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

// CRM — Tasks
BoostGPT.prototype.fetchTasks = async function({ bot_id = null, page = 1, per_page = 10, status = null, view = null } = {}) {
    let url = `${this.host}bot/crm/tasks?project_id=${this.body.project_id}&bot_id=${bot_id}&page=${page}&per_page=${per_page}`;
    if (status) url += `&status=${status}`;
    if (view) url += `&view=${view}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createTask = async function({ bot_id = null, title = null, status = null, priority = null } = {}) {
    let url = `${this.host}bot/crm/tasks`;
    this.body.bot_id = bot_id;
    this.body.title = title;
    if (status) this.body.status = status;
    if (priority) this.body.priority = priority;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateTask = async function({ bot_id = null, task_id = null, status = null, priority = null } = {}) {
    let url = `${this.host}bot/crm/tasks/${task_id}`;
    this.body.bot_id = bot_id;
    if (status) this.body.status = status;
    if (priority) this.body.priority = priority;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.snoozeTask = async function({ bot_id = null, task_id = null } = {}) {
    let url = `${this.host}bot/crm/tasks/${task_id}/snooze`;
    this.body.bot_id = bot_id;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteTask = async function({ bot_id = null, task_id = null } = {}) {
    let url = `${this.host}bot/crm/tasks/${task_id}?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.fetchCRMReport = async function({ bot_id = null } = {}) {
    let url = `${this.host}bot/crm/report?project_id=${this.body.project_id}&bot_id=${bot_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

// MCP Connectors
BoostGPT.prototype.fetchConnectors = async function() {
    let url = `${this.host}mcp/connectors`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchConnector = async function(name) {
    let url = `${this.host}mcp/connectors/${name}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchMcpServers = async function() {
    let url = `${this.host}mcp?project_id=${this.body.project_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.fetchMcpServer = async function(id) {
    let url = `${this.host}mcp/${id}?project_id=${this.body.project_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.createMcpFromPredefined = async function({ name = null, connectorName = null, credentials = null, authType = null } = {}) {
    let url = `${this.host}mcp/create/from-predefined`;
    this.body.name = name;
    this.body.connectorName = connectorName;
    if (credentials) this.body.credentials = credentials;
    if (authType) this.body.authType = authType;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.createMcpFromOpenApi = async function({ name = null, openApiSpec = null, credentials = null, authType = null } = {}) {
    let url = `${this.host}mcp/create/from-openapi`;
    this.body.name = name;
    this.body.openApiSpec = openApiSpec;
    if (credentials) this.body.credentials = credentials;
    if (authType) this.body.authType = authType;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.createMcpFromPostman = async function({ name = null, postmanCollection = null, credentials = null, authType = null } = {}) {
    let url = `${this.host}mcp/create/from-postman`;
    this.body.name = name;
    this.body.postmanCollection = postmanCollection;
    if (credentials) this.body.credentials = credentials;
    if (authType) this.body.authType = authType;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.updateMcpServer = async function({ id = null, ...rest } = {}) {
    let url = `${this.host}mcp/${id}/update`;
    this.body.project_id = this.body.project_id;
    Object.assign(this.body, rest);
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.cloneMcpServer = async function({ id = null, name = null } = {}) {
    let url = `${this.host}mcp/${id}/clone`;
    this.body.name = name;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.deleteMcpServer = async function(id) {
    let url = `${this.host}mcp/${id}/delete?project_id=${this.body.project_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.fetchMcpUsage = async function(id) {
    let url = `${this.host}mcp/${id}/usage?project_id=${this.body.project_id}`;
    return new BoostGPTResponse(await url_request(url, null, this.apiKey));
}

BoostGPT.prototype.validateOpenApi = async function({ spec = null } = {}) {
    let url = `${this.host}mcp/validate-openapi`;
    this.body.spec = spec;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

BoostGPT.prototype.validatePostman = async function({ collection = null } = {}) {
    let url = `${this.host}mcp/validate-postman`;
    this.body.collection = collection;
    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}

export default BoostGPT;