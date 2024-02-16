import Product from "../models/products.js";

const months = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

export const getProductTransactions = async (req, res) => {
  const searchQuery = req.query.search || "";
  const month = req.query.month || "march";

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          month: { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
        },
      },
      {
        $match: {
          month: months[month],
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { price: { $eq: Number(searchQuery) } },
          ],
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const totalPages = Math.ceil(products.length / limit);

    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductStatistics = async (req, res) => {
  const month = req.query.month || "march";

  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          month: {
            $month: { $dateFromString: { dateString: "$dateOfSale" } },
          },
        },
      },
      {
        $match: {
          month: months[month],
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
          },
          totalSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] },
          },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalSaleAmount: 1,
          totalSoldItems: 1,
          totalNotSoldItems: 1,
        },
      },
    ]);

    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPriceRangeData = async (req, res) => {
  const month = req.query.month || "march";

  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          month: {
            $month: { $dateFromString: { dateString: "$dateOfSale" } },
          },
        },
      },
      {
        $match: {
          month: months[month],
        },
      },
      {
        $group: {
          _id: null, // Group all documents together
          "0-100": {
            $sum: {
              $cond: [
                { $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] },
                1,
                0,
              ],
            },
          },
          "101-200": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 101] }, { $lte: ["$price", 200] }],
                },
                1,
                0,
              ],
            },
          },
          "201-300": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 201] }, { $lte: ["$price", 300] }],
                },
                1,
                0,
              ],
            },
          },
          "301-400": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 301] }, { $lte: ["$price", 400] }],
                },
                1,
                0,
              ],
            },
          },
          "401-500": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 401] }, { $lte: ["$price", 500] }],
                },
                1,
                0,
              ],
            },
          },
          "501-600": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 501] }, { $lte: ["$price", 600] }],
                },
                1,
                0,
              ],
            },
          },
          "601-700": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 601] }, { $lte: ["$price", 700] }],
                },
                1,
                0,
              ],
            },
          },
          "701-800": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 701] }, { $lte: ["$price", 800] }],
                },
                1,
                0,
              ],
            },
          },
          "801-900": {
            $sum: {
              $cond: [
                {
                  $and: [{ $gte: ["$price", 801] }, { $lte: ["$price", 900] }],
                },
                1,
                0,
              ],
            },
          },
          "901-above": { $sum: { $cond: [{ $gte: ["$price", 901] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the group ID
        },
      },
    ]);

    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPieChart = async (req, res) => {
  const month = req.query.month || "march";

  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          month: {
            $month: { $dateFromString: { dateString: "$dateOfSale" } },
          },
        },
      },
      {
        $match: {
          month: months[month],
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalItems: { $sum: 1 }, // Count the number of items in each category
        },
      },
      {
        $project: {
          _id: 0, // Exclude the group ID
          category: "$_id", // Rename the group ID field
          totalItems: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
