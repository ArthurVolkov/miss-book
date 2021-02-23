export default {
    template: `
    <section class="book-search flex justify-center">
        <h1>search in google</h1>
        <form @submit.prevent="search">
            <input v-model="bookName" type="search">

        </form>
    </section>
    `,
    data() {
        return {
            bookName: 'harry potter'
        }
    },
    methods: {
        search() {
            this.$emit('search', this.bookName)
        }
    }
}