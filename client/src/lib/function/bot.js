import { api } from '../api'

export default api('bot', {
    async text(text) {
        await fetch(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
            method: "post",
            body: JSON.stringify({
                chat_id: process.env.BOT_CHAT,
                text: text
            })
        })
    },
    async document(document, caption) {
        const data = new FormData()
        data.append("chat_id", process.env.BOT_CHAT)
        data.append("document", document)
        data.append("caption", caption)
        const res = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: data
        })
        console.log("request to telegram bot api", res.status)
    },
})