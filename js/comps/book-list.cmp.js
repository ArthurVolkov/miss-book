import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <ul class="book-list main-container clean-list ">
    <!-- <ul class="book-list main-container clean-list flex justify-center"> -->
        <!-- <li v-for="book in books" :key="book.id" @click.stop="select(book)" class="book-preview-container" > -->
            <book-preview :book="book" v-for="book in books" :key="book.id" @click.native.stop="select(book)" class="book-preview-container" />
            <!-- <router-link :to="'/car/'+car.id">Details</router-link> -->
            <!-- <book-preview :book="book" @click.native="logId(book.id)" /> -->
            <!-- <div class="btns-container">
                <button @click="remove(car.id)">X</button>
                <button @click="select(car)">Details</button>
            </div> -->
        </li>
    </ul>
    `,
    methods: {
        select(book) {
            // this.$emit('selected', book)
            this.$router.push(`/book/${book.id}`)
        }
    },
    components:{
        bookPreview,

    }
}