// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Search, ShieldCheck } from "lucide-react";

type DexType = "Exchange" | "Aggregator" | "Tool" | "Host" | "Bridge";

interface DexItem {
  id: string;
  name: string;
  type: DexType;
  description: string;
  score: number;
  kycLevel: 0 | 1 | 2;
  tags: string[];
  verified: boolean;
  approved: boolean;
}

const MOCK_DATA: DexItem[] = [
  {
    id: "robosats",
    name: "RoboSwap",
    type: "Exchange",
    description:
      "P2P non-custodial swap aggregator for BTC and ETH pairs, optimized for privacy-preserving orders.",
    score: 10,
    kycLevel: 0,
    tags: ["BTC", "ETH", "P2P", "Tor"],
    verified: true,
    approved: true,
  },
  {
    id: "lizarddex",
    name: "Lizard DEX",
    type: "Exchange",
    description:
      "Cross-chain swap router using Lizard split-shield routing for best rate & slippage protection.",
    score: 9,
    kycLevel: 0,
    tags: ["Cross-chain", "Router", "Non-custodial"],
    verified: true,
    approved: true,
  },
  {
    id: "boltbridge",
    name: "BoltBridge",
    type: "Bridge",
    description:
      "Fast L2 ↔ L1 bridge for optimistic rollups with on-chain proof-of-liquidity.",
    score: 8,
    kycLevel: 1,
    tags: ["Bridge", "L2", "ETH"],
    verified: true,
    approved: true,
  },
];

type SortOption = "score_desc" | "score_asc" | "name_asc";

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("score_desc");
  const [selectedTypes, setSelectedTypes] = useState<DexType[]>([]);
  const [showVerified, setShowVerified] = useState(true);
  const [showApproved, setShowApproved] = useState(true);

  const results = useMemo(() => {
    let list = [...MOCK_DATA];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.description.toLowerCase().includes(term),
      );
    }

    if (selectedTypes.length) {
      list = list.filter((d) => selectedTypes.includes(d.type));
    }

    if (showVerified) {
      list = list.filter((d) => d.verified);
    }
    if (showApproved) {
      list = list.filter((d) => d.approved);
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "score_asc":
          return a.score - b.score;
        case "name_asc":
          return a.name.localeCompare(b.name);
        default:
          return b.score - a.score;
      }
    });

    return list;
  }, [searchTerm, sortBy, selectedTypes, showVerified, showApproved]);

  const toggleType = (t: DexType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  return (
    <div className="flex flex-1 gap-6">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 rounded-3xl bg-white/70 p-4 shadow-md shadow-emerald-100/60 ring-1 ring-slate-100 md:block">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
          Filters
        </h2>

        {/* Sort */}
        <div className="mb-4 space-y-1">
          <span className="text-xs font-medium text-slate-500">Sort by</span>
          <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-white">
            {sortBy === "score_desc" && "Score (High → Low)"}
            {sortBy === "score_asc" && "Score (Low → High)"}
            {sortBy === "name_asc" && "Name (A → Z)"}
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </button>
          {/* simple sort buttons for now */}
          <div className="flex flex-wrap gap-1 pt-1">
            <button
              onClick={() => setSortBy("score_desc")}
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                sortBy === "score_desc"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Score ↓
            </button>
            <button
              onClick={() => setSortBy("score_asc")}
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                sortBy === "score_asc"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Score ↑
            </button>
            <button
              onClick={() => setSortBy("name_asc")}
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                sortBy === "name_asc"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Name
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 space-y-1">
          <span className="text-xs font-medium text-slate-500">Name</span>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-2 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Type */}
        <div className="mb-4 space-y-1">
          <span className="text-xs font-medium text-slate-500">Type</span>
          <div className="space-y-1 text-xs text-slate-700">
            {(["Exchange", "Aggregator", "Tool", "Host", "Bridge"] as DexType[])
              .map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                    checked={selectedTypes.includes(t)}
                    onChange={() => toggleType(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
          </div>
        </div>

        {/* Verification */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500">
            Verification
          </span>
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              className="h-3 w-3 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              checked={showVerified}
              onChange={(e) => setShowVerified(e.target.checked)}
            />
            <span>Verified</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              className="h-3 w-3 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              checked={showApproved}
              onChange={(e) => setShowApproved(e.target.checked)}
            />
            <span>Approved</span>
          </label>
        </div>
      </aside>

      {/* Main list */}
      <section className="flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              Approved & verified services
            </h1>
            <p className="text-xs text-slate-500">
              {results.length} results • Powered by Lizard directory backend
            </p>
          </div>

          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-emerald-600 shadow-sm ring-1 ring-emerald-100 hover:bg-emerald-50">
            + Add service
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((dex) => (
            <article
              key={dex.id}
              className="flex flex-col rounded-3xl bg-white/90 p-4 shadow-md shadow-slate-200/70 ring-1 ring-slate-100"
            >
              {/* header */}
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-200 via-sky-200 to-purple-200 text-xs font-semibold text-slate-800">
                  {dex.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                      {dex.name}
                    </h2>
                    {dex.verified && (
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {dex.type} • Non-custodial
                  </div>
                </div>
              </div>

              {/* description */}
              <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
                {dex.description}
              </p>

              {/* badges */}
              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-100">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      {dex.score}
                    </span>
                    <span>Score</span>
                  </div>
                  <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-100">
                    KYC {dex.kycLevel}
                  </span>
                </div>

                <div className="flex flex-wrap justify-end gap-1">
                  {dex.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-500 ring-1 ring-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {results.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-xs text-slate-500">
              No services match the current filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
