const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getResponse = async (message) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', // ou qualquer outro modelo que você deseja usar
            messages: [{ role: 'user', content: message }],
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Erro ao chamar a API da OpenAI:', error);
        throw error;
    }
};

module.exports = { getResponse };
