import bookFilter from '../comps/book-filter.cmp.js'
import bookList from '../comps/book-list.cmp.js'

import {bookService} from '../services/book-service.js'

export default {
    template: `
        <section class="book-app flex flex-col justify-center align-center">
            <book-filter @filtered="setFilter"></book-filter>

            <book-list :books="booksToShow" @selected="selectBook" />
        </section>
    `,
    data() {
        return {
            books: [],

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
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const searchStr = this.filterBy.byName.toLowerCase()
            const booksToShow = this.books.filter(({title, listPrice}) =>{
                return (title.toLowerCase().includes(searchStr)) && (listPrice.amount> this.filterBy.fromPrice) && (listPrice.amount<this.filterBy.toPrice)
            })
            return booksToShow
        },

    },
    created() {
        this.loadBooks()
    },
    components: {
        bookFilter,
        bookList,
    }
}
