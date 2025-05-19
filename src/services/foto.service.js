import getDb from '../models/db.js';

// Função para atualizar a situação do pé
async function atualizarSituacaoPe(fk_id_pe) {
  const db = await getDb();
  const relatorios = await db.Relatorio.count({ where: { fk_id_pe } });

  // Se houver relatórios, o pé é "nao tratado", senão "sem informacoes"
  const situacao = relatorios > 0 ? "nao tratado" : "sem informacoes";

  await db.Pe.update(
    { situacao },
    { where: { id_pe: fk_id_pe } }
  );
}

// Função para gerar um relatório automaticamente com base na foto criada
async function createRelatorioAutomatico(foto) {
  const db = await getDb();
  const chance = Math.random();
  let deficiencia_cobre = false;
  let deficiencia_manganes = false;
  let outros = false;

  // Definir a deficiência com base na probabilidade
  if (chance < 0.1) {
    deficiencia_cobre = true;
  } else if (chance < 0.2) {
    deficiencia_manganes = true;
  } else {
    outros = true;
  }

  await db.Relatorio.create({
    fk_id_pe: foto.fk_id_pe,
    fk_id_foto: foto.id_foto,
    deficiencia_cobre,
    deficiencia_manganes,
    outros,
    data_analise: foto.data_foto,
  });

  // 🚀 Atualiza a situação do pé para "nao tratado"
  await atualizarSituacaoPe(foto.fk_id_pe);
}

// 🚀 Criar várias Fotos e automaticamente criar os relatórios
async function createFotosBulk(dataArray) {
  try {
    const db = await getDb();
    const fotos = await db.Foto.bulkCreate(dataArray);

    // 🚀 Criar relatórios automaticamente para cada foto
    for (const foto of fotos) {
      await createRelatorioAutomatico(foto);
    }

    return fotos;
  } catch (error) {
    throw new Error(`Erro ao criar Fotos em massa: ${error.message}`);
  }
}

// Criar uma nova Foto e automaticamente criar o relatório
async function createFoto(data) {
  try {
    const db = await getDb();
    const foto = await db.Foto.create(data);
    await createRelatorioAutomatico(foto); // 🚀 Criar o relatório automaticamente
    return foto;
  } catch (error) {
    throw new Error(`Erro ao criar Foto: ${error.message}`);
  }
}

// Buscar todas as Fotos
async function getAllFotos() {
  try {
    const db = await getDb();
    const fotos = await db.Foto.findAll();
    return fotos;
  } catch (error) {
    throw new Error(`Erro ao buscar Fotos: ${error.message}`);
  }
}

// Buscar uma Foto por ID
async function getFotoById(id) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    return foto;
  } catch (error) {
    throw new Error(`Erro ao buscar Foto: ${error.message}`);
  }
}

// Atualizar uma Foto por ID
async function updateFoto(id, data) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    if (!foto) {
      return null;
    }
    await foto.update(data);
    return foto;
  } catch (error) {
    throw new Error(`Erro ao atualizar Foto: ${error.message}`);
  }
}

// Deletar uma Foto por ID e seu Relatório automaticamente
async function deleteFoto(id) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    if (!foto) {
      return false;
    }

    const fk_id_pe = foto.fk_id_pe;
    await db.Relatorio.destroy({ where: { fk_id_foto: foto.id_foto } }); // 🚀 Excluir relatório automaticamente
    await foto.destroy();
    
    // 🚀 Atualizar a situação do pé após a exclusão do relatório
    await atualizarSituacaoPe(fk_id_pe);

    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Foto: ${error.message}`);
  }
}

export default {
  createFoto,
  createFotosBulk,
  getAllFotos,
  getFotoById,
  updateFoto,
  deleteFoto,
};