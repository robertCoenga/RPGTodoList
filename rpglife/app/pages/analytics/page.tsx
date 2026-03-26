"use client";
import { Target, TrendingDown, TrendingUp, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ExpandableSidebar } from "../../components/ExpandableSidebar";

/**
 * Página de Gráficos e Análises
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Múltiplas visualizações de dados (projetos, metas, hábitos, financeiro)
 */

export default function Analytics() {
  // Dados de Projetos
  const projectsData = [
    { name: "CantinaBeat", feitas: 45, aFazer: 55 },
    { name: "QA - Reports", feitas: 62, aFazer: 38 },
    { name: "RPG - ToDoList", feitas: 78, aFazer: 22 },
    { name: "Notion Setup", feitas: 30, aFazer: 70 }
  ];

  // Dados de Metas
  const metasData = [
    { name: "Habituação", value: 85 },
    { name: "Treinar musculação", value: 72 },
    { name: "Cuidar da saúde", value: 68 },
    { name: "Regular o sono", value: 55 }
  ];

  // Dados de Hábitos
  const habitosData = [
    { name: "Exercício", feitas: 18, naoFeitas: 2, porcentagem: 90 },
    { name: "Meditação", feitas: 12, naoFeitas: 8, porcentagem: 60 },
    { name: "Leitura", feitas: 15, naoFeitas: 5, porcentagem: 75 },
    { name: "Estudo", feitas: 20, naoFeitas: 10, porcentagem: 67 },
    { name: "Bem-estar", feitas: 14, naoFeitas: 6, porcentagem: 70 }
  ];

  // Dados Financeiros Anuais
  const financialYearData = [
    { month: "Jan", ganho: 5000, gasto: 2500, saldo: 2500 },
    { month: "Fev", ganho: 5000, gasto: 2250, saldo: 2750 },
    { month: "Mar", ganho: 7000, gasto: 2950, saldo: 4050 },
    { month: "Abr", ganho: 5000, gasto: 1500, saldo: 3500 },
    { month: "Mai", ganho: 5500, gasto: 2700, saldo: 2800 },
    { month: "Jun", ganho: 6000, gasto: 2800, saldo: 3200 },
    { month: "Jul", ganho: 5200, gasto: 2400, saldo: 2800 },
    { month: "Ago", ganho: 5800, gasto: 2600, saldo: 3200 },
    { month: "Set", ganho: 6200, gasto: 2900, saldo: 3300 },
    { month: "Out", ganho: 5900, gasto: 2700, saldo: 3200 },
    { month: "Nov", ganho: 6500, gasto: 3000, saldo: 3500 },
    { month: "Dez", ganho: 7000, gasto: 3500, saldo: 3500 }
  ];

  // Dados Financeiros Mensais
  const financialMonthData = [
    { category: "Ganho", value: 7000, color: "#10b981" },
    { category: "Gasto", value: 2850, color: "#ef4444" },
    { category: "Saldo", value: 4150, color: "#f59e0b" }
  ];

  const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6"];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <ExpandableSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-cyan-300 uppercase tracking-widest mb-2">
              📊 Gráficos & Análises
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              Visualize seu progresso em projetos, metas, hábitos e financeiro
            </p>
          </div>

          {/* Projetos Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Conclusão de Projetos */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                📈 Conclusão de Projetos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3561" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f3a",
                      border: "1px solid #00d9ff"
                    }}
                    labelStyle={{ color: "#e0e0ff" }}
                  />
                  <Legend />
                  <Bar dataKey="feitas" fill="#10b981" name="Feitas" />
                  <Bar dataKey="aFazer" fill="#ef4444" name="A Fazer" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Metas e Objetivos */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                🎯 Metas & Objetivos
              </h2>
              <div className="space-y-4">
                {metasData.map((meta, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-mono text-slate-300">
                        {meta.name}
                      </span>
                      <span className="text-sm font-mono text-cyan-300 font-bold">
                        {meta.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 border border-cyan-500/20 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500"
                        style={{
                          width: `${meta.value}%`,
                          boxShadow: "0 0 10px rgba(0, 217, 255, 0.5)"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hábitos Section */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan mb-8">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-6">
              🔥 Hábitos - Porcentagem de Conclusão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {habitosData.map((habito, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 text-center"
                >
                  <h3 className="text-sm font-mono text-slate-300 mb-3">
                    {habito.name}
                  </h3>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-cyan-400">
                      {habito.porcentagem}%
                    </div>
                  </div>
                  <div className="h-1 bg-slate-700 border border-cyan-500/20 rounded-sm overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500"
                      style={{
                        width: `${habito.porcentagem}%`,
                        boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)"
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span className="text-green-400">{habito.feitas} ✓</span>
                    <span className="text-red-400">{habito.naoFeitas} ✗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financeiro Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Balanço Anual */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                💰 Balanço Anual
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialYearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3561" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f3a",
                      border: "1px solid #00d9ff"
                    }}
                    labelStyle={{ color: "#e0e0ff" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ganho"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 3 }}
                    name="Ganho"
                  />
                  <Line
                    type="monotone"
                    dataKey="gasto"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 3 }}
                    name="Gasto"
                  />
                  <Line
                    type="monotone"
                    dataKey="saldo"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", r: 3 }}
                    name="Saldo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Balanço Mensal */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                📅 Balanço do Mês (Março)
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-green-300 uppercase mb-2">
                    Ganho
                  </p>
                  <p className="text-2xl font-bold text-green-400">R$ 7.000</p>
                </div>
                <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-red-300 uppercase mb-2">
                    Gasto
                  </p>
                  <p className="text-2xl font-bold text-red-400">R$ 2.850</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-yellow-300 uppercase mb-2">
                    Saldo
                  </p>
                  <p className="text-2xl font-bold text-yellow-400">R$ 4.150</p>
                </div>
              </div>

              {/* Mini Bar Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={financialMonthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3561" />
                  <XAxis dataKey="category" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f3a",
                      border: "1px solid #00d9ff"
                    }}
                    labelStyle={{ color: "#e0e0ff" }}
                  />
                  <Bar dataKey="value" fill="#00d9ff" name="Valor (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resumo Geral */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap size={20} className="text-cyan-400" />
              </div>
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Projetos Ativos
              </p>
              <p className="text-3xl font-bold text-cyan-400">4</p>
            </div>

            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target size={20} className="text-magenta-400" />
              </div>
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Metas Ativas
              </p>
              <p className="text-3xl font-bold text-magenta-400">4</p>
            </div>

            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Hábitos Ativos
              </p>
              <p className="text-3xl font-bold text-green-400">5</p>
            </div>

            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingDown size={20} className="text-yellow-400" />
              </div>
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Saldo Anual
              </p>
              <p className="text-3xl font-bold text-yellow-400">R$ 38.5k</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
