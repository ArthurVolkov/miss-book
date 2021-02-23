import { bookService } from '../services/book-service.js'
import reviewAdd from '../comps/review-add.cmp.js'
import { eventBus } from '../services/event-bus.service.js'


export default {
    // props: ['book'],
    template: `
    <section v-if="book" class="book-details flex justify-between align-center">
        <div class="book-details-cintainer main-container flex justify-between align-center">
            <div class="image-container">
                <img :src="book.thumbnail" alt="book photo"/>
            </div>
            <div class="info-container flex flex-col justify-between align-center">
                <div class="router-link-container flex justify-between">
                    <router-link :to="prevBookLink">Prev book</router-link>
                    <router-link :to="nextBookLink">Next book</router-link>
                </div>
                <p class="book-title">{{book.title}}</p>
                <p class="book-subtitle">{{book.subtitle}}</p>
                <p>Autors: {{book.authors.join('')}}</p>
                <p>Published at: {{book.publishedDate}}{{bookAge}}</p>
                <div class="description-continer flex flex-col ">
                    <p>About: {{description}}</p>
                    <button v-if="book.description.length > 100" @click="isMore=!isMore" class="read-more">{{readMoreBtnTxt}}</button>
                </div>
                <p>{{book.pageCount}} pages to read{{readingTime}}</p>
                <p>#{{book.categories.join('#')}}</p>
                <p :class="setClassName" class="price-container">Price: {{price}}{{isSale}}</p>
                <review-add @add="addReview(book.id, $event)"></review-add>
                <ul class="review-container clean-list">
                    <li v-for="review in book.reviews">
                        <button @click="remove(book.id, review.id)">X</button>
                        <p>Autor: {{review.name}}</p>
                        <p>Rate: {{review.rate}}</p>
                        <p>Review: {{review.reviewTxt}}</p>
                        <p>Read at: {{review.readAt}}</p>
                    </li>
                </ul>
                <button @click="closeDetails" class="close-btn">X</button>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            book: null,
            isMore: false,
            prevBookId: 'JYOJa2NpSCq',
            nextBookId: 'JYOJa2NpSCq'
        }
    },
    methods: {
        closeDetails() {
            this.$router.push(`/book`)
        },
        addReview(bookId, review) {
            bookService.addReview(bookId, review)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: 'Review was succesfully added!',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        },
        remove(bookId, reviewId) {
            bookService.removeRewiew(bookId, reviewId)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: 'Review was succesfully removed!',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        },
        loadBook() {
            const id = this.$route.params.bookId
            bookService.getById(id)
                .then(book => {
                    this.book = book
                    bookService.getNextBooksId(book.id)
                        .then(ids => {
                            this.prevBookId = ids.prev
                            this.nextBookId = ids.next
                            // console.log('IDX', idx)
                        })
                })
        }
    },
    computed: {
        price() {
            return this.book.listPrice.amount.toLocaleString("en-US",
                // this.book.language
                {
                    style: "currency",
                    currency: this.book.listPrice.currencyCode
                }
            )
        },
        readingTime() {
            let readingTime;
            if (this.book.pageCount > 500) readingTime = ', long reading'
            else if (this.book.pageCount > 200) readingTime = ', Decent Reading'
            else if (this.book.pageCount < 100) readingTime = ', Light Reading'
            return readingTime
        },
        bookAge() {
            let bookAge;
            if (new Date().getFullYear() - this.book.publishedDate > 10) bookAge = ', Veteran Book'
            else if (new Date().getFullYear() - this.book.publishedDate < 1) bookAge = ', New!'
            return bookAge
        },
        setClassName() {
            let className;
            if (this.book.listPrice.amount > 150) className = 'high-price'
            if (this.book.listPrice.amount < 20) className = 'low-price'
            return className
        },
        isSale() {
            return this.book.listPrice.isOnSale ? ' 🎁 SALE!!!' : ''
        },
        description() {
            return this.isMore ? this.book.description : this.book.description.slice(0, 99)
        },
        readMoreBtnTxt() {
            return this.isMore ? 'read less...' : 'read more...'
        },
        prevBookLink() {
            return '/book/' + this.prevBookId
        },
        nextBookLink() {
            return '/book/' + this.nextBookId
        }
    },
    watch: {
        '$route.params.bookId'(id) {
            this.loadBook()
        }
    },
    created() {
        this.loadBook()
    },
    components: {
        reviewAdd
    }
}