const mongoose=require("mongoose");
const connectDatabase=()=>{
  mongoose.connect(
    process.env.DB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((error)=>{
    console.error('Error connecting to the database', error);
    process.exit(1); // إنهاء العملية بالفشل
  })
};

module.exports=connectDatabase;