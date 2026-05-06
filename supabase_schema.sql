-- Create ENUM for User Roles
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Create ENUM for User Plans
CREATE TYPE user_plan AS ENUM ('None', 'Starter', 'Growth', 'Elite');

-- 1. USERS TABLE (Extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  role user_role DEFAULT 'user',
  current_plan user_plan DEFAULT 'None',
  is_active BOOLEAN DEFAULT true,
  earnings_balance DECIMAL(10, 2) DEFAULT 0.00,
  total_investment DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. CHATS TABLE
CREATE TABLE public.chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable until admin claims chat
  status TEXT DEFAULT 'open', -- open, closed, pending_payment
  type TEXT DEFAULT 'plan_purchase', -- plan_purchase, deposit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- 3. MESSAGES TABLE
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  image_url TEXT, -- For payment screenshots or QR codes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 4. WITHDRAWAL REQUESTS TABLE
CREATE TABLE public.withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  details TEXT, -- Bank details, IFSC etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;


-----------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-----------------------------------------

-- Profiles: Users can read their own profile. Admins can read/update all.
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Chats: Users can read their own chats. Admins can read all.
CREATE POLICY "Users can read own chats" ON public.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own chats" ON public.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all chats" ON public.chats USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Messages: Users can read/insert messages in their own chats.
CREATE POLICY "Users can read messages in own chats" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chats WHERE id = messages.chat_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert messages in own chats" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.chats WHERE id = messages.chat_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage all messages" ON public.messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Withdrawals: Users can insert/read their own. Admins can manage all.
CREATE POLICY "Users can insert own withdrawals" ON public.withdrawals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own withdrawals" ON public.withdrawals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all withdrawals" ON public.withdrawals USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-----------------------------------------
-- REALTIME SETUP
-----------------------------------------
-- Enable realtime events for tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.withdrawals;
