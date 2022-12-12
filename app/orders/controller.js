const prisma = require("../../constant/client");

module.exports.Orders = async (req, res) => {
  const take = req.query.pageSize;

  const pageNo = req.query.pageNo;

  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const orders = await prisma.orders.findMany({
      include: {
        orderPayments: true,
      },
      take: Number(take),
      skip: skip,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
