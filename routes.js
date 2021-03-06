var express = require('express'),
    gpio = require('rpi-gpio'),
    router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

router.get('/abrir', function(req, res) {
  gpio.setup(11, gpio.DIR_OUT, abrir);

  function abrir() {
    gpio.write(11, true, function(err) {
        if (err) throw err;
        console.log('Abierta 11');
    });
  }

   res.send("Abierta 11");
});

router.get('/cerrar', function(req, res) {
  gpio.setup(11, gpio.DIR_OUT, cerrar);
  function cerrar() {
    gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Cerrada 11');
    });
  }
  res.send("Cerrada 11");
});


module.exports = router
