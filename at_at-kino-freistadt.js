const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: [
        {
            name: 'Kino Freistadt',
            address: 'Salzgasse 25, 4240 Freistadt',
            website: 'https://www.kino-freistadt.at',
            phone: '+43 7942 777 11'
        }
    ],
    showtimes: {
        url: 'https://www.kino-freistadt.at/?site=program&date=:date:',
        urlDateFormat: 'DD-MM-YYYY',
        movies: {
            box: '.dailyProgramMovieBox',
            title: '.dailyProgramContentMovie',
            showtimes: {
                box: '.dailyProgramTime',
                date: ':date:',
                time: ':box'
            }
        }
    }
})
crawlE.crawl()