import { useState, useRef, useEffect } from "react"
import { car_arr } from "../components/array"
import { CarCard, Features, BookingForm, Comparison } from "../components/component"

const Dashboard = () => {
    const [cars, setCars] = useState(car_arr)
    const [messages, setMessages]: any = useState([])
    const [showChat, setShowChat] = useState(false)
    const [currency, setCurrency] = useState("INR")
    const [submitted, setSubmitted] = useState(false)
    const [compareCars, setCompareCars] = useState([])

    const [formData, setFormData] = useState({ model: "", date: "", city: "" })
    const chatRef: any = useRef()

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
    }, [messages])

    const handleAIAction = (intent: any) => {
        if (!intent) return

        if (intent.type === "FILTER") {
            const filtered = car_arr.filter(
                (c) =>
                    c.car.type === (intent.category || "SUV") &&
                    c.car.price <= (intent.maxPrice || 2000000)
            )
            setCars(filtered)

            document.getElementById("models")?.scrollIntoView({ behavior: "smooth" })
        }

        if (intent.type === "RECOMMEND") {
            const updated = car_arr.map((c: any) => ({
                ...c,
                highlight: c.car.seats >= 7
            }))
            setCars(updated)
        }

        if (intent.type === "CURRENCY") {
            setCurrency(intent.currency || "USD")
        }

        if (intent.type === "BOOK") {
            setFormData({
                model: intent.model || "Terra Pro",
                date: intent.date || "2026-04-20",
                city: intent.city || "Kochi"
            })

            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
        }

        if (intent.type === "SCROLL") {
            setTimeout(() => {
                document.getElementById(intent.section)?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }

        if (intent.type === "COMPARE") {
            const top2: any = [...car_arr]
                .sort((a, b) => b.car.aiScore - a.car.aiScore)
                .slice(0, 2)

            setCompareCars(top2)

            setTimeout(() => {
                const el = document.getElementById("compare")
                el?.scrollIntoView({ behavior: "smooth" })
                el?.classList.add("ring-4", "ring-cyan-400")
                setTimeout(() => el?.classList.remove("ring-4"), 1500)
            }, 200)
        }
    }

    const handleSend = async (input: any) => {
        if (!input) return

        try {
            const res = await fetch(`https://driveai-4gj8.onrender.com/ai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input })
            })
            console.log("response of api", res);

            const data = await res.json()

            handleAIAction(data.intent)
            setMessages((prev: any) => [
                ...prev,
                { user: input, bot: data.reply }
            ])
        } catch {
            setMessages((prev: any) => [
                ...prev,
                { user: input, bot: "Something went wrong." }
            ])
        }
    }

    return (
        <>
            <section className="relative h-screen w-full overflow-hidden text-white">

                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                    className="absolute w-full h-full object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70" />

                {/* GLOW EFFECT */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

                    <h1 className="text-6xl md:text-7xl font-bold">
                        Drive <span className="text-cyan-400">Intelligence</span>
                    </h1>

                    <p className="mt-4 text-gray-300 max-w-xl">
                        AI-powered cars for a smarter journey
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="bg-cyan-400 text-black px-6 py-3 rounded-full">
                            Explore Models
                        </button>
                    </div>

                </div>
            </section>

            <section id="models" className="bg-black text-white py-24 px-6">
                <div className="text-center mb-16">
                    <h6 className="text-cyan-400 text-sm">OUR COLLECTION</h6>
                    <h2 className="text-5xl font-bold">Meet the Future Cars</h2>
                    <p className="text-gray-400 mt-4">
                        Experience innovation and performance.
                    </p>
                </div>

                <CarCard data={cars} currency={currency} />
            </section>

            <section id="features" className="bg-black text-white py-24 px-6">
                <Features />
            </section>

            {compareCars.length > 0 &&
                <section id="compare" className="bg-black text-white py-24 px-6">
                    <Comparison cars={compareCars} currency={currency} />
                </section>
            }

            <BookingForm
                formData={formData}
                setFormData={setFormData}
                setSubmitted={setSubmitted}
            />

            {submitted && (
                <div className="fixed bottom-6 left-6 bg-green-500 text-black px-4 py-2 rounded">
                    Booking Successful!
                </div>
            )}

            <div
                onClick={() => setShowChat(true)}
                className="fixed bottom-6 right-6 bg-cyan-400 text-black 
                w-14 h-14 flex items-center justify-center rounded-full 
                shadow-lg cursor-pointer hover:scale-110 transition z-50"
            >
                🤖
            </div>

            {showChat && (
                <div className="fixed bottom-20 right-6 w-80 bg-[#111] text-white p-4 rounded-xl shadow-xl z-50">

                    <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-semibold">DriveAI</h3>
                        <button onClick={() => setShowChat(false)}>✖</button>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 mb-3">
                        {messages.map((m: any, i: any) => (
                            <div key={i}>
                                <p className="text-xs text-gray-400">You: {m.user}</p>
                                <p className="text-sm">AI: {m.bot}</p>
                            </div>
                        ))}
                    </div>

                    <input
                        placeholder="Ask something..."
                        className="w-full p-2 bg-[#222] rounded mb-2"
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter" && e.target.value) {
                                handleSend(e.target.value)
                                e.target.value = ""
                            }
                        }}
                    />

                    <div className="flex flex-wrap gap-2">
                        {[
                            "Show SUVs under 20 lakhs",
                            "Best car for family",
                            "Book test drive for Terra Pro in Kochi",
                            "Compare top models",
                            "Show prices in USD",
                            "Show features section"
                        ].map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q)}
                                className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <footer className="bg-black text-gray-400 text-center py-6">
                © 2026 DriveAI. Built with AI-powered UI.
            </footer>
        </>
    )
}

export default Dashboard