const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: {
        list: {
            url: 'https://www.goldenharvest.com/cinema/',
            box: '.Cinemas_list ul li',
            id: {
                selector: ':box',
                attribute: 'onclick',
                mapper: onclick => onclick.split("'")[1].split('=')[1]
            }
        },
        details: {
            url: 'https://www.goldenharvest.com/cinema/schedule?cinema_id=:cinema.id:',
            name: '.cover-left h1',
            address: '.cover-left p:nth-of-type(1)',
            phone: '.cover-left p:nth-of-type(2)'
        }
    },
    showtimes: {
        url: 'https://www.goldenharvest.com/cinema/schedule?cinema_id=:cinema.id:',
        movies: {
            box: '.side-cinema-list .cell',
            title: 'h1',
            showtimes: {
                box: '.movie_select option',
                date: {
                    selector: ':box',
                    attribute: 'data-date'
                },
                time: {
                    selector: ':box',
                    attribute: 'data-time'
                },
                is3d: {
                    selector: ':box',
                    attribute: 'data-types',
                    mapper: value => value.split(',')[0]
                }
            }
        }
    }
})
crawlE.crawl()