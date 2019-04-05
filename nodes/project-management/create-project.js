module.exports = function(RED) {
    function CreateProjectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.sintelixConfig = RED.nodes.getNode(config.sintelix);
        var credentials = RED.nodes.getCredentials(config.sintelix);

        this.on('input', function(msg) {
            var obj = msg.payload;
            // validate that msg.payload has the required parameters correctly formatted
            if(obj.name == null || obj.name == "") {
                return node.error("Name cannot be empty");
            }
            // They want the project to have a security
            if(obj.security != null) {
                if(obj.security.mode == null || obj.security.mode == "") {
                    return node.error("If you want to specify the security of the project, mode must be passed");
                }
                if(obj.security.mode != "SECURED" && obj.security.mode != "UNSECURED") {
                    return node.error("Security mode must be either 'SECURED' or 'UNSECURED'");
                }
                if(obj.security.mode == "UNSECURED" && obj.security.properties != null) {
                    return node.error("An unsecured project cannot have security properties.");
                }
            }
            this.sintelixConfig.post(`${credentials.host}/services/projects/create`, null, obj).then(function(response) {
                msg.payload = parseInt(response.body);
                node.send(msg);
            }).catch(function(err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType('create-project', CreateProjectNode);
}