module.exports = function(RED) {
    function SystemHealthNode(config) {
        RED.nodes.createNode(this, config);

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // get the system health here
            msg.payload = "Get system health";
            this.send(msg);
        });
    }
    RED.nodes.registerType("sintelix-system-health", SystemHealthNode);
}