// Model: PessoaJuridica
const PessoaJuridica = sequelize.define('PessoaJuridica', {
    id_pessoa: { 
      type: DataTypes.INTEGER, 
      primaryKey: true 
    },
    cnpj: { 
      type: DataTypes.STRING(18), 
      unique: true, 
      allowNull: false 
    },
    nome_fantasia: { 
      type: DataTypes.STRING(100) 
    }
  }, 
  { 
    tableName: 'pessoas_juridicas',
    timestamps: false 
  });  