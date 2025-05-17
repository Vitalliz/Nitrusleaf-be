function applyAssociations(db) {
    db.Pessoa.belongsTo(db.Cargo, {
      foreignKey: 'fk_id_cargo',
      as: 'cargo'
    });
  
    db.Pessoa.hasOne(db.PessoaFisica, {
      foreignKey: 'id_pessoa',
      as: 'pessoaFisica'
    });
  
    db.PessoaFisica.belongsTo(db.Pessoa, {
      foreignKey: 'id_pessoa',
      as: 'pessoa'
    });
  
    db.Pessoa.hasOne(db.PessoaJuridica, {
      foreignKey: 'id_pessoa',
      as: 'pessoaJuridica'
    });
  
    db.PessoaJuridica.belongsTo(db.Pessoa, {
      foreignKey: 'id_pessoa',
      as: 'pessoa'
    });
  
    db.Pessoa.hasMany(db.Propriedade, {
      foreignKey: 'fk_id_proprietario',
      as: 'propriedades'
    });
  
    db.Propriedade.belongsTo(db.Pessoa, {
      foreignKey: 'fk_id_proprietario',
      as: 'proprietario'
    });
  
    db.Cargo.belongsToMany(db.Funcao, {
      through: db.CargoFuncao,
      foreignKey: 'fk_id_cargo',
      otherKey: 'fk_id_funcao',
      as: 'funcoes'
    });
  
    db.Funcao.belongsToMany(db.Cargo, {
      through: db.CargoFuncao,
      foreignKey: 'fk_id_funcao',
      otherKey: 'fk_id_cargo',
      as: 'cargos'
    });

    db.Funcao.belongsTo(db.TipoFuncao, {
      foreignKey: 'fk_id_tipo_funcao',
      as: 'tipoFuncao'
    });
  
    db.TipoFuncao.hasMany(db.Funcao, {
      foreignKey: 'fk_id_tipo_funcao',
      as: 'funcoes'
    });
  
    db.Propriedade.hasMany(db.Talhao, {
      foreignKey: 'fk_id_propriedade',
      as: 'talhoes'
    });
  
    db.Talhao.belongsTo(db.Propriedade, {
      foreignKey: 'fk_id_propriedade',
      as: 'propriedade'
    });

    db.Talhao.hasMany(db.Pe, {
      foreignKey: 'fk_id_talhao',
      as: 'pes'
    });
  
    db.Pe.belongsTo(db.Talhao, {
      foreignKey: 'fk_id_talhao',
      as: 'talhao'
    });
  
    db.Pe.hasMany(db.HistoricoMonitoramento, {
      foreignKey: 'fk_id_pe',
      as: 'historicosMonitoramento'
    });
  
    db.HistoricoMonitoramento.belongsTo(db.Pe, {
      foreignKey: 'fk_id_pe',
      as: 'pe'
    });
  
    db.Pe.hasMany(db.Foto, {
      foreignKey: 'fk_id_pe',
      as: 'fotos'
    });
  
    db.Foto.belongsTo(db.Pe, {
      foreignKey: 'fk_id_pe',
      as: 'pe'
    });
  
    db.Pe.hasMany(db.Relatorio, {
      foreignKey: 'fk_id_pe',
      as: 'relatorios'
    });
  
    db.Relatorio.belongsTo(db.Pe, {
      foreignKey: 'fk_id_pe',
      as: 'pe'
    });
  
    db.Foto.hasMany(db.Relatorio, {
      foreignKey: 'fk_id_foto',
      as: 'relatorios'
    });
  
    db.Relatorio.belongsTo(db.Foto, {
      foreignKey: 'fk_id_foto',
      as: 'foto'
    });
  
    db.Relatorio.hasOne(db.MetricaIA, {
      foreignKey: 'fk_id_relatorio',
      as: 'metricaIA'
    });
  
    db.MetricaIA.belongsTo(db.Relatorio, {
      foreignKey: 'fk_id_relatorio',
      as: 'relatorio'
    });
  }
  
  export default applyAssociations;  