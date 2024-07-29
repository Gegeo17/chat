const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Chat bot está funcionando!');
});

// Rota para receber mensagens do usuário (webhook)
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  // Aqui você processaria a mensagem recebida e geraria uma resposta
  // Exemplo simples de resposta
  const response = `Você disse: "${message}"`;
  res.json({ reply: response });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
