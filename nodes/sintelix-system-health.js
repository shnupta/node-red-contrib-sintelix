module.exports = function(RED) {
    function SintelixSystemHealthNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;


        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // get the system health here
            this.sintelixConfig.post(`${credentials.host}/system/health`).then(function(response) {
                msg.payload = response.body;
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }
    RED.nodes.registerType("sintelix-system-health", SintelixSystemHealthNode);
}