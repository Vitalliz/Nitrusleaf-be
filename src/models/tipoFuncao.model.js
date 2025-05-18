// Model: TipoFuncao
export default (sequelize, DataTypes) => {
const TipoFuncao = sequelize.define('TipoFuncao', {
    id_tipo_funcao: { 
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
      type: DataTypes.TEXT, 
    }
  }, 
  { 
    tableName: 'tipo_funcoes',
    timestamps: false 
  });  
  return TipoFuncao;
}