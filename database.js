const sequelize= require('sequelize');

const db= new sequelize(
    'enlinea',
    'root',
    'sirsrt',
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
    email_id: sequelize.STRING,
    mobile_number: sequelize.STRING,
    DOB: sequelize.STRING,
    gender: sequelize.STRING,
    profile_picture: sequelize.STRING
});

function admin_callback(){
    db.query(`INSERT IGNORE INTO users (username,password,first_name,last_name,profile_picture)` +
            `VALUES ('admin','9073326812','Admin','Admin','000.jpg')`);
}

db.sync().then(function(){ 
    console.log('Database is syncronized')
    admin_callback();
});



module.exports = {
    db,
    users
};