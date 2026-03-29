const ProductModel = require("../model/product.model")

async function get(req, res) {
    try {
        const products = await ProductModel.get()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.write(JSON.stringify(products))
        res.end()
    } catch (error) {
        console.log(error)
    }
}

async function getById(req, res) {
    try {
        const [, , , id] = req.url.split('/')
        const product = await ProductModel.getById(id)
        if (!product) {
            res.writeHead(404, { 'content-type': 'application/json' })
            res.write(JSON.stringify({ message: 'not found any product' }))
            res.end()
        } else {
            res.writeHead(200, { 'content-type': 'application/json' })
            res.write(JSON.stringify(product))
            res.end()
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ message: 'Server Error' }))
        res.end()
    }
}

async function create(req, res) {
    try {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const product = { ...JSON.parse(body), createdAt: new Date() }
            const result = await ProductModel.create(product)
            res.writeHead(201, { 'content-type': 'application/json' })
            res.write(JSON.stringify(result))
            res.end()
        })
    } catch (error) {
        console.log(error)
    }
}

async function update(req, res) {
    try {
        let body = ''
        const id = req.url.split('/')[3]
        req.on('data', chunk => body += chunk.toString())
        req.on('end', async () => {
            const parsedBody = { ...JSON.parse(body) }
            const product = await ProductModel.getById(id)
            if (!product) {
                res.writeHead(404, { 'content-type': 'application/json' })
                res.write({ message: 'not found product !' })
                res.end()
            } else {
                const result = await ProductModel.update(id, parsedBody)
                res.writeHead(200, { 'content-type': 'application/json' })
                res.write(JSON.stringify(result))
                res.end()
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function remove(req, res) {
    try {
        const id = req.url.split('/')[3]
        const product = await ProductModel.getById(id)
        if (!product) {
            res.writeHead(404, { 'content-type': 'application/json' })
            res.write({ message: 'not found product !' })
            res.end()
        } else {
            const result = await ProductModel.remove(id)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.write(JSON.stringify(result))
            res.end()
        }
    } catch (error) {
        console.log(error)
    }
}

const ProductControllers = { get, getById, create, update, remove }

module.exports = ProductControllers