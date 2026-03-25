import React, { useState } from 'react';
import { ChevronRight, Trash2, Edit2, TrendingUp, TrendingDown } from 'lucide-react';

interface Account {
  id: string;
  description: string;
  type: 'ganho' | 'gasto';
  amount: number;
  date: string;
  status: 'planejado' | 'pendente' | 'pago' | 'removido';
  category: 'Casa' | 'Alimentação' | 'Transporte' | 'Saúde' | 'Investimento' | 'Lazer' | 'Outros';
  associatedTo?: string; // Projeto, Hábito ou Tarefa
}

interface AccountsTableProps {
  accounts: Account[];
  onEdit?: (accountId: string) => void;
  onDelete?: (accountId: string) => void;
}

/**
 * Tabela de contas para o Cofre
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Tabela interativa, tags de tipo, status badges
 */
export function AccountsTable({ accounts, onEdit, onDelete }: AccountsTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const statusColors = {
    'planejado': { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-500/30' },
    'pendente': { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-500/30' },
    'pago': { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-500/30' },
    'removido': { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-500/30' },
  };

  const statusLabels = {
    'planejado': 'Planejado',
    'pendente': 'Pendente',
    'pago': 'Pago',
    'removido': 'Removido',
  };

  const typeColors = {
    'ganho': 'text-green-400',
    'gasto': 'text-red-400',
  };

  const typeLabels = {
    'ganho': 'Ganho',
    'gasto': 'Gasto',
  };

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'Casa': { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-500/30' },
    'Alimentação': { bg: 'bg-orange-900/30', text: 'text-orange-300', border: 'border-orange-500/30' },
    'Transporte': { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-500/30' },
    'Saúde': { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-500/30' },
    'Investimento': { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-500/30' },
    'Lazer': { bg: 'bg-pink-900/30', text: 'text-pink-300', border: 'border-pink-500/30' },
    'Outros': { bg: 'bg-slate-700/30', text: 'text-slate-300', border: 'border-slate-500/30' },
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b-2 border-cyan-500/30 bg-slate-900/50">
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Associado
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {accounts.map((account, index) => {
            const isHovered = hoveredRow === account.id;
            const statusColor = statusColors[account.status];
            const typeColor = typeColors[account.type];

            return (
              <tr
                key={account.id}
                className={`border-b border-cyan-500/20 transition-all duration-300 group ${
                  isHovered ? 'bg-slate-800/50 border-cyan-500/50' : 'bg-slate-900/30 hover:bg-slate-800/30'
                } ${index % 2 === 0 ? 'bg-opacity-50' : ''}`}
                onMouseEnter={() => setHoveredRow(account.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Descrição */}
                <td className="px-6 py-5">
                  <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {account.description}
                  </span>
                </td>

                {/* Tipo */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    {account.type === 'ganho' ? (
                      <TrendingUp size={16} className={typeColor} />
                    ) : (
                      <TrendingDown size={16} className={typeColor} />
                    )}
                    <span className={`text-sm font-mono font-bold ${typeColor}`}>
                      {typeLabels[account.type]}
                    </span>
                  </div>
                </td>

                {/* Valor */}
                <td className="px-6 py-5">
                  <span className={`text-sm font-mono font-bold ${typeColor}`}>
                    {account.type === 'ganho' ? '+' : '-'} R$ {account.amount.toFixed(2)}
                  </span>
                </td>

                {/* Data */}
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-400 font-mono">
                    {account.date}
                  </span>
                </td>

                {/* Categoria */}
                <td className="px-6 py-5">
                  <div
                    className={`inline-block px-3 py-1 rounded-sm border text-xs font-mono font-bold transition-all duration-300 ${categoryColors[account.category].bg} ${categoryColors[account.category].text} ${categoryColors[account.category].border}`}
                  >
                    {account.category}
                  </div>
                </td>

                {/* Associado */}
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-400">
                    {account.associatedTo || '—'}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <div
                    className={`inline-block px-3 py-1 rounded-sm border text-xs font-mono font-bold transition-all duration-300 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                  >
                    {statusLabels[account.status]}
                  </div>
                </td>

                {/* Ações */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(account.id)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete?.(account.id)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-red-400 hover:text-red-300"
                      title="Deletar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
