module.exports = function(RED) {
    function CollectionSubmitUrlsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = msg.payload;
            // validate that msg.payload has the required parameters correctly formatted
            if(obj.urls == null || obj.urls.length == 0) {
                return node.error("URLs cannot be empty");
            }
            if(obj.collectionId == null) {
                return node.error("Collection id must be specified");
            }

            obj.urls = obj.urls.join("\n");
            
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