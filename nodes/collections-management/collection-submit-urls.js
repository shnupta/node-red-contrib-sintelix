module.exports = function(RED) {
    function CollectionSubmitUrlsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // validate that msg.payload has the required parameters correctly formatted
            if(msg.payload == null || msg.payload.length == 0) {
                return node.error("URLs cannot be empty");
            }
            if(config.collectionId == null) {
                return node.error("Collection ID cannot be empty");
            }
            
            var obj = {};
            obj.urls = msg.payload.join("\n");
            obj.collectionId = config.collectionId;
            obj.reportNetworks = config.reportNetworks;
            obj.fullXml = config.fullXml;
            obj.ingestionConfig = config.ingestionConfig;
            
            this.sintelixConfig.post(`${credentials.host}/services/collections/submitURLs`, JSON.stringify(obj)).then(function(response) {
                msg.payload = response.body;
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('collection-submit-urls', CollectionSubmitUrlsNode);
}