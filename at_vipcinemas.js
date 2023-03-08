const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: {
        list: {
            url: 'https://vipcinemas.com/',
            box: '#main-navbar div:last-child div:last-child div:last-child ul a',
            slug: {
                selector: ':box',
                attribute: 'href',
                mapper: value => value.replace('/', '')
            },
            name: {
                selector: 'span:first-child',
                mapper: value => value.trim()
            }
        },
        details: {
            url: 'https://vipcinemas.com/:cinema.slug:/page/contact',
            address: {
                selector: 'div:first-child div:first-child div:nth-of-type(3) div:nth-of-type(2) div div:first-child div:last-child',
                mapper: value => value.trim()
            }
        }
    },
    showtimes: {
        url: 'https://vipcinemas.com/:cinema.slug:/?date=:date:',
        urlDateFormat: 'YYYY-MM-DD',
        movies: {
            box: 'div:first-child div:first-child div:last-child div div:nth-of-type(2) >div >div',
            title: 'h3',
            showtimes: {
                box: 'div:last-child div:last-child div:last-child >div >div',
                date: ':date:',
                dateFormat: 'YYYY-MM-DD',
                time: {
                    selector: 'a',
                    mapper: value => value.trim().substring(0, 4)
                },
                timeFormat: 'h:mm'
            }
        }
    }
})
crawlE.crawl()