import dotenv from 'dotenv';
import path from 'path';

import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from './data-source';

import taskRoutes from './routes/task.route';
import authRoutes from './routes/auth.route';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';  

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados inicializado com sucesso!');
    
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Rotas da aplicação
    app.use('/api/auth', authRoutes);
    app.use('/api/tasks', taskRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao inicializar o banco de dados:', error));
