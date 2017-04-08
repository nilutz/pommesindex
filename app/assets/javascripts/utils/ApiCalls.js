const { CallAjax } = require("react-commons");

const wortHost = 'localhost:9000';

var AppConfig = {
    host                : wortHost
};

module.exports = AppConfig;


class ApiCalls {
    // static getMarkers = (from) => CallAjax.get("http://localhost:9000/api/posts?from=" + from);
    static getMarkers = (radius) => CallAjax.get("http://localhost:9000/api/pommesindex?radius=" + radius);
    static getAllMarkers = () => CallAjax.get("http://localhost:9000/api/pommesindex");

}

module.exports = {
    ApiCalls
};
