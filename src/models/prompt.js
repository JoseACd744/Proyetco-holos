module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assistantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Prompt.associate = (models) => {
    Prompt.belongsTo(models.Assistant, {
      foreignKey: 'assistantId',
      onDelete: 'CASCADE',
    });
  };

  return Prompt;
};