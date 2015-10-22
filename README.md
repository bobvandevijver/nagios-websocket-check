# Nagios/Icinga WAMPv1 websocket check

This is a simple Nagios/Icinga websocket check which can be called from whatever place you like. 

## Installation

Make sure to have the following installed:

* Node JS
* ws module
* debug module
* when module

Simply clone this repository to your preferred installation directory. You need to install the modules in the plugin directory. You can use the following script:

```
cd /usr/local/src
git clone https://github.com/bobvandevijver/nagios-websocket-check.git
cd nagios-websocket-plugin
apt-get install nodejs
npm install ws
npm install debug
npm install when
```

## Usage

The commandline syntax of the check is as follows:

```
node check_websocket.js host port url [v]
```

The last v enables verbose mode for debugging output and can be omitted. A typical call would be:

```
nodejs check_websocket.js localhost 8080 monitor
```

Make sure to fill in the host correctly!

The WAMP script calls the `test` topic, and expects the JSON array `{result: 200}` for a green response.
