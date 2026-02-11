"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, MoreHorizontal, Filter, Download } from "lucide-react";
import { NeuralButton } from "@/components/ui/core/NeuralButton";
import { NeuralInput } from "@/components/ui/core/NeuralInput";
import { NeuralBadge } from "@/components/ui/core/NeuralBadge";
import { NeuralCheckbox } from "@/components/ui/core/NeuralCheckbox";

interface Column<T> {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
    sortable?: boolean;
}

interface NeuralDataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    selectable?: boolean;
    onSelectionChange?: (selectedItems: T[]) => void;
}

export const NeuralDataTable = <T extends { id: string | number }>({
    data,
    columns,
    pageSize = 5,
    selectable = true,
}: NeuralDataTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<Record<string | number, boolean>>({});
    const [filterText, setFilterText] = useState("");

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const paginatedData = filteredData.slice(startIndex, endIndex);

    const toggleRow = (id: string | number) => {
        setSelectedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleAll = () => {
        const allSelected = paginatedData.every(item => selectedRows[item.id]);
        const newSelected = { ...selectedRows };
        paginatedData.forEach(item => {
            newSelected[item.id] = !allSelected;
        });
        setSelectedRows(newSelected);
    };

    const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedRows[item.id]);

    return (
        <div className="w-full space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <NeuralInput
                        placeholder="Filter data..."
                        className="w-64 h-9 text-xs"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <NeuralButton variant="ghost" size="sm" className="h-9 px-3 text-zinc-400">
                        <Filter size={14} className="mr-2" />
                        Filter
                    </NeuralButton>
                </div>
                <div className="flex items-center gap-2">
                    <NeuralButton variant="secondary" size="sm" className="h-9">
                        <Download size={14} className="mr-2" />
                        Export
                    </NeuralButton>
                </div>
            </div>

            {/* Table */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50 backdrop-blur-sm">
                <table className="w-full text-sm text-left font-sans">
                    <thead className="bg-zinc-900/50 text-zinc-400 font-medium border-b border-zinc-800">
                        <tr>
                            {selectable && (
                                <th className="px-4 py-3 w-10">
                                    <NeuralCheckbox
                                        checked={isAllSelected}
                                        onCheckedChange={toggleAll}
                                    />
                                </th>
                            )}
                            {columns.map(col => (
                                <th key={String(col.key)} className="px-4 py-3">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                className={cn(
                                    "group transition-colors hover:bg-zinc-900/30",
                                    selectedRows[item.id] && "bg-emerald-500/5 hover:bg-emerald-500/10"
                                )}
                            >
                                {selectable && (
                                    <td className="px-4 py-3">
                                        <NeuralCheckbox
                                            checked={!!selectedRows[item.id]}
                                            onCheckedChange={() => toggleRow(item.id)}
                                        />
                                    </td>
                                )}
                                {columns.map(col => (
                                    <td key={String(col.key)} className="px-4 py-3 text-zinc-300">
                                        {col.render ? col.render(item[col.key], item) : String(item[col.key])}
                                    </td>
                                ))}
                                <td className="px-4 py-3 text-right">
                                    <button className="text-zinc-500 hover:text-zinc-200 transition-colors">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-xs text-zinc-500 font-sans">
                <div>
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="p-1 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-zinc-300">Page {currentPage} of {totalPages || 1}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="p-1 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
