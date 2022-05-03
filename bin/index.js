/** @format */

const app = require('../app')

const port = process.env.PORT || 3033

/* console.log(app.get('env')) */
app.listen(port, () => {
    if (app.get('env') === 'development')
        console.log(
            `Express started on http://localhost:${port}` +
                '; press Ctrl-C to terminate.',
        )
})
