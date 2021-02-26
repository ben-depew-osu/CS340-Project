module.exports = function(){
	var express = require('express');
    var router = express.Router();

    /*
    function getPerson(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, homeworld, age FROM bsg_people WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }*/

    /* */
    /*
    router.get('/:name', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedlaptopname.js", "updatelaptop.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-laptop', context);
            }

        }
    });*/

    /* INSERT INTO laptop (laptopName, manufacturerID, ram, storage, pdfLINK)
	VALUES (:laptopName, :laptopManu, :laptopRAM, :laptopStorage, :laptopPDF) */

	/* Add (insert) laptop */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');

        // have to add manufacturer first to manu entity b4 adding laptop
	  	// sql for add/insert manufacturer
	  	var queryManu = "INSERT INTO manufacturer (manufacturerName) "+
			"VALUES (?)";

		// sql for get id from new manufacturer
		var queryGetManu = "SELECT manufacturerID FROM manufacturers WHERE manufacturerName = ?";

		var nameManu = [req.body.laptopManu];
		var manuID = "";

		// insert manu
		queryManu = mysql.pool.query(queryManu,nameManu,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        });

        // get manu ID
        queryGetManu = mysql.pool.query(queryGetManu,nameManu,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            manuID = request[0];
        });

		// now insert laptop with new manu id (right now not checking for duplicate manus)
        var queryLaptop = "INSERT INTO laptop (laptopName, manufacturerID, ram, storage, pdfLINK)" +
	  		"VALUES (?,?,?,?,?)";
        var insert = [req.body.laptopName, manuID, req.body.laptopRAM, 
        	req.body.laptopStorage, req.body.laptopPDF];
        queryLaptop = mysql.pool.query(queryLaptop,insert,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/laptops');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */
    /*
    router.put('/:name', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE laptops SET laptopName=?, manufacturerID=?, ram=?, storage=?, pdfLINK=? WHERE name=?";

        var inserts = [req.body.laptopName, req.body.lname, req.body.homeworld, 
        	req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });*/

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */
    /*
    router.delete('/:name', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM laptops WHERE name = ?";
        var inserts = [req.params.laptopName];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })*/

    return router;
}();