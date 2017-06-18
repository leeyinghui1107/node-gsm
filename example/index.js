const co  = require('co');
const gsm = require('..');

const modem = new gsm.Modem(
  '/dev/tty.usbserial', {
    retry: 1000
  }
);

modem.on('+CRING', console.log.bind('Ringing'))
modem.on('+CLIP', (number) => {
  console.log('Incoming Call', number);
})
modem.on('+CMTI', (msg) => {
  console.log('Incoming Message', msg);
});
modem.on('message', (message, m) => {
  // console.log(message);
});

modem.open(() => co(function*(){

  yield modem.reset()
  yield modem.sms_mode(1)
  yield modem.sms_send(
    '+8618510100102',
    'This is a test from gsm2'
  );

}));

