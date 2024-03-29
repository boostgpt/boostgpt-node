const { body_request, url_request } = require("./request");

const base_url = "https://api.boostgpt.co/v1/";

const BoostGPTResponse = function(response) {
    this.err = response[0];
    this.response = response[1];
}

const BoostGPT = function({ project_id = null, key = null } = {}) {
    this.host = base_url;
    this.apiKey = key;
    this.body = {
        project_id: project_id
    };
}

BoostGPT.prototype.createBot = async function({ name = null, model = null, instruction = null, max_reply_tokens = null, top = null, welcome_message = null, status = null } = {}) {
    let url = `${this.host}bot/create`;
    this.body.name = name;
    this.body.model = model;
    this.body.instruction = instruction;
    this.body.max_reply_tokens = max_reply_tokens;
    this.body.top = top;
    this.body.welcome_message = welcome_message;
    this.body.status = status;

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

BoostGPT.prototype.updateBot = async function({ bot_id = null, name = null, model = null, instruction = null, max_reply_tokens = null, top = null, welcome_message = null, status = null } = {}) {
    let url = `${this.host}bot/update`;
    this.body.bot_id = bot_id;
    this.body.name = name;
    this.body.model = model;
    this.body.instruction = instruction;
    this.body.max_reply_tokens = max_reply_tokens;
    this.body.top = top;
    this.body.welcome_message = welcome_message;
    this.body.status = status;

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

BoostGPT.prototype.chat = async function({ bot_id = null, model = null, openai_key = null, instruction = null, source_ids = [], message = '', tags = [], top = null, max_reply_tokens = null, chat_id = null, stream = false, vector = true } = {}) {
    let url = `${this.host}bot/chat`;
    this.body.bot_id = bot_id;
    this.body.model = model;
    this.body.openai_key = openai_key;
    this.body.instruction = instruction;
    this.body.source_ids = source_ids;
    this.body.message = message;
    this.body.tags = tags;
    this.body.top = top;
    this.body.max_reply_tokens = max_reply_tokens;
    this.body.chat_id = chat_id;
    this.body.stream = stream;
    this.body.vector = vector;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'POST'));
}


BoostGPT.prototype.search = async function({ bot_id = null, source_ids = [], keywords = '', tags = [], top = null } = {}) {
    let url = `${this.host}bot/search`;
    this.body.bot_id = bot_id;
    this.body.source_ids = source_ids;
    this.body.keywords = keywords;
    this.body.tags = tags;
    this.body.top = top;

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

BoostGPT.prototype.deleteChat = async function({ chat_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/chat/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&chat_id=${chat_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}

BoostGPT.prototype.startTraining = async function({ bot_id = null, tags = [], type = null, source = null } = {}) {
    let url = `${this.host}bot/source/create`;
    this.body.bot_id = bot_id;
    this.body.tags = tags;
    this.body.type = type;
    this.body.source = source;

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

BoostGPT.prototype.updateTraining = async function({ source_id = null, bot_id = null, tags = [], type = null, source = null } = {}) {
    let url = `${this.host}bot/source/update`;
    this.body.source_id = source_id;
    this.body.bot_id = bot_id;
    this.body.tags = tags;
    this.body.type = type;
    this.body.source = source;

    return new BoostGPTResponse(await body_request(url, this.body, this.apiKey, 'PUT'));
}

BoostGPT.prototype.deleteTraining = async function({ source_id = null, bot_id = null } = {}) {
    let url = `${this.host}bot/source/delete?project_id=${this.body.project_id}&bot_id=${bot_id}&source_id=${source_id}`;
    return new BoostGPTResponse(await body_request(url, null, this.apiKey, 'DELETE'));
}


module.exports = {
    BoostGPT
}