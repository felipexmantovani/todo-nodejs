import UsuariosController from '../controllers/usuarios';

export default (app, Usuarios) => {
    const usuariosController = new UsuariosController(app.datasource.models.Usuarios);

    app.route('/api/usuarios').get((req, res) => {
        usuariosController.getAll().then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    app.route('/api/usuarios').post((req, res) => {
        usuariosController.create(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    app.route('/api/usuarios/:id')
        .get((req, res) => {
            usuariosController.getById(req.params).then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        })
        .put((req, res) => {
            usuariosController.update(req.body, req.params).then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        })
        .delete((req, res) => {
            usuariosController.delete(req.params).then(response => {
                res.sendStatus(response.statusCode);
            });
        });
};
