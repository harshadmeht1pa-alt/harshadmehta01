"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, IndianRupee, ArrowUpRight, Zap, History, Users, Send, AlertCircle, Loader2, LogOut, Check, MessageSquare } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type TimeRange = "Today" | "Monthly" | "Yearly" | "All Time";

const EARNINGS_DATA: Record<TimeRange, number> = {
  "Today": 120,
  "Monthly": 3500,
  "Yearly": 42000,
  "All Time": 54000,
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("Today");
  
  // Chat States
  const [chat, setChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Withdrawal States
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<'upi' | 'qr' | 'bank'>('upi');
  const [bankDetails, setBankDetails] = useState({ holder: "", upiId: "", account: "", ifsc: "", amount: "", qrImage: "" });
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [unreadChatIds, setUnreadChatIds] = useState<Set<string>>(new Set());
  const openChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    let userId: string | null = null;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        userId = session.user.id;
      }
      await fetchUserData();
    };
    init();

    // Real-time subscription for profile changes (Plan access, balance updates, etc.)
    const profileSubscription = supabase
      .channel(`profile_updates_${Math.random()}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles' 
      }, (payload: any) => {
        // Only update if it's the current user — use cached userId (no lock contention)
        if (userId && payload.new.id === userId) {
          setProfile(payload.new);
          // Plan was just assigned — clear plan purchase chat
          if (payload.new.current_plan !== 'None') {
            setChat((prev: any) => prev?.type === 'plan_purchase' ? null : prev);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(profileSubscription);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Real-time subscription for new messages in current chat
  useEffect(() => {
    if (!chat) return;

    openChatIdRef.current = chat.id;
    // Chat open hote hi unread clear karo
    setUnreadChatIds(prev => { const n = new Set(prev); n.delete(chat.id); return n; });

    const channel = supabase
      .channel(`user_chat_messages_${chat.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chat.id}`
      }, (payload: any) => {
        setChatMessages((prev) => {
          if (prev.some((m: any) => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
      })
      .subscribe();

    return () => {
      openChatIdRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [chat?.id]);

  // Global subscription — sare chats ke naye messages track karo (unread)
  useEffect(() => {
    if (!profile) return;

    const channel = supabase
      .channel(`user_unread_${profile.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload: any) => {
        const msg = payload.new;
        // Agar message admin ka hai aur woh chat abhi open nahi hai
        if (msg.sender_id !== profile.id && msg.chat_id !== openChatIdRef.current) {
          setUnreadChatIds(prev => { const n = new Set(prev); n.add(msg.chat_id); return n; });
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [profile?.id]);

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    // Only auto-load chat if user has NO plan (plan purchase flow)
    // Users with active plans see dashboard by default — chat only shows when they click Deposit
    if (profileData && profileData.current_plan === "None") {
      const { data: chatData } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (chatData) {
        setChat(chatData);
        fetchMessages(chatData.id);
      } else {
        setChat(null);
        setChatMessages([]);
      }
    } else {
      // User has plan — clear any leftover chat state so dashboard shows
      setChat(null);
      setChatMessages([]);
    }

    // Fetch chat history
    const { data: historyData } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (historyData) setChatHistory(historyData);
    
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

  const handleSelectPlan = async (plan: string) => {
    if (!profile) return;
    setLoading(true);
    
    // 1. Create Chat for plan purchase
    const insertObj: any = { user_id: profile.id, status: 'pending_payment' };
    try { insertObj.type = 'plan_purchase'; } catch(e) {}
    const { data: chatData, error: chatError } = await supabase
      .from("chats")
      .insert([insertObj])
      .select()
      .single();

    if (chatError) {
      console.error(chatError);
      setLoading(false);
      return;
    }

    setChat(chatData);

    const price = plan === 'Starter' ? 1999 : plan === 'Growth' ? 2999 : 3999;
    await supabase.from("messages").insert([
      { chat_id: chatData.id, sender_id: profile.id, content: `Hi, I want to purchase the ${plan} plan for ₹${price}.` }
    ]);

    fetchMessages(chatData.id);
    setLoading(false);
  };

  const handleDepositRequest = async () => {
    if (!profile) return;
    setLoading(true);
    
    // Create Chat for deposit
    const insertObj: any = { user_id: profile.id, status: 'pending_payment' };
    try { insertObj.type = 'deposit'; } catch(e) {}
    const { data: chatData, error: chatError } = await supabase
      .from("chats")
      .insert([insertObj])
      .select()
      .single();

    if (chatError) {
      console.error(chatError);
      alert('Error creating chat: ' + chatError.message);
      setLoading(false);
      return;
    }

    setChat(chatData);
    await supabase.from("messages").insert([
      { chat_id: chatData.id, sender_id: profile.id, content: `Hi, I want to deposit money into my balance.` }
    ]);

    fetchMessages(chatData.id);
    setLoading(false);
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || Number(bankDetails.amount) > profile.earnings_balance || Number(bankDetails.amount) <= 0) {
      alert("Invalid amount or insufficient balance!");
      return;
    }
    
    let detailsStr = '';
    if (withdrawMethod === 'upi') {
      detailsStr = JSON.stringify({ method: 'UPI', holder: bankDetails.holder, upiId: bankDetails.upiId, amount: bankDetails.amount });
    } else if (withdrawMethod === 'bank') {
      detailsStr = JSON.stringify({ method: 'Bank', holder: bankDetails.holder, account: bankDetails.account, ifsc: bankDetails.ifsc, amount: bankDetails.amount });
    } else {
      detailsStr = JSON.stringify({ method: 'QR', holder: bankDetails.holder, qrNote: 'QR code shared by user', amount: bankDetails.amount });
    }

    setLoading(true);
    const { error } = await supabase
      .from("withdrawals")
      .insert([{
        user_id: profile.id,
        amount: Number(bankDetails.amount),
        status: 'pending',
        details: detailsStr
      }]);

    if (!error) {
      setWithdrawSuccess(true);
      setShowWithdrawForm(false);
      setBankDetails({ holder: '', upiId: '', account: '', ifsc: '', amount: '', qrImage: '' });
    } else {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleSendChat = async () => {
    if (!chatInput || !chat || !profile) return;
    const text = chatInput;
    setChatInput("");
    await supabase.from("messages").insert([
      { chat_id: chat.id, sender_id: profile.id, content: text }
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

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !chat || !profile) return;

    setUploading(true);
    try {
      const base64 = await compressToBase64(file);
      await supabase.from("messages").insert([
        { chat_id: chat.id, sender_id: profile.id, content: "[Screenshot Attached]", image_url: base64 }
      ]);
    } catch {
      alert("Error processing image. Please try again.");
    }
    setUploading(false);
    e.target.value = "";
  };

  if (loading && !profile) return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
      <p className="text-brand-muted animate-pulse">Syncing with server...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none opacity-40" />

      <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow-sm">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg tracking-widest font-bold">RPC</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowLogoutConfirm(true)} className="text-xs text-brand-muted hover:text-white mr-4 transition-colors">Sign Out</button>
            <div className="w-9 h-9 rounded-full bg-brand-bgLight border border-brand-border flex items-center justify-center text-brand-blue font-bold">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 relative z-10">
        
        {/* NO PLAN STATE */}
        {profile && profile.current_plan === "None" && !chat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-display font-bold mb-2">Select a Plan</h1>
              <p className="text-brand-muted">Choose a plan to activate your earning dashboard.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Starter", price: 1999, emoji: "🚀", daily: 60 },
                { name: "Growth",  price: 2999, emoji: "🔥", daily: 95 },
                { name: "Elite",   price: 3999, emoji: "👑", daily: 125 },
              ].map((plan) => (
                <div key={plan.name} className={`bg-brand-bgCard border rounded-xl3 p-6 text-center transition-colors ${plan.name === 'Growth' ? 'border-brand-blue/60 shadow-glow-sm' : 'border-brand-border hover:border-brand-blue/40'}`}>
                  <div className="text-3xl mb-2">{plan.emoji}</div>
                  <h3 className="text-xl font-bold mb-1 text-white">{plan.name}</h3>
                  <div className="text-3xl font-display font-bold text-white my-3">₹{plan.price.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-brand-green bg-brand-green/10 px-3 py-1 rounded-full inline-block mb-5">₹{plan.daily}/day potential</div>
                  <button onClick={() => handleSelectPlan(plan.name)} className={`w-full font-semibold py-3 rounded-xl transition-colors ${plan.name === 'Growth' ? 'bg-brand-blue hover:bg-brand-blueBright text-white' : 'bg-brand-bgLight border border-brand-border hover:border-brand-blue/50 text-white'}`}>
                    Select {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CHATTING STATE */}
        {profile && chat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <div className="bg-brand-bgCard border border-brand-border rounded-xl3 overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-brand-border bg-brand-bgLight font-semibold flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-white">RPC Support</div>
                    <div className="text-xs text-brand-green">Online</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md border border-yellow-500/20 uppercase font-bold tracking-wider mb-1">
                      {chat.type === 'deposit' ? 'Deposit Review' : 'Payment Review'}
                    </div>
                    {profile.current_plan !== "None" && (
                        <button onClick={() => setChat(null)} className="text-[10px] text-brand-muted hover:text-white underline">Back to Dashboard</button>
                    )}
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender_id === profile.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-xl text-sm ${msg.sender_id === profile.id ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-brand-bgLight border border-brand-border text-brand-muted rounded-tl-none'}`}>
                      {msg.image_url ? (
                        <div className="space-y-1">
                          <img
                            src={msg.image_url}
                            alt="Image"
                            className="max-w-[220px] rounded-lg cursor-pointer"
                            onClick={() => window.open(msg.image_url, '_blank')}
                          />
                          <div className="text-[10px] opacity-60">Tap to view full size</div>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>
              <div className="p-4 border-t border-brand-border bg-brand-bgLight">
                <div className="flex gap-2">
                  <label className="cursor-pointer px-4 bg-brand-bg border border-brand-border rounded-xl text-xs font-semibold hover:border-brand-blue transition-colors flex items-center">
                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Upload Screenshot"}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Type a message..."
                    className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue text-sm"
                  />
                  <button onClick={handleSendChat} className="bg-brand-blue hover:bg-brand-blueBright text-white px-4 rounded-xl transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ACTIVE STATE */}
        {profile && profile.current_plan !== "None" && !chat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Welcome Back, {profile.full_name}!</h1>
                <p className="text-brand-muted">Here is your earning and investment overview.</p>
              </div>
              <div className="px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blueBright font-bold text-sm">
                PLAN: {profile.current_plan}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue opacity-5 blur-3xl rounded-full" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blueBright"><TrendingUp className="w-5 h-5" /></div>
                    <h2 className="text-xl font-semibold">Earnings Overview</h2>
                  </div>
                  <div className="flex p-1 rounded-lg bg-brand-bgLight border border-brand-border">
                    {(["Today", "Monthly", "Yearly", "All Time"] as TimeRange[]).map((range) => (
                      <button key={range} onClick={() => setTimeRange(range)} className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${timeRange === range ? "bg-brand-blue text-white shadow-glow-sm" : "text-brand-muted hover:text-white"}`}>{range}</button>
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-brand-dim text-sm mb-1">Current Wallet Balance</p>
                  <div className="flex items-baseline gap-2">
                    <IndianRupee className="w-8 h-8 text-brand-blueBright" strokeWidth={2} />
                    <span className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tight">{profile.earnings_balance.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full w-fit">
                    <ArrowUpRight className="w-3.5 h-3.5" />Active earning system active
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold"><Wallet className="w-5 h-5" /></div>
                    <h2 className="text-lg font-semibold">Total Investment</h2>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-1">
                      <IndianRupee className="w-5 h-5 text-brand-gold" />
                      <span className="text-3xl font-display font-bold text-white">{profile.total_investment.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xl">🪙</div>
                    <h2 className="text-lg font-semibold">My Coins</h2>
                  </div>
                  <div className="relative z-10">
                    <span className="text-3xl font-display font-bold text-yellow-400">{Math.floor(profile.total_investment).toLocaleString("en-IN")}</span>
                    <span className="text-brand-muted text-xs ml-2">coins</span>
                  </div>
                  <div className="text-[10px] text-brand-muted mt-1 relative z-10">1 Coin = ₹1</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleDepositRequest}
                    className="w-full bg-brand-blue hover:bg-brand-blueBright text-white py-3 px-4 rounded-xl2 flex flex-col items-center gap-1 transition-all"
                  >
                    <div className="flex items-center gap-2 font-semibold"><Zap className="w-4 h-4" />Deposit</div>
                    <span className="text-[10px] text-white/80 font-medium">CHAT TO ADMIN</span>
                  </button>
                  <button 
                    onClick={() => setShowWithdrawForm(true)}
                    className="w-full bg-brand-bgLight border border-brand-border hover:border-brand-blue/50 text-white py-3 px-4 rounded-xl2 flex flex-col items-center gap-1 transition-all"
                  >
                    <div className="flex items-center gap-2 font-semibold"><History className="w-4 h-4" />Withdrawal</div>
                    <span className="text-[10px] text-brand-muted font-medium">BANK FORM</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 sm:p-8 overflow-hidden relative group hover:border-brand-green/30 transition-colors">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green opacity-5 blur-3xl rounded-full" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center text-brand-green shrink-0"><Users className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Refer and Earn</h3>
                    <p className="text-brand-muted text-sm">Invite friends and earn <strong className="text-brand-green font-semibold">10% of their plan price</strong> automatically.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/auth?ref=${profile.id}`;
                    navigator.clipboard.writeText(link);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="relative z-10 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-green/20 border border-brand-green/30 text-brand-green text-sm font-semibold hover:bg-brand-green/30 transition-colors whitespace-nowrap"
                >
                  {linkCopied ? "✓ Copied!" : "Copy Invite Link"}
                </button>
              </div>
              <div className="mt-4 relative z-10 bg-brand-bgLight border border-brand-border rounded-xl px-4 py-3 flex items-center gap-2 overflow-hidden">
                <span className="text-brand-muted text-xs truncate flex-1 font-mono">{typeof window !== 'undefined' ? `${window.location.origin}/auth?ref=${profile.id}` : ''}</span>
              </div>
            </div>

            {/* CHAT HISTORY */}
            <div className="mt-6 glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blueBright"><MessageSquare className="w-5 h-5" /></div>
                <h2 className="text-xl font-semibold">Chat History</h2>
                {unreadChatIds.size > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                    {unreadChatIds.size}
                  </span>
                )}
              </div>
              {chatHistory.length > 0 ? (
                <div className="space-y-3">
                  {chatHistory.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setChat(c);
                        fetchMessages(c.id);
                        setUnreadChatIds(prev => { const n = new Set(prev); n.delete(c.id); return n; });
                      }}
                      className={`flex items-center justify-between p-4 bg-brand-bgLight border rounded-xl cursor-pointer transition-all group ${unreadChatIds.has(c.id) ? 'border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.15)]' : 'border-brand-border hover:border-brand-blue/40'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.type === 'deposit' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-blue/10 text-brand-blueBright'}`}>
                            {c.type === 'deposit' ? <IndianRupee className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                          </div>
                          {unreadChatIds.has(c.id) && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium flex items-center gap-2">
                            {c.type === 'deposit' ? 'Deposit Request' : 'Plan Purchase'}
                            {unreadChatIds.has(c.id) && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                          </div>
                          <div className="text-[10px] text-brand-muted">{new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${c.status === 'pending_payment' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-brand-green/10 text-brand-green'}`}>{c.status === 'pending_payment' ? 'Pending' : c.status}</span>
                        <span className="text-brand-muted text-xs group-hover:text-brand-blueBright transition-colors">View →</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-brand-muted text-sm">No conversations yet. Start a deposit or plan purchase to begin chatting.</div>
              )}
            </div>
          </motion.div>
        )}

        {!profile && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center relative z-10">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
            <p className="text-brand-muted mb-6 text-sm max-w-md">
              Your account exists but your profile data is missing.
            </p>
            <button 
              onClick={() => supabase.auth.signOut().then(() => window.location.href = "/auth")}
              className="bg-brand-blue hover:bg-brand-blueBright text-white px-6 py-2 rounded-xl transition-colors"
            >
              Back to Sign Up
            </button>
          </div>
        )}

      </main>

      {/* WITHDRAWAL FORM MODAL */}
      <AnimatePresence>
        {showWithdrawForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowWithdrawForm(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-brand-bgCard border border-brand-border rounded-xl3 p-8 shadow-card overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-blue opacity-10 blur-2xl rounded-full" />
              <h2 className="text-2xl font-display font-bold text-white mb-2 relative z-10">Withdraw Funds</h2>
              <p className="text-brand-muted text-sm mb-6 relative z-10">Choose your preferred withdrawal method</p>
              
              {/* Method Tabs */}
              <div className="flex p-1 rounded-xl bg-brand-bgLight border border-brand-border mb-6 relative z-10">
                {(['upi', 'qr', 'bank'] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setWithdrawMethod(m)} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${withdrawMethod === m ? 'bg-brand-blue text-white shadow-glow-sm' : 'text-brand-muted hover:text-white'}`}>
                    {m === 'upi' ? '📱 UPI ID' : m === 'qr' ? '📷 QR Code' : '🏦 Bank'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-muted ml-1">Account Holder Name</label>
                  <input required value={bankDetails.holder} onChange={(e) => setBankDetails({...bankDetails, holder: e.target.value})} placeholder="Enter your full name" className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-blue text-sm" />
                </div>

                {/* UPI Fields */}
                {withdrawMethod === 'upi' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted ml-1">UPI ID</label>
                    <input required value={bankDetails.upiId} onChange={(e) => setBankDetails({...bankDetails, upiId: e.target.value})} placeholder="example@paytm / example@ybl" className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-blue text-sm" />
                  </div>
                )}

                {/* QR Fields */}
                {withdrawMethod === 'qr' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-brand-muted ml-1">Upload Your QR Code</label>
                    <div className="border-2 border-dashed border-brand-border rounded-xl p-6 text-center hover:border-brand-blue/50 transition-colors cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setBankDetails({...bankDetails, qrImage: file.name});
                      }} className="hidden" id="qr-upload" />
                      <label htmlFor="qr-upload" className="cursor-pointer">
                        <div className="text-3xl mb-2">📷</div>
                        <div className="text-white text-sm font-medium">{bankDetails.qrImage || 'Click to upload QR'}</div>
                        <div className="text-brand-muted text-[10px] mt-1">Upload your payment QR code image</div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Bank Fields */}
                {withdrawMethod === 'bank' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-muted ml-1">Bank Account Number</label>
                      <input required value={bankDetails.account} onChange={(e) => setBankDetails({...bankDetails, account: e.target.value})} placeholder="Enter account number" className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-blue text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-muted ml-1">IFSC Code</label>
                      <input required value={bankDetails.ifsc} onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value})} placeholder="e.g. SBIN0001234" className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-blue text-sm" />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-muted ml-1">Amount (Available: ₹{profile?.earnings_balance})</label>
                  <input type="number" required min="1" max={profile?.earnings_balance} value={bankDetails.amount} onChange={(e) => setBankDetails({...bankDetails, amount: e.target.value})} placeholder="Enter amount" className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-blue text-sm" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-blueBright text-white font-bold py-3 rounded-xl mt-4 shadow-glow-sm transition-all disabled:opacity-50">
                  {loading ? 'Processing...' : 'Submit Withdrawal Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGOUT CONFIRMATION MODAL */}
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
                <p className="text-brand-muted text-sm mb-8">Are you sure you want to log out from your account?</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowLogoutConfirm(false)} className="py-3 px-4 rounded-xl border border-brand-border text-white font-semibold hover:bg-brand-bgLight transition-colors">Cancel</button>
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/auth")} className="py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">Log Out</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WITHDRAWAL SUCCESS MODAL */}
      <AnimatePresence>
        {withdrawSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setWithdrawSuccess(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-brand-bgCard border border-brand-border rounded-xl3 p-10 text-center shadow-glow-md">
              <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-brand-green" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">Request Sent!</h2>
              <p className="text-brand-muted text-sm mb-8 leading-relaxed">
                Your withdrawal request has been received. Your funds will be transferred to your bank account within <span className="text-brand-blueBright font-bold">24 hours</span>.
              </p>
              <button onClick={() => setWithdrawSuccess(false)} className="w-full bg-brand-blue hover:bg-brand-blueBright text-white font-semibold py-3 rounded-xl transition-all">Understood</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
