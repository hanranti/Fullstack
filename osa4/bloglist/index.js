const config = require('./utils/config')
const http = require('http')
const app = require('./app')
process.title = 'bloglist'
const PORT = config.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})