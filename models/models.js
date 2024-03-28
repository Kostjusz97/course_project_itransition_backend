const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique:true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    status: {type: DataTypes.STRING, defaultValue: "active"},
  })

const Category = sequelize.define('category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true},
  })

const Collection = sequelize.define('collection',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true},
    description: {type: DataTypes.TEXT},
    image_url: {type: DataTypes.STRING} ,
    custom_int1_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_int1_name: {type: DataTypes.STRING}, 
    custom_int2_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_int2_name: {type: DataTypes.STRING},
    custom_int3_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_int3_name: {type: DataTypes.STRING},
    custom_string1_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_string1_name: {type: DataTypes.STRING},
    custom_string2_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_string2_name: {type: DataTypes.STRING},
    custom_string3_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_string3_name: {type: DataTypes.STRING},
    custom_text1_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_text1_name: {type: DataTypes.STRING},
    custom_text2_state: {type: DataTypes.BOOLEAN, defaultValue: false}, 
    custom_text2_name: {type: DataTypes.STRING},
    custom_text3_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_text3_name: {type: DataTypes.STRING},
    custom_boolean1_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_boolean1_name: {type: DataTypes.STRING},
    custom_boolean2_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_boolean2_name: {type: DataTypes.STRING},
    custom_boolean3_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_boolean3_name: {type: DataTypes.STRING},
    custom_date1_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_date1_name: {type: DataTypes.STRING},
    custom_date2_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_date2_name: {type: DataTypes.STRING},
    custom_date3_state: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_date3_name: {type: DataTypes.STRING},
  })

  const Item = sequelize.define('item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true},
    tags: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    custom_int1: {type: DataTypes.INTEGER}, 
    custom_int2: {type: DataTypes.INTEGER},
    custom_int3: {type: DataTypes.INTEGER},
    custom_string1: {type: DataTypes.STRING},
    custom_string2: {type: DataTypes.STRING},
    custom_string3: {type: DataTypes.STRING},
    custom_text1: {type: DataTypes.TEXT},
    custom_text2: {type: DataTypes.TEXT},
    custom_text3: {type: DataTypes.TEXT},
    custom_boolean1: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_boolean2: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_boolean3: {type: DataTypes.BOOLEAN, defaultValue: false},
    custom_date1: {type: DataTypes.DATE},
    custom_date2: {type: DataTypes.DATE},
    custom_date3: {type: DataTypes.DATE},
  })

User.hasMany(Collection)
Collection.belongsTo(User, { foreignKey: 'user_id' });

Collection.hasMany(Item)
Item.belongsTo(Collection, { foreignKey: 'collection_id' });

Category.hasMany(Collection)
Collection.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = {
    User, 
    Collection,
    Item,
    Category
}

