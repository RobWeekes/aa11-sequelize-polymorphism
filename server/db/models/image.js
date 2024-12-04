'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.BlogPost, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.UserProfile, {
        foreignKey: 'imageableId',
        constraints: false
      });
    };
    getImageable() {
      if (!this.imageableType) return Promise.resolve(null)
      if (this.imageableType === 'BlogPost') {
        return this.getBlogPost();
      }
      if (this.imageableType === 'UserProfile') {
        return this.getUserProfile();
      }
      // return Promise.resolve(null);
    }
  };
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageableType: DataTypes.STRING,
    imageableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image'
  });
  return Image;
};
