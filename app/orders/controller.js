const prisma = require("../../constant/client");

module.exports.Orders = async (req, res) => {
  const take = Number(req.query.pageSize);

  const pageNo = req.query.pageNo;

  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const orders =
      await prisma.$queryRaw`SELECT * FROM payments  FULL OUTER JOIN orders ON payments.orderno=orders.orderno WHERE iid IS NOT NULL LIMIT ${take} OFFSET ${skip} `;
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
