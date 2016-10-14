var until = require('selenium-webdriver').until;
var JobPage = require('./jobPage');

function CareerPage(browser) {
    var jobPage = new JobPage(browser);

    var applyLocator = {css: '.link'};
    var searchButtonLocator = {css: '.job-search-button'};
    var firstJobLocator = {css: '.search-result-item:nth-child(1)'};
    var positionNameLocator = {css: '.position-name'};
    var positionLocationLocator = {css: '.location'};

    this.clickSearch = function () {
        var searchButton = browser.wait(until.elementLocated(searchButtonLocator));
        return searchButton.click().then(function () {
            return browser.wait(function () {
                return browser.isElementPresent(firstJobLocator).then(function (present) {
                    if (!present) {
                        return false;
                    }
                    return browser.findElement(firstJobLocator).isDisplayed().then(null, function () {
                        return false;
                    });
                });
            });
        });
    };

    this.clickApply = function (n) {
        var job = this.getJob(n);
        job.findElement(applyLocator).click();
        return browser.wait(function () {
            return jobPage.isLoaded();
        });
    };

    this.getJob = function (n) {
        var jobLocator = {css: '.search-result-item:nth-child(' + n + ')'};
        return browser.findElement(jobLocator);
    };

    this.getJobData = function (n) {
        var job = this.getJob(n);
        return job.findElement(positionNameLocator).getText().then(function (name) {
            return job.findElement(positionLocationLocator).getText().then(function (location) {
                return {
                    title: name.toUpperCase(),
                    location: location.replace(' ', ' ')
                };
            });
        });
    }
}

module.exports = CareerPage;