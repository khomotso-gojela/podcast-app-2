import { MongoClient } from "mongodb";

    const uri = 'mongodb+srv://myAtlasDBUser:motso123@myatlasclusteredu.isls5fi.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri)

    try {
        await client.connect()
    } catch (error) {
        
    } finally {
        await client.close()
    }


async function getFavs(client) {

    try {
        await client.connect()
        const result = await client.db('mocast').collection('favs').findOne()        
    } catch (error) {
    } finally {
        await client.close()
    }
    if (!result) console.log("couldn't get favs data")
}

async function insertFav(client,doc) {
    try {
        await client.connect()
        const result = await client.db('mocast').collection('favs').insertOne(doc)
    } catch (error) {
        
    } finally {
        await client.close()
    }
    if (!result) console.log("couldn't set favs data")
}

async function deleteFavs(client) {
    try {
        await client.connect()
        const result = await client.db('mocast').collection('favs').deleteOne()
    } catch (error) {
        
    } finally {
        await client.close()
    }
    if (!result) console.log("couldn't update favs data")
}

export { insertFav, getFavs, deleteFavs}