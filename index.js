const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Food Monster Server is Running');
})

//MongoDB configuration


const uri = `mongodb+srv://${process.env.DBuser}:${process.env.DBpassword}@cluster0.f75ntdx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('foodMonster').collection('services');
        
        app.get('/homeservices', async(req, res)=>{
            const query = {};
            const options = {
                sort: {title: 1}
            }
            const cursor = serviceCollection.find(query, options).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services', async(req, res)=>{
            const query = {};
            const options = {
                sort: {title: 1}
            }
            const cursor = serviceCollection.find(query, options);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.post('/services', async(req, res)=>{
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(error=>console.error(error))


app.listen(PORT, (req, res)=>{
    console.log('Food Monster is running at port', PORT);
})