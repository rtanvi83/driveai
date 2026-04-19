import express from "express"
import { detectIntent } from "../utils/detectIntent.js"

const router = express.Router()

router.post("/", (req, res) => {
    const { query } = req.body
    const intent = detectIntent(query)

    let reply = "Let me help you."

    switch (intent.type) {
        case "FILTER":
            reply = "Showing SUVs under your budget."
            break
        case "COMPARE":
            reply = "Comparing top models."
            break
        case "RECOMMEND":
            reply = "Best car for your family highlighted."
            break
        case "BOOK":
            reply = "Booking form filled."
            break
        case "CURRENCY":
            reply = "Prices converted."
            break
        case "SCROLL":
            reply = "Scrolling to section."
            break
        default:
            reply = "Try asking something else."
    }

    res.json({ intent, reply })
})

export default router