HackerNewsScraperJS
===================

[Hacker News](https://news.ycombinator.com/) scraping for JavaScript

This library does not load a HTML. You need to get a Hacker News's HTML string with other way.

###Need other library

[jQuery](http://jquery.com/)

###How to use

Loading with script tags

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="/js/HackerNewsScraperJS/hacker_news_scraper.js"></script>
	
Run
		
	var hn = new HNScraper(HN_HTML_STRING);
	
    console.log(hn.items);
    /*
    [{
    comments: "comment count", commentsURL: "string",
	title: "string", url: "string",
    score: "string",
	time: "string",
	user: "string"    
    },...]
    */

    console.log(hn.next);
    /*
    {url:"next page link"}
    */
	
###Sample app

[Hacker News Reader](http://hnr.meteor.com) with Meteor and Foundation
