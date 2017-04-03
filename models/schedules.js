//llamamos al paquete mysql que hemos instalado
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/config.properties');

var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection({
  host     : properties.get('bbdd.host'),
  user     : properties.get('bbdd.user'),
  password : process.env.BBDD_PASS,
  database : properties.get('bbdd.database')
});

//creamos un objeto para ir almacenando todo lo que necesitemos
var scheduleModel = {};

//obtenemos todos los usuarios
scheduleModel.getSchedules = function(callback)
{
	if (connection)
	{
		connection.query('SELECT * FROM SCHEDULES ORDER BY ID', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}

//obtenemos todos los usuarios
scheduleModel.getOpenings = function(callback)
{
	if (connection)
	{
		connection.query('select VALVES.*'+
                     ' from SCHEDULE JOIN VALVES ON VALVES.ID = SCHEDULE.IDVALVE'+
                     ' where ACTIVE is TRUE'+
                     ' and sysdate() > NEXTDATE'+
                     ' AND sysdate() < ADDTIME(NEXTDATE, DURATION)'+
                     ' AND VALVES.OPEN =  "C"', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}

//obtenemos un usuario por su id
scheduleModel.getValveSchedule = function(id,callback)
{
	if (connection)
	{
		var sql = 'SELECT * FROM SCHEDULES WHERE VALVEID = ' + connection.escape(id);
		connection.query(sql, function(error, row)
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = scheduleModel;
