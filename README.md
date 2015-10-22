# Nagios/Icinga WAMPv1 websocket check

This is a simple Nagios/Icinga websocket check which can be called from whatever place you like. 

Make sure to have the following installed:

* Node JS
* ws module
* debug module
* when module

Simply clone this repository to your preferred installation. The command syntax is as follows:

```
node check_websocket.js host port url [v]
```

The last v enables verbose mode for debugging output and can be omitted. A typical call would be:

```
nodejs check_websocket.js localhost 8080 monitor
```

Make sure to fill in the host correctly!

The WAMP script calls the `test` topic, and expects the JSON array `{result: 200}` for a green response.
