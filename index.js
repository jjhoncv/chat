var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var get_ip = require('ipware')().get_ip;
var ip = "";


app.get("/", function(req, res){			
	var ip_info = get_ip(req);
	res.sendFile(__dirname + '/index.html');	
});

app.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})
	


io.on("connection", function(socket){
		
	console.log("a user connected");
	socket.on("disconnect", function(){
		console.log("user disconnect")
	})

	socket.on("chat message", function(msg){		
		//console.log("IP:",ip_info.clientIp);
		io.emit("chat message", "message: " + msg);
	});
})



http.listen(3000, function(){
	console.log("listening on *:3000");
})
