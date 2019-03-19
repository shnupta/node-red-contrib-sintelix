module.exports = function(RED) {
    function SintelixSystemHealthNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Grab the config node in order to make the request
        // Grab the credentials of this node to pass the host in the request url
        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            this.sintelixConfig.post(`${credentials.host}/system/health`).then(function(response) {
                msg.payload = JSON.parse(response.body); // A JSON object of server info
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }
    RED.nodes.registerType("system-health", SintelixSystemHealthNode);
}