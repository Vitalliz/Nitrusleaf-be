// src/models/associations.js

function applyAssociations(db) {
    // ✅ Pessoa -> Cargo (cargoPrincipal)
    // ✅ Pessoa -> Cargo (cargoPrincipal)
    db.Pessoa.belongsTo(db.Cargo, {
        foreignKey: 'fk_id_cargo',
        as: 'cargo'
    });

    db.Cargo.hasOne(db.Pessoa, {
      foreignKey: 'fk_id_cargo'
    });


    // ✅ Pessoa -> Pessoa Física
    db.Pessoa.hasOne(db.PessoaFisica, {
        foreignKey: 'id_pessoa',
        as: 'pessoaFisica'
    });

    db.PessoaFisica.belongsTo(db.Pessoa, {
        foreignKey: 'id_pessoa'
    });

    // ✅ Pessoa -> Pessoa Jurídica
    db.Pessoa.hasOne(db.PessoaJuridica, {
        foreignKey: 'id_pessoa',
        as: 'pessoaJuridica'
    });

    db.PessoaJuridica.belongsTo(db.Pessoa, {
        foreignKey: 'id_pessoa'
    });

    // ✅ Pessoa -> Propriedades
    db.Pessoa.hasMany(db.Propriedade, {
        foreignKey: 'fk_id_proprietario',
        as: 'propriedades'
    });

    db.Propriedade.belongsTo(db.Pessoa, {
        foreignKey: 'fk_id_proprietario',
        as: 'proprietario'
    });

    // ✅ Propriedade -> Talhão
    db.Propriedade.hasMany(db.Talhao, {
        foreignKey: 'fk_id_propriedade',
        as: 'talhoes'
    });

    db.Talhao.belongsTo(db.Propriedade, {
        foreignKey: 'fk_id_propriedade'
    });

    // ✅ Talhão -> Pés
    db.Talhao.hasMany(db.Pe, {
        foreignKey: 'fk_id_talhao',
        as: 'pes'
    });

    db.Pe.belongsTo(db.Talhao, {
        foreignKey: 'fk_id_talhao'
    });

    // ✅ Pé -> Fotos
    db.Pe.hasMany(db.Foto, {
        foreignKey: 'fk_id_pe',
        as: 'fotos'
    });

    db.Foto.belongsTo(db.Pe, {
        foreignKey: 'fk_id_pe'
    });

    // ✅ Foto -> Relatórios
    db.Foto.hasMany(db.Relatorio, {
        foreignKey: 'fk_id_foto',
        as: 'relatoriosFoto'
    });

    db.Relatorio.belongsTo(db.Foto, {
        foreignKey: 'fk_id_foto'
    });

    db.Relatorio.belongsTo(db.Pe, { foreignKey: 'fk_id_pe', as: 'pe' });
    db.Pe.hasMany(db.Relatorio, { foreignKey: 'fk_id_pe', as: 'relatorios' });

    // ✅ Relatório -> Métrica IA
    db.Relatorio.hasOne(db.MetricaIA, {
        foreignKey: 'fk_id_relatorio',
        as: 'metricaIA'
    });

    db.MetricaIA.belongsTo(db.Relatorio, {
        foreignKey: 'fk_id_relatorio'
    });
}

export default applyAssociations;