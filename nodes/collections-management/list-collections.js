module.exports = function(RED) {
    function ListCollectionsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = {};
            if(config.projectId == null) {
                return node.error("You must specify the project id");
            }
            obj.projectId = config.projectId;
            
            this.sintelixConfig.post(`${credentials.host}/services/collections/list`, null, obj).then(function(response) {
                msg.payload = JSON.parse(response.body);
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }
    RED.nodes.registerType('list-collections', ListCollectionsNode);
}