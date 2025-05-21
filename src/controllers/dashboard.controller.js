import { Op, fn, col, literal } from 'sequelize';
import getDb from '../models/db.js';

export async function getDashboardData(req, res) {
  const propertyId = req.params.propertyId;

  try {
    const db = await getDb();

    // Busca todos os relatórios da propriedade com associações para gráficos atuais
    const relatorios = await db.Relatorio.findAll({
      include: [{
        model: db.Pe,
        as: 'pe',
        include: [{
          model: db.Talhao,
          as: 'Talhao',
          where: { fk_id_propriedade: propertyId }
        }]
      }]
    });

    // Inicializa dados para gráficos atuais
    const pieChartData = [0, 0, 0]; // cobre, manganes, outros
    const barDataLabels = [];
    const cobreData = [];
    const manganesData = [];
    const talhoesMap = new Map();

    for (const relatorio of relatorios) {
      if (!relatorio.pe || !relatorio.pe.Talhao) continue;

      const talhaoNome = relatorio.pe.Talhao.nome;

      if (relatorio.deficiencia_cobre) pieChartData[0]++;
      if (relatorio.deficiencia_manganes) pieChartData[1]++;
      if (relatorio.outros) pieChartData[2]++;

      if (!talhoesMap.has(talhaoNome)) {
        talhoesMap.set(talhaoNome, { cobre: 0, manganes: 0 });
      }

      if (relatorio.deficiencia_cobre) talhoesMap.get(talhaoNome).cobre++;
      if (relatorio.deficiencia_manganes) talhoesMap.get(talhaoNome).manganes++;
    }

    for (const [nome, counts] of talhoesMap.entries()) {
      barDataLabels.push(nome);
      cobreData.push(counts.cobre);
      manganesData.push(counts.manganes);
    }

    const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

// Primeiro, obter os IDs dos talhoes daquela propriedade:
const talhoes = await db.Talhao.findAll({
  where: { fk_id_propriedade: propertyId },
  attributes: ['id_talhao'],
  raw: true
});
const talhaoIds = talhoes.map(t => t.id_talhao);

// Obter os IDs dos pés que pertencem a esses talhões:
const pes = await db.Pe.findAll({
  where: { fk_id_talhao: talhaoIds },
  attributes: ['id_pe'],
  raw: true
});
const peIds = pes.map(p => p.id_pe);

// Agora sim fazer a agregação dos relatórios, filtrando por fk_id_pe entre esses ids:
const monthlyDataRaw = await db.Relatorio.findAll({
  attributes: [
    [fn('DATE_FORMAT', col('data_analise'), '%Y-%m'), 'month'],
    [fn('SUM', literal('deficiencia_cobre = TRUE')), 'total_cobre'],
    [fn('SUM', literal('deficiencia_manganes = TRUE')), 'total_manganes'],
    [fn('SUM', literal('outros = TRUE')), 'total_outros'],
  ],
  where: {
    data_analise: { [Op.gte]: sixMonthsAgo },
    fk_id_pe: peIds.length > 0 ? peIds : null // para evitar erro se vazio
  },
  group: ['month'],
  order: [['month', 'ASC']],
  raw: true,
});

    // Preparar dados para frontend mensal
    const monthlyLabels = [];
    const monthlyCobre = [];
    const monthlyManganes = [];
    const monthlyOutros = [];

    for (const entry of monthlyDataRaw) {
      monthlyLabels.push(entry.month);
      monthlyCobre.push(Number(entry.total_cobre));
      monthlyManganes.push(Number(entry.total_manganes));
      monthlyOutros.push(Number(entry.total_outros));
    }

    // Resposta JSON completa
    res.json({
      pieChartData,
      barChartData: {
        labels: barDataLabels,
        cobre: cobreData,
        manganes: manganesData,
      },
      monthlyBarChartData: {
        labels: monthlyLabels,
        cobre: monthlyCobre,
        manganes: monthlyManganes,
        outros: monthlyOutros,
      }
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    res.status(500).json({ error: "Erro ao obter dados do dashboard" });
  }
}