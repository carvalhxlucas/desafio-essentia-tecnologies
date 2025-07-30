import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechX To-Do List API',
      version: '1.0.0',
      description: 'API para gerenciamento de tarefas.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      // --- AUTH ENDPOINTS ---
      '/api/auth/register': {
        post: {
          tags: ['Autenticação'],
          summary: 'Registra um novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } },
              },
            },
          },
          responses: {
            '201': { description: 'Usuário criado' },
            '409': { description: 'E-mail já em uso' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Autenticação'],
          summary: 'Autentica um usuário e retorna um token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } },
              },
            },
          },
          responses: {
            '200': { description: 'Login bem-sucedido' },
            '401': { description: 'Credenciais inválidas' },
          },
        },
      },
      // --- TASKS ENDPOINTS ---
      '/api/tasks': {
        get: {
          tags: ['Tarefas'],
          summary: 'Lista todas as tarefas do usuário',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': { description: 'Sucesso' },
            '401': { description: 'Não autorizado' },
          },
        },
        post: {
          tags: ['Tarefas'],
          summary: 'Cria uma nova tarefa',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { title: { type: 'string' } } },
              },
            },
          },
          responses: {
            '201': { description: 'Tarefa criada' },
            '401': { description: 'Não autorizado' },
          },
        },
      },
      '/api/tasks/{id}': {
        put: {
          tags: ['Tarefas'],
          summary: 'Atualiza uma tarefa',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { title: { type: 'string' } } },
              },
            },
          },
          responses: {
            '200': { description: 'Tarefa atualizada' },
            '401': { description: 'Não autorizado' },
            '404': { description: 'Tarefa não encontrada' },
          },
        },
        delete: {
          tags: ['Tarefas'],
          summary: 'Deleta uma tarefa',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '204': { description: 'Tarefa deletada' },
            '401': { description: 'Não autorizado' },
            '404': { description: 'Tarefa não encontrada' },
          },
        },
      },
      '/api/tasks/{id}/toggle': {
        patch: {
          tags: ['Tarefas'],
          summary: 'Alterna o status de conclusão de uma tarefa',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '200': { description: 'Status atualizado' },
            '401': { description: 'Não autorizado' },
            '404': { description: 'Tarefa não encontrada' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);