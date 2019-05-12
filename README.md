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
[{"id":"89351411.eb3f98","type":"tab","label":"Sintelix Example","disabled":false,"info":""},{"id":"ef86f228.f9207","type":"combine-list","z":"89351411.eb3f98","name":"Collect urls","topic":"","payload":"array","falsy":"include","columns":[],"sort":"","order":"asc","defer":250,"timeout":0,"distinction":"topic","x":250,"y":140,"wires":[["795523ec.b23ccc"]]},{"id":"795523ec.b23ccc","type":"change","z":"89351411.eb3f98","name":"Only send urls","rules":[{"t":"set","p":"payload","pt":"msg","to":"topics","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":360,"y":220,"wires":[["3ffc4953.1fab76"]]},{"id":"3ffc4953.1fab76","type":"collection-submit-urls","z":"89351411.eb3f98","sintelix":"","name":"Submit URLs to collection","collectionId":"0","ingestionConfig":"","fullXml":false,"reportNetworks":false,"x":490,"y":300,"wires":[["87747365.9f904"]]},{"id":"a1ba29a.5bbb4d8","type":"feedparse","z":"89351411.eb3f98","name":"BBC News Tech RSS Feed","url":"http://feeds.bbci.co.uk/news/technology/rss.xml","interval":15,"x":130,"y":60,"wires":[["ef86f228.f9207"]]},{"id":"87747365.9f904","type":"debug","z":"89351411.eb3f98","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":630,"y":400,"wires":[]}]
```

Make sure to configure the Sintelix node by adding your login credentials and server details and then also setting the other details such as the collection ID. Then, deploy the flow. Open up Sintelix and navigate to the collection that you specified earlier and you should see documents start appearing from the processed XML URLs!

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
- Get Node Types
- Get Nodes by Type
- Get Node Field Values

A full reference for each node will be written at a later date, as well as the help text visible in the Node-RED info panel.
