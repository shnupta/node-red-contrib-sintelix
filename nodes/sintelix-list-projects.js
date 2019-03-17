module.exports = function(RED) {
    function SintelixListProjectsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            this.sintelixConfig.post(`${credentials.host}/services/projects/list`).then(function(response) {
                msg.payload = response.body;
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        })
    }
    RED.nodes.registerType('sintelix-list-projects', SintelixListProjectsNode);
}