/**
* Constructor
*
* @param {String} key
* @throws {Error} invalid parameters
*/

const Pixaven = module.exports = function (key) {
    if (!(this instanceof Pixaven)) {
        return new Pixaven(key);
    }

    if (typeof key !== "string") {
        throw new Error("Pixaven constructor requires a valid API Key");
    }

    this.options = {
        key: key,
        request: {}
    };
};


/**
* Extend the prototype with available operations
*/

require("./operations")(Pixaven);


/**
* Export Pixaven
*/

module.exports = Pixaven;