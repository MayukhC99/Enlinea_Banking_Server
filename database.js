const sequelize= require('sequelize');
const Op = sequelize.Op;

const db= new sequelize(
    'enlinea',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

//account status table
const account_status= db.define('deactive',{
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: sequelize.STRING
})

//table to store user details
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

//table for friend list records
const friends= db.define('friends',{
    username: {
        type: sequelize.STRING,
        allowNull: false
    },
    requested_user: {
        type: sequelize.STRING,
        allowNull: false
    },
    status: sequelize.STRING
})

//notification table
const notification= db.define('notification',{
    username: {
        type: sequelize.STRING,
        allowNull: false
    },
    from: sequelize.STRING,
    subject: sequelize.STRING,
    msg: sequelize.STRING
})

function admin_callback(){
    db.query(`INSERT IGNORE INTO users (username,password,first_name,last_name,profile_picture)` +
            `VALUES ('admin','9073326812','Admin','Admin','000.jpg')`);
    db.query(`INSERT IGNORE INTO deactives (username,status) VALUES ('admin','active')`);
}

db.sync().then(function(){
    console.log('Database is syncronized')
    admin_callback();
});



module.exports = {
    Op,
    db,
    users,
    account_status,
    friends,
    notification
};