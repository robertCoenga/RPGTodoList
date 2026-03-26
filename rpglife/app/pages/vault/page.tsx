"use client";
import {
  DollarSign,
  Plus,
  Search,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AccountsTable } from "../../components/AccountsTable";
import { ExpandableSidebar } from "../../components/ExpandableSidebar";

/**
 * Página de Cofre (Financial Dashboard)
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Gráficos de previsão, pizza de distribuição, tabelas de contas, filtro por categoria
 */

interface Account {
  id: string;
  description: string;
  type: "ganho" | "gasto";
  amount: number;
  date: string;
  status: "planejado" | "pendente" | "pago" | "removido";
  category:
    | "Casa"
    | "Alimentação"
    | "Transporte"
    | "Saúde"
    | "Investimento"
    | "Lazer"
    | "Outros";
  associatedTo?: string;
}

export default function Vault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<
    "mes-atual" | "todas" | "planejamento"
  >("mes-atual");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const categories = [
    "Casa",
    "Alimentação",
    "Transporte",
    "Saúde",
    "Investimento",
    "Lazer",
    "Outros"
  ];
  const categoryColors: Record<
    string,
    { bg: string; text: string; border: string; chart: string }
  > = {
    Casa: {
      bg: "bg-blue-900/40",
      text: "text-blue-300",
      border: "border-blue-500/30",
      chart: "#3b82f6"
    },
    Alimentação: {
      bg: "bg-orange-900/40",
      text: "text-orange-300",
      border: "border-orange-500/30",
      chart: "#f97316"
    },
    Transporte: {
      bg: "bg-purple-900/40",
      text: "text-purple-300",
      border: "border-purple-500/30",
      chart: "#a855f7"
    },
    Saúde: {
      bg: "bg-green-900/40",
      text: "text-green-300",
      border: "border-green-500/30",
      chart: "#10b981"
    },
    Investimento: {
      bg: "bg-yellow-900/40",
      text: "text-yellow-300",
      border: "border-yellow-500/30",
      chart: "#eab308"
    },
    Lazer: {
      bg: "bg-pink-900/40",
      text: "text-pink-300",
      border: "border-pink-500/30",
      chart: "#ec4899"
    },
    Outros: {
      bg: "bg-slate-700/40",
      text: "text-slate-300",
      border: "border-slate-500/30",
      chart: "#64748b"
    }
  };

  // Dados de contas
  const allAccounts: Account[] = [
    // Março (Mês Atual)
    {
      id: "1",
      description: "Salário",
      type: "ganho",
      amount: 5000,
      date: "01/03/2026",
      status: "pago",
      category: "Investimento",
      associatedTo: "Trabalho"
    },
    {
      id: "2",
      description: "Aluguel",
      type: "gasto",
      amount: 1500,
      date: "05/03/2026",
      status: "pago",
      category: "Casa"
    },
    {
      id: "3",
      description: "Supermercado",
      type: "gasto",
      amount: 800,
      date: "10/03/2026",
      status: "pago",
      category: "Alimentação"
    },
    {
      id: "4",
      description: "Internet",
      type: "gasto",
      amount: 150,
      date: "12/03/2026",
      status: "pendente",
      category: "Casa"
    },
    {
      id: "5",
      description: "Freelance",
      type: "ganho",
      amount: 1200,
      date: "15/03/2026",
      status: "pago",
      category: "Investimento",
      associatedTo: "Projeto X"
    },
    {
      id: "6",
      description: "Academia",
      type: "gasto",
      amount: 100,
      date: "18/03/2026",
      status: "planejado",
      category: "Saúde",
      associatedTo: "Treinar musculação"
    },
    {
      id: "7",
      description: "Curso Online",
      type: "gasto",
      amount: 300,
      date: "20/03/2026",
      status: "pendente",
      category: "Investimento",
      associatedTo: "React Avançado"
    },
    {
      id: "8",
      description: "Bônus",
      type: "ganho",
      amount: 800,
      date: "25/03/2026",
      status: "planejado",
      category: "Investimento"
    },
    {
      id: "9",
      description: "Uber",
      type: "gasto",
      amount: 50,
      date: "18/03/2026",
      status: "pago",
      category: "Transporte"
    },
    {
      id: "10",
      description: "Cinema",
      type: "gasto",
      amount: 60,
      date: "22/03/2026",
      status: "pago",
      category: "Lazer"
    },
    {
      id: "11",
      description: "Farmácia",
      type: "gasto",
      amount: 120,
      date: "25/03/2026",
      status: "pago",
      category: "Saúde"
    },

    // Abril
    {
      id: "12",
      description: "Salário",
      type: "ganho",
      amount: 5000,
      date: "01/04/2026",
      status: "planejado",
      category: "Investimento"
    },
    {
      id: "13",
      description: "Aluguel",
      type: "gasto",
      amount: 1500,
      date: "05/04/2026",
      status: "planejado",
      category: "Casa"
    },

    // Fevereiro
    {
      id: "14",
      description: "Salário",
      type: "ganho",
      amount: 5000,
      date: "01/02/2026",
      status: "pago",
      category: "Investimento"
    },
    {
      id: "15",
      description: "Aluguel",
      type: "gasto",
      amount: 1500,
      date: "05/02/2026",
      status: "pago",
      category: "Casa"
    },
    {
      id: "16",
      description: "Restaurante",
      type: "gasto",
      amount: 750,
      date: "10/02/2026",
      status: "pago",
      category: "Alimentação"
    }
  ];

  // Dados para gráfico de linha (mês a mês)
  const monthlyData = [
    { month: "Jan", ganho: 5000, gasto: 2500 },
    { month: "Fev", ganho: 5000, gasto: 2250 },
    { month: "Mar", ganho: 7000, gasto: 2950 },
    { month: "Abr", ganho: 5000, gasto: 1500 },
    { month: "Mai", ganho: 5500, gasto: 2700 },
    { month: "Jun", ganho: 6000, gasto: 2800 },
    { month: "Jul", ganho: 5200, gasto: 2400 },
    { month: "Ago", ganho: 5800, gasto: 2600 },
    { month: "Set", ganho: 6200, gasto: 2900 },
    { month: "Out", ganho: 5900, gasto: 2700 },
    { month: "Nov", ganho: 6500, gasto: 3000 },
    { month: "Dez", ganho: 7000, gasto: 3500 }
  ];

  // Dados para gráfico de pizza
  const currentMonthGanho = allAccounts
    .filter((a) => a.type === "ganho" && a.date.includes("/03/"))
    .reduce((sum, a) => sum + a.amount, 0);

  const currentMonthGasto = allAccounts
    .filter((a) => a.type === "gasto" && a.date.includes("/03/"))
    .reduce((sum, a) => sum + a.amount, 0);

  const fundoSeguranca = currentMonthGanho * 0.1; // 10% do ganho

  const pieData = [
    { name: "Ganho", value: currentMonthGanho },
    { name: "Gasto", value: currentMonthGasto },
    { name: "Fundo de Segurança", value: fundoSeguranca }
  ];

  const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

  // Filtrar contas por aba
  const currentMonthAccounts = allAccounts.filter((a) =>
    a.date.includes("/03/")
  );
  const filteredAccounts =
    selectedTab === "mes-atual"
      ? currentMonthAccounts
      : selectedTab === "todas"
        ? allAccounts
        : allAccounts.filter((a) => a.status === "planejado");

  const displayedAccounts = filteredAccounts.filter(
    (a) =>
      a.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "todas" || a.category === selectedCategory)
  );

  const sobra = currentMonthGanho - currentMonthGasto;

  // Dados por categoria para o mês atual
  const categoryData = categories
    .map((cat) => ({
      name: cat,
      ganho: currentMonthAccounts
        .filter((a) => a.type === "ganho" && a.category === cat)
        .reduce((sum, a) => sum + a.amount, 0),
      gasto: currentMonthAccounts
        .filter((a) => a.type === "gasto" && a.category === cat)
        .reduce((sum, a) => sum + a.amount, 0)
    }))
    .filter((c) => c.ganho > 0 || c.gasto > 0);

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
              💰 Cofre
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              Gerencie seus ganhos, gastos e planejamento financeiro
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-mono text-green-300 uppercase">
                  Ganho (Mês)
                </p>
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-400">
                R$ {currentMonthGanho.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-mono text-red-300 uppercase">
                  Gasto (Mês)
                </p>
                <TrendingDown size={20} className="text-red-400" />
              </div>
              <p className="text-3xl font-bold text-red-400">
                R$ {currentMonthGasto.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-mono text-yellow-300 uppercase">
                  Sobra
                </p>
                <DollarSign size={20} className="text-yellow-400" />
              </div>
              <p className="text-3xl font-bold text-yellow-400">
                R$ {sobra.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-mono text-cyan-300 uppercase">
                  Fundo Segurança
                </p>
                <DollarSign size={20} className="text-cyan-400" />
              </div>
              <p className="text-3xl font-bold text-cyan-400">
                R$ {fundoSeguranca.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Line Chart - Previsão Mês a Mês */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                📈 Previsão Anual
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
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
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Ganho"
                  />
                  <Line
                    type="monotone"
                    dataKey="gasto"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Gasto"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Distribuição */}
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
              <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
                🥧 Distribuição (Mês)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name}: R$ ${value.toFixed(0)}`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f3a",
                      border: "1px solid #00d9ff"
                    }}
                    labelStyle={{ color: "#e0e0ff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Chart */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan mb-8">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-4">
              📊 Gastos por Categoria (Mês)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
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
                <Bar dataKey="ganho" fill="#10b981" name="Ganho" />
                <Bar dataKey="gasto" fill="#ef4444" name="Gasto" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Accounts Section */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-cyan-500/20 pb-4">
              <button
                onClick={() => setSelectedTab("mes-atual")}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  selectedTab === "mes-atual"
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                    : "bg-slate-800/50 border border-cyan-500/30 text-slate-400 hover:border-cyan-400"
                }`}
              >
                Contas do Mês Atual
              </button>
              <button
                onClick={() => setSelectedTab("todas")}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  selectedTab === "todas"
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                    : "bg-slate-800/50 border border-cyan-500/30 text-slate-400 hover:border-cyan-400"
                }`}
              >
                Todas as Contas
              </button>
              <button
                onClick={() => setSelectedTab("planejamento")}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  selectedTab === "planejamento"
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                    : "bg-slate-800/50 border border-cyan-500/30 text-slate-400 hover:border-cyan-400"
                }`}
              >
                Planejamento (Sonhos & Metas)
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex gap-4 mb-6 flex-wrap">
              {/* Search */}
              <div className="flex-1 relative min-w-64">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Buscar contas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                />
              </div>

              {/* Add New Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 font-mono text-sm">
                <Plus size={16} />
                Nova Conta
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap mb-6 pb-4 border-b border-cyan-500/20">
              <button
                onClick={() => setSelectedCategory("todas")}
                className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 border ${
                  selectedCategory === "todas"
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                    : "bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-400"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 border ${
                    selectedCategory === cat
                      ? `${categoryColors[cat].bg} ${categoryColors[cat].text} ${categoryColors[cat].border}`
                      : "bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accounts Table */}
            {displayedAccounts.length > 0 ? (
              <AccountsTable accounts={displayedAccounts} />
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <p className="text-sm">Nenhuma conta encontrada</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
