import User from '../models/user.js';

export const getUser = async (req, res) => {
	try {
		const queryParams = req.query;
		const { limit = 15, offset = 0, lim = +limit, off = +offset, sortKey = 'age' } = queryParams;
		const name = queryParams.filter.name.trim();
		const sortOrder = queryParams?.sortOrder?.toLowerCase() == 'desc' ? -1 : 1;

		let aggregate = [
			{
				$addFields: {
					_id: { $toString: '$_id' },
				},
			},
		];

		if (name) {
			aggregate.push({
				$match: {
					name: name,
				},
			});
		}

		const facet = {
			count: [{ $count: 'count' }],
			rows: [],
		};
		facet.rows.push({ $sort: { [sortKey]: sortOrder } }, { $skip: off }, { $limit: lim });

		aggregate.push({ $facet: facet });
		const aggregateData = await User.aggregate(aggregate);
		console.log(aggregateData[0].rows);
		const data = aggregateData[0];
		res.status(200).json({
			count: data.count.length === 1 ? data.count[0].count : 0,
			rows: data.rows,
		});
	} catch (error) {
		console.log(error);
		res.status(500);
	}
};
