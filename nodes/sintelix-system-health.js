module.exports = function(RED) {
    function SintelixSystemHealthNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;


        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            // get the system health here
            this.sintelixConfig.post(`${credentials.host}/system/health`).then(function(response) {
                var mem = {};
                var task = {};
                mem.payload = 100 - parseInt(JSON.parse(response.body).memFree.slice(0, -2));
                task.payload = JSON.parse(response.body).taskCount;
                node.send([mem, task]);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }
    RED.nodes.registerType("sintelix-system-health", SintelixSystemHealthNode);
}