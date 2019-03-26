module.exports = function(RED) {
    function CreateProjectNode(config) {
        RED.nodes.createNode(this, node);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // validate that msg.payload has the required parameters correctly formatted
        });
    }

    RED.nodes.registerType('create-project', CreateProjectNode);
}