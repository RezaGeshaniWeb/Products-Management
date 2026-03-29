const http = require('http')
const ProductsControllers = require('./controllers/product.controllers')
const PORT = 3000
const BASE_URL = '/api/products'
const DYNAMIC_URL = /\/api\/products\/.+/

const server = http.createServer((req, res) => {
    const { url, method } = req

    if (url == BASE_URL && method == 'GET') {
        ProductsControllers.get(req, res)
    } else if (url.match(DYNAMIC_URL) && method == 'GET') {
        ProductsControllers.getById(req, res)
    } else if (url == BASE_URL && method == 'POST') {
        ProductsControllers.create(req, res)
    } else if (url.match(DYNAMIC_URL) && method == 'PUT') {
        ProductsControllers.update(req, res)
    } else if (url.match(DYNAMIC_URL) && method == 'DELETE') {
        ProductsControllers.remove(req, res)
    } else {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ message: 'route not found' }))
        res.end()
    }
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))