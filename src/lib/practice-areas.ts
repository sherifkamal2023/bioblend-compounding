export type PracticeArea = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  hero: string;
  intro: string;
  offerings: { title: string; body: string }[];
  process: string[];
  note?: string;
  ar?: {
    title: string;
    eyebrow: string;
    tagline: string;
    hero: string;
    intro: string;
    offerings: { title: string; body: string }[];
    process: string[];
    note?: string;
  };
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "hormone",
    title: "Hormone Optimization",
    eyebrow: "Hormone Lab",
    tagline: "Bio-identical HRT, thyroid, adrenal — dosed to your labs.",
    hero: "Precision endocrine care, compounded one prescription at a time.",
    intro:
      "Our pharmacists formulate bio-identical estrogen, progesterone, testosterone, DHEA, and thyroid protocols to match your physician's plan — down to the milligram, in the delivery form you tolerate best.",
    offerings: [
      { title: "Bio-identical HRT", body: "Estradiol, progesterone, testosterone in creams, troches, capsules or pellets." },
      { title: "Thyroid support", body: "T3 / T4 combinations, slow-release capsules, alternative fillers for sensitivities." },
      { title: "Adrenal & DHEA", body: "Micronised DHEA, pregnenolone, cortisol-support formulations." },
      { title: "Andropause protocols", body: "Testosterone creams and injectables with clinical follow-up." },
    ],
    process: [
      "Physician sends prescription with lab-guided target dose.",
      "Pharmacist confirms delivery form, base, and any allergen exclusions with you.",
      "Compounded in-lab under strict quality control, batch-tested.",
      "Discreet delivery + follow-up review at 6 and 12 weeks.",
    ],
    ar: {
      title: "تعديل الهرمونات",
      eyebrow: "مختبر الهرمونات",
      tagline: "هرمونات طبيعية مطابقة، غدّة درقية، وكظرية — بجرعات مضبوطة على تحاليلك.",
      hero: "رعاية دقيقة للغدد الصمّاء، تركيبة واحدة لكل مريض.",
      intro:
        "يُحضّر صيادلتنا الإستروجين والبروجستيرون والتستوستيرون و DHEA وبروتوكولات الغدة الدرقية بشكل مطابق للطبيعي، وبما يتوافق تماماً مع خطّة طبيبك — بدقّة المليغرام، وبالشكل الدوائي الأنسب لك.",
      offerings: [
        { title: "هرمونات طبيعية مطابقة", body: "إستراديول، بروجستيرون، وتستوستيرون في كريمات، أقراص ذائبة، كبسولات أو حبيبات." },
        { title: "دعم الغدة الدرقية", body: "خلطات T3 / T4، كبسولات بطيئة الإطلاق، ومكوّنات بديلة لأصحاب الحساسية." },
        { title: "دعم الغدّة الكظرية و DHEA", body: "تركيبات DHEA دقيقة، برجنينولون، ودعم لهرمون الكورتيزول." },
        { title: "بروتوكولات سنّ اليأس عند الرجال", body: "كريمات وحقن تستوستيرون مع متابعة سريرية." },
      ],
      process: [
        "يُرسل الطبيب الوصفة بالجرعة المستهدفة بناءً على التحاليل.",
        "يؤكّد الصيدلي معك الشكل الدوائي، والقاعدة، وأي مسبّبات حساسية يجب استثناؤها.",
        "نُحضّر التركيبة في المختبر مع فحص جودة صارم لكل دفعة.",
        "توصيل بسريّة تامّة، ومراجعة متابعة بعد 6 و 12 أسبوعاً.",
      ],
    },
  },
  {
    slug: "dermatology",
    title: "Dermatology & Anti-Aging",
    eyebrow: "Dermatology Lab",
    tagline: "Custom serums, peels, and prescription skin protocols.",
    hero: "Prescription-strength skincare, formulated for your skin — not a shelf.",
    intro:
      "We compound retinoids, tranexamic acid, hydroquinone, azelaic acid, kojic, arbutin, and peptide blends to your dermatologist's exact strength — in bases your skin tolerates.",
    offerings: [
      { title: "Custom retinoid serums", body: "Tretinoin from 0.01% to 0.1% in tolerated bases." },
      { title: "Pigmentation protocols", body: "Tranexamic, kojic, arbutin, hydroquinone blends." },
      { title: "Anti-aging peptides", body: "Copper peptides, growth factors, ceramide-rich bases." },
      { title: "Medical peels", body: "TCA, glycolic, salicylic — physician-prescribed strengths." },
    ],
    process: [
      "Consultation with your dermatologist establishes the goal.",
      "We compound the active in a base matched to your skin type.",
      "Sensitivity-tested and pH-balanced before dispensing.",
      "Refills adjusted as tolerance builds.",
    ],
    ar: {
      title: "الأمراض الجلدية ومكافحة الشيخوخة",
      eyebrow: "مختبر الجلدية",
      tagline: "سيرومات مخصّصة، تقشيرات، وبروتوكولات عناية بالبشرة بوصفة طبية.",
      hero: "عناية بالبشرة بتركيز طبي، مُصمّمة لبشرتك — لا لرفّ صيدلية.",
      intro:
        "نُحضّر الريتينويدات، وحمض الترانيكساميك، والهيدروكينون، وحمض الأزيليك، والكوجيك، والأربوتين، وخلطات الببتيدات بالتراكيز التي يحدّدها طبيب الجلدية — وبقاعدة تتقبّلها بشرتك.",
      offerings: [
        { title: "سيرومات ريتينول مخصّصة", body: "تريتينوين بتركيز من 0.01٪ إلى 0.1٪ في قواعد لطيفة على البشرة." },
        { title: "بروتوكولات التصبّغ", body: "خلطات ترانيكساميك، كوجيك، أربوتين، وهيدروكينون." },
        { title: "ببتيدات مكافحة الشيخوخة", body: "ببتيدات النحاس، عوامل النمو، وقواعد غنيّة بالسيراميد." },
        { title: "تقشيرات طبية", body: "TCA، غليكوليك، ساليسيليك — بتراكيز يصفها الطبيب." },
      ],
      process: [
        "استشارة مع طبيب الجلدية لتحديد الهدف.",
        "نُحضّر المادّة الفعّالة في قاعدة تناسب نوع بشرتك.",
        "نفحصها للحساسيّة ونضبط درجة حموضتها قبل التسليم.",
        "نُعدّل التركيز في مرّات إعادة الصرف مع زيادة تحمّل بشرتك.",
      ],
    },
  },
  {
    slug: "pediatric",
    title: "Pediatric Compounding",
    eyebrow: "Pediatric Lab",
    tagline: "Alcohol-free, sugar-free, dye-free — in flavors children take.",
    hero: "Every child deserves medicine they'll actually swallow.",
    intro:
      "When a manufactured drug is only available in adult tablets, we transform it into a precisely-dosed pediatric suspension — free of alcohol, sugar, dyes, or common allergens.",
    offerings: [
      { title: "Flavored suspensions", body: "Bubblegum, grape, strawberry, mango — child-tested." },
      { title: "Micro-dosing", body: "Milligram-accurate dosing for neonates and infants." },
      { title: "Allergen-free bases", body: "Gluten-, lactose-, dye-, and preservative-free options." },
      { title: "Chewables & lozenges", body: "For children who refuse liquids." },
    ],
    process: [
      "Pediatrician sends prescription with weight-based dose.",
      "We select the flavour system with the parent.",
      "Compounded fresh with short beyond-use dating.",
      "Delivered to your door with dosing syringe and log sheet.",
    ],
    ar: {
      title: "تركيبات الأطفال",
      eyebrow: "مختبر الأطفال",
      tagline: "خالية من الكحول والسكر والملوّنات — بنكهات يحبّها الأطفال.",
      hero: "كل طفل يستحقّ دواءً يقبل شربه بسهولة.",
      intro:
        "عندما يكون الدواء متوفراً بأقراص للبالغين فقط، نحوّله إلى شراب بجرعة دقيقة تناسب طفلك — خالٍ من الكحول والسكر والملوّنات ومسبّبات الحساسية الشائعة.",
      offerings: [
        { title: "شرابات بنكهات", body: "علكة، عنب، فراولة، مانجو — مُجرّبة على الأطفال." },
        { title: "جرعات دقيقة جداً", body: "دقّة بالمليغرام لحديثي الولادة والرضّع." },
        { title: "قواعد خالية من المسبّبات", body: "خيارات خالية من الغلوتين واللاكتوز والملوّنات والمواد الحافظة." },
        { title: "أقراص مضغ ومصّاصات", body: "للأطفال الذين يرفضون السوائل." },
      ],
      process: [
        "يُرسل طبيب الأطفال الوصفة بالجرعة المحسوبة حسب وزن الطفل.",
        "نختار النكهة معك كوليّ أمر.",
        "نُحضّر الدواء طازجاً مع مدّة صلاحية قصيرة.",
        "نوصله إلى بابك مع محقنة قياس وورقة متابعة.",
      ],
    },
  },
  {
    slug: "pet-wellness",
    title: "Your Pet's Wellness Matters",
    eyebrow: "Household Wellness",
    tagline: "Because your pet's wellness is part of yours.",
    hero: "A human compounding pharmacy — because family includes the four-legged.",
    intro:
      "We're a human compounding pharmacy first. But personal wellness doesn't stop at the humans in the household. When your pet needs a medication reformulated for palatability, safety, or precise dosing, we prepare it with the same medical rigor — protecting your quality of life and preventing household transmission risk.",
    offerings: [
      { title: "Palatable reformulations", body: "Chicken, tuna, beef, or malt bases pets accept willingly." },
      { title: "Transdermal delivery", body: "For cats who refuse oral medication — applied to the ear." },
      { title: "Precision dosing", body: "Micro-doses for exotics and small breeds." },
      { title: "Zoonotic-safe handling", body: "Formulations that protect immunocompromised household members." },
    ],
    process: [
      "Your veterinarian prescribes — we consult on the safest form.",
      "We compound with pharmaceutical-grade actives, pet-appropriate bases.",
      "Every batch is checked against zoonotic and cross-contamination protocols.",
      "Delivered discreetly with clear administration guidance.",
    ],
    note: "Prescriptions must come from a licensed veterinarian. We do not diagnose or prescribe for animals.",
    ar: {
      title: "صحّة حيوانك الأليف تهمّنا",
      eyebrow: "عافية المنزل",
      tagline: "لأن صحّة حيوانك الأليف جزء من صحّتك.",
      hero: "صيدلية تركيب بشرية — لأن العائلة تشمل ذوات الأرجل الأربع.",
      intro:
        "نحن أساساً صيدلية تركيب للبشر. لكن العافية الشخصية لا تتوقّف عند أفراد الأسرة من البشر. عندما يحتاج حيوانك الأليف إلى إعادة تركيب دوائه لضمان قبوله للطعم، أو للسلامة، أو لدقّة الجرعة، نُحضّره بنفس الصرامة الطبية — لحماية جودة حياتك ومنع انتقال الأمراض داخل البيت.",
      offerings: [
        { title: "إعادة تركيب مقبولة الطعم", body: "قواعد بنكهات الدجاج، التونا، اللحم، أو الشعير يتقبّلها الحيوان طوعاً." },
        { title: "توصيل عبر الجلد", body: "للقطط التي ترفض الدواء الفموي — يُدهن خلف الأذن." },
        { title: "جرعات دقيقة", body: "جرعات صغيرة جداً للحيوانات النادرة والسلالات الصغيرة." },
        { title: "تحضير آمن ضد الأمراض المشتركة", body: "تركيبات تحمي أفراد الأسرة أصحاب المناعة الضعيفة." },
      ],
      process: [
        "يصف الطبيب البيطري العلاج — ونستشيره في أنسب شكل دوائي.",
        "نُحضّره بمواد فعّالة صيدلانية النقاء وقواعد مناسبة للحيوان.",
        "نراجع كل دفعة وفق بروتوكولات الأمراض المشتركة ومنع التلوث المتقاطع.",
        "نوصله بسريّة مع تعليمات إعطاء واضحة.",
      ],
      note: "يجب أن تصدر الوصفات من طبيب بيطري مرخّص. نحن لا نُشخّص ولا نصف أدوية للحيوانات.",
    },
  },
  {
    slug: "wellness-iv",
    title: "Wellness & IV Therapy",
    eyebrow: "Wellness & IV Lab",
    tagline: "Nutraceuticals, IV therapy, longevity protocols.",
    hero: "Precision nutrition, delivered where your body can use it.",
    intro:
      "From NAD+ and glutathione infusions to bespoke oral nutraceuticals and longevity peptides, our sterile lab compounds under USP <797> for injectables and USP <795> for oral protocols.",
    offerings: [
      { title: "NAD+ & glutathione IVs", body: "Cellular repair and detox infusions." },
      { title: "Vitamin & mineral drips", body: "Myers, immune, hydration, athletic recovery." },
      { title: "Longevity peptides", body: "Physician-prescribed anti-aging protocols." },
      { title: "Oral nutraceuticals", body: "Physician-guided vitamin and adaptogen blends." },
    ],
    process: [
      "Physician consultation establishes goals and screens contraindications.",
      "Sterile compounding in our USP <797> cleanroom.",
      "Administered at partner clinics or in your home by licensed nurses.",
      "Follow-up bloodwork adjusts the protocol over time.",
    ],
    ar: {
      title: "العافية والمغذّيات الوريدية",
      eyebrow: "مختبر العافية والوريدي",
      tagline: "مكمّلات غذائية، جلسات وريدية، وبروتوكولات طول عمر.",
      hero: "تغذية دقيقة، تصل إلى جسمك حيث يستطيع الاستفادة منها فعلاً.",
      intro:
        "من جلسات NAD+ والغلوتاثيون الوريدية، إلى المكمّلات الفموية المخصّصة وببتيدات طول العمر، يُحضّر مختبرنا المعقّم وفق معايير USP <797> للحقن و USP <795> للتركيبات الفموية.",
      offerings: [
        { title: "جلسات NAD+ والغلوتاثيون", body: "جلسات وريدية لإصلاح الخلايا وتخليص الجسم من السموم." },
        { title: "قطرات فيتامينات ومعادن", body: "خلطات Myers، تعزيز المناعة، ترطيب، وتعافٍ رياضي." },
        { title: "ببتيدات طول العمر", body: "بروتوكولات مكافحة الشيخوخة بوصفة طبية." },
        { title: "مكمّلات فموية", body: "خلطات فيتامينات وأعشاب مكيّفة بإشراف طبي." },
      ],
      process: [
        "استشارة طبية لتحديد الأهداف واستبعاد موانع الاستخدام.",
        "تحضير معقّم في غرفة نظيفة معتمدة USP <797>.",
        "تُعطى في عيادات شريكة أو في بيتك على يد ممرّضات مرخّصات.",
        "تحاليل متابعة تُعدّل البروتوكول مع الوقت.",
      ],
    },
  },
];

export function findPracticeArea(slug: string) {
  return practiceAreas.find((p) => p.slug === slug);
}
