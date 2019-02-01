import Usuarios from './Usuarios';

export default (sequelize, DataType) => {
    const Tarefas = sequelize.define('Tarefas', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataType.INTEGER
        },
        titulo: {
            type: DataType.STRING,
            validate: {
                notEmpty: true
            }
        },
        descricao: {
            type: DataType.STRING,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataType.TINYINT,
            defaultValue: 0
        },
        usuarioId:{
            type: DataType.INTEGER
        }
    });

    return Tarefas;
};
