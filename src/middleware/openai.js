const axios = require("axios");

const openaiService = {
    listAssistants: async (apiKey, limit = 20, order = "desc") => {
        const response = await axios.get("https://api.openai.com/v1/assistants", {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            params: { limit, order },
        });
        return response.data;
    },

    getAssistantById: async (apiKey, assistantId) => {
        const response = await axios.get(`https://api.openai.com/v1/assistants/${assistantId}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return response.data;
    },

    updateAssistant: async (apiKey, assistantId, payload) => {
        const response = await axios.post(`https://api.openai.com/v1/assistants/${assistantId}`, payload, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    },
};

module.exports = openaiService;
