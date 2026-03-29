const ConnectToMongoDB = require('../utils/mongo-connection')
const { ObjectId } = require('mongodb')
const ProductCollection = "product"

async function get() {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (res, rej) => {
        const products = await db.collection(ProductCollection).find({}, { sort: { _id: -1 } }).toArray()
        res(products)
    })
}

async function getById(id) {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (res, rej) => {
        try {
            const product = await db.collection(ProductCollection).findOne({ _id: new ObjectId(id) })
            res(product)
        } catch (error) {
            res(null)
        }
    })
}

async function create(product) {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (res, rej) => {
        const result = await db.collection(ProductCollection).insertOne(product)
        res(result)
    })
}

async function update(id, payload) {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (res, rej) => {
        const result = await db.collection(ProductCollection).updateOne({ _id: new ObjectId(id) }, {
            $set: {
                ...payload
            }
        })
        res(result)
    })
}

async function remove(id) {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (res, rej) => {
        const result = await db.collection(ProductCollection).deleteOne({ _id: new ObjectId(id) })
        res(result)
    })
}

const ProductModel = { get, getById, create, update, remove }

module.exports = ProductModel