export default {
    template: `
    <section class="book-search flex justify-center align-center">
        <h4>Search in google: </h4>
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