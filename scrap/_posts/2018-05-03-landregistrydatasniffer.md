---
layout: post
title: Land Registry Datasniffer - hardware and software
category: Scrap
author: Cliff Hammett

relatedproject: lddatasniffer
thumbimg: thumb_sc_lrdshardwaresoftware.png
thumbalt: A fragment of a fritizing diagram, showing a raspberry pi and breadboard.

---

This documentation details the hardware and software that has been developed and tested as a basic prototyping framework for producing devices able to sonically express datasets and data systems in local space. This framework is the beginnings of a direct address to Nightsniffing's first research question, which asks how such data systems can be made sensorial in the context of a walking. It provides a platform that will enable a rapid iteration of geolocalised sonifications or sensorialisations. 

### Hardware: Data sniffer

![A fritizing diagram showing the circuit for the Land Registry Datasniff](/resources/img/scrap_lrdscircuit.png)

The data sniffer is designed as a portable device to sonify or articulate location specific data. It is constructed using components commonly used for DIY electronics projects. This avoids the commercial and solutionist connotations of, for example, a mobile phone app, instead bringing the data sniffer closer to a contraption – an unruly and illegitimate technical object that “invites public curiosity, examination and reflection” (Harwood, 2015, p. 36). The present prototype can be built using the following components:

* Raspberry Pi 2
* USB battery pack
* MicroUSB cable
* VK172 G-Mouse USB GPS/GLONASS USB GPS Receiver
* TechRise USB External Stereo Sound Adaptor (or equivalent USB soundcard)
* Breadboard
* Sparkfun MAG3110 Accelerometer/Compass breakout board (with pins soldered to outputs to allow it to be plugged into the breadboard
* MCP3008 Analogue to Digital Converter
* 2 x 10kΩ resistor
* 1 x 10kΩ potentiometer
* 8 x female to male jump wires
* Multiple male to male jump / hook up wire
* 1 x 3 state switch

The USB GPS and the USB Soundcard are each connected to the Raspberry Pi via its USB ports. The battery pack is connected to the Raspberry Pi using the micro-USB cable to its power ports. The device also presently requires headphones in order to listen to its output. All other components are connected to the Pi as shown in the Fritzing diagram (Fig. 1), which combined with the above provides sufficient information for an individual familiar with the Raspberry Pi and with DIY electronics to reconstruct the device.

I'm now planning to develop the data sniffer into a modular platform that will allow the easy connection and disconnection of sensor and sonification modules, allowing for rapid prototyping of new sensor inputs and new sonic outputs.

### Software: Nightsteps

![A diagram showing the relationship between the different modules of the Nightsteps software](/resources/img/scrap_nightsteps1.png)

The nightsteps software is the beginning of a micro-prototyping framework to facilitate the rapid creation of locative data sonification/articulations in urban environments. It modularises the main interactions between the elements that the software facilitates, creating separate software objects for the database interface, geolocation, sensor input and the synthesising of data into a sonifiable form (See Fig. 2). Most importantly, it modularises the main ‘loop’ of the program itself – that is, the set of actions that the software will repeat. This reduces the level of work needed to prototype a new data sonification/articulation and allows for the data sniffer to have multiple ‘loops’ available that can be selected using, for example, a physical switch. 

At present, two very simple loops have been written using data from the Price Paid Land Registry Database. This publicly available database contains the details of every house sale in the UK between 1997 and the present. While relevant, the dataset was primarily chosen as an easily available set of data with which to work. The data was supplemented with longitude and latitude co-ordinators for each property extracted from the Google Maps Geocode API, and integrated into a custom SQL database. The sonifications are basic and intended only as proof of functionality. In the first loop the ‘espeak’ text-to-voice synthesis program read aloud details of property sales in the listening cone of the device. In the second, a script written in the Chuck music programming language renders the sales as ‘blips’, with the tone varying according to whether the price paid for the property accords to the value selected by the user via the potentiometer.

Here is some pseudocode to describe how the software works:

```perl
Basic Loop for Sonic Expression of Price Paid Database
{
	GeoData = Telemetry Interface->Read GPS and Compass
	Places = Database Interface->Retrieve Nearby Addresses (using GeoData)
	Listening Cone = Telemetry Interface->Generate Listening Cone (using GeoData)
	Tuning Value = Port Interface->Get Potentiometer Value
	Go through each Place in Places
	{
		if Place is located inside Listening Cone
		{
			Put Place into Data For Sonification
		}
	}
	Audio Interface → Sonify Data (using Data for Sonification, Tuning Value)
}
```
