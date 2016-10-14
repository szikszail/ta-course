function JobPage(browser) {
    var titleLocator = {css: '.recruiting-a-spot-title'};
    var locationLocator = {css: '.recruiting-a-spot-title-wrapper p:nth-child(2)'};

    this.getTitle = function () {
        return browser.findElement(titleLocator).getText();
    };

    this.getLocation = function () {
        return browser.findElement(locationLocator).getText();
    };

    this.isLoaded = function () {
        return browser.isElementPresent(titleLocator).then(function (present) {
            if (!present) {
                return false;
            }
            return browser.findElement(titleLocator).isDisplayed().then(null, function () {
                return false;
            });
        });
    }
}
module.exports = JobPage;