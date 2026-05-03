"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, IndianRupee, ArrowUpRight, Zap, History, Users, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

type TimeRange = "Today" | "Monthly" | "Yearly" | "All Time";

const EARNINGS_DATA: Record<TimeRange, number> = {
  "Today": 120,
  "Monthly": 3500,
  "Yearly": 42000,
  "All Time": 54000,
};

const TOTAL_INVESTMENT = 5000;

export default function Dashboard() {
  const [userStatus, setUserStatus] = useState<"loading" | "no_plan" | "chatting" | "pending" | "active">("loading");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>("Today");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  
  useEffect(() => {
    const status = localStorage.getItem("rpc_user_status") as any || "no_plan";
    setUserStatus(status);
    setSelectedPlan(localStorage.getItem("rpc_selected_plan") || "");
    
    try {
      const msgs = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
      setChatMessages(msgs);
    } catch(e) {}

    const handleStorage = () => {
      const newStatus = localStorage.getItem("rpc_user_status") as any;
      if (newStatus) setUserStatus(newStatus);
      try {
        const msgs = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
        setChatMessages(msgs);
      } catch(e) {}
    };
    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const setStatus = (status: string) => {
    localStorage.setItem("rpc_user_status", status);
    setUserStatus(status as any);
  };

  const addMessage = (sender: string, text: string) => {
    // Need fresh state from localStorage to prevent overwriting
    const currentMsgs = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
    const newMsgs = [...currentMsgs, { sender, text }];
    setChatMessages(newMsgs);
    localStorage.setItem("rpc_chat_messages", JSON.stringify(newMsgs));
    
    // Simulate auto-replies
    if (sender === "user" && text.includes("want to purchase")) {
      setTimeout(() => {
        const plan = localStorage.getItem("rpc_selected_plan") || "Starter";
        const price = plan === 'Starter' ? 999 : plan === 'Growth' ? 2999 : 4999;
        
        const msgs1 = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
        const newMsgs1 = [...msgs1, { sender: "admin", text: `Sure! Please pay ₹${price} using this QR code.` }];
        localStorage.setItem("rpc_chat_messages", JSON.stringify(newMsgs1));
        setChatMessages(newMsgs1);

        setTimeout(() => {
          const msgs2 = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
          const newMsgs2 = [...msgs2, { sender: "admin", text: "[QR_CODE_IMAGE]" }];
          localStorage.setItem("rpc_chat_messages", JSON.stringify(newMsgs2));
          setChatMessages(newMsgs2);
        }, 500);

      }, 1000);
    } else if (sender === "user" && text === "[Screenshot Attached]") {
      setTimeout(() => {
        const msgs1 = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
        const newMsgs1 = [...msgs1, { sender: "admin", text: "Thank you! Your payment will be approved within 24 hours." }];
        localStorage.setItem("rpc_chat_messages", JSON.stringify(newMsgs1));
        setChatMessages(newMsgs1);

        setTimeout(() => setStatus("pending"), 2000);
      }, 1500);
    }
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    localStorage.setItem("rpc_selected_plan", plan);
    setStatus("chatting");
    const initMsg = `Hi, I want to purchase the ${plan} plan.`;
    setChatInput(initMsg);
  };

  const handleSendChat = () => {
    if (!chatInput) return;
    addMessage("user", chatInput);
    setChatInput("");
  };

  if (userStatus === "loading") return <div className="min-h-screen bg-brand-bg text-white flex items-center justify-center">Loading...</div>;

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
            <button onClick={() => {
              // RESET BUTTON FOR TESTING
              localStorage.removeItem("rpc_user_status");
              localStorage.removeItem("rpc_chat_messages");
              localStorage.removeItem("rpc_selected_plan");
              window.location.reload();
            }} className="text-xs text-brand-muted hover:text-white mr-4">Reset Demo</button>
            <div className="w-9 h-9 rounded-full bg-brand-bgLight border border-brand-border flex items-center justify-center text-brand-blue font-bold">U</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 relative z-10">
        
        {/* NO PLAN STATE */}
        {userStatus === "no_plan" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-display font-bold mb-2">Select a Plan</h1>
              <p className="text-brand-muted">Choose a plan to activate your earning dashboard.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {["Starter", "Growth", "Elite"].map((plan) => (
                <div key={plan} className="bg-brand-bgCard border border-brand-border rounded-xl3 p-6 text-center hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-xl font-bold mb-2">{plan}</h3>
                  <p className="text-brand-muted text-sm mb-6">Gain access to our premium earning strategies.</p>
                  <button onClick={() => handleSelectPlan(plan)} className="w-full bg-brand-blue hover:bg-brand-blueBright text-white font-semibold py-3 rounded-xl transition-colors">
                    Select {plan}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CHATTING STATE */}
        {userStatus === "chatting" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <div className="bg-brand-bgCard border border-brand-border rounded-xl3 overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-brand-border bg-brand-bgLight font-semibold flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <div className="text-white">RPC Support</div>
                  <div className="text-xs text-brand-green">Online</div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-brand-muted text-sm mt-10">Start the conversation to purchase the {selectedPlan} plan.</div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-brand-bgLight border border-brand-border text-brand-muted rounded-tl-none'}`}>
                      {msg.text === "[QR_CODE_IMAGE]" ? (
                        <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=rpc@ybl&pn=RPC" alt="QR" className="w-40 h-40" />
                        </div>
                      ) : msg.text === "[Screenshot Attached]" ? (
                        <div className="w-48 h-64 bg-brand-border rounded-lg flex items-center justify-center text-xs">Screenshot.png</div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-brand-border bg-brand-bgLight">
                <div className="flex gap-2">
                  <button onClick={() => addMessage("user", "[Screenshot Attached]")} className="px-4 bg-brand-bg border border-brand-border rounded-xl text-xs font-semibold hover:border-brand-blue transition-colors">
                    Upload Screenshot
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
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

        {/* PENDING STATE */}
        {userStatus === "pending" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center mt-20">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Payment Under Review</h2>
            <p className="text-brand-muted">We have received your payment screenshot. Our team will verify and activate your <strong>{selectedPlan}</strong> plan within 24 hours.</p>
          </motion.div>
        )}

        {/* ACTIVE STATE (Original Dashboard) */}
        {userStatus === "active" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Welcome Back!</h1>
              <p className="text-brand-muted">Here is your earning and investment overview.</p>
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
                  <p className="text-brand-dim text-sm mb-1">{timeRange} Earnings</p>
                  <div className="flex items-baseline gap-2">
                    <IndianRupee className="w-8 h-8 text-brand-blueBright" strokeWidth={2} />
                    <span className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tight">{EARNINGS_DATA[timeRange].toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full w-fit">
                    <ArrowUpRight className="w-3.5 h-3.5" />+12.5% vs previous period
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
                      <span className="text-3xl font-display font-bold text-white">{TOTAL_INVESTMENT.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="w-full bg-brand-blue hover:bg-brand-blueBright text-white py-3 px-4 rounded-xl2 flex flex-col items-center gap-1 transition-all">
                    <div className="flex items-center gap-2 font-semibold"><Zap className="w-4 h-4" />Deposit</div>
                    <span className="text-[10px] text-white/80 font-medium tracking-wide">LIMIT: 50,000</span>
                  </button>
                  <button className="w-full bg-brand-bgLight border border-brand-border hover:border-brand-blue/50 text-white py-3 px-4 rounded-xl2 flex flex-col items-center gap-1 transition-all">
                    <div className="flex items-center gap-2 font-semibold"><History className="w-4 h-4" />Withdrawal</div>
                    <span className="text-[10px] text-brand-muted font-medium tracking-wide">LIMIT: 50,000</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 glass-card bg-brand-bgCard border border-brand-border rounded-xl3 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden relative group hover:border-brand-green/30 transition-colors">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green opacity-5 blur-3xl rounded-full" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center text-brand-green shrink-0"><Users className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Refer and Earn</h3>
                  <p className="text-brand-muted text-sm">Invite your friends and earn <strong className="text-brand-green font-semibold">10% per person invite</strong>.</p>
                </div>
              </div>
              <button className="relative z-10 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-bgLight border border-brand-border text-white text-sm font-semibold hover:border-brand-green/50 transition-colors whitespace-nowrap">
                Copy Invite Link
              </button>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
