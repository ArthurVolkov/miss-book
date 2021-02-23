

export default {
    template: `
        <section class="review-add flex justify-center align-center">
            <form @submit.prevent="formSubmit" class="flex flex-col ">
                <input v-model="name" type="text" placeholder="Your name"> 
                <div class="star-container flex justify-center">
                    <div v-for="star in stars" :key="star" @click="setRate(star)" class="star">⭐</div>
                </div>
                <textarea v-model="reviewTxt" type="text" rows="5" placeholder="Your review"></textarea>
                <p>Read at:</p>
                <input v-model="readAt" type="date">
                <button>Add review</button>
            </form>
        </section>
    `,
    data() {
        return {
            stars: [1, 2, 3, 4, 5],
            rating: 0,
            name: 'Book Reader',
            reviewTxt: '',
            readAt: new Date().toISOString().substr(0, 10)
        }
    },
    computed: {

    },
    methods: {
        setRate(rate) {
            this.rating = rate
        },
        formSubmit() {
            const newReview = {
                name: this.name,
                rate: this.rating,
                reviewTxt: this.reviewTxt,
                readAt: this.readAt
            }
            console.log('readAt:', newReview.readAt)
            this.$emit('add', newReview)
            this.rating = 0,
            this.name = 'Book Reader',
            this.reviewTxt = ''
        } 
    }
}