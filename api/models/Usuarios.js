import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
    const Usuarios = sequelize.define(
        'Usuarios',
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataType.INTEGER
            },
            nome: {
                type: DataType.STRING,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                allowNull: false,
                type: DataType.STRING,
                unique: true,
                validate: {
                    notEmpty: true
                }
            },
            cpf: {
                allowNull: false,
                type: DataType.STRING,
                validate: {
                    notEmpty: true
                }
            },
            senha: {
                allowNull: false,
                type: DataType.STRING,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            hooks: {
                beforeCreate: usuario => {
                    const salt = bcrypt.genSaltSync();
                    usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
                }
            }
        }
    );

    Usuarios.isPassword = (senha, encodedPassword) =>
        bcrypt.compareSync(senha, encodedPassword);

    return Usuarios;
};
