---
layout: post
title: Land Registry Sonifier device
category: Scrap
author: Cliff Hammett
relatedproject: lddatasniffer

headerimg: disp_sc_lrs.png
headeralt: A Raspberry Pi circuit strapped to a USB battery, with a breadboard and wires above it.
thumbimg: thumb_sc_lrs.png
thumbalt: A Raspberry Pi circuit strapped to a USB battery, with a breadboard and wires above it.

---

This is my first attempt at producing a device that could be used to sonify housing data in the context of a bat walk. I’ve constructed a small contraption that sonifies data from the Land Registry – specifically publicly released ‘Price Paid’ data on property transactions. I’ve moved this into an SQLite database and added to it Lon/Lat data downloaded from google’s address to location API. 
The hardware set up is simple – consisting of a USB GPS device, USB soundcard, an accelerometer/compass and a battery pack.

The perl program I’ve written first accesses nearby properties based on the GPS location, then calculates whatever lies within directional cone based on the direction the device is pointing. Then it does nothing more complicated for the moment than providing a voice output of the data via espeak e.g: “141 Upper Lewes Road sold in 2005 for £191,000”

### Why have I made this?

This isn't anything like what I'd want this device to be. But it provides a really basic 'proof of concept' to work out what I need to consider when making a device, and indeed when looking for datasets and systems to plug into this kind of framework. It should allow me to move quicker from the discovery of a system of interest to making a device. It does however need to be only one of a palette of spatialisation strategies that I can develop as *Nightsniffing* progresses. In itself it is full of problems. Creating a device that sonifies housing sales ‘reveals’ the operations of exchange value in the city, but might only serve to reinscribe or normalise them. But exploring this might help me find my way to more interesting and critical approaches.

### Trying it out

I’ve tried out the device on my own in two locations – my local neighbourhood in Brighton, and Lower Clapton in London. I’m a bad judge of how it operates experientially: due to my status as a smartphone refusenik I’m not used to receiving data feeds to my locale at all. So, though I found the experience very strange, perhaps others would respond differently – though a key element was the amount of information that is forced on you vocally, whereas most smartphones work visually and voluntarily barring notifications. I found myself examining the different houses as I went pass, trying to think into the frameworks that assign each monetary value. In Clapton, I attempted to listen to the device and the output of a bat detector similtaneously, which was certainly sonic overload!

### Thoughts

The GPS data is patchy at best – I might need a better receiver, or I might need to write an algorithm to compensate for its jumpiness. The present device vocalises data – actually reading addresses to you -- so it was very easy nonetheless to correlate what I saw to what I was heard. I want to move to non-verbal sonifications, but that would leave copious room for doubt – is the property I am hearing is the property I am seeing? Do I mitigate such doubts or is there a way to utilise them to ask questions about the data? I need to be mindful of how much a user of such a device will be about to think through – an unreliable device might shift the focus from the systems I want to critique onto the operations of the device itself.

GPS itself (and the google APIs used to correllate it to properties) might be a system I want to critique as well as utilise as a practical tool. However, this will have to wait until I have uncovered how it is entangled with other systems in London. It feels too multifarious to treat in its own right. Making and testing this device, it feels to me that software that deals only with data that is ‘here’, in the user’s present location, is almost arbitrary. The data has a false presence, as it were. It would be technically easy for one to explore property in Elephant and Castle by walking around a field in Sussex (or indeed anywhere) -- but it would become then quite a different work. 

A dilemma with this sort of device is whether to continue using 'maker' DIY electronics (e.g. Raspberry Pi and other similar devices) or to move to a smartphone platform such as Android. The advantage of using Android is that smartphones integrate the core technologies needed (GPS module, compass, computer, and battery) into a single reliable package, as well as potentially allowing distribution onto walkers own device. The Raspberry Pi set up, on the other hand, affords a greater degree of modularity. (This can also be obtained with an Android device using an IOIO board, but at the price of losing its compactness). More than this, each of these technologies carry particular values and assumptions that will shape the meanings they can create. This alone inclines me to stick with the Raspberry Pi for now.

### Future development

I’ve sketched a framework for creating sonifications of the data, all relying on Chuck scripts (Chuck is a music programming language, and is somewhat ‘lighter’ than the more fully featured Supercollider). The rough approaches are presently as follows:
* A ‘basic’ sonification that sonifies the sales within the locative cone, using timing, panning and volume to indicate position. Multiple sales of the property would need to be condensed to a single sonic ‘object’, using pitch and rhythm.
* Some combination of voice, and pitch/gain variation. The voice could either read addresses or sale prices, with other information conveyed through changes to the voice. This will reduce the information overload while maintaining some specifity, .
* Using a microphone and allowing for the exploration of the dataset through ones own echolocation i.e. making sounds that are echoed by the device according to the nature of the data. (This would take the project in a different direction – in particular I feel I would need to involve/consult with visually impaired people who use echolocation in their daily lives)

I hope to move this in the direction of a more substantial engagement with the technical approaches of bat detectors. One approach would be to work in some analogous interface components to a heterodyne detector that might for instance let you ‘tune in’ to certain property values, types or dates. This would help substantially with the non-vocal sonifications as it would give a method to discern meaning from the data.


