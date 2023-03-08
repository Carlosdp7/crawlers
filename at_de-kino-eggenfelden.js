const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: [
        {
            name: 'Kino Eggenfelden',
            address: 'Schellenbruckplatz 8, 84307 Eggenfelden',
            website: 'https://www.kino-eggenfelden.de',
            phone: '08721 / 21 37'
        }
    ],
    showtimes: {
        url: 'https://www.kino-eggenfelden.de/kinoprogramm',
        movies: {
            box: '.movie_row',
            title: '.movie_title',
            dates: {
                box: '.showstble',
                date: {
                    selector: '.daysweek',
                    mapper: value => value.replace(' :', '').split(', ')[1].trim()
                },
                dateFormat: 'DD.MM',
                showtimes: {
                    box: '.showtime',
                    time: {
                        selector: ':box',
                        attribute: 'ownText()',
                        mapper: value => value.replace(' Uhr ', '').trim()
                    },
                    is3d: '.mtype',
                    auditorium: '.movie_hall'
                }
            }
        }
    }
})
crawlE.crawl()