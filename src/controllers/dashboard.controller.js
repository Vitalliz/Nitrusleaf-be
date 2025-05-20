// src/controllers/dashboard.controller.js
import getDb from '../models/db.js';

export async function getDashboardData(req, res) {
  const propertyId = req.params.propertyId;

  try {
    const db = await getDb();

    // Consulta os relatórios vinculados à propriedade (via pé, talhão, etc)
    // Exemplo simplificado:
    const relatorios = await db.Relatorio.findAll({
      include: [{
        model: db.Pe,
        where: { fk_id_propriedade: propertyId },
        include: [{ model: db.Talhao }]
      }]
    });

    // Montar dados para pieChartData (exemplo: soma das deficiências)
    const pieChartData = [0, 0, 0]; // [cobre, manganes, outros]
    const barDataLabels = [];
    const cobreData = [];
    const manganesData = [];

    const talhoesMap = new Map();

    for (const relatorio of relatorios) {
      const talhaoNome = relatorio.Pe.Talhao.nome;

      // Conta deficiência para pie chart
      if (relatorio.deficiencia_cobre) pieChartData[0]++;
      if (relatorio.deficiencia_manganes) pieChartData[1]++;
      if (relatorio.outros) pieChartData[2]++;

      // Conta deficiência por talhão para bar chart
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

    res.json({
      pieChartData,
      barChartData: {
        labels: barDataLabels,
        cobre: cobreData,
        manganes: manganesData,
      }
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    res.status(500).json({ error: "Erro ao obter dados do dashboard" });
  }
}