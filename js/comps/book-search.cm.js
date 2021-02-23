export default {
    template: `
    <section class="book-search flex justify-center">
        <h2>search in google: </h2>
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