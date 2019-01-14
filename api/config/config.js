export default {
    database: 'node-js-todo',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'todo.sqlite',
        define: {
            underscored: true
        }
    },
    jwtSecret: 'JwT$3Cr3t',
    jwtSession: {
        session: false
    }
};
