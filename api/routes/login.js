import HttpStatus from 'http-status';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';

export default app => {
    const config = app.config;
    const Usuarios = app.datasource.models.Usuarios;

    app.post('/api/usuarios/login', (req, res) => {
        if (req.body.email && req.body.senha) {
            const email = req.body.email;
            const senha = req.body.senha;

            Usuarios.findOne({where: {email}})
                .then(usuario => {
                    if (Usuarios.isPassword(senha, usuario.senha)) {
                        const payload = {id: usuario.id};
                        res.json({
                            token: jwt.encode(payload, config.jwtSecret)
                        });
                    } else {
                        res.sendStatus(HttpStatus.UNAUTHORIZED);
                    }
                })
                .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
        } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    });
};
