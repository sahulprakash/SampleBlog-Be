const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')

const PORT = process.env.PORT || 3000
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',  require('./routes/auth'))
app.use('/profile', require('./routes/index'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'))
// });

app.listen(PORT, function () {
    console.log(`listening at port ${PORT}!!!`)
    console.log(__dirname)
})