import express from 'express';
const app = express();

app.get('/', (_, res) => res.status(200).send('Api funcionando!'));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});