/** @format */

const app = require('../app')

const port = process.env.PORT || 3033

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.',
    )
})

