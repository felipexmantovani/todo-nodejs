const defaultResponse = (data, statusCode = 200) => ({
    data: data,
    statusCode: statusCode
});

const errorResponse = (message, statusCode = 400) =>
    defaultResponse(
        {
            error: message
        },
        statusCode
    );

class UsuariosController {
    constructor(Usuarios) {
        this.Usuarios = Usuarios;
    }

    getAll() {
        return this.Usuarios.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById(params) {
        return this.Usuarios.findOne({
            where: params
        })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.Usuarios.create(data)
            .then(result => defaultResponse(result, 201))
            .catch(error => errorResponse(error.message, 422));
    }

    update(data, params) {
        return this.Usuarios.update(data, {
            where: params
        })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, 422));
    }

    delete(params) {
        return this.Usuarios.destroy({
            where: params
        })
            .then(result => defaultResponse(result, 204))
            .catch(error => errorResponse(error.message, 422));
    }
}

export default UsuariosController;
