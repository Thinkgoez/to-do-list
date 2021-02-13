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
// console.log(process.env)


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use('/auth', authRoutes)
app.use('/projects', projectsRoutes)
app.use('/tasks', tasksRoutes)

// Chatroom

// let numUsers = 0;

// io.on('connection', (socket) => {
//     console.log('connected');
//     let addedUser = false;
//     // when the client emits 'new message', this listens and executes

//     // when the client emits 'add user', this listens and executes
//     socket.on('add note', (username) => {
//         if (addedUser) return;

//         // we store the username in the socket session for this client
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.broadcast.emit('user joined', {
//             username: socket.username,
//             numUsers: numUsers
//         });
//     });

//     socket.on('new project', (data) => {
//         if (!data.trim()) return;
//         let messageData = {
//             username: socket.username,
//             message: data
//         }
//         socket.broadcast.emit('new project', messageData)
//     })

//     socket.on('login', (data) => {
//         // we tell the client to execute 'new message'
//         if (!data.trim()) return;
//         let messageData = {
//             username: socket.username,
//             message: data
//         }
//         socket.broadcast.emit('new project', messageData)
//     })

//     socket.on('register', (data) => {
//         // we tell the client to execute 'new message'
//         if (!data.trim()) return;
//         let messageData = {
//             username: socket.username,
//             message: data
//         }
//         socket.broadcast.emit('new project', messageData)
//     });

//     // when the user disconnects.. perform this
//     socket.on('disconnect', (reason) => {
//         console.log('disconnect, reason:', reason);
//         if (addedUser) {
//             --numUsers;

//             // echo globally that this client has left
//             socket.broadcast.emit('user left', {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//     });
// });

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});