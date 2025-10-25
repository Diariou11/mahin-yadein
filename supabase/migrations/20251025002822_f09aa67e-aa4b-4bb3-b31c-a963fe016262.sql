-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_driver BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Loyalty program tables
CREATE TYPE public.loyalty_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');

CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  points INTEGER DEFAULT 0 NOT NULL,
  tier public.loyalty_tier DEFAULT 'bronze' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own loyalty points"
  ON public.loyalty_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own loyalty points"
  ON public.loyalty_points FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own loyalty points"
  ON public.loyalty_points FOR UPDATE
  USING (auth.uid() = user_id);

-- Badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone"
  ON public.badges FOR SELECT
  USING (true);

-- User badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

-- Emergency contacts table
CREATE TABLE public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relationship TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own emergency contacts"
  ON public.emergency_contacts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id TEXT,
  passenger_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, passenger_id, driver_id)
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = passenger_id OR auth.uid() = driver_id);

CREATE POLICY "Users can create conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = passenger_id OR auth.uid() = driver_id);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE id = messages.conversation_id
      AND (passenger_id = auth.uid() OR driver_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE id = conversation_id
      AND (passenger_id = auth.uid() OR driver_id = auth.uid())
    )
  );

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Trip ratings table
CREATE TABLE public.trip_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id TEXT NOT NULL,
  rater_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rated_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  punctuality INTEGER CHECK (punctuality >= 0 AND punctuality <= 5),
  driving INTEGER CHECK (driving >= 0 AND driving <= 5),
  cleanliness INTEGER CHECK (cleanliness >= 0 AND cleanliness <= 5),
  friendliness INTEGER CHECK (friendliness >= 0 AND friendliness <= 5),
  route_respect INTEGER CHECK (route_respect >= 0 AND route_respect <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, rater_id)
);

ALTER TABLE public.trip_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view ratings about themselves"
  ON public.trip_ratings FOR SELECT
  USING (auth.uid() = rated_user_id OR auth.uid() = rater_id);

CREATE POLICY "Users can create ratings"
  ON public.trip_ratings FOR INSERT
  WITH CHECK (auth.uid() = rater_id);

-- Recurring trips table
CREATE TYPE public.trip_type AS ENUM ('standard', 'express', 'eco');

CREATE TABLE public.recurring_trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  departure_time TIME NOT NULL,
  days_of_week INTEGER[] NOT NULL,
  trip_type public.trip_type DEFAULT 'standard',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.recurring_trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own recurring trips"
  ON public.recurring_trips FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Corporate accounts table
CREATE TABLE public.corporate_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  admin_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.corporate_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Corporate admins can view their account"
  ON public.corporate_accounts FOR SELECT
  USING (auth.uid() = admin_user_id);

CREATE POLICY "Corporate admins can update their account"
  ON public.corporate_accounts FOR UPDATE
  USING (auth.uid() = admin_user_id);

-- Corporate employees table
CREATE TABLE public.corporate_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  corporate_account_id UUID REFERENCES public.corporate_accounts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(corporate_account_id, user_id)
);

ALTER TABLE public.corporate_employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Corporate employees can view their membership"
  ON public.corporate_employees FOR SELECT
  USING (auth.uid() = user_id);

-- Shared trip links table
CREATE TABLE public.shared_trip_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id TEXT NOT NULL,
  share_code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.shared_trip_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shared trip links"
  ON public.shared_trip_links FOR SELECT
  USING (true);

CREATE POLICY "Users can create shared trip links"
  ON public.shared_trip_links FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- SOS alerts table
CREATE TABLE public.sos_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  trip_id TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own SOS alerts"
  ON public.sos_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create SOS alerts"
  ON public.sos_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own SOS alerts"
  ON public.sos_alerts FOR UPDATE
  USING (auth.uid() = user_id);

-- Trip insurance table
CREATE TABLE public.trip_insurance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id TEXT NOT NULL UNIQUE,
  coverage_amount INTEGER DEFAULT 500000,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.trip_insurance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip insurance is viewable by everyone"
  ON public.trip_insurance FOR SELECT
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_points_updated_at
  BEFORE UPDATE ON public.loyalty_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();