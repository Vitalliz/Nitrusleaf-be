// Model: CargoFuncao
const CargoFuncao = sequelize.define('CargoFuncao', {
    fk_id_cargo: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true 
    },
    fk_id_funcao: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true 
    }
  }, 
  { 
    tableName: 'cargos_funcoes',
    timestamps: false 
  });  