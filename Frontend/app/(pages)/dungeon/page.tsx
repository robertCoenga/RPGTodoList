"use client";
import { AlertCircle, Check, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * Página Dungeon - Gerenciamento de Casa/Estoque
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Listagem de itens, barra de progresso, relação com tarefas de lista de compras
 */

interface StockItem {
  id: string;
  name: string;
  inStock: boolean;
  quantity: number;
  totalQuantity: number;
  category: "essencial" | "importante" | "luxo";
  addedToShoppingList: boolean;
}

export default function Dungeon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "todas" | "essencial" | "importante" | "luxo"
  >("todas");
  const [items, setItems] = useState<StockItem[]>([
    // Essenciais
    {
      id: "1",
      name: "Arroz",
      inStock: true,
      quantity: 2,
      totalQuantity: 5,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "2",
      name: "Feijão",
      inStock: true,
      quantity: 1,
      totalQuantity: 5,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "3",
      name: "Leite",
      inStock: false,
      quantity: 0,
      totalQuantity: 3,
      category: "essencial",
      addedToShoppingList: true
    },
    {
      id: "4",
      name: "Pão",
      inStock: true,
      quantity: 1,
      totalQuantity: 3,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "5",
      name: "Ovos",
      inStock: true,
      quantity: 2,
      totalQuantity: 12,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "6",
      name: "Sal",
      inStock: true,
      quantity: 1,
      totalQuantity: 2,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "7",
      name: "Óleo",
      inStock: true,
      quantity: 1,
      totalQuantity: 2,
      category: "essencial",
      addedToShoppingList: false
    },
    {
      id: "8",
      name: "Açúcar",
      inStock: true,
      quantity: 1,
      totalQuantity: 3,
      category: "essencial",
      addedToShoppingList: false
    },

    // Importantes
    {
      id: "9",
      name: "Café",
      inStock: true,
      quantity: 1,
      totalQuantity: 2,
      category: "importante",
      addedToShoppingList: false
    },
    {
      id: "10",
      name: "Chocolate",
      inStock: false,
      quantity: 0,
      totalQuantity: 2,
      category: "importante",
      addedToShoppingList: false
    },
    {
      id: "11",
      name: "Biscoito",
      inStock: true,
      quantity: 1,
      totalQuantity: 3,
      category: "importante",
      addedToShoppingList: false
    },
    {
      id: "12",
      name: "Suco",
      inStock: true,
      quantity: 2,
      totalQuantity: 4,
      category: "importante",
      addedToShoppingList: false
    },

    // Luxo
    {
      id: "13",
      name: "Sorvete",
      inStock: false,
      quantity: 0,
      totalQuantity: 2,
      category: "luxo",
      addedToShoppingList: false
    },
    {
      id: "14",
      name: "Refrigerante",
      inStock: true,
      quantity: 1,
      totalQuantity: 3,
      category: "luxo",
      addedToShoppingList: false
    },
    {
      id: "15",
      name: "Doces",
      inStock: true,
      quantity: 2,
      totalQuantity: 3,
      category: "luxo",
      addedToShoppingList: false
    }
  ]);

  const categoryColors = {
    essencial: {
      bg: "bg-red-900/30",
      text: "text-red-300",
      border: "border-red-500/30",
      icon: "⚔️"
    },
    importante: {
      bg: "bg-yellow-900/30",
      text: "text-yellow-300",
      border: "border-yellow-500/30",
      icon: "🛡️"
    },
    luxo: {
      bg: "bg-purple-900/30",
      text: "text-purple-300",
      border: "border-purple-500/30",
      icon: "✨"
    }
  };

  // Filtrar itens
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "todas" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  // Calcular itens que precisam ser adicionados à lista de compras
  const itemsNeedingRestock = useMemo(() => {
    return items.filter((item) => {
      const percentage = (item.quantity / item.totalQuantity) * 100;
      if (
        item.category === "essencial" &&
        percentage < 30 &&
        !item.addedToShoppingList
      ) {
        return true;
      }
      if (
        (item.category === "importante" || item.category === "luxo") &&
        !item.inStock &&
        !item.addedToShoppingList
      ) {
        return true;
      }
      return false;
    });
  }, [items]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = items.length;
    const inStock = items.filter((i) => i.inStock).length;
    const needsRestock = itemsNeedingRestock.length;
    const essentialItems = items.filter(
      (i) => i.category === "essencial"
    ).length;
    const essentialInStock = items.filter(
      (i) => i.category === "essencial" && i.inStock
    ).length;

    return { total, inStock, needsRestock, essentialItems, essentialInStock };
  }, [items, itemsNeedingRestock]);

  // Adicionar item à lista de compras
  const addToShoppingList = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, addedToShoppingList: true } : item
      )
    );
  };

  // Toggle item em estoque
  const toggleInStock = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  // Remover item
  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Calcular porcentagem
  const getPercentage = (quantity: number, total: number) => {
    return Math.round((quantity / total) * 100);
  };

  // Cor da barra de progresso
  const getProgressColor = (percentage: number) => {
    if (percentage >= 50) return "bg-green-500";
    if (percentage >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-cyan-300 uppercase tracking-widest mb-2">
              🏰 Dungeon
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              Gerencie seu estoque de casa e controle a lista de compras
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-xs font-mono text-cyan-300 uppercase mb-1">
                Total de Itens
              </p>
              <p className="text-2xl font-bold text-cyan-400">{stats.total}</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-xs font-mono text-green-300 uppercase mb-1">
                Em Estoque
              </p>
              <p className="text-2xl font-bold text-green-400">
                {stats.inStock}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-xs font-mono text-red-300 uppercase mb-1">
                Precisa Restock
              </p>
              <p className="text-2xl font-bold text-red-400">
                {stats.needsRestock}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-xs font-mono text-yellow-300 uppercase mb-1">
                Essenciais
              </p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.essentialInStock}/{stats.essentialItems}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-xs font-mono text-purple-300 uppercase mb-1">
                Lista de Compras
              </p>
              <p className="text-2xl font-bold text-purple-400">
                {items.filter((i) => i.addedToShoppingList).length}
              </p>
            </div>
          </div>

          {/* Alert Section - Itens que precisam ser adicionados */}
          {itemsNeedingRestock.length > 0 && (
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle
                  size={24}
                  className="text-orange-400 flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-300 mb-2">
                    ⚠️ Itens Precisando de Restock
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    {itemsNeedingRestock.length} item(ns) precisam ser
                    adicionados à lista de compras
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {itemsNeedingRestock.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addToShoppingList(item.id)}
                        className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500 rounded-lg text-orange-300 hover:bg-orange-500/30 transition-all duration-300 text-sm font-mono"
                      >
                        <ShoppingCart size={14} />
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Section */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan">
            {/* Toolbar */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
              {/* Search */}
              <div className="flex-1 relative min-w-64">
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                />
              </div>

              {/* Add New Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 font-mono text-sm">
                <Plus size={16} />
                Novo Item
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
              {(["essencial", "importante", "luxo"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 border flex items-center gap-2 ${
                    selectedCategory === cat
                      ? `${categoryColors[cat].bg} ${categoryColors[cat].text} ${categoryColors[cat].border}`
                      : "bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-400"
                  }`}
                >
                  <span>{categoryColors[cat].icon}</span>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                  const percentage = getPercentage(
                    item.quantity,
                    item.totalQuantity
                  );
                  const categoryColor = categoryColors[item.category];
                  const isLowStock = percentage < 30;
                  const isOutOfStock = !item.inStock;

                  return (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 transition-all duration-300 ${
                        isOutOfStock
                          ? "bg-red-900/20 border-red-500/30"
                          : isLowStock
                            ? "bg-yellow-900/20 border-yellow-500/30"
                            : `${categoryColor.bg} ${categoryColor.border}`
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">
                              {categoryColor.icon}
                            </span>
                            <h3 className="font-bold text-white">
                              {item.name}
                            </h3>
                          </div>
                          <div
                            className={`inline-block px-2 py-1 rounded-sm border text-xs font-mono font-bold ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border}`}
                          >
                            {item.category.charAt(0).toUpperCase() +
                              item.category.slice(1)}
                          </div>
                        </div>

                        {/* Checkbox */}
                        <button
                          onClick={() => toggleInStock(item.id)}
                          className={`p-2 rounded-lg transition-all duration-300 border ${
                            item.inStock
                              ? "bg-green-500/20 border-green-500 text-green-400"
                              : "bg-red-500/20 border-red-500 text-red-400"
                          }`}
                        >
                          <Check size={18} />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400 font-mono">
                            {item.quantity} / {item.totalQuantity}
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              percentage >= 50
                                ? "text-green-400"
                                : percentage >= 30
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                          <div
                            className={`h-full transition-all duration-300 ${getProgressColor(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mb-4">
                        {isOutOfStock && (
                          <div className="text-xs text-red-300 font-mono bg-red-900/30 border border-red-500/30 rounded px-2 py-1">
                            ❌ Fora de Estoque
                          </div>
                        )}
                        {isLowStock && !isOutOfStock && (
                          <div className="text-xs text-yellow-300 font-mono bg-yellow-900/30 border border-yellow-500/30 rounded px-2 py-1">
                            ⚠️ Estoque Baixo
                          </div>
                        )}
                        {item.addedToShoppingList && (
                          <div className="text-xs text-purple-300 font-mono bg-purple-900/30 border border-purple-500/30 rounded px-2 py-1">
                            🛒 Na Lista de Compras
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!item.addedToShoppingList &&
                          (isOutOfStock || isLowStock) && (
                            <button
                              onClick={() => addToShoppingList(item.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all duration-300 text-sm font-mono"
                            >
                              <ShoppingCart size={14} />
                              Adicionar
                            </button>
                          )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-red-400 hover:text-red-300"
                          title="Remover"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <p className="text-sm">Nenhum item encontrado</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
