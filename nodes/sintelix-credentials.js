module.exports = function(RED) {
    function CredentialsNode(n) {
        RED.nodes.createNode(this, n);
    }
    RED.nodes.registerType("sintelix-credentials", CredentialsNode, {
        credentials: {
            username: {type: "text"},
            password: {type: "password"},
            host: {type: "text"}
        }
    });
}