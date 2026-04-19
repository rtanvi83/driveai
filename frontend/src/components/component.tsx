import { features_arr } from "./array"
import { useRef } from "react"

export const CarCard = ({ data, currency }: any) => {
    const scrollRef: any = useRef()

    const scroll = (dir: any) => {
        scrollRef.current.scrollBy({
            left: dir === "left" ? -320 : 320,
            behavior: "smooth"
        })
    }

    return (
        <div className="relative px-6 py-10">

            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                bg-black text-white px-3 py-2 rounded-full"
            >
                ◀
            </button>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >

                {data.map((e: any, i: any) => {
                    const isReverse = i % 2 !== 0;
                    const price =
                        currency === "USD"
                            ? `$${(e.car.price / 83).toFixed(0)}`
                            : `₹${e.car.price}`

                    return (
                        <div
                            key={i}
                            className="min-w-[280px] snap-start 
                            bg-[#111] rounded-3xl overflow-hidden 
                            shadow-xl hover:scale-105 transition relative"
                        >

                            <div className={`absolute inset-0 bg-gradient-to-r ${e.car.color} opacity-10 blur-2xl`} />

                            <div className={`flex flex-col ${isReverse ? "flex-col-reverse" : ""}`}>

                                <div className="p-5 text-white space-y-2 z-10">
                                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                                        {e.car.badge}
                                    </span>

                                    <h3 className="text-xl font-bold">
                                        {e.car.name}
                                    </h3>

                                    <p className="text-gray-400 text-sm">
                                        {e.car.tagline}
                                    </p>

                                    <div className="flex justify-between items-center pt-2">
                                        <p className="text-gray-500 text-sm">
                                            {e.car.type}
                                        </p>

                                        <p className="text-cyan-400 font-semibold">
                                            {price}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-44 overflow-hidden">
                                    <img
                                        src={e.car.image}
                                        className="w-full h-full object-cover 
                                        hover:scale-110 transition duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                bg-black text-white px-3 py-2 rounded-full"
            >
                ▶
            </button>
        </div>
    )
}

export const Features = () => {
    return (
        <section className="py-24 bg-[#0B0B0F] text-white text-center">

            <h2 className="text-5xl font-bold mb-16">
                Intelligent Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">

                {features_arr.map((f: any, i: any) => (
                    <div
                        key={i}
                        className="relative group rounded-3xl overflow-hidden p-[1px]"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${f.color} opacity-40 blur-lg group-hover:opacity-70 transition`} />
                        <div className="relative bg-[#111] rounded-3xl p-6 h-full flex flex-col items-center justify-center">

                            <div className="text-4xl mb-4">
                                {f.icon}
                            </div>

                            <h3 className="text-xl font-semibold">
                                {f.title}
                            </h3>

                            <p className="text-gray-400 text-sm mt-2">
                                {f.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export const BookingForm = ({ formData, setFormData, setSubmitted }: any) => {
    return (
        <section id="booking" className="py-24 bg-black text-white px-6">

            <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                        className="rounded-3xl shadow-2xl w-full object-cover"
                    />

                    <div className="absolute -bottom-10 -left-10 w-60 h-60 
                    bg-cyan-500/20 blur-[100px] rounded-full" />
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 
                rounded-3xl p-8 shadow-xl">

                    <h2 className="text-3xl font-bold mb-6">
                        Book Your Test Drive 🚗
                    </h2>

                    <div className="space-y-4">
                        <input
                            placeholder="Your Name"
                            className="w-full p-3 rounded-lg bg-[#111] border border-white/10 focus:border-cyan-400 outline-none"
                        />
                        <input
                            placeholder="Car Model"
                            value={formData.model}
                            onChange={(e) =>
                                setFormData({ ...formData, model: e.target.value })
                            }
                            className="w-full p-3 rounded-lg bg-[#111] border border-white/10 focus:border-cyan-400 outline-none"
                        />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                            className="w-full p-3 rounded-lg bg-[#111] border border-white/10 focus:border-cyan-400 outline-none"
                        />
                        <input
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                            }
                            className="w-full p-3 rounded-lg bg-[#111] border border-white/10 focus:border-cyan-400 outline-none"
                        />
                        <button onClick={() => {
                            setSubmitted(true);
                            setFormData({})
                        }}
                            className="w-full bg-cyan-400 text-black py-3 rounded-lg font-semibold hover:scale-105 transition">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const Comparison = ({ cars, currency }: any) => {
    if (!cars || cars.length < 2) return null
    const [car1, car2] = cars

    return (
        <section id="compare" className="py-24 bg-[#0B0B0F] text-white px-6">

            <h2 className="text-4xl font-bold text-center mb-10">
                Compare Models
            </h2>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

                {[car1, car2].map((c, i) => {
                    const price =
                        currency === "USD"
                            ? `$${(c.car.price / 83).toFixed(0)}`
                            : `₹${c.car.price}`
                    return (
                        <div
                            key={i}
                            className="bg-[#111] rounded-3xl p-6 shadow-xl border border-white/10"
                        >
                            <img
                                src={c.car.image}
                                className="h-40 w-full object-cover rounded-xl mb-4"
                            />

                            <h3 className="text-2xl font-bold mb-2">
                                {c.car.name}
                            </h3>

                            <p className="text-gray-400">{c.car.tagline}</p>

                            <div className="mt-4 space-y-2 text-sm">
                                <p>🚗 Type: {c.car.type}</p>
                                <p>💺 Seats: {c.car.seats}</p>
                                <p>⚡ Range: {c.car.range}</p>
                                <p className={`font-semibold ${c.car.price === Math.max(car1.car.price, car2.car.price)
                                    ? "text-red-400" : "text-green-400"}`}>
                                    {price}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section >
    )
}