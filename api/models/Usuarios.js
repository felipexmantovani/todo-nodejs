export default (sequelize, DataType) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataType.INTEGER
        },
        nome: {
            type: DataType.STRING
        },
        email: {
            allowNull: false,
            type: DataType.STRING,
            unique: true
        },
        cpf: {
            allowNull: false,
            type: DataType.STRING
        },
        senha: {
            allowNull: false,
            type: DataType.STRING
        }
    })

    return Usuarios;
}
