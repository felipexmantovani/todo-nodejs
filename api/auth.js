import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

export default app => {
    const Usuarios = app.datasource.models.Usuarios;
    const opts = {};
    opts.secretOrKey = app.config.jwtSecret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(opts, (payload, done) => {
        Usuarios.findById(payload.id)
            .then(usuario => {
                if (usuario) {
                    return done(null, {
                        id: usuario.id,
                        email: usuario.email
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', app.config.jwtSession)
    };
};
