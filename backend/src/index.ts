import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import taskRoutes from './routes/task.route';
import authRoutes from './routes/auth.route';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados inicializado com sucesso!');
    
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Rotas da aplicação
    app.use('/api', authRoutes);
    app.use('/api', taskRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao inicializar o banco de dados:', error));
