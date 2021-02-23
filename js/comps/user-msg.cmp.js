import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="msg" class="user-msg flex justify-center align-center" :class="msg.type">
            <p>{{msg.txt}}</p>
            <button @click="msg=null">X</button>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        setMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 3000);
        }
    },
    created() {
        eventBus.$on('show-msg', this.setMsg)
    },
    destroyed(){
        eventBus.$off('show-msg', this.setMsg)
    }
}