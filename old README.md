# Nodejs cortex code 
This guide explain how to use Emotiv cortex api and explain node js example code.

## Installation
* [Install Nodejs](https://nodejs.org/en/)

* [Install EmotivApps](https://emotiv.com)

* Install packages with npm ```npm install```

### Running steps

* Start CortexUI
* Login on CortexUI with emotivid and password manually
* Connect headset with pc or mac
* Wear headset and make sure have a good contact quality, contact quality could be viewed visually on CortexUI
* Run example first time to request access ```node server.js```
* Approve access on CortexUI manually (Action of approve need to do only onece)
* Rerun example to sub data or training