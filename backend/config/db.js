// import { MongoClient, ServerApiVersion } from "mongodb";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export async function connect() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// import mongoose from "mongoose";
// mongoose.set("strictQuery", false);

// const mongoDB =
//   "mongodb+srv://simplesapien:livestrong@skill-genie.iok4m72.mongodb.net/skill-genie?retryWrites=true&w=majority";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(mongoDB);
//   await createAuthors();
// }

// async function createAuthors() {
//   const Schema = mongoose.Schema;

//   const AuthorSchema = new Schema({
//     author: String,
//     randomNum: Number,
//   });

//   const Author = mongoose.model("Author", AuthorSchema);

//   const bob = new Author({ name: "Bob Smith", randomNum: 5 });

//   await bob.save();
// }
