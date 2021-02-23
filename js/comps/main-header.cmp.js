
export default {
    template: `
   <header class="main-header flex justify-center align-center">
        <div class="header main-container flex justify-between align-center">
            <div class="main logo">
                <h1>Bookshop</h1>
            </div>
            <ul class="nav-bar clean-list flex">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/book">Books</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </div>
    </header>
    `,

}
