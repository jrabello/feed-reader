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

         it('is hidden when clicked', function() {
            //expect displayed when clicked
            document.querySelector(`.menu-icon-link`).click()
            expect($(`body`).hasClass(`menu-hidden`)).toBe(false); 

            //expect hidden when clicked again
            document.querySelector(`.menu-icon-link`).click()
            expect($(`body`).hasClass(`menu-hidden`)).toBe(true); 
        });
    });

    describe('Initial Entries', () =>  {
        
        beforeEach(function(done) {
            loadFeed(0, done)
        });

        it('loadFeed completes', function(done) {
            expect($('.feed').text().length > 0).toBe(true); 
            done();
        });
    });

    describe('New Feed Selection', () =>  {
        let oldFeedText;
        let newFeedText;
        
        // loads feed twice to be sure content will change
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
