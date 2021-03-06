import jwt from 'jwt-simple';

describe('Rota Usuários', () => {
    const Usuarios = app.datasource.models.Usuarios;
    const jwtSecret = app.config.jwtSecret;
    const defaultUsuario = {
        id: 1,
        nome: 'Fulano Detal',
        email: 'fulano@detal.com',
        cpf: '01234567890',
        senha: '123'
    };

    let token;

    beforeEach(done => {
        Usuarios.destroy({
            where: {}
        })
            .then(() =>
                Usuarios.create({
                    nome: 'Ciclano Detal',
                    email: 'ciclano@detal.com',
                    cpf: '12345678955',
                    senha: '123'
                })
            )
            .then(usuario =>
                Usuarios.create(defaultUsuario).then(() => {
                    token = jwt.encode({id: usuario.id}, jwtSecret);
                    done();
                })
            );
    });

    describe('Rota GET /api/usuarios', () => {
        it('Retornar a lista de usuários', done => {
            request
                .get('/api/usuarios')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.body[0].id).to.be.eql(defaultUsuario.id);
                    expect(res.body[0].nome).to.be.eql(defaultUsuario.nome);
                    expect(res.body[0].email).to.be.eql(defaultUsuario.email);
                    expect(res.body[0].cpf).to.be.eql(defaultUsuario.cpf);

                    done(err);
                });
        });
    });

    describe('Rota POST /api/usuarios', () => {
        it('Cria usuário', done => {
            const novoUsuario = {
                id: 2,
                nome: 'Ciclano Detal',
                email: 'ciclano@detal.com',
                cpf: '01234567890',
                senha: '123'
            };

            request
                .post('/api/usuarios')
                .set('Authorization', `Bearer ${token}`)
                .send(novoUsuario)
                .end((err, res) => {
                    expect(res.body.id).to.be.eql(novoUsuario.id);
                    expect(res.body.nome).to.be.eql(novoUsuario.nome);
                    expect(res.body.email).to.be.eql(novoUsuario.email);
                    expect(res.body.cpf).to.be.eql(novoUsuario.cpf);

                    done(err);
                });
        });
    });

    describe('Rota GET /api/usuarios/{id}', () => {
        it('Retorna usuário', done => {
            request
                .get('/api/usuarios/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.body.id).to.be.eql(defaultUsuario.id);
                    expect(res.body.nome).to.be.eql(defaultUsuario.nome);
                    expect(res.body.email).to.be.eql(defaultUsuario.email);
                    expect(res.body.cpf).to.be.eql(defaultUsuario.cpf);

                    done(err);
                });
        });
    });

    describe('Rota PUT /api/usuarios/{id}', () => {
        it('Atualiza usuário', done => {
            const atualizaUsuario = {
                id: 1,
                nome: 'Ciclano Detal Atualizado',
                email: 'ciclano.atualizado@detal.com',
                cpf: '01234567890',
                senha: '123'
            };

            request
                .put('/api/usuarios/1')
                .set('Authorization', `Bearer ${token}`)
                .send(atualizaUsuario)
                .end((err, res) => {
                    expect(res.body).to.be.eql([1]);

                    done(err);
                });
        });
    });

    describe('Rota DELETE /api/usuarios/{id}', () => {
        it('Deleta usuário', done => {
            request
                .delete('/api/usuarios/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.eql(204);

                    done(err);
                });
        });
    });
});
