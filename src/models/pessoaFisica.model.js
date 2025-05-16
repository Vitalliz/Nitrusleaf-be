// Model: PessoaFisica
const PessoaFisica = sequelize.define('PessoaFisica', {
    id_pessoa: { 
      type: DataTypes.INTEGER, 
      primaryKey: true 
    },
    cpf: { 
      type: DataTypes.STRING(14), 
      unique: true, 
      allowNull: false 
    },
    data_nasc: { 
      type: DataTypes.DATEONLY 
    }
  }, 
  { 
    tableName: 'pessoas_fisicas',
    timestamps: false 
  });  