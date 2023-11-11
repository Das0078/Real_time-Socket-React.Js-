// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const socketIO = require('socket.io');
const {mongoose,Types,Schema} = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
// mongoose.connect("mongodb+srv://admin:admin@test0.yspgn.mongodb.net/testcase?retryWrites=true&w=majority")
//   .then(() => {
//     console.log("db connected");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.use(cors());
app.use(express.json());

// Create Express app and HTTP server

// Initialize Socket.io
const io = socketIO(server);
// const data=new Schema({
//     value:{
//         type:Number
//     }
// },{collection:"datas"})
// MongoDB model and schema


// Socket.io event handling
io.on('connection', (socket) => {
  console.log('A client connected');

  // Send existing data to the client
  // Item.find().then((items) => {
  //   io.emit('initialData', items);
  // });

  // Listen for changes in MongoDB


  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});



// Start the server
server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
// const Item = mongoose.model('datas', data);
// const changeStream = Item.watch();
// changeStream.on('change', (change) => {
  
//   console.log("change",change);
//   io.emit('dataChange', change.fullDocument);

// });

const testSchema = new mongoose.Schema({
    value:Number
},{
    collection: 'Data'
});
const model = mongoose.model('Data',testSchema);
mongoose.connect("mongodb+srv://dasdassd007:Das123@cluster0.h3dhkga.mongodb.net/Demo?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to the Database successfully');
})
const eventEmitter = model.watch();
eventEmitter.on('change', async (change) => {
    const doc=await model.find({})
    io.emit("update", doc);
    console.log("change",change);
    // documentKey: { _id: new ObjectId('654e21248f3ce17788ae307f') }
});