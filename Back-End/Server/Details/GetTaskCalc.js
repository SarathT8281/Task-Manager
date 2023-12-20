const task = require('../Schema/Task');
const User = require('../Schema/User');
const getTaskCalc = async (req,res) => {
    const calc = await task.aggregate([
        {
            $group:{
            _id:{status:"$status"},
            count:{$sum:1}
            } 
        },
        {
            $project :{
                _id: 0,
                status: "$_id.status",
                count: "$count"
            }
        }
        ])
    console.log("aggregated restult",calc);
        res.json(calc)
}

module.exports = getTaskCalc;



// const task = require('../Schema/Task');
// const User = require('../Schema/User');

// const getTaskCalc = async (req, res) => {
//     try {
   
//         const calc = await task.aggregate([
//             {
//                 $group: {
//                     _id: { status: "$status" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     status: "$_id.status",
//                     count: "$count"
//                 }
//             }
//         ]);
//             res.json(calc)

//         console.log("Task Aggregated Result", calc);

//         // Aggregate User collection
//         const userAggregation = await User.aggregate([
//             {
//                 $group: {
//                     _id: null, // Group all documents
//                     names: { $push: "$name" } // Collect all names in an array
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     names: 1
//                 }
//             }
//         ]);

//         console.log("User Aggregated Result", userAggregation);

//         res.json({ taskCalc: calc, userNames: userAggregation[0]?.names || [] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = getTaskCalc;
