function HomePage(browser) {
    this.url = 'http://epam.com';

    this.get = function () {
        return browser.get(this.url);
    };
}

module.exports = HomePage;