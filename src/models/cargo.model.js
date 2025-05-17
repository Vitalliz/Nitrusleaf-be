export default (sequelize, DataTypes) => {
  const Cargo = sequelize.define('Cargo', {
    id_cargo: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    nome: { 
      type: DataTypes.STRING(50), 
      allowNull: false, 
      unique: true 
    },
    descricao: { 
      type: DataTypes.TEXT 
    }
  }, { 
    tableName: 'cargos',
    timestamps: false 
  });
  return Cargo;
};