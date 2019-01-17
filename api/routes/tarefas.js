import TarefasController from '../controllers/tarefas';

export default app => {
    const tarefasController = new TarefasController(
        app.datasource.models.Tarefas
    );

    app.route('/api/tarefas')
        .all(app.auth.authenticate())
        .post((req, res) => {
            tarefasController
                .create(req.body)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        msg: 'Tarefa cadastrada com sucesso!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Erro ao cadastrar a tarefa!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .get((req, res) => {
            tarefasController
                .getAll()
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        tarefas: response.data,
                        msg: 'Tarefas listadas com sucesso!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Erro ao listar tarefas!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        });

    app.route('/api/tarefas/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            tarefasController
                .getById(req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        tarefa: response.data,
                        msg: 'Tarefa encontrada!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Nenhuma tarefa encontrada!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .put((req, res) => {
            tarefasController
                .update(req.body, req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        msg: 'Tarefa atualizada!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Não foi possível atualizar a tarefa!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .delete((req, res) => {
            tarefasController.delete(req.params).then(response => {
                res.sendStatus(response.statusCode);
            });
        });

    app.route('/api/tarefas/:id/concluida')
        .all(app.auth.authenticate())
        .put((req, res) => {
            tarefasController
                .update(req.body, req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        msg: 'Tarefa concluída!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Não foi possível concluír a tarefa!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .delete((req, res) => {
            tarefasController.delete(req.params).then(response => {
                res.sendStatus(response.statusCode);
            });
        });
};
