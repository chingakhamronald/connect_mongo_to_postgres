const prisma = require("../../constant/client");

module.exports.Monthly = async (req, res) => {
  const take = Number(req.query.pageSize);
  const pageNo = req.query.pageNo;
  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const monthly =
      await prisma.$queryRaw`SELECT * FROM card  LEFT JOIN orders ON card.refno=orders.orderno LEFT JOIN sessions ON orders.sessionid=sessions.id LIMIT ${take} OFFSET ${skip}`;

    const totalMonthlyData = await prisma.card.count();

    const updateData = JSON.parse(
      JSON.stringify(monthly, (_, v) => {
        return typeof v === "bigint" ? v.toString() : v;
      })
    );

    res
      .status(200)
      .json({ monthlyData: updateData, totalMonthlyData: totalMonthlyData });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
