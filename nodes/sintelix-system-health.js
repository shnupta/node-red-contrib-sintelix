module.exports = function(RED) {
    function SintelixSystemHealthNode(config) {
        RED.nodes.createNode(this, config);

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // get the system health here
            msg.payload = this.sintelixConfig.jsession_cookie;
            this.send(msg);
        });
    }
    RED.nodes.registerType("sintelix-system-health", SintelixSystemHealthNode);
}