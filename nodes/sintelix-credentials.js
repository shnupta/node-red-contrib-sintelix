module.exports = function(RED) {

    var request = require('request');

    var localUserCache = {};
    
    function SintelixCredentialsNode(n) {
        RED.nodes.createNode(this, n);

        if(this.credentials.username && this.credentials.password && this.credentials.host) {
            if(!localUserCache.hasOwnProperty('jsession-cookie')) {
                this.login().then(function(body) {
                    if(body.status == 200) {
                        localUserCache['jsession-cookie'] = body.jsession_cookie;
                        this.jsession_cookie = body.jsession_cookie;
                    }
                });
            }
        }
    }
    RED.nodes.registerType("sintelix-credentials", SintelixCredentialsNode, {
        credentials: {
            username: {type: "text"},
            password: {type: "password"},
            host: {type: "text"}
        }
    });

    // TODO: Change this to be like the Twitter API and have a get functio
    // and login via the node constructor.
    SintelixCredentialsNode.prototype.login = function() {
        var node = this;
        console.log('attempting login');

        var options = {
            url: `${node.credentials.host}/login.do`,
            body: `j_username=${node.credentials.username}&j_password=${node.credentials.password}`
        };

        return new Promise(function(resolve, reject) {
            request.post(options, function(err, response, body) {
                if(err) {
                    reject(err);
                } else {
                    resolve({
                        status: response.statusCode,
                        jsession_cookie: response.headers['set-cookie'],
                        body: response.body
                    });
                }
            });
        });
    }

    SintelixCredentialsNode.prototype.post = function(url, body) {
        var node = this;

        var options = {
            url: url,
        };

        if(body) {
            options.body = body;
        }

        // TODO: See earlier todo and complete that first.
        if(!this.jsession_cookie) {
            this.login
        }
    }
}