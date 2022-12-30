const prisma = require("../../constant/client");

module.exports.Monthly = async (req, res) => {
  const take = Number(req.query.pageSize);

  const pageNo = req.query.pageNo;

  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const monthly = await prisma.card.findMany({
      take: take,
      skip: skip,
    });

    const updateData = JSON.stringify(monthly, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    );
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
