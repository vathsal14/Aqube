-- Create a function to update referrer's spins when a new referral is made
CREATE OR REPLACE FUNCTION public.process_referral_bonus()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is a new referral (not an update to an existing one)
  IF TG_OP = 'INSERT' THEN
    -- Add 1 spin to the referrer's account
    UPDATE public.profiles
    SET 
      spins = COALESCE(spins, 0) + 1,
      updated_at = NOW()
    WHERE id = NEW.referrer_id;
    
    -- Update the referral status to 'completed'
    NEW.status := 'completed';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new referral is inserted
CREATE OR REPLACE TRIGGER on_referral_created
BEFORE INSERT OR UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.process_referral_bonus();

-- Update the existing process_referral function to set the initial status
CREATE OR REPLACE FUNCTION process_referral(referred_user_id UUID, referral_code TEXT)
RETURNS VOID AS $$
BEGIN
  -- Find the referrer and create referral record with 'pending' status
  -- The trigger will update it to 'completed' after adding the spin
  INSERT INTO referrals (referrer_id, referred_id, status)
  SELECT p.id, referred_user_id, 'pending'
  FROM profiles p
  WHERE p.referral_code = referral_code
  AND NOT EXISTS (
    SELECT 1 FROM referrals r 
    WHERE r.referrer_id = p.id AND r.referred_id = referred_user_id
  );
END;
$$ LANGUAGE plpgsql;
