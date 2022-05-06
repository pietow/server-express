/** @format */

const app = require('../app')

const port = process.env.PORT || 3033

/* console.log(app.get('env')) */
const server = app.listen(port, () => {
    if (app.get('env') === 'development')
        console.log(
            `Express started on http://localhost:${port}` +
                '; press Ctrl-C to terminate.',
        )
})

const { Server } = require('socket.io')
const io = new Server(server)




io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(`message${msg}`)
        socket.emit('chat message', msg)
    })
})
