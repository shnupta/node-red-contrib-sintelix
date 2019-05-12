module.exports = function(RED) {
    function GetNodeFieldValuesNode(config) {
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
            obj.networkId = config.networkId;

            if(msg.payload == null) {
                return node.error("msg.payload cannot be empty");
            }
            if(msg.payload.ids == null || msg.payload.ids.length == 0) {
                return node.error("ids cannot be empty");
            }
            if(msg.payload.fields == null || msg.payload.fields.length == 0) {
                return node.error("fields cannot be empty");
            }
            obj.ids = msg.payload.ids;
            obj.fields = msg.payload.fields;
            this.sintelixConfig.post(`${credentials.host}/services/networks/getNodeFieldValues`, JSON.stringify(obj)).then(function(response) {
                msg.payload = JSON.parse(response.body);
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('get-node-field-values', GetNodeFieldValuesNode);
}