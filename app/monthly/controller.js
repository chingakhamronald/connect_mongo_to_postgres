const prisma = require("../../constant/client");

module.exports.Monthly = async (req, res) => {
  const take = Number(req.query.pageSize);

  const pageNo = req.query.pageNo;

  const skip = Math.max(pageNo - 1, 0) * take;

  try {
    const monthly =
      await prisma.$queryRaw`SELECT * FROM card LIMIT=${take} OFFSET=${skip}`;

    res.status(200).json(monthly);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
