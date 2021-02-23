'use strict'

import { utilService } from './util-service.js'

export const searhService = {
    getBooksByName
}


const SEARCH_KEY = 'searchedBooksDB'
const gSearchedBooks = utilService.loadFromStorage(SEARCH_KEY) || {};


function getBooksByName(bookName) {
    const hasFreshData = gSearchedBooks[bookName];

    if (hasFreshData) {
        console.log('res from local storage', hasFreshData);
        return Promise.resolve(hasFreshData)
    } else {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`)
            .then(({data}) => {
                console.log('res from API', data.items);

                gSearchedBooks[bookName] = data.items
                console.log('gSearchedBooks:', gSearchedBooks)
                utilService.saveToStorage(SEARCH_KEY, gSearchedBooks)
                return data.items
            })
            .catch(err => console.log('ERROR: ', err))        
    }
}