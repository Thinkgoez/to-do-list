const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const app = express();
// const path = require('path');
const bodyParser = require('body-parser')
const server = require('http').createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000",
    }
}
const io = require('socket.io')(server, options);
const authRoutes = require('./routes/auth')
const projectsRoutes = require('./routes/projects')
const tasksRoutes = require('./routes/tasks')
const keys = require('./config/keys')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(keys.mongoDB_URI)
    .then(() => console.log('mogoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use('/auth', authRoutes)
app.use('/projects', projectsRoutes)
app.use('/tasks', tasksRoutes)

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});