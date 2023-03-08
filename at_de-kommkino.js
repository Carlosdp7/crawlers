const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: [
        {
            name: 'Kommkino',
            address: 'Königstr 93, 90402 Nürnberg',
            website: 'https://kommkino.de/',
            phone: '14 88 70 15 '
        }
    ],
    showtimes: {
        url: 'https://kommkino.de/spielzeiten',
        movies: {
            box: '.ic-list-event .event',
            title: '.ic-content .eventtitle .title-header h2',
            showtimes: {
                box: '.ic-content .nextdate',
                date: {
                    selector: '.ic-single-next',
                    mapper: value => {
                        const day = value.split(',')[0]
                        console.log(day.length);
                        return value.substring(day.length + 2);
                    }
                },
                dateFormat: 'D. MMMM YYYY',
                dateLocale: 'de',
                time: '.ic-single-starttime',
                timeFormat: 'HH:mm'
            }
        }
    }
})
crawlE.crawl()