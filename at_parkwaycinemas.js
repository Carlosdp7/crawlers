const CrawlE = require('crawl-e/v0.5.2')

let crawlE = new CrawlE({
    cinemas: {
        list: {
            url: 'https://parkwaycinemas.co.uk',
            box: '.cinemas li:lt(3)',
            website: {
                selector: 'strong',
                attribute: 'ownText()',
                mapper: value => {
                    const sanitizatedVal = value.toLowerCase().trim();
                    return 'https://parkwaycinemas.co.uk'.split('//').join(`//${sanitizatedVal}.`)
                }
            },
            id: {
                selector: 'strong',
                attribute: 'ownText()'
            }
        },
        details: {
            url: ':cinema.website:',
            name: {
                selector: '.cnc span',
                attribute: 'ownText()'
            },
            address: {
                selector: 'footer .address em',
                attribute: 'ownText()',
                mapper: value => value.replace('Tel: ', '')
            },
            phone: 'footer .address em a'
        }
    },
    showtimes: {
        url: ':cinema.website:/film',
        movies: {
            box: '.guideFilm',
            title: {
                selector: '.pd h2 a',
                attribute: 'ownText()'
            },
            dates: {
                box: '.schedule',
                date: {
                    selector: '.day h5',
                    mapper: value => {
                        const dayLength = value.split(' ')[0].length

                        return value.substring(dayLength).trim();
                    }
                },
                dateFormat: 'D MMM',
                showtimes: {
                    box: '.showingTime',
                    time: {
                        selector: 'em',
                        attribute: 'ownText()'
                    },
                    timeFormat: 'HH.mm'
                }
            }

        }
    }
})
crawlE.crawl()