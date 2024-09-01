'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User , {
        foreignKey:'userId',
        as:"userTodos"
      })
    }
  }
  Todo.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: true,
    },
    isCompleted: {
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNullL: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNullL: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};