const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()
const cors = require('cors')

server.use(cors())
server.use(router)
server.use(middlewares)

const port = 3000

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})