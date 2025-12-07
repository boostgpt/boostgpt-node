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

export default BoostGPT;