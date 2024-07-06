/* eslint-disable require-jsdoc */


module.exports = class Cookie {
  constructor(cookie) {
    const split = cookie[0].split("=");
    this.name = split[0];
    this.value = split[1];
    this.isEad = this.name == "SESSION";
    this.string = `${this.name}=${this.value}`;
    this.header = `${this.string}; Path=/; HttpOnly`;
  }
};

