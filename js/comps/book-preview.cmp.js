export default {
    props:['book'],
    template:`
    <li class="book-preview flex justify-between">
        <div class="image-container">
            <img :src="book.thumbnail" alt="book photo"/>
        </div>
        <div class="info-container flex flex-col justify space-between align-center">
            <p>{{book.title}}</p>
            <p>{{price}}</p>
        </div>
    </li>
    `,
    computed: {
        price() {
            return this.book.listPrice.amount.toLocaleString("en-US", 
                // this.book.language
                {
                style:"currency", 
                currency: this.book.listPrice.currencyCode
                }
            )
        }
    }

}
