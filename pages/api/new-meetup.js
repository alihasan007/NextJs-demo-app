import { MongoClient } from "mongodb";
const userName = encodeURIComponent("ali007");
const password = encodeURIComponent("alihasan007");

//  /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const uri = `mongodb+srv://${userName}:${password}@cluster0.olqur.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const MeetupsCollection = client.db("meetups").collection("meetups");
    // perform actions on the collection object
    const result = await MeetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted !!" });
  }
}
export default handler;
