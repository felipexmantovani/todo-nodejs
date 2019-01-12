import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data: data,
    statusCode: statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) =>
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
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.Usuarios.update(data, {
            where: params
        })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.Usuarios.destroy({
            where: params
        })
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
}

export default UsuariosController;
