module.exports = function(RED) {
    function GetNodeTypesNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = {};
            // validate that msg.payload has the required parameters correctly formatted
            if(config.networkId == null) {
                return node.error("Network ID cannot be empty");
            }
            if(config.level == null) {
                return node.error("Level cannot be empty");
            }
            obj.networkId = config.networkId;
            obj.level = config.level;
            this.sintelixConfig.post(`${credentials.host}/services/networks/getNodeTypes`, JSON.stringify(obj)).then(function(response) {
                msg.payload = JSON.parse(response.body);
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('get-node-types', GetNodeTypesNode);
}