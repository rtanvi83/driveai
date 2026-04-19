export const detectIntent = (query) => {
    const q = query.toLowerCase()

    if (q.includes("suv") && q.includes("under")) {
        return { type: "FILTER", maxPrice: 2000000 }
    }

    if (q.includes("compare")) {
        return { type: "COMPARE" }
    }

    if (q.includes("family")) {
        return { type: "RECOMMEND" }
    }

    if (q.includes("book")) {
        return {
            type: "BOOK",
            model: "Terra Pro",
            city: "Kochi",
            date: "2026-04-20"
        }
    }

    if (q.includes("usd") || q.includes("dollar") || q.includes("price")) {
        return { type: "CURRENCY", currency: "USD" }
    }

    if (q.includes("feature")) {
        return { type: "SCROLL", section: "features" }
    }

    if (q.includes("contact")) {
        return { type: "SCROLL", section: "contact" }
    }

    if (q.includes("price") || q.includes("pricing")) {
        return { type: "SCROLL", section: "pricing" }
    }

    return { type: "UNKNOWN" }
}