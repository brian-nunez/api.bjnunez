const mongoose = require('mongoose');

const db = `mongodb+srv://${
  process.env.MONGO_USER
}:${
  process.env.MONGO_PASSWORD
}@api-cgfbm.mongodb.net/${
  process.env.MONGO_DATABASE
}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected to ${process.env.MONGO_DATABASE}`);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
