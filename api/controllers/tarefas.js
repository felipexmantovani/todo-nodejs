import HttpStatus from 'http-status';
import Sequelize from 'sequelize';

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

class TarefasController {
    constructor(Tarefas) {
        this.Tarefas = Tarefas;
    }

    getAll() {
        return this.Tarefas.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById(params) {
        return this.Tarefas.findOne({
            where: params
        })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.Tarefas.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error =>
                errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
            );
    }

    update(data, params) {
        return this.Tarefas.update(data, {
            where: params
        })
            .then(result => defaultResponse(result))
            .catch(error =>
                errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
            );
    }

    delete(params) {
        return this.Tarefas.destroy({
            where: params
        })
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error =>
                errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
            );
    }

    getByTitulo(params) {
        return this.Tarefas.findAll({
            where: {
                titulo: {
                    [Sequelize.Op.like]: `%${params}%`
                }
            }
        })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }
}

export default TarefasController;
