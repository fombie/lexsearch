var fs = require('fs'),
    http = require('http'),
    mysql = require('mysql'),
    url = require('url'),
    lex = require('./lexsearch_node'),
    connection = mysql.createConnection({ host : '<mysqlsrv>',  port : 3306,database: '<db>', user : '<username>',  password : '<pwd>'});
var connected=false; 
var execTime=function(msg){
      var exec=(new Date() - _timer)/1000;
      console.log(msg+": "+exec+"sec") ;
}


http.createServer(function (request, response) {
    //console.log(request);
    var  _timer=new Date();
	var errortxt="";
	
	var arr=[], output= new Object();
	var ajax = url.parse(request.url,true).query;
    if(ajax.lexjs==1){
			//search dict letter:letter, pattern:pattern, len:len, method:method
			response.writeHeader(200);
			var letter= (ajax.letter) ? ajax.letter :  ""
			 , pattern=(ajax.pattern) ? ajax.pattern: ""
			 , len=(ajax.len) ? ajax.len : 0
			 , method=(ajax.method) ? ajax.method : "src";
			var checkInputs=lex.init(letter, pattern, method, len);
		   //console.log(checkInputs);
		   if(checkInputs!=true){
			   errortxt=checkInputs;
		   }
       if(!errortxt){
		   if(!connected){
			   connection.connect(function(err){
					if(err != null) {
						errortxt='Error connecting to mysql:' + JSON.stringify(err)
					}else{
					   connected=true;
					}
				});
			}
		}
		if(!errortxt){
			connection.query(lex.query(), function(err, rows){
				 if(err != null) {
				         errortxt="Query error:"+JSON.stringify(err);
					} else {
					  for(x in rows){
					    arr.push(rows[x]['word']);
					  }
					  console.log('words found: '+arr.length);
					  output.rc=1;
					  output.explain=lex.explain();
					  if(arr.length > 0){
					    output.result=arr;
					  }else{
					    output.result="words   not   found";
					  }
					  response.end(JSON.stringify(output));	
					  console.log("execution: "+((new Date() - _timer))+" ms") ;
				}
      	   });
		}
		if(errortxt){
			  output.rc=0;output.result=errortxt;output.errmsg=errortxt;
			  response.end(JSON.stringify(output));
			  console.log("execution: "+((new Date() - _timer))+" ms") ;
		}
		
	}else{
	 //all other requests
	  if(request.url=='/favicon.ico') return;
	  var page=process.cwd()+'/public/index.html';
	  fs.exists(page, function(exists) {	   
	   fs.readFile(page,"binary",function (err, data){
        if(err){
		 response.writeHead(500, {"Content-Type": "text/plain"});
         response.write(err + "\n");
         response.end();
         return;
		}
		response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
		console.log("execution: "+((new Date() - _timer))+" ms") ;	
        });
	});	
	}

   	
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');

