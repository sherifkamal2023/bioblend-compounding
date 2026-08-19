INSERT INTO public.user_roles (user_id, role)
SELECT id, 'pharmacist'::app_role FROM auth.users WHERE email = 'sherifkam@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;