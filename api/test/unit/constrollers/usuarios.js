import UsuariosController from '../../../controllers/usuarios';
import {request} from 'https';

describe('Controllers Usuários', () => {
    describe('GET todos os Usuários getAll()', () => {
        it('Retornar lista de usuários', () => {
            const Usuarios = {
                findAll: td.function()
            };

            const expectedResponse = [
                {
                    id: 1,
                    nome: 'Ciclano Detal Atualizado',
                    email: 'ciclano.atualizado@detal.com',
                    cpf: '01234567890',
                    senha: '123',
                    created_at: '2018-12-21 12:12:45.908 +00:00',
                    updated_at: '2018-12-21 12:12:45.908 +00:00'
                }
            ];

            td.when(Usuarios.findAll({})).thenResolve(expectedResponse);

            const usuariosController = new UsuariosController(Usuarios);
            return usuariosController
                .getAll()
                .then(response =>
                    expect(response.data).to.be.eql(expectedResponse)
                );
        });
    });

    describe('GET usuário getById()', () => {
        it('Retorna usuário', () => {
            const Usuarios = {
                findOne: td.function()
            };

            const expectedResponse = {
                id: 1,
                nome: 'Fulano Detal',
                email: 'fulano@detal.com',
                cpf: '01234567890',
                senha: '123',
                created_at: '2018-12-21 12:12:45.908 +00:00',
                updated_at: '2018-12-21 12:12:45.908 +00:00'
            };

            td.when(
                Usuarios.findOne({
                    where: {
                        id: 1
                    }
                })
            ).thenResolve(expectedResponse);

            const usuariosController = new UsuariosController(Usuarios);
            return usuariosController
                .getById({
                    id: 1
                })
                .then(response =>
                    expect(response.data).to.be.eql(expectedResponse)
                );
        });
    });

    describe('POST usuário create()', () => {
        it('Cria usuário', () => {
            const Usuarios = {
                create: td.function()
            };

            const requestBody = {
                nome: 'Beltrano Detal',
                email: 'beltrano@detal.com',
                cpf: '01234567890',
                senha: '123'
            };

            const expectedResponse = {
                id: 1,
                nome: 'Ciclano Detal',
                email: 'ciclano@detal.com',
                cpf: '01234567890',
                senha: '123',
                created_at: '2018-12-21 12:12:45.908 +00:00',
                updated_at: '2018-12-21 12:12:45.908 +00:00'
            };

            td.when(Usuarios.create(requestBody)).thenResolve(expectedResponse);

            const usuariosController = new UsuariosController(Usuarios);
            return usuariosController.create(requestBody).then(response => {
                expect(response.statusCode).to.be.eql(201);
                expect(response.data).to.be.eql(expectedResponse);
            });
        });
    });

    describe('POST usuário update()', () => {
        it('Atualiza usuário', () => {
            const Usuarios = {
                update: td.function()
            };

            const requestBody = {
                id: 1,
                nome: 'Beltrano Detal Atualizado'
            };

            const expectedResponse = {
                id: 1,
                nome: 'Ciclano Detal',
                email: 'ciclano@detal.com',
                cpf: '01234567890',
                senha: '123',
                created_at: '2018-12-21 12:12:45.908 +00:00',
                updated_at: '2018-12-21 12:12:45.908 +00:00'
            };

            td.when(Usuarios.update(requestBody, {where: {id: 1}})).thenResolve(
                expectedResponse
            );

            const usuariosController = new UsuariosController(Usuarios);
            return usuariosController
                .update(requestBody, {id: 1})
                .then(response =>
                    expect(response.data).to.be.eql(expectedResponse)
                );
        });
    });

    describe('POST usuário delete()', () => {
        it('Deleta usuário', () => {
            const Usuarios = {
                destroy: td.function()
            };

            td.when(Usuarios.destroy({where: {id: 1}})).thenResolve({});

            const usuariosController = new UsuariosController(Usuarios);
            return usuariosController
                .delete({id: 1})
                .then(response => expect(response.statusCode).to.be.eql(204));
        });
    });
});
