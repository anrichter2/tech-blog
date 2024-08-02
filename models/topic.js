const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {

}

Topic.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }
)