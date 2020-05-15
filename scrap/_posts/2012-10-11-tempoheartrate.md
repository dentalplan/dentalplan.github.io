---
layout: post
title: Turn timers for heartbeat chess 
category: Scrap-archive
author: Cliff Hammett

relatedproject: errantgame
thumbimg: thumb_sc_heartchesstimer.jpg
thumbalt: Close-up of an Arduino circuit
headerimg: disp_sc_heartratechess.png
headeralt: diagram of circuit for heartbeat chess timer.

---

![Components to make a heartbeat chess time](/resources/img/scrap_heartchesscomponents.jpg)
![The heartbeat chess timer - a cheststrap and a circuit in tupaware](/resources/img/scrap_heartchesstimer.jpg)

At long last - I've mangaged to create a bespoke device for heartbeat chess. It measures the players heart beats - every 40 beats they get a go, or rather, they can take as many goes as they want for 12 beats. The exact number can of course be changed in the software running the device.

I don't have time at the mo to write up a full tutorial, but if you want to make one as I have, you'll need the following components:

* Arduino Uno
* [Grove chest strap heart sensor](http://www.seeedstudio.com/depot/Grove-Chest-Strap-Heart-Rate-Sensor-p-1115.html?cPath=73)
* [Grove base shield](http://www.seeedstudio.com/depot/Base-Shield-V13-p-1378.html?cPath=98_16) - optional but makes things more secure
* 4 LEDs (3 green/yellow, 1 red)
* 9v battery and arduino battery connector
* Piezo buzzer
* Breadboard
* Hookup wire
* 5 resistors (1 x 170ohm, 1 x 470omh, 3 x 820ohm - only needs to be roughly correct)
* A tuperware container to house it
* A drill to make holes in the tuperware.

I've uploaded circuit diagrams and the program to upload to the Arduino to the [Jokes in Systems git](https://github.com/dentalplan/jokesinsystems/tree/master/tempo).

