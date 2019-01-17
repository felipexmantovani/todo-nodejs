import UsuariosController from '../controllers/usuarios';

export default app => {
    const usuariosController = new UsuariosController(
        app.datasource.models.Usuarios
    );

    app.route('/api/usuarios')
        .post((req, res) => {
            usuariosController
                .create(req.body)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        msg: 'Usuário cadastrado com sucesso!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Erro ao cadastrar o usuário!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .all(app.auth.authenticate())
        .get((req, res) => {
            usuariosController
                .getAll()
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        usuarios: response.data,
                        msg: 'Usuários listados com sucesso!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Erro ao cadastrar listar usuários!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        });

    app.route('/api/usuarios/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            usuariosController
                .getById(req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        usuario: response.data,
                        msg: 'Cadastro de usuário encontrado!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Cadastro de usuário não encontrado!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .put((req, res) => {
            usuariosController
                .update(req.body, req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json({
                        msg: 'Usuário atualizado!',
                        type: 'success',
                        statusCode: response.statusCode
                    });
                })
                .catch(response => {
                    res.json({
                        msg: 'Não foi possível atualizar o usuário!',
                        type: 'error',
                        statusCode: response.statusCode
                    });
                });
        })
        .delete((req, res) => {
            usuariosController.delete(req.params).then(response => {
                res.sendStatus(response.statusCode);
            });
        });
};
