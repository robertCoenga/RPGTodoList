export default function Analytics() {
    const runes = [
  { icon: "⚔", angle: 0 },
  { icon: "💰", angle: 60 },
  { icon: "📚", angle: 120 },
  { icon: "❤️", angle: 180 },
  { icon: "🏋", angle: 240 },
  { icon: "⭐", angle: 300 },
];
    return (
        <div className="relative w-200 h-200 rounded-full border border-zinc-600">
        {runes.map((rune) => (
  <button
    key={rune.icon}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    style={{
      transform: `
        translate(-50%, -50%)
        rotate(${rune.angle}deg)
        translateY(-300px)
        rotate(-${rune.angle}deg)
      `,
    }}
  >
    {rune.icon}
  </button>
))}

  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-100 h-100 rounded-full border border-zinc-600" />
  </div>

</div>
    )
}