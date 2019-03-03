// Importing packages
var fs      = require('fs');
var util    = require('util');
    exec    = require('child_process').exec;

// Set the Omega LED trigger to the specified mode
function setLed (triggerPath, triggerMode) {
    fs.open(triggerPath, 'w', (err, fd) => {
        fs.write(fd, triggerMode, () =>{
            fs.close(fd);
        });
    });
}

var child = exec('uci get system.@led[0].sysfs',
      function (error, stdout, stderr) {
            // set the Omega LED to blink
            var triggerPath = '/sys/class/leds/' + stdout.replace('\n','') + '/trigger'
            setLed(triggerPath, 'timer');

            // Print a greeting based on the time of day
            currentTime = new Date(); // get the current time
            if (currentTime.getHours() < 12) {
                    console.log('Good morning.');
            }
            else if (currentTime.getHours() < 18  && currentTime.getHours() >= 12) {
                    console.log('Good afternoon.');
            }
            else {
                    console.log('Good evening.');
            }

            // set the Omega LED to solid after 5 seconds
            setTimeout(() => {
                setLed(triggerPath, 'default-on');
            }, 5000);
        }
    );
