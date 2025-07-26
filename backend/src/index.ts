import express from 'express';
import 'reflect-metadata';
import taskRoutes from './routes/task.route';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.get('/', (_, res) => res.send('API está funcionando!'));
    app.use('/api', taskRoutes);

    app.listen(3000, () => {
      console.log('Servidor rodando em localhost:3000');
    });
  })
  .catch((error) => console.error('Erro ao inicializar o banco de dados:', error));
