function HomePage(browser) {
    this.url = 'http://epam.com';

    this.get = function () {
        return browser.get(this.url);
    };

    this.clickMenuItem = function (item) {
        var menuItem = {css: 'a[href*="' + item + '"]'};
        return browser.findElement(menuItem).click();
    }
};

module.exports = HomePage;