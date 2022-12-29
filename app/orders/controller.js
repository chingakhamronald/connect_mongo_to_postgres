const prisma = require("../../constant/client");

module.exports.Orders = async (req, res) => {
  const take = Number(req.query.pageSize);

  const pageNo = req.query.pageNo;

  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const payments =
      await prisma.$queryRaw`SELECT * FROM payments  FULL OUTER JOIN orders ON payments.orderno=orders.orderno  WHERE payments.iid IS NOT NULL LIMIT ${take} OFFSET ${skip} `;

      const totalPayments = await prisma.$queryRaw`SELECT COUNT(*) FROM payments`

    res.status(200).json({payments: payments , totalPayments: totalPayments[0].count + ""});
  } catch (err) {
    res.status(500).json(err.message);
  }
};
