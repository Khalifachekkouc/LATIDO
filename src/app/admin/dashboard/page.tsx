"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/firestore";
import { addMenuItem as seedAdd } from "@/lib/firestore";
import { SEED_MENU } from "@/lib/seedData";
import type { MenuItem } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, RefreshCw, Database } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import MenuItemForm from "@/components/admin/MenuItemForm";

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<MenuItem | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setAuthed(true);
        setChecking(false);
        loadItems();
      }
    });
    return unsub;
  }, []);

  async function loadItems() {
    setLoading(true);
    const data = await getMenuItems();
    setItems(data);
    setLoading(false);
  }

  async function handleSeed() {
    setSeeding(true);
    try {
      for (const item of SEED_MENU) {
        await seedAdd(item);
      }
      await loadItems();
      toast.success("Menu seeded successfully!");
    } catch {
      toast.error("Seed failed");
    } finally {
      setSeeding(false);
    }
  }

  async function handleDelete(item: MenuItem) {
    await deleteMenuItem(item.id);
    setDeleteConfirm(null);
    await loadItems();
    toast.success(`${item.name} deleted`);
  }

  async function handleToggle(item: MenuItem) {
    await updateMenuItem(item.id, { available: !item.available });
    await loadItems();
    toast.success(
      `${item.name} marked ${!item.available ? "available" : "unavailable"}`
    );
  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }



  if (checking) {
    return (
      <div className="min-h-screen bg-yellow flex items-center justify-center">
        <p className="font-black text-2xl uppercase animate-pulse">Checking Auth...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <header className="bg-black text-white border-b-4 border-yellow sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-black text-yellow"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            LATIDO <span className="text-white text-sm font-mono">/ admin</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={loadItems}
              disabled={loading}
              className="flex items-center gap-2 bg-yellow text-black font-black uppercase text-xs px-3 py-2 border-2 border-yellow hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-3 py-2 border-2 border-yellow hover:bg-yellow transition-colors disabled:opacity-50"
            >
              <Database size={14} />
              {seeding ? "Seeding..." : "Seed Demo"}
            </button>
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 bg-yellow text-black font-black uppercase text-xs px-3 py-2 border-2 border-yellow hover:bg-yellow-300 transition-colors"
            >
              <Plus size={14} />
              Add Item
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-transparent border-2 border-yellow/50 text-yellow font-mono text-xs px-3 py-2 hover:border-yellow transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 mb-8">
          {CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            return (
              <div key={cat} className="bg-white brut-border brut-shadow p-4 text-center">
                <p className="font-mono text-xs uppercase text-gray-500">{cat}</p>
                <p className="font-black text-3xl">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Table + Filter */}
        <div className="bg-white brut-border brut-shadow overflow-x-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b-2 border-black gap-4">
            <h2 className="font-black uppercase">Menu Items ({filteredItems.length})</h2>
            
            <div className="flex bg-gray-100 border-2 border-black p-1 max-w-full overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1 text-xs font-mono font-bold whitespace-nowrap transition-colors ${selectedCategory === "All" ? "bg-yellow border-2 border-black" : "hover:bg-gray-200 border-2 border-transparent"}`}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? "bg-yellow border-2 border-black" : "hover:bg-gray-200 border-2 border-transparent"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-black">
                <TableHead className="font-black uppercase text-black">Name</TableHead>
                <TableHead className="font-black uppercase text-black">Category</TableHead>
                <TableHead className="font-black uppercase text-black">Price</TableHead>
                <TableHead className="font-black uppercase text-black">Status</TableHead>
                <TableHead className="font-black uppercase text-black">Variants</TableHead>
                <TableHead className="font-black uppercase text-black text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 bg-gray-100 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-400 font-mono">
                    No items found for {selectedCategory}.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-100 hover:bg-yellow/10">
                    <TableCell className="font-black uppercase text-sm">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono rounded-none border-2 border-black text-xs">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="price-tag font-bold">
                      {item.variants && item.variants.length > 0
                        ? `${item.variants[0].price}–${item.variants.at(-1)!.price}`
                        : item.basePrice}{" "}
                      DHS
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleToggle(item)}
                        className={`text-xs font-mono font-bold px-2 py-1 border-2 border-black transition-colors ${
                          item.available
                            ? "bg-yellow hover:bg-red-100"
                            : "bg-red-100 hover:bg-yellow"
                        }`}
                      >
                        {item.available ? "✓ Active" : "✗ Off"}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {item.variants && item.variants.length > 0 && (
                          <span className="text-xs font-mono bg-gray-100 border border-black px-1">Variants</span>
                        )}
                        {item.hasSauces && (
                          <span className="text-xs font-mono bg-gray-100 border border-black px-1">Sauces</span>
                        )}
                        {item.hasSupplements && (
                          <span className="text-xs font-mono bg-gray-100 border border-black px-1">Sups</span>
                        )}
                        {item.hasExtras && (
                          <span className="text-xs font-mono bg-gray-100 border border-black px-1">Extras</span>
                        )}
                        {item.hasFormule && (
                          <span className="text-xs font-mono bg-yellow border border-black px-1">Formule</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 border-2 border-black hover:bg-yellow transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item)}
                          className="p-2 border-2 border-black hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[800px] w-full border-4 border-black rounded-none brut-shadow p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader className="p-6 border-b-4 border-black bg-yellow">
            <DialogTitle className="font-black uppercase text-xl">New Menu Item</DialogTitle>
          </DialogHeader>
          <MenuItemForm
            onSave={async (data) => {
              await addMenuItem(data);
              await loadItems();
              setCreateOpen(false);
              toast.success("Item created!");
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
        <DialogContent className="sm:max-w-[800px] w-full border-4 border-black rounded-none brut-shadow p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader className="p-6 border-b-4 border-black bg-yellow">
            <DialogTitle className="font-black uppercase text-xl">Edit: {editItem?.name}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <MenuItemForm
              initialData={editItem}
              onSave={async (data) => {
                await updateMenuItem(editItem.id, data);
                await loadItems();
                setEditItem(null);
                toast.success("Item updated!");
              }}
              onCancel={() => setEditItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={(v) => !v && setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm border-4 border-black rounded-none brut-shadow bg-white">
          <DialogHeader>
            <DialogTitle className="font-black uppercase">Delete &ldquo;{deleteConfirm?.name}&rdquo;?</DialogTitle>
          </DialogHeader>
          <p className="font-mono text-sm text-gray-600 mb-4">This cannot be undone.</p>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 border-2 border-black font-black uppercase py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="flex-1 bg-red-500 text-white font-black uppercase py-2 border-2 border-black brut-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
