// Generated by CoffeeScript 1.4.0
var HNScraper;

HNScraper = (function() {

  function HNScraper(html) {
    this.html = $(html);
    this.parse();
  }

  HNScraper.prototype.parse = function() {
    var next, trList;
    trList = this.html.find('table tr:nth-child(3) table tr');
    next = trList.splice(trList.length - 1, 1);
    trList.splice(trList.length - 1, 1);
    this.items = this.parseItems(trList);
    return this.next = this.parseNext(next);
  };

  HNScraper.prototype.parseItems = function(trList) {
    var count, index, items;
    items = [];
    count = 0;
    index = 0;
    trList.each(function(i, e) {
      var a, tr;
      count += 1;
      tr = $(e);
      if (count === 1) {
        a = tr.find('.title a');
        items[index] = {
          title: null,
          url: null,
          score: null,
          user: null,
          comments: null,
          commentsURL: null,
          time: null
        };
        items[index].title = a.text();
        items[index].url = a.attr('href');
        if (!items[index].url.match('http')) {
          items[index].url = 'http://news.ycombinator.com/' + items[index].url;
        }
      } else if (count === 2) {
        items[index].score = tr.find('.subtext span').text();
        items[index].user = tr.find('.subtext a:nth-child(2)').text();
        items[index].comments = tr.find('.subtext a:nth-child(3)').text();
        items[index].commentsURL = tr.find('.subtext a:nth-child(3)').attr('href');
        items[index].time = tr.find('.subtext').text().replace(/^.*([0-9]+.*?ago).*$/, "$1");
      }
      if (count >= 3) {
        count = 0;
        return index += 1;
      }
    });
    return items;
  };

  HNScraper.prototype.parseNext = function(next) {
    var rs;
    rs = {
      url: $(next).find('a').attr('href')
    };
    if (!rs.url.match("/")) {
      rs.url = "/" + rs.url;
    }
    return rs;
  };

  return HNScraper;

})();