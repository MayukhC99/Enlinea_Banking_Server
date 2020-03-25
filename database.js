const sequelize= require('sequelize')

const db= new sequelize(
    'enlinea',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const users= db.define('users',{
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    first_name: sequelize.STRING,
    last_name: sequelize.STRING,
    profile_picture: sequelize.STRING
})

db.sync().then(()=> console.log('Database is syncronized'));

module.exports = {
    db,
    users
};