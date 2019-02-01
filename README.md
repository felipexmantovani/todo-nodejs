# todo-nodejs / Não finalizado
Trabalho de NodeJs Pós Alfa Umuarama.

Abrir arquivo "api-todo-nodejs.postman_collection.json" no postman.

Passos:
```
cd node-js-todo
npm install
npm start
```

Método  |    URL                                                |   Descrição
--------|-------------------------------------------------------|-----------------------------
POST    |   http://localhost:3001/api/usuarios                  |   Cadastrar usuário
POST    |   http://localhost:3001/api/login                     |   Login
GET     |   http://localhost:3001/api/usuarios                  |   Listar usuários
GET     |   http://localhost:3001/api/usuarios/1                |   Buscar usuário por id
PUT     |   http://localhost:3001/api/usuarios/1                |   Atualizar usuário
POST    |   http://localhost:3001/api/tarefas                   |   Cadastrar tarefa
GET     |   http://localhost:3001/api/tarefas                   |   Buscar todas as tarefas
GET     |   http://localhost:3001/api/tarefas?titulo=aprender   |   Buscar tarefa por título
GET     |   http://localhost:3001/api/tarefas/1                 |   Buscar tarefa por id
PUT     |   http://localhost:3001/api/tarefas/1                 |   Atualizar tarefa
DEL     |   http://localhost:3001/api/tarefas/1                 |   Deletar tarefa
PUT     |   http://localhost:3001/api/tarefas/1/concluida       |   Marcar como concluída
DEL     |   http://localhost:3001/api/tarefas/1/concluida       |   Deletar tarefa concluída
