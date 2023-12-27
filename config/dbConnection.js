import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB Connection Established : ', connect.connection.host, '--', connect.connection.name);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

export default connectDB;
