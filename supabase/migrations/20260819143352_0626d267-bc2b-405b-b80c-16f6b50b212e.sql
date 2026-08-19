CREATE TABLE public.clinical_cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled case',
  mode TEXT NOT NULL DEFAULT 'care_plan',
  patient_context JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'open',
  follow_up_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clinical_cases TO authenticated;
GRANT ALL ON public.clinical_cases TO service_role;
ALTER TABLE public.clinical_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clinicians manage their own cases"
ON public.clinical_cases FOR ALL TO authenticated
USING (created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (created_by = auth.uid());

CREATE TABLE public.clinical_case_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES public.clinical_cases(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX clinical_case_messages_case_idx ON public.clinical_case_messages(case_id, created_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clinical_case_messages TO authenticated;
GRANT ALL ON public.clinical_case_messages TO service_role;
ALTER TABLE public.clinical_case_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clinicians manage messages in their own cases"
ON public.clinical_case_messages FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.clinical_cases c WHERE c.id = case_id AND (c.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'))))
WITH CHECK (EXISTS (SELECT 1 FROM public.clinical_cases c WHERE c.id = case_id AND c.created_by = auth.uid()));

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_clinical_cases_updated_at BEFORE UPDATE ON public.clinical_cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();