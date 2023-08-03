// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement: true
    },
    prodcut_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        isDecimal:true,
      }
   
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 10,
      validate:{
        isNumeric:true,
      }
    // TODO keep track of things in project. 
    },
    category_id:{
      type: DataTypes.INTEGER,
      //references Categorie models ID  aks tutor, 
      //product belongsTo category, 
      //category hasMany products,
      references: {
        model:'Category',
        key:'id',

      }
     //})
   
    }
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

