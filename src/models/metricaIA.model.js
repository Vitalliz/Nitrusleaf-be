// Model: MetricaIA
export default (sequelize, DataTypes) => {
const MetricaIA = sequelize.define('MetricaIA', {
    id_metrica: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_relatorio: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      unique: true 
    },
    data_avaliacao: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    acuracia: { 
      type: DataTypes.DECIMAL(5, 2) 
    },
    precisao: { 
      type: DataTypes.DECIMAL(5, 2) 
    },
    recall: { 
      type: DataTypes.DECIMAL(5, 2) 
    },
    f1_score: { 
      type: DataTypes.DECIMAL(5, 2) 
    },
    observacoes: { 
      type: DataTypes.TEXT 
    }
  }, 
  { 
    tableName: 'metricas_ia',
    timestamps: false 
  });  
  return MetricaIA;
}