module.exports = function (config) {
    return function (req, res, next) {
        var mode = config.mode || 'whitelist',
            proxy = config.proxy || false,
            ips = config.ips || [],
            message = config.message || 'Unauthorized Access',
            userIP = false;

        function setUserIP() {
            if (proxy) { // If Node server is behind Ngnix or Apache or likes
                userIP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
            } else { // If Node is running directly
                userIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            }
            if (userIP.substr(0, 7) == "::ffff:") { // Converting IPv6 to IPv4
                userIP = userIP.substr(7);
            }
        }

        function sendErrorResponse() {
            return res.send({
                error: true,
                message: 'Unauthorized Request'
            });
        }

        function whitelistProcessing() {
            if (ips.length > 0 && ips.indexOf(userIP) != -1) {
                return true;
            }
            return false;
        }

        function blacklistProcessing() {
            if (ips.length === 0 || ips.indexOf(userIP) === -1) {
                return true;
            }
            return false;
        }

        function checkIP() {
            var response;
            switch (mode) {
                case 'whitelist':
                    response = whitelistProcessing();
                    break;
                case 'blacklist':
                    response = blacklistProcessing();
                    break;
                default:
                    response = true;
                    break;
            }
            return response;
        }

        function init() {
            setUserIP();
            if (!userIP) {
                return sendErrorResponse();
            }
            var response = checkIP();
            if (!response) {
                return sendErrorResponse();    
            }
            next();
        }
        return init();
    }
}