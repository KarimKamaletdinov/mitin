import { api } from '../api'

export default bot = api('bot', {
    async text(text) {
        await fetch(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
            body: JSON.stringify({
                chat_id: process.env.BOT_CHAT,
                text: text
            })
        })
    },
    async document(text, caption) {
        await fetch(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
            body: JSON.stringify({
                chat_id: process.env.BOT_CHAT,
                document: text,
                caption: caption,
            })
        })
    },
})