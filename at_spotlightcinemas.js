const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: {
        list: {
            url: 'http://spotlightcinemas.com/corporate',
            box: '.dropdown-menu .dropdown-item',
            slug: {
                selector: ':box',
                attribute: 'href',
                mapper: value => value.replace('/', '')
            }
        },
        details: {
            url: 'http://spotlightcinemas.com/:cinema.slug:/?page=contact',
            name: {
                selector: '.card-text p:nth-of-type(2)',
                mapper: value => value.split('\n')[2].trim()
            },
            address: {
                selector: '.card-text p:nth-of-type(2)',
                mapper: value => value.split('\n')[3].trim()
            },
            phone: {
                selector: '.card-text p:nth-of-type(2)',
                mapper: value => value.split('\n')[4].split(' - ')[0].trim()
            }
        }
    },
    showtimes: {
        url: 'http://spotlightcinemas.com/:cinema.slug:/index.php?date=:date:',
        urlDateFormat: 'YYYYMMDD',
        movies: {
            box: '.row div',
            title: '.nav .nav-item',
            showtimes: {
                box: '.card-block button',
                date: ':date:',
                dateFormat: 'YYYYMMDD',
                time: {
                    selector: ':box',
                    mapper: value => value.split(' ')[0]
                },
                timeFormat: 'h:mm',
                is3d: {
                    selector: ':box',
                    mapper: value => value.split(' ')[2]
                }
            }
        }
    }
})
crawlE.crawl()