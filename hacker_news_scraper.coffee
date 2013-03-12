
class HNScraper
  constructor: (html)->
    @html = $(html)
    @parse()

  parse:()->
    trList = @html.find 'table tr:nth-child(3) table tr'
    next = trList.splice trList.length-1, 1
    trList.splice trList.length-1, 1
    @items = @parseItems trList
    @next = @parseNext next

  parseItems:(trList)->
    items = []
    count = 0
    index = 0
    trList.each (i, e)->
      count += 1
      tr = $(e) 

      if count is 1
        a = tr.find('.title a')
        items[index] =
          title:null
          url:null
          score:null
          user:null
          comments:null
          commentsURL:null
          time:null
        items[index].title = a.text()
        items[index].url = a.attr 'href'
        if !items[index].url.match 'http'
          items[index].url = 'http://news.ycombinator.com/' + items[index].url

      else if count is 2
        items[index].score = tr.find('.subtext span').text()
        items[index].user = tr.find('.subtext a:nth-child(2)').text()
        items[index].comments = tr.find('.subtext a:nth-child(3)').text()
        items[index].commentsURL = tr.find('.subtext a:nth-child(3)').attr('href')
        items[index].time = tr.find('.subtext').text().replace /^.*([0-9]+.*?ago).*$/, "$1"

      if count >= 3 
        count = 0
        index += 1

    return items

  parseNext :(next)->
    rs = 
      url: $(next).find('a').attr 'href'
    if !rs.url.match "/"
      rs.url = "/" + rs.url
    return rs
