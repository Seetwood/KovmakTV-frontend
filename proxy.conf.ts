const route = '/api/';
const config = {
    target: "http://localhost:8080",
    changeorigin: false,
    secure: false,
    loglevel: "debug",
};

const PROXY_CONFIG = {
    [route]: config,
}
module.exports = PROXY_CONFIG