-- Row Level Security (RLS) policies for profiles table
-- Users can only access, update, and insert their own profile data

-- Policy: Users can SELECT their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can UPDATE their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Policy: Users can INSERT their own profile (safety measure)
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
