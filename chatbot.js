const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const getResponse = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Erro ao chamar a API da OpenAI:', error);
        throw error;
    }
};

module.exports = { getResponse };
