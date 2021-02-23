export default {
    props: ['searchedBooks'],
    template: `
    <section class="book-search-res flex justify-center">
        <button @click="closeModal" class="close-btn">X</button>

        <ul>
            <li v-for="book in searchedBooks" class="flex justify-between">
                {{book.volumeInfo.title}}
                <button @click="addBook(book.volumeInfo)" class="add-book">Add</button>
            </li>
        </ul>
        
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        addBook(book) {
            this.$emit('addBook', book)
        }

    }
}