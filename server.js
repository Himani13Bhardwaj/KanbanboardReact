var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var stories = JSON.parse(fs.readFileSync('./data/story.json'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.get('/getStory', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(stories));
});

app.get('/getStory/:id', function(req, res) {
	let id = req.params.id;
	id = parseInt(id.toString().split(':')[1]);
	let searchItem ={};
	stories.map((item,i) => {
		if(item.uniqueId === id){
			searchItem = stories[i];
		}
	});
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(searchItem));
});

app.post('/addStory', function(req, res) {
	let key, obj={};
	key = req.body.body["uniqueId"];
	if( key == undefined || key == null || key == 0){
		key = stories.map(function(item){return item.uniqueId});
		uniqueID = key.sort()[key.length-1];
		uniqueID++;
		req.body.body["uniqueId"] = uniqueID;
	}else{
		stories.map((item,i) => {
			if(item.uniqueId === key){
				stories.splice(i,1);
			}
		});
	}
  stories.push(req.body.body);
  res.send(JSON.stringify(stories));
});

app.delete('/deleteStory/:id', function(req, res) {
	let id = req.params.id;
	id = parseInt(id.toString().split(':')[1]);
	var index = null;
	stories.map((item,i) => {
		if(item.uniqueId === id){
			index = i;
			stories.splice(index,1);
		}
	});
	res.setHeader('id', index);
	res.send(JSON.stringify(stories));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');