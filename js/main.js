import mainHeader from './comps/main-header.cmp.js'
import mainFooter from './comps/main-footer.cmp.js'
import {myRouter} from './routes.js'
import userMsg from './comps/user-msg.cmp.js'


const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
        <user-msg />
        <main-header />
        <router-view />
        <main-footer />
        <!-- <div v-if="modalOpen" :class="setAppClass" class="modal-screen"></div> -->
    </section>
    `,
    data() {
        return {
            modalOpen: false
        }
    },
    components: {
        mainHeader,
        mainFooter,
        userMsg
    },
    computed: {
        setAppClass() {
            return this.modalOpen ? 'open-modal' : ''
        }
    },
    methods: {
        toggleModal(isOn) {
            this.modalOpen = isOn ? true : false
        },
    }
}

const app = new Vue(options)