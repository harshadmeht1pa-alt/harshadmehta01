"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserPlus, MessageSquare, IndianRupee, ShieldAlert, LogOut, Check, X, Send, Search, Loader2, Plus, Minus, CreditCard, ImagePlus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Active Users");
  const [chatFilter, setChatFilter] = useState("all"); // all, plan_purchase, deposit

  // Real Database State
  const [profiles, setProfiles] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [withdrawalFilter, setWithdrawalFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<any>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<"add" | "cut">("add");
  const [adminUploading, setAdminUploading] = useState(false);

  useEffect(() => {
    checkAdmin();
    
    // Subscribe to everything for real-time updates
    const channel = supabase
      .channel('admin_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawals' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (profile?.role === "admin") {
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert("Access Denied: You are not an admin.");
        window.location.href = "/dashboard";
      }
    } else {
      window.location.href = "/auth";
    }
  };

  const fetchData = async () => {
    // Fetch Profiles
    const { data: profileData } = await supabase.from("profiles").select("*");
    if (profileData) setProfiles(profileData);

    // Fetch Chats
    const { data: chatData } = await supabase
      .from("chats")
      .select(`*, profiles:user_id (full_name)`)
      .order('created_at', { ascending: false });
    if (chatData) setChats(chatData);

    // Fetch Withdrawals
    const { data: withdrawData } = await supabase
      .from("withdrawals")
      .select(`*, profiles:user_id (full_name, phone_number)`)
      .order('created_at', { ascending: false });
    if (withdrawData) setWithdrawals(withdrawData);

    setLoading(false);
  };

  const fetchMessages = async (chatId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order('created_at', { ascending: true });
    if (data) setChatMessages(data);
  };

  useEffect(() => {
    if (!selectedChat) return;

    const channel = supabase
      .channel(`admin_chat_${selectedChat.id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${selectedChat.id}`
      }, (payload) => {
        setChatMessages((prev) => {
          if (prev.some(m => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedChat?.id]);

  const handleSelectChat = (chat: any) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  };

  const handleSendAdminMessage = async () => {
    if (!chatInput || !selectedChat) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const text = chatInput;
    setChatInput("");
    await supabase.from("messages").insert([
      { chat_id: selectedChat.id, sender_id: user.id, content: text }
    ]);
  };

  const compressToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        const img = new Image();
        img.src = ev.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX = 800;
          let w = img.width, h = img.height;
          if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
          if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleAdminImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChat) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setAdminUploading(true);
    try {
      const base64 = await compressToBase64(file);
      await supabase.from("messages").insert([
        { chat_id: selectedChat.id, sender_id: user.id, content: "[Image]", image_url: base64 }
      ]);
    } catch {
      alert("Image processing failed. Please try again.");
    }
    setAdminUploading(false);
    e.target.value = "";
  };

  const adjustBalance = async (userId: string, currentBalance: number, amount: number) => {
    const newBalance = currentBalance + amount;
    if (newBalance < 0) return alert("Balance cannot be negative");

    const { error } = await supabase
      .from("profiles")
      .update({ earnings_balance: newBalance })
      .eq("id", userId);
    
    if (error) alert(error.message);
    else fetchData();
  };

  const planPrices: Record<string, number> = { Starter: 999, Growth: 2999, Elite: 4999, None: 0 };

  const assignPlan = async (userId: string, rawPlan: string) => {
    const plan = rawPlan.charAt(0).toUpperCase() + rawPlan.slice(1).toLowerCase();
    const price = planPrices[plan] ?? 0;

    const { error } = await supabase
      .from("profiles")
      .update({ current_plan: plan, total_investment: price })
      .eq("id", userId);

    if (error) { alert("Plan update failed: " + error.message); return; }

    // Referral commission — 10% to referrer
    if (price > 0) {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("referred_by")
        .eq("id", userId)
        .single();

      if (userProfile?.referred_by) {
        const { data: referrer } = await supabase
          .from("profiles")
          .select("earnings_balance")
          .eq("id", userProfile.referred_by)
          .single();

        if (referrer) {
          const commission = Math.floor(price * 0.1);
          await supabase
            .from("profiles")
            .update({ earnings_balance: Number(referrer.earnings_balance) + commission })
            .eq("id", userProfile.referred_by);
        }
      }
    }

    fetchData();
  };

  const updateWithdrawalStatus = async (id: string, status: string) => {
    if (status === 'approved') {
      // Fetch withdrawal details to get user_id and amount
      const { data: withdrawal } = await supabase
        .from("withdrawals")
        .select("user_id, amount")
        .eq("id", id)
        .single();
      
      if (withdrawal) {
        // Fetch current user balance
        const { data: profile } = await supabase
          .from("profiles")
          .select("earnings_balance")
          .eq("id", withdrawal.user_id)
          .single();
        
        if (profile) {
          const newBalance = Number(profile.earnings_balance) - Number(withdrawal.amount);
          if (newBalance < 0) {
            alert("Warning: Approval will result in negative balance. Proceeding anyway.");
          }
          
          // Update profile balance
          await supabase
            .from("profiles")
            .update({ earnings_balance: newBalance })
            .eq("id", withdrawal.user_id);
        }
      }
    }
    
    await supabase.from("withdrawals").update({ status }).eq("id", id);
    fetchData();
  };

  const toggleStatus = async (userId: string, currentStatus: boolean) => {
    await supabase.from("profiles").update({ is_active: !currentStatus }).eq("id", userId);
    fetchData();
  };

  if (!isAuthenticated) return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-white">Verifying Admin Access...</div>;

  const filteredProfiles = profiles.filter(p =>
    (p.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    p.phone_number?.includes(searchQuery)
  );

  const activeUsers = filteredProfiles.filter(p => p.current_plan !== "None");
  const pendingUsers = filteredProfiles.filter(p => p.current_plan === "None");

  const filteredChats = chats.filter(c => {
    if (chatFilter === "all") return true;
    // Old chats without type column are treated as plan_purchase
    const chatType = c.type || 'plan_purchase';
    return chatType === chatFilter;
  });

  // Helper: parse withdrawal details JSON
  const parseWithdrawalDetails = (details: string) => {
    try {
      return JSON.parse(details || '{}');
    } catch {
      return { method: 'Bank', raw: details };
    }
  };

  // Helper: filter withdrawals by method
  const getFilteredWithdrawals = () => {
    if (withdrawalFilter === 'all') return withdrawals;
    return withdrawals.filter(w => {
      const d = parseWithdrawalDetails(w.details);
      return d.method === withdrawalFilter;
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-brand-bgCard border-r border-brand-border flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-brand-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white tracking-widest text-lg">RPC ADMIN</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "Active Users", icon: Users },
            { id: "Pending Users", icon: UserPlus },
            { id: "Chats", icon: MessageSquare },
            { id: "Withdrawals", icon: IndianRupee },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? "bg-brand-blue text-white shadow-glow-sm" : "text-brand-muted hover:text-white hover:bg-brand-bgLight"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{tab.id}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-border">
          <button onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">{activeTab}</h1>
            <p className="text-brand-muted">Real-time management system.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-bgLight border border-brand-border rounded-xl py-2 pl-9 pr-4 text-white text-sm focus:outline-none focus:border-brand-blue w-full sm:w-64"
            />
          </div>
        </div>

        {loading && profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
            <span className="text-brand-muted">Fetching records...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              
              {activeTab === "Active Users" && (
                <div className="bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                  <table className="w-full text-left text-sm text-brand-muted">
                    <thead className="bg-brand-bgLight text-white font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Balance</th>
                        <th className="px-6 py-4">Add/Cut</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {activeUsers.map(user => (
                        <tr key={user.id} className="hover:bg-brand-bgLight/50">
                          <td className="px-6 py-4">
                            <div className="text-white font-medium">{user.full_name}</div>
                            <div className="text-[10px] opacity-60">{user.phone_number}</div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-brand-blue/10 text-brand-blueBright rounded-md text-xs">{user.current_plan}</span></td>
                          <td className="px-6 py-4 text-brand-gold font-bold">₹{user.earnings_balance}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <button onClick={() => {
                                    setSelectedUserForBalance(user);
                                    setAdjustmentType("add");
                                    setAdjustmentAmount("");
                                    setShowBalanceModal(true);
                                }} className="p-1.5 bg-brand-green/20 text-brand-green rounded-md hover:bg-brand-green/30"><Plus className="w-3 h-3" /></button>
                                <button onClick={() => {
                                    setSelectedUserForBalance(user);
                                    setAdjustmentType("cut");
                                    setAdjustmentAmount("");
                                    setShowBalanceModal(true);
                                }} className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"><Minus className="w-3 h-3" /></button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.is_active ? "bg-brand-green/20 text-brand-green" : "bg-red-500/20 text-red-400"}`}>
                              {user.is_active ? "Active" : "Blocked"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <select
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value === "toggle") toggleStatus(user.id, user.is_active);
                                else if (e.target.value === "change_plan") {
                                    const p = prompt("Enter Plan (Starter, Growth, Elite, None):");
                                    if(p) assignPlan(user.id, p);
                                }
                                e.target.value = "";
                              }}
                              className="bg-brand-bgLight border border-brand-border text-xs rounded-md px-2 py-1 focus:outline-none"
                            >
                              <option value="" disabled>Manage</option>
                              <option value="toggle">{user.is_active ? "Block User" : "Unblock User"}</option>
                              <option value="change_plan">Change Plan</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "Pending Users" && (
                <div className="bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                  <table className="w-full text-left text-sm text-brand-muted">
                    <thead className="bg-brand-bgLight text-white font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Joined At</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {pendingUsers.map(user => (
                        <tr key={user.id} className="hover:bg-brand-bgLight/50">
                          <td className="px-6 py-4 text-white font-medium">{user.full_name}</td>
                          <td className="px-6 py-4">{user.phone_number}</td>
                          <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right">
                            <select 
                              onChange={(e) => assignPlan(user.id, e.target.value)}
                              className="bg-brand-bgLight border border-brand-border text-brand-blueBright text-xs rounded-md px-3 py-1.5 focus:outline-none cursor-pointer"
                              defaultValue=""
                            >
                              <option value="" disabled>Assign Plan...</option>
                              <option value="Starter">Starter (₹999)</option>
                              <option value="Growth">Growth (₹2999)</option>
                              <option value="Elite">Elite (₹4999)</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "Chats" && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    {["all", "plan_purchase", "deposit"].map(f => (
                      <button 
                        key={f} 
                        onClick={() => setChatFilter(f)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${chatFilter === f ? "bg-brand-blue text-white shadow-glow-sm" : "bg-brand-bgLight text-brand-muted border border-brand-border hover:text-white"}`}
                      >
                        {f.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="flex h-[600px] bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                    {/* Chat List */}
                    <div className="w-1/3 border-r border-brand-border overflow-y-auto">
                      {filteredChats.map(c => (
                        <div 
                          key={c.id} 
                          onClick={() => handleSelectChat(c)}
                          className={`p-4 border-b border-brand-border cursor-pointer transition-colors ${selectedChat?.id === c.id ? "bg-brand-blue/10 border-l-4 border-l-brand-blue" : "hover:bg-brand-bgLight"}`}
                        >
                          <div className="font-semibold text-white">{c.profiles?.full_name || "User"}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${c.type === 'deposit' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-blue/10 text-brand-blueBright'}`}>{c.type === 'deposit' ? 'DEPOSIT' : 'PLAN'}</span>
                            <span className="text-[10px] text-brand-muted uppercase">{c.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                      {selectedChat ? (
                        <>
                          <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {chatMessages.map((msg, i) => (
                              <div key={i} className={`flex ${msg.sender_id !== selectedChat.user_id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-3 rounded-xl text-sm ${msg.sender_id !== selectedChat.user_id ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-brand-bgLight border border-brand-border text-brand-muted rounded-tl-none'}`}>
                                  {msg.image_url ? (
                                    <div className="space-y-2">
                                        <img src={msg.image_url} alt="Screenshot" className="w-64 rounded-lg cursor-pointer" onClick={() => window.open(msg.image_url, '_blank')} />
                                        <div className="text-[10px] text-brand-blueBright">Click to view full size</div>
                                    </div>
                                  ) : msg.content}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border-t border-brand-border bg-brand-bgLight flex gap-2 items-center">
                            <label className="cursor-pointer p-2 bg-brand-bg border border-brand-border rounded-xl text-brand-muted hover:text-white hover:border-brand-blue transition-colors" title="Send QR / Image">
                              {adminUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                              <input type="file" accept="image/*" className="hidden" onChange={handleAdminImageUpload} disabled={adminUploading} />
                            </label>
                            <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendAdminMessage()}
                              placeholder="Type a reply..."
                              className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-white text-sm"
                            />
                            <button onClick={handleSendAdminMessage} className="bg-brand-blue p-2 rounded-xl text-white"><Send className="w-4 h-4" /></button>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-brand-muted">Select a chat to start messaging</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Withdrawals" && (
                <div>
                  {/* Withdrawal Method Filters */}
                  <div className="flex gap-2 mb-4">
                    {['all', 'UPI', 'QR', 'Bank'].map(f => (
                      <button key={f} onClick={() => setWithdrawalFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${withdrawalFilter === f ? 'bg-brand-blue text-white shadow-glow-sm' : 'bg-brand-bgLight border border-brand-border text-brand-muted hover:text-white'}`}>
                        {f === 'all' ? 'All' : f === 'UPI' ? '📱 UPI' : f === 'QR' ? '📷 QR' : '🏦 Bank'}
                      </button>
                    ))}
                  </div>

                  <div className="bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                    <table className="w-full text-left text-sm text-brand-muted">
                      <thead className="bg-brand-bgLight text-white font-semibold">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Method</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border">
                        {getFilteredWithdrawals().map(w => {
                          const details = parseWithdrawalDetails(w.details);
                          return (
                            <tr key={w.id} className="hover:bg-brand-bgLight/50 cursor-pointer" onClick={() => setSelectedWithdrawal(selectedWithdrawal?.id === w.id ? null : w)}>
                              <td className="px-6 py-4">
                                <div className="text-white font-medium">{w.profiles?.full_name}</div>
                                <div className="text-[10px] opacity-60">{w.profiles?.phone_number}</div>
                              </td>
                              <td className="px-6 py-4 text-brand-gold font-bold">₹{w.amount}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${details.method === 'UPI' ? 'bg-purple-500/20 text-purple-400' : details.method === 'QR' ? 'bg-cyan-500/20 text-cyan-400' : details.method === 'Bank' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                  {details.method || 'N/A'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${w.status === 'approved' ? "bg-brand-green/20 text-brand-green" : w.status === 'rejected' ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-500"}`}>
                                  {w.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                {w.status === 'pending' && (
                                  <div className="flex justify-end gap-2">
                                    <button onClick={() => updateWithdrawalStatus(w.id, 'approved')} className="p-1.5 bg-brand-green/20 text-brand-green rounded-md hover:bg-brand-green/30"><Check className="w-4 h-4" /></button>
                                    <button onClick={() => updateWithdrawalStatus(w.id, 'rejected')} className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"><X className="w-4 h-4" /></button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Withdrawal Detail Panel */}
                  <AnimatePresence>
                    {selectedWithdrawal && (() => {
                      const d = parseWithdrawalDetails(selectedWithdrawal.details);
                      return (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-4 bg-brand-bgCard border border-brand-blue/30 rounded-xl2 p-6 relative overflow-hidden">
                          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-blue opacity-10 blur-2xl rounded-full" />
                          <div className="flex items-center justify-between mb-4 relative z-10">
                            <h3 className="text-lg font-bold text-white">Withdrawal Details</h3>
                            <button onClick={() => setSelectedWithdrawal(null)} className="text-brand-muted hover:text-white"><X className="w-5 h-5" /></button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">User</div>
                              <div className="text-white font-medium">{selectedWithdrawal.profiles?.full_name}</div>
                              <div className="text-xs text-brand-muted">{selectedWithdrawal.profiles?.phone_number}</div>
                            </div>
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Amount</div>
                              <div className="text-brand-gold font-bold text-xl">₹{selectedWithdrawal.amount}</div>
                            </div>
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Method</div>
                              <div className="text-white font-medium">{d.method || 'Not specified'}</div>
                            </div>
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Holder Name</div>
                              <div className="text-white font-medium">{d.holder || 'N/A'}</div>
                            </div>
                            {d.upiId && (
                              <div className="bg-brand-bgLight rounded-xl p-4 col-span-2">
                                <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">UPI ID</div>
                                <div className="text-brand-blueBright font-mono font-bold text-lg">{d.upiId}</div>
                              </div>
                            )}
                            {d.account && (
                              <div className="bg-brand-bgLight rounded-xl p-4">
                                <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Account Number</div>
                                <div className="text-white font-mono">{d.account}</div>
                              </div>
                            )}
                            {d.ifsc && (
                              <div className="bg-brand-bgLight rounded-xl p-4">
                                <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">IFSC Code</div>
                                <div className="text-white font-mono">{d.ifsc}</div>
                              </div>
                            )}
                            {d.qrNote && (
                              <div className="bg-brand-bgLight rounded-xl p-4 col-span-2">
                                <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">QR Info</div>
                                <div className="text-white">{d.qrNote}</div>
                              </div>
                            )}
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Date</div>
                              <div className="text-white text-sm">{new Date(selectedWithdrawal.created_at).toLocaleString('en-IN')}</div>
                            </div>
                            <div className="bg-brand-bgLight rounded-xl p-4">
                              <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-wider">Status</div>
                              <div className={`font-bold uppercase ${selectedWithdrawal.status === 'approved' ? 'text-brand-green' : selectedWithdrawal.status === 'rejected' ? 'text-red-400' : 'text-yellow-500'}`}>{selectedWithdrawal.status}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutConfirm(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-sm bg-brand-bgCard border border-brand-border rounded-xl3 p-8 shadow-card overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-500 opacity-10 blur-2xl rounded-full" />
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <LogOut className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Sign Out?</h3>
                <p className="text-brand-muted text-sm mb-8">Are you sure you want to log out from the Admin Panel?</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowLogoutConfirm(false)} className="py-3 px-4 rounded-xl border border-brand-border text-white font-semibold hover:bg-brand-bgLight transition-colors">Cancel</button>
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/auth")} className="py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-glow-sm transition-colors">Log Out</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Balance Adjustment Modal */}
      <AnimatePresence>
        {showBalanceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBalanceModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-sm bg-brand-bgCard border border-brand-border rounded-xl3 p-8 shadow-card overflow-hidden">
              <div className={`absolute -top-12 -right-12 w-24 h-24 ${adjustmentType === "add" ? "bg-brand-green" : "bg-red-500"} opacity-10 blur-2xl rounded-full`}></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{adjustmentType === "add" ? "Add Money" : "Deduct Money"}</h3>
                <p className="text-brand-muted text-sm mb-6">Updating balance for <span className="text-white font-semibold">{selectedUserForBalance?.full_name}</span></p>
                
                <div className="space-y-4">
                  <div className="bg-brand-bgLight p-4 rounded-xl border border-brand-border">
                    <div className="text-[10px] text-brand-muted uppercase mb-1">Current Balance</div>
                    <div className="text-xl font-bold text-white">₹{selectedUserForBalance?.earnings_balance}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted ml-1">Enter Amount</label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="number" 
                        value={adjustmentAmount}
                        onChange={(e) => setAdjustmentAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button onClick={() => setShowBalanceModal(false)} className="py-3 px-4 rounded-xl border border-brand-border text-white font-semibold hover:bg-brand-bgLight transition-colors">Cancel</button>
                    <button 
                      onClick={() => {
                        const amt = Number(adjustmentAmount);
                        if (amt > 0) {
                          adjustBalance(selectedUserForBalance.id, selectedUserForBalance.earnings_balance, adjustmentType === "add" ? amt : -amt);
                          setShowBalanceModal(false);
                        }
                      }} 
                      className={`py-3 px-4 rounded-xl ${adjustmentType === "add" ? "bg-brand-green hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white font-semibold shadow-glow-sm transition-colors`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
