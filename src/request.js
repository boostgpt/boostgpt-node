import fetch from "node-fetch";

export const body_request = async (url, body, apiKey, method) => {
    method = method || "POST";

    let fetch_spec = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    };

    if (body) fetch_spec.body = JSON.stringify(body);

    try {
        let response = await fetch(url, fetch_spec);
        const output = await response.json();
        const { error, message } = output;
        if (error) {
            const { status } = error;
            if (status >= 400) {
                throw new Error(message)
            }
        }
        return [null, output];
    } catch (ex) {
        const output = null;
        return [ex, output];
    }
}

export const url_request = async (url, params, apiKey) => {
    if (params) {
        url += "?" + new URLSearchParams(params).toString();
    }

    let fetch_spec = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    };

    try {
        let response = await fetch(url, fetch_spec);
        const output = await response.json();
        const { error, message } = output;
        if (error) {
            const { status } = error;
            if (status >= 400) {
                throw new Error(message)
            }
        }
        return [null, output];
    } catch (ex) {
        const output = null;
        return [ex, output];
    }
}