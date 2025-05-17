// Model: Relatorio
export default (sequelize, DataTypes) => {
const Relatorio =  sequelize.define('Relatorio', {
    id_relatorio: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_pe: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    fk_id_foto: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    deficiencia_cobre: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    deficiencia_manganes: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    outros: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    observacoes: { 
      type: DataTypes.TEXT 
    },
    data_analise: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    }
  }, 
  { 
    tableName: 'relatorios',
    timestamps: false 
  });
  return Relatorio;
}