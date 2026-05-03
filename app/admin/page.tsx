"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserPlus, MessageSquare, IndianRupee, ShieldAlert, LogOut, Check, X, Send, Search } from "lucide-react";
import Link from "next/link";

// --- MOCK DATA ---
const MOCK_ACTIVE_USERS = [
  { id: 1, name: "Rahul Kumar", phone: "9876543210", plan: "Growth", earnings: 4500, active: true },
  { id: 2, name: "Priya Sharma", phone: "9123456780", plan: "Starter", earnings: 1200, active: true },
  { id: 3, name: "Amit Singh", phone: "9988776655", plan: "Elite", earnings: 12500, active: false },
];

const MOCK_PENDING_USERS = [
  { id: 4, name: "Neha Verma", phone: "9876500000", joinedAt: "Today" },
  { id: 5, name: "Vikash", phone: "9123400000", joinedAt: "Yesterday" },
];

const MOCK_WITHDRAWALS = [
  { id: 101, user: "Rahul Kumar", amount: 2000, status: "Pending", date: "2026-05-03" },
  { id: 102, user: "Priya Sharma", amount: 500, status: "Pending", date: "2026-05-02" },
];

const MOCK_CHATS = [
  { id: 201, user: "Neha Verma", lastMessage: "I want to buy the Growth plan", unread: 1 },
  { id: 202, user: "Vikash", lastMessage: "Sent the screenshot", unread: 0 },
];

const MOCK_MESSAGES = [
  { sender: "user", text: "Hi, I want to buy the Growth plan." },
  { sender: "admin", text: "Sure! Please pay ₹2999 using this QR code." },
  { sender: "user", text: "[Screenshot Attached]" },
];
// -----------------

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("Active Users");
  const [searchQuery, setSearchQuery] = useState("");

  // State for mock data
  const [activeUsers, setActiveUsers] = useState(MOCK_ACTIVE_USERS);
  const [pendingUsers, setPendingUsers] = useState(MOCK_PENDING_USERS);
  const [withdrawals, setWithdrawals] = useState(MOCK_WITHDRAWALS);
  const [chatMessage, setChatMessage] = useState("");
  const [realtimeChats, setRealtimeChats] = useState<{sender: string, text: string}[]>([]);

  useEffect(() => {
    try {
      setRealtimeChats(JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]"));
    } catch(e) {}

    const handleStorage = () => {
      try {
        setRealtimeChats(JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]"));
      } catch(e) {}
    };
    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "harshadmehta01" && password === "SagishiTRS") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid ID or Password");
    }
  };

  const toggleUserStatus = (userId: number) => {
    setActiveUsers(users =>
      users.map(u => (u.id === userId ? { ...u, active: !u.active } : u))
    );
  };

  const handleWithdrawal = (id: number, action: "Approve" | "Reject") => {
    setWithdrawals(reqs => reqs.filter(r => r.id !== id));
    alert(`Withdrawal ${action}d!`);
  };

  const assignPlan = (userId: number, plan: string) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(users => users.filter(u => u.id !== userId));
      setActiveUsers([...activeUsers, { ...user, plan, earnings: 0, active: true }]);
      alert(`Assigned ${plan} plan to ${user.name}`);
      // REALTIME SYNC
      localStorage.setItem("rpc_user_status", "active");
    }
  };

  const handleSendAdminChat = () => {
    if (!chatMessage) return;
    const currentMsgs = JSON.parse(localStorage.getItem("rpc_chat_messages") || "[]");
    const newMsgs = [...currentMsgs, { sender: "admin", text: chatMessage }];
    localStorage.setItem("rpc_chat_messages", JSON.stringify(newMsgs));
    setRealtimeChats(newMsgs);
    setChatMessage("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-brand-bgCard border border-brand-border rounded-xl3 p-8 shadow-card relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue opacity-10 blur-3xl rounded-full" />
          <div className="text-center mb-8 relative z-10">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-brand-muted text-sm">Secure access only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{error}</div>}
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-muted ml-1">Admin ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white placeholder-brand-dim focus:border-brand-blue focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-muted ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-brand-bgLight border border-brand-border rounded-xl py-3 px-4 text-white placeholder-brand-dim focus:border-brand-blue focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-brand-blue hover:bg-brand-blueBright text-white font-semibold py-3 px-4 rounded-xl shadow-glow-sm transition-colors"
            >
              Login to Dashboard
            </button>
            <Link href="/" className="block text-center mt-4 text-brand-dim hover:text-white text-sm">Return to Website</Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-brand-bgCard border-r border-brand-border flex flex-col">
        <div className="p-6 border-b border-brand-border">
          <h2 className="text-xl font-display font-bold text-white tracking-widest">RPC <span className="text-brand-blue">ADMIN</span></h2>
        </div>
        <div className="flex-1 p-4 space-y-2">
          {[
            { id: "Active Users", icon: Users },
            { id: "Pending Users", icon: UserPlus },
            { id: "Chats", icon: MessageSquare },
            { id: "Withdrawals", icon: IndianRupee },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === tab.id ? "bg-brand-blue text-white shadow-glow-sm" : "text-brand-muted hover:bg-brand-bgLight hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.id}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-brand-border">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">{activeTab}</h1>
            <p className="text-brand-muted">Manage your platform and users.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-bgLight border border-brand-border rounded-xl py-2 pl-9 pr-4 text-white text-sm focus:outline-none focus:border-brand-blue w-full sm:w-64 transition-colors"
            />
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Active Users" && (
              <div className="bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                <table className="w-full text-left text-sm text-brand-muted">
                  <thead className="bg-brand-bgLight text-white font-semibold">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Earnings</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {activeUsers
                      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone.includes(searchQuery))
                      .map(user => (
                        <tr key={user.id} className="hover:bg-brand-bgLight/50">
                        <td className="px-6 py-4 text-white">{user.name}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-brand-blue/20 text-brand-blueBright rounded-md text-xs">{user.plan}</span></td>
                        <td className="px-6 py-4">₹{user.earnings}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${user.active ? "bg-brand-green/20 text-brand-green" : "bg-red-500/20 text-red-500"}`}>
                            {user.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={user.active ? "active" : "inactive"}
                            onChange={(e) => {
                              const isActive = e.target.value === "active";
                              if (user.active !== isActive) toggleUserStatus(user.id);
                            }}
                            className="bg-brand-bgLight border border-brand-border text-brand-muted hover:text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-brand-blue cursor-pointer transition-colors"
                          >
                            <option value="active">Set Active</option>
                            <option value="inactive">Set Inactive</option>
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
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4 text-right">Assign Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {pendingUsers
                      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone.includes(searchQuery))
                      .map(user => (
                        <tr key={user.id} className="hover:bg-brand-bgLight/50">
                        <td className="px-6 py-4 text-white">{user.name}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">{user.joinedAt}</td>
                        <td className="px-6 py-4 text-right flex justify-end">
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) assignPlan(user.id, e.target.value);
                            }}
                            className="bg-brand-bgLight border border-brand-border text-brand-muted hover:text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-brand-blue cursor-pointer transition-colors w-32"
                          >
                            <option value="" disabled>Assign Plan...</option>
                            <option value="Starter">Starter</option>
                            <option value="Growth">Growth</option>
                            <option value="Elite">Elite</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {pendingUsers.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-8 text-center">No pending users.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Withdrawals" && (
              <div className="bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                <table className="w-full text-left text-sm text-brand-muted">
                  <thead className="bg-brand-bgLight text-white font-semibold">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {withdrawals
                      .filter(r => r.user.toLowerCase().includes(searchQuery.toLowerCase()) || String(r.amount).includes(searchQuery))
                      .map(req => (
                        <tr key={req.id} className="hover:bg-brand-bgLight/50">
                        <td className="px-6 py-4 text-white">{req.user}</td>
                        <td className="px-6 py-4 font-semibold text-brand-gold">₹{req.amount}</td>
                        <td className="px-6 py-4">{req.date}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-md text-xs">Pending</span></td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <button onClick={() => handleWithdrawal(req.id, "Approve")} className="p-1.5 bg-brand-green/20 hover:bg-brand-green text-brand-green hover:text-white rounded-md transition-colors" title="Approve"><Check className="w-4 h-4" /></button>
                          <button onClick={() => handleWithdrawal(req.id, "Reject")} className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-md transition-colors" title="Reject"><X className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                    {withdrawals.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-8 text-center">No pending withdrawals.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Chats" && (
              <div className="flex flex-col lg:flex-row h-[600px] bg-brand-bgCard border border-brand-border rounded-xl2 overflow-hidden">
                {/* Chat List */}
                <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-brand-border overflow-y-auto">
                  {MOCK_CHATS
                    .filter(c => c.user.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(chat => (
                      <div key={chat.id} className="p-4 border-b border-brand-border hover:bg-brand-bgLight cursor-pointer transition-colors flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{chat.user}</div>
                        <div className="text-xs text-brand-muted truncate max-w-[200px]">{chat.lastMessage}</div>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Chat Window */}
                <div className="w-full lg:w-2/3 flex flex-col bg-brand-bg">
                  <div className="p-4 border-b border-brand-border bg-brand-bgLight font-semibold text-white flex justify-between items-center">
                    <span>Chatting with: Neha Verma</span>
                    <button className="text-xs bg-brand-blue px-3 py-1.5 rounded-lg">Send QR Code</button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {realtimeChats.length === 0 && <div className="text-center text-brand-muted text-sm mt-10">No messages yet.</div>}
                    {realtimeChats.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 rounded-xl text-sm ${msg.sender === 'admin' ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-brand-bgLight border border-brand-border text-brand-muted rounded-tl-none'}`}>
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
                  <div className="p-4 border-t border-brand-border bg-brand-bgLight flex gap-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendAdminChat()}
                      placeholder="Type a message..."
                      className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-blue text-sm"
                    />
                    <button onClick={handleSendAdminChat} className="bg-brand-blue hover:bg-brand-blueBright text-white p-2.5 rounded-xl transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
