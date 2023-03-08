const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: [
        {
            name: 'Kino Ebensee',
            address: 'Schulgasse 6, 4802 Ebensee',
            website: 'https://www.kino-ebensee.at/',
            phone: '0043 6133 6308'
        }
    ],
    showtimes: {
        url: 'https://www.kino-ebensee.at/',
        movies: {
            box: '.eventList',
            title: '.eventHeader',
            showtimes: {
                box: '.date',
                datetime: {
                    selector: ':box',
                    mapper: value => value.replace('Uhr', '').trim()
                },
                datetimeFormat: 'dd, DD.MM.YY HH:mm',
                dateLocale: 'de',
                timeLocale: 'de'
            }
        }
    }
})
crawlE.crawl()