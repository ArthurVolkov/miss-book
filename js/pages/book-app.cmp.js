import bookFilter from '../comps/book-filter.cmp.js'
import bookList from '../comps/book-list.cmp.js'
import bookSearch from '../comps/book-search.cm.js'
import bookSearchRes from '../comps/book-search-res.cmp.js'

import { bookService } from '../services/book-service.js'

export default {
    template: `
        <section class="book-app flex flex-col justify-center align-center">
            <book-filter @filtered="setFilter"></book-filter>
            <book-search @search="searchBook"></book-search>
            <book-search-res v-if="searchedBooks" :searchedBooks="searchedBooks" @addBook="addBook" @closeModal="closeModal"></book-search-res>
            <book-list :books="booksToShow" @selected="selectBook" />
        </section>
    `,
    data() {
        return {
            books: [],
            searchedBooks: null
        }
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        selectBook(book) {
            this.selectedBook = book
            this.$emit('toggleModal', true)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        closeModal() {
            this.selectedBook = null,
                this.$emit('toggleModal', false)
        },
        searchBook(ev) {
            bookService.searchBook(ev)
                .then(res => {
                    // console.log('res:', res)
                    this.searchedBooks = res
                })
        },
        closeModal() {
            this.searchedBooks = null
        },
        addBook(book) {
            bookService.addBook(book)
                .then(() => this.loadBooks())
                .catch(err => console.log('ERROR: ', err))
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const searchStr = this.filterBy.byName.toLowerCase()
            const booksToShow = this.books.filter(({ title, listPrice }) => {
                return (title.toLowerCase().includes(searchStr)) && (listPrice.amount > this.filterBy.fromPrice) && (listPrice.amount < this.filterBy.toPrice)
            })
            return booksToShow
        },

    },
    created() {
        this.loadBooks()
    },
    components: {
        bookFilter,
        bookSearch,
        bookList,
        bookSearchRes
    }
}
