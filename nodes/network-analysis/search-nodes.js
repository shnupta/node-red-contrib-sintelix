module.exports = function(RED) {
    function SearchNodesNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = msg.payload;
            // validate that msg.payload has the required parameters correctly formatted
            if(obj == null) {
                return node.error("Search query cannot be empty");
            }

            var queryString = obj;
            // construct the object
            obj = {};
            obj.networkId = config.networkId;
            obj.level = config.level;
            obj.start = config.start;
            obj.limit = config.limit;
            obj.count = config.count;
            obj.query = [
                {
                    "filterMethod": "filterQS",
                    "field": "label",
                    "value": queryString
                },
              ];

            this.sintelixConfig.post(`${credentials.host}/services/networks/searchNodes`, JSON.stringify(obj)).then(function(response) {
                var res = JSON.parse(response.body);
                var msg1 = {payload: {ids: res.hits, total: res.total, networkId: config.networkId}};
                node.send(msg1);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('search-nodes', SearchNodesNode);
}