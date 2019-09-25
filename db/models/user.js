'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('C_USER', {
    row_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    slt_pwd: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    hash_pwd: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    emp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        'model': 'c_emp',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    resp_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          'model': 'c_resp',
          'key': 'row_id'
        }
    },
    fst_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_bu',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    div_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_div',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
  }, 
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
  User.associate = function(models) {
    // User.belongsTo(models.C_EMP, { as: 'employee', foreignKey: 'emp_id' })
    // User.belongsTo(models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
    // User.belongsTo(models.C_DIV, { as: 'division', foreignKey: 'div_id' })
  };
  return User;
};