/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        it('has URLs', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined(); 
                expect(feed.url.length).not.toBe(0);
            });
        });
        
        it('has Names', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    
    describe('The menu', () =>  {
        
        it('is hidden', function() {
            expect($(`body`).hasClass(`menu-hidden`)).toBe(true); 
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('is hidden when clicked', function() {
            //expect displayed when clicked
            document.querySelector(`.menu-icon-link`).click()
            expect($(`body`).hasClass(`menu-hidden`)).toBe(false); 

            //expect hidden when clicked again
            document.querySelector(`.menu-icon-link`).click()
            expect($(`body`).hasClass(`menu-hidden`)).toBe(true); 
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () =>  {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done)
        });

        it('loadFeed completes', function(done) {
            expect($('.feed').text().length > 0).toBe(true); 
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () =>  {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let oldFeedText;
        let newFeedText;
        beforeEach(function(done) {
            loadFeed(0, () => {
                oldFeedText = $('.feed').text();
                loadFeed(1, () => {
                    newFeedText = $('.feed').text();
                    done()
                });
            });
        });

        it('loadFeed changes', function(done) {
            expect(oldFeedText && newFeedText && oldFeedText !== newFeedText).toBe(true); 
            done();
        });
    });
}());
