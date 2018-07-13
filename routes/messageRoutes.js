const mongoose = require('mongoose');
const Message = mongoose.model('messages');

module.exports = (app, http) => {
  const io = require('socket.io')(http);
  
  app.get('/api/messages/:businessId', async (req, res) => {
    // const messages = await Message.find({ businessId: req.params.businessId }).limit(10);
    const messages = await Message.find({ businessId: req.params.businessId }).sort({ field: 'ascending', _id: -1 }).limit(10);
    if (messages) {
			res.send(messages.reverse());
		} else {
			res.send(false);
		}
  });

  app.post('/api/message', (req, res) => {
    io.sockets.in(req.body.room).emit('message', req.body.message);
    const message = new Message({ businessId: req.body.room, message: req.body.message });
    message.save();
    res.send(message);
  });

  io.sockets.on('connect', (socket) => {  
    socket.on('join', (room) => { 
      console.log(`JOINED: ${room}`);   
      socket.join(room);
    });

    socket.on('postMessage', (data) => {
      console.log(data);
      const message = new Message({ businessId: data.room, message: data.message });
      socket.broadcast.to(data.room).emit('message', message);
      message.save();
    });
  });
};
