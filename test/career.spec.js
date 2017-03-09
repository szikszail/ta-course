require('chromedriver');
var selenium = require('selenium-webdriver');
var browser;

var chai = require('chai');
chai.use(require('chai-as-promised'));

describe("EPAM Career site", function () {
    this.timeout(1000 * 60);

    before(function () {
        browser = new selenium.Builder().forBrowser('chrome').build();

        return browser.manage().window().maximize();
    });

    after(function () {
        return browser.quit();
    });
});