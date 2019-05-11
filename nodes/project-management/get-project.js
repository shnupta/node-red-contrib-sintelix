module.exports = function(RED) {
    function GetProjectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = msg.payload;
            // validate that msg.payload has the required parameters correctly formatted
            if(obj.projectId == null) {
                return node.error("ProjectId cannot be empty");
            }
            this.sintelixConfig.post(`${credentials.host}/services/projects/get`, null, obj).then(function(response) {
                msg.payload = JSON.parse(response.body);
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('get-project', GetProjectNode);
}