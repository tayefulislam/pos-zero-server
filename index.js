const express = require("express");
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');





const app= express()
const port = process.env.PORT || 9000;

// middleware

app.use(cors());
app.use(express.json())




// data base

const uri = process.env.URI_INFO;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
 
async function run (){

  await  client.connect()

  const itemCollection = client.db("posZero").collection("items");


// Add a Item
  app.post('/additem',async(req,res)=>{

    const item = req.body;
    const result =await itemCollection.insertOne(item)
    res.send(result)

  })

  // get all items

  app.get('/items',async(req,res)=>{
    const result = await itemCollection.find({}).toArray()
    res.send(result)
  })



}

run().catch(console.log)






app.get('/',(req,res)=>{
    res.send("Hello")
})
app.listen(port,()=>{
    console.log('server run at',port)
})


// api check

