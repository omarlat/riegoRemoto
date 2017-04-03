var  scheduleModel = require('./models/schedules.js');
//creamos el objet que almacenara el interval y exportaremos
var interval = {};
var irrigateInterval;

//obtenemos todos los usuarios
interval.start = function()
{
	irrigateInterval = setInterval(function() {
		scheduleModel.getOpenings(function(error, rows){
				for (var i in rows) {
			 		console.log('VALVE TO OPEN: ', rows[i].NAME);
	 			}
		});
}, 5000);
}

//obtenemos un usuario por su id
interval.stop = function()
{
  clearInterval(irrigateInterval);
}

//exportamos el objeto para tenerlo disponible
module.exports = interval;
