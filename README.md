# node-red-contrib-sintelix

This is a node-red package that enables you to connect and interact with the Sintelix API.

__Please note, this package is not an official product of Sintelix Pty Ltd.__

The aim of this package is to allow easy creation of flows that incorporate the Sintelix API. This could be things such as ingesting RSS feeds or live Tweets, or maybe something else like displaying a dashboard of Sintelix network and document info - the choice is yours!

## Contents
- [Example](#example)
- [Nodes](#nodes)


## Example
First make sure you have installed the `node-red-contrib-sintelix` package to your Node-RED instance.

You will need an instance of Sintelix available to you as well as your login credentials.

Then import the flow below:
```
[{"id":"89351411.eb3f98","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"e3f53103.89cd6","type":"system-health","z":"89351411.eb3f98","sintelix":"","name":"Get system health","x":250,"y":140,"wires":[["5e87732b.290f1c"]]},{"id":"42bb2251.20f8bc","type":"inject","z":"89351411.eb3f98","name":"Inject","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":140,"wires":[["e3f53103.89cd6"]]},{"id":"5e87732b.290f1c","type":"function","z":"89351411.eb3f98","name":"Get memFree","func":"msg.payload = msg.payload.memFree;\nreturn msg;","outputs":1,"noerr":0,"x":440,"y":140,"wires":[["78a35705.27a8b8"]]},{"id":"78a35705.27a8b8","type":"debug","z":"89351411.eb3f98","name":"Output!","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":600,"y":140,"wires":[]}]
```

Deploy the flow and press the inject button. You should see the percentage of memory free on your server!

## Nodes
Here are all the nodes that are currently implemented:

- Credentials
- System Health
- List Projects
- Create Project
- Get Project
- Submit URLs to Collection
- List Collections
- Create Collection
- Get Collection
- Search Nodes
- Get Nodes by ID

A full reference will be written at a later date for each node.
