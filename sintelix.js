module.exports = function(RED) {
    function TestNode(config) {
        RED.nodes.createNode(this,config);
    }

    RED.nodes.registerType("test", TestNode);
}