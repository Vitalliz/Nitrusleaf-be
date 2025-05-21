import { Op, fn, col, literal } from 'sequelize';
import getDb from '../models/db.js';

export async function getHistoryData(req, res) {
  const propertyId = req.params.id;

  try {
    const db = await getDb();

    // Buscar dados fixos da propriedade
    const propriedade = await db.Propriedade.findByPk(propertyId, {
      attributes: ['id_propriedade', 'nome', 'total_pes', 'talhoes_registrados'],
      raw: true,
    });

    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }

    // Buscar talhões da propriedade com total de pés e pés analisados corretamente
    const talhoes = await db.Talhao.findAll({
      where: { fk_id_propriedade: propertyId },
      attributes: [
        'id_talhao',
        'nome',
        // Contar total de pés no talhão
        [literal(`(
          SELECT COUNT(*)
          FROM pes AS p
          WHERE p.fk_id_talhao = Talhao.id_talhao
        )`), 'total_pes'],
        // Contar pés analisados (com relatório) no talhão
        [literal(`(
          SELECT COUNT(DISTINCT r.fk_id_pe)
          FROM relatorios AS r
          INNER JOIN pes AS p ON r.fk_id_pe = p.id_pe
          WHERE p.fk_id_talhao = Talhao.id_talhao
        )`), 'pes_analisados'],
      ],
      raw: true,
    });

    // IDs dos talhões para buscar pés
    const talhaoIds = talhoes.map(t => t.id_talhao);

    // Buscar pés ligados a esses talhões
    const pes = await db.Pe.findAll({
      where: { fk_id_talhao: talhaoIds },
      attributes: ['id_pe'],
      raw: true,
    });
    const peIds = pes.map(p => p.id_pe);

    // Contar pés analisados na propriedade (com relatório)
    const pesAnalisadosCount = await db.Relatorio.count({
      where: {
        fk_id_pe: peIds.length > 0 ? peIds : null
      },
      distinct: true,
      col: 'fk_id_pe'
    });

    // Contar pés diagnosticados (com relatório e alguma deficiência)
    const pesDiagnosticadosCount = await db.Relatorio.count({
      where: {
        fk_id_pe: peIds.length > 0 ? peIds : null,
        [Op.or]: [
          { deficiencia_cobre: true },
          { deficiencia_manganes: true },
          { outros: false }
        ]
      },
      distinct: true,
      col: 'fk_id_pe'
    });

    // Montar resposta com totais e lista de talhões
    res.json({
      totals: {
        totalTalhoes: propriedade.talhoes_registrados,
        totalPes: propriedade.total_pes,
        pesAnalisados: pesAnalisadosCount,
        pesDiagnosticados: pesDiagnosticadosCount,
      },
      talhoes: talhoes.map(talhao => ({
        id_talhao: talhao.id_talhao,
        nome: talhao.nome,
        total_pes: Number(talhao.total_pes),
        pes_analisados: Number(talhao.pes_analisados),
      })),
    });

  } catch (error) {
    console.error("Erro ao obter histórico da propriedade:", error);
    res.status(500).json({ error: "Erro ao obter histórico da propriedade" });
  }
}