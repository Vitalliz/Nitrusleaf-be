// Model: Funcao
export default (sequelize, DataTypes) => {
const Funcao = sequelize.define('Funcao', {
    id_funcao: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    nome: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true 
    },
    descricao: { 
      type: DataTypes.TEXT 
    },
    fk_id_tipo_funcao: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    }
  }, 
  { 
    tableName: 'funcoes',
    timestamps: false 
  });  
  return Funcao;
}