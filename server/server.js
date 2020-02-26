const express = require('./config/express.js')
const mapsRouter = require('./routes/mapsRouter')
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()
app.listen(port, () => console.log(`Server now running on port ${port}!`));

app.use('/maps', mapsRouter)
