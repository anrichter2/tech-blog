const sequelize = require("../config/connection");
const { User, Post } = require('../models');

const userData = require('./userSeeds.json');
const postData = require('./postSeeds.json');

// function for seeding the database with some users and posts
const seedDataBase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({...post});
    };

    process.exit(0);
};

seedDataBase();