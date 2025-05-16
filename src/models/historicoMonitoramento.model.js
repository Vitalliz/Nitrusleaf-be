// Model: HistoricoMonitoramento
const HistoricoMonitoramento = sequelize.define('HistoricoMonitoramento', {
    id_historico: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_pe: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    data_monitoramento: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    situacao: { 
      type: DataTypes.ENUM('saudavel', 'doente', 'tratado', 'em monitoramento'), 
      allowNull: false 
    },
    observacoes: { 
      type: DataTypes.TEXT 
    }
  }, 
  { 
    tableName: 'historicos_monitoramentos',
    timestamps: false 
  });  