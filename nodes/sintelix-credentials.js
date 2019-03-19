module.exports = function(RED) {

    var request = require('request');
    
    function SintelixCredentialsNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Cookie Jar to make storing the cookies easy!
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

    // This is the login function to be used after the initial node creation when
    // reauthentication is needed.
    SintelixCredentialsNode.prototype.login = function() {
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

    SintelixCredentialsNode.prototype.post = function(uri, body) {
        var node = this;

        // Request options to send along, specify the jar so that the cookies
        // are sent too
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
                    if(response.statusCode == 200) {
                        resolve({
                            status: response.statusCode,
                            headers: response.headers,
                            body: body,
                            request: response.request
                        });
                    } else if(response.headers['x-session-error'] == "Not Logged In") {
                        node.login().then(() => node.post(uri, body));
                    } else {
                        node.warn(response);
                        reject('Unknown error occurred.');
                   }
                }
            });
        });
    }
}