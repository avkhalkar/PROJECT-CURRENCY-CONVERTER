'use strict';

(function (global) {
  class Freecurrencyapi {
    constructor(apiKey = '') {
      this.baseUrl = 'https://api.freecurrencyapi.com/v1/';
      this.headers = { apikey: apiKey };
    }

    call(endpoint, params = {}) {
      const paramString = new URLSearchParams({ ...params }).toString();

      return fetch(`${this.baseUrl}${endpoint}?${paramString}`, { headers: this.headers })
        .then(response => response.json())
        .then(data => data);
    }

    status() {
      return this.call('status');
    }

    currencies(params) {
      return this.call('currencies', params);
    }

    latest(params) {
      return this.call('latest', params);
    }

    historical(params) {
      return this.call('historical', params);
    }
  }

  // Expose globally so you can use it directly in your script
  global.Freecurrencyapi = Freecurrencyapi;
})(window);
