import { useState } from "react"
import axios from "axios"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"

const getTips = (form, placed) => {
  const tips = []
  if (parseFloat(form.CGPA) < 7)         tips.push("📚 Improve your CGPA above 7.0 — it's the strongest placement signal.")
  if (parseInt(form.Internship_Experience) === 0) tips.push("💼 Get at least one internship — it significantly boosts placement chances.")
  if (parseFloat(form.Communication_Skills) < 6)  tips.push("🗣️ Work on communication skills — join debate clubs or public speaking courses.")
  if (parseFloat(form.Projects_Completed) < 2)    tips.push("🛠️ Complete at least 2–3 projects to stand out to recruiters.")
  if (parseFloat(form.Extra_Curricular_Score) < 5) tips.push("🏆 Participate in extracurriculars — they improve your overall profile score.")
  if (tips.length === 0 && placed) tips.push("🌟 Great profile! Keep maintaining your scores and apply early.")
  if (tips.length === 0 && !placed) tips.push("📈 Focus on CGPA, internships and projects to improve your chances.")
  return tips
}

export default function App() {
  const [form, setForm] = useState({
    IQ: "", Prev_Sem_Result: "", CGPA: "",
    Academic_Performance: "", Internship_Experience: "0",
    Extra_Curricular_Score: "", Communication_Skills: "",
    Projects_Completed: ""
  })
  const [result, setResult]   = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [showTips, setShowTips] = useState(false)

  const fields = [
    { key: "IQ",                    label: "IQ Score",                  placeholder: "e.g. 105",  min: 40,  max: 160 },
    { key: "Prev_Sem_Result",       label: "Previous Sem Result",       placeholder: "e.g. 7.5",  min: 0,   max: 10  },
    { key: "CGPA",                  label: "CGPA",                      placeholder: "e.g. 7.8",  min: 0,   max: 10  },
    { key: "Academic_Performance",  label: "Academic Performance (1-10)",placeholder: "e.g. 8",   min: 1,   max: 10  },
    { key: "Extra_Curricular_Score",label: "Extra Curricular (1-10)",   placeholder: "e.g. 7",    min: 1,   max: 10  },
    { key: "Communication_Skills",  label: "Communication Skills (1-10)",placeholder: "e.g. 8",   min: 1,   max: 10  },
    { key: "Projects_Completed",    label: "Projects Completed",        placeholder: "e.g. 3",    min: 0,   max: 10  },
  ]

  const change = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setError("")
    for (const f of fields) {
      if (!form[f.key]) { setError(`Please fill in: ${f.label}`); return }
    }
    setLoading(true)
    try {
      const payload = {}
      for (const k in form) payload[k] = parseFloat(form[k])
      const res = await axios.post("http://127.0.0.1:8000/predict", payload)
      const newResult = { ...res.data, inputs: { ...form }, time: new Date().toLocaleTimeString() }
      setResult(newResult)
      setShowTips(false)
      setHistory(h => [newResult, ...h].slice(0, 5))
    } catch {
      setError("Could not connect to API. Make sure uvicorn is running.")
    }
    setLoading(false)
  }

  const prob = result ? result.probability : 0
  const isPlaced = result?.placed
  const gaugeColor = prob >= 50 ? "#2563EB" : "#EF4444"

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-semibold text-gray-800 text-lg">PlacementAI</span>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          Powered by ML · 90% Accuracy
        </span>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Placement Predictor</h1>
          <p className="text-gray-500">Enter your academic details to predict your placement chances using AI</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-gray-700 mb-4 text-base">📊 Academic Details</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="text-xs text-gray-500 mb-1 block">{f.label}</label>
                <input
                  type="number" min={f.min} max={f.max}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => change(f.key, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Internship Experience</label>
            <div className="flex gap-3">
              {[["1","Yes ✅"],["0","No ❌"]].map(([val, lbl]) => (
                <button key={val}
                  onClick={() => change("Internship_Experience", val)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                    form.Internship_Experience === val
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                  }`}
                >{lbl}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm transition-all mb-6 disabled:opacity-60 shadow-md">
          {loading ? "🔄 Predicting..." : "🚀 Predict My Placement"}
        </button>

        {/* Result card */}
        {result && (
          <div className={`bg-white rounded-2xl border-2 shadow-sm p-6 mb-4 transition-all ${isPlaced ? "border-blue-400" : "border-red-400"}`}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-700">Prediction Result</h2>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isPlaced ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                {isPlaced ? "Likely Placed ✅" : "Not Likely Placed ❌"}
              </span>
            </div>

            <div className="flex items-center gap-6 mb-5">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-2">Placement Probability</p>
                <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${prob}%`, background: gaugeColor }} />
                </div>
                <p className="text-4xl font-bold mt-2" style={{ color: gaugeColor }}>{prob}%</p>
              </div>
              <div className="w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%"
                    startAngle={90} endAngle={90 - (360 * prob / 100)} data={[{ value: prob, fill: gaugeColor }]}>
                    <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "#f3f4f6" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 font-medium text-center">
              {result.message}
            </div>

            {/* Tips toggle */}
            <button onClick={() => setShowTips(t => !t)}
              className="w-full text-sm text-blue-600 font-medium py-2 rounded-xl border border-blue-200 hover:bg-blue-50 transition">
              {showTips ? "Hide Tips ▲" : "💡 Show Tips to Improve ▼"}
            </button>

            {showTips && (
              <div className="mt-4 space-y-2">
                {getTips(result.inputs, isPlaced).map((tip, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-gray-700 mb-4">🕒 Last {history.length} Predictions</h2>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div className="text-sm text-gray-600">
                    CGPA: <span className="font-medium">{h.inputs.CGPA}</span> ·
                    IQ: <span className="font-medium">{h.inputs.IQ}</span> ·
                    Projects: <span className="font-medium">{h.inputs.Projects_Completed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: h.placed ? "#2563EB" : "#EF4444" }}>
                      {h.probability}%
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${h.placed ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                      {h.placed ? "Placed" : "Not Placed"}
                    </span>
                    <span className="text-xs text-gray-400">{h.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}