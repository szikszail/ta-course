require('chromedriver');
var selenium = require('selenium-webdriver');
var browser;

var chai = require('chai');
chai.use(require('chai-as-promised'));

var HomePage = require('../po/homePage');
var CareerPage = require('../po/careerPage');
var JobPage = require('../po/jobPage');

describe("EPAM Career site", function () {
    this.timeout(1000 * 60);

    var careerPage, homePage, jobPage;

    before(function () {
        browser = new selenium.Builder().forBrowser('chrome').build();

        homePage = new HomePage(browser);
        careerPage = new CareerPage(browser);
        jobPage = new JobPage(browser);

        return browser.manage().window().maximize();
    });

    after(function () {
        return browser.quit();
    });

    describe("Happy flow", function () {
        it("should show jobs", function () {
            // 1. open home page
            homePage.get();

            // 2. click on Career menu item
            homePage.clickMenuItem('careers');

            // 3. click on Search button
            return careerPage.clickSearch().then(function () {
                return careerPage.getJobData(1).then(function (data) {
                    // 5. click on Apply for first job
                    careerPage.clickApply(1);

                    // 6. check job title
                    chai.expect(jobPage.getTitle()).to.eventually.equal(data.title);

                    // 7. check job location
                    return chai.expect(jobPage.getLocation()).to.eventually.equal(data.location);
                });
            });
        });
    });
});