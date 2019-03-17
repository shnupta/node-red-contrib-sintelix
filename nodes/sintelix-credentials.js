module.exports = function(RED) {

    var request = require('request');
    
    function SintelixCredentialsNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.jar = request.jar();

        if (this.credentials.username && this.credentials.password && 
            this.credentials.host) {
            this.post(`${this.credentials.host}/login.do`, 
            `j_username=${this.credentials.username}&j_password=${this.credentials.password}`).then(function(response) {
                if (response.status === 200) {
                    this.jsession_cookie = response.headers['set-cookie'];
                } else {
                    node.warn('failed to login');
                }
            }).catch(function(err) {
                node.error(err);
            });
        }
    }
    RED.nodes.registerType("sintelix-credentials", SintelixCredentialsNode, {
        credentials: {
            username: {type: "text"},
            password: {type: "password"},
            host: {type: "text"}
        }
    });

    SintelixCredentialsNode.prototype.post = function(uri, body) {
        var node = this;

        var options = {
            uri: uri,
            jar: this.jar,
            headers: {'content-type' : 'application/x-www-form-urlencoded'}
        };

        if (body) {
            options.body = body;
        }

        return new Promise(function(resolve, reject) {
           request.post(options, function(err, response, body) {
               if (err) {
                   reject(err);
               } else {
                   resolve({
                    status: response.statusCode,
                    headers: response.headers,
                    body: body
                   });
               }
           });
        });
    }
}