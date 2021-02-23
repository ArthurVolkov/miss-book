export default {
    template: `
    <section class="book-filter flex flex-col justify-center">
        <form @submit.prevent="setFilter" class="filter-form main-container flex justify-between">
            <label class="flex align-center"> Search a book: </label>
            <input type="text" placeholder="Filter by name" v-model="filterBy.byName">
            <input type="number" placeholder="From price" v-model.number="filterBy.fromPrice">
            <input type="number" placeholder="To price" v-model.number="filterBy.toPrice">
            <button>search</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: '',
                toPrice: Infinity
            }
        }
    },
    methods: {
        setFilter() {
            // this.$emit('filtered', {...this.filterBy})
            this.$emit('filtered', this.filterBy)
            this.filterBy = {
                byName: '',
                    fromPrice: '',
                        toPrice: Infinity
            }
        }
    }
}