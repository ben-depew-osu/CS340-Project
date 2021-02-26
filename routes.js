module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getLaptops(res, mysql, context, complete){
        mysql.pool.query("SELECT laptopID as id, laptopName as name FROM laptops", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.laptops = results;
            complete();
        })
    }

    function getCPUs(res, mysql, context, complete){
        mysql.pool.query("SELECT cpuID as id, cpuName as name FROM CPUs", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.CPUs = results;
            complete();
        });
    }

    function getGraphics(res, mysql, context, complete){
        mysql.pool.query("SELECT graphicsID as id, graphicsName as name FROM graphics", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.graphics = results;
            complete();
        });
    }

    function getManufacturers(res, mysql, context, complete){
        mysql.pool.query("SELECT manufacturerID as id, manufacturerName as name FROM manufacturers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.manufacturers  = results;
            complete();
        });
    }

    function getLaptopCPUs(res, mysql, context, complete){
        mysql.pool.query("SELECT laptopName as laptop, cpuName as CPU FROM (laptopCPUs INNER JOIN laptops on laptopID = laptopID INNER JOIN CPUs on cpuID = cpuID)", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.laptopCPUs  = results;
            complete();
        });
    }

    function getLaptopGraphics(res, mysql, context, complete){
        mysql.pool.query("SELECT laptopName as laptop, graphicsName as graphics FROM (laptopGraphics INNER JOIN laptops on laptopID = laptopID INNER JOIN graphics on graphicsID = graphicsID)", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.laptopGraphics  = results;
            complete();
        });
    }


    /*Get laptop by GPU -- TO BE IMPLEMENTED
    function getLaptopByGPU(req, res, mysql, context, complete){
      var query = "WHERE laptop.gpu = ?";
      console.log(req.params)
      var inserts = [req.params.gpu]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }*/


    /*Display manufacturers. Requires web based javascript to delete users with AJAX */
    router.get('/list', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["listEntities.js"];
        var mysql = req.app.get('mysql');
        getManufacturers(req, res, mysql, context, complete);
        function complete(){
            res.render('list', context);
        }
    });

    return router;
}();