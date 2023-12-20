
const mongoose = require('mongoose')

const connection = async () => {
    try {
        const connect = await mongoose.connect ("mongodb+srv://saraththekkadavan:E2UQ8tP8tOE6Iwf4@cluster0.auqu0ng.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser : true,
            useUnifiedTopology : true,

        });
        console.log("Database is running");
    }
    catch (err){
        console.log(`error : ${err}`);
        process.exit();
    }
};
module.exports = connection