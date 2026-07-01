import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "hi" | "ta" | "bn" | "te" | "mr" | "gu";

export const langLabels: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
  ta: "தமிழ்",
  bn: "বাংলা",
  te: "తెలుగు",
  mr: "मराठी",
  gu: "ગુજરાતી",
};

type Dict = Record<string, Partial<Record<Lang, string>>>;

const dict: Dict = {
  brandName: { en: "DocSetu", hi: "डॉकसेतु", ta: "DocSetu", bn: "DocSetu", te: "DocSetu", mr: "डॉकसेतु", gu: "ડૉકસેતુ" },
  tagline: {
    en: "Every government document, demystified.",
    hi: "हर सरकारी दस्तावेज़, आसान भाषा में।",
    ta: "ஒவ்வொரு அரசு ஆவணமும், எளிமையாக்கப்பட்டது.",
    bn: "প্রতিটি সরকারি নথি, সহজভাবে।",
    te: "ప్రతి ప్రభుత్వ పత్రం, సరళంగా.",
    mr: "प्रत्येक सरकारी दस्तऐवज, सोप्या भाषेत.",
    gu: "દરેક સરકારી દસ્તાવેજ, સરળ ભાષામાં.",
  },
  heroTitle: {
    en: "Know exactly which documents you need.",
    hi: "जानें आपको कौन से दस्तावेज़ चाहिए।",
    mr: "तुम्हाला नेमके कोणते कागदपत्र हवे आहेत ते जाणून घ्या.",
    gu: "તમને કયા દસ્તાવેજો જોઈએ છે તે ચોક્કસ જાણો.",
  },
  heroSub: {
    en: "Apply for Aadhaar, PAN, Passport, Driving Licence, Ration Card and 100+ Indian government services — with the complete checklist, fees and timelines, in your language.",
    hi: "आधार, पैन, पासपोर्ट, ड्राइविंग लाइसेंस, राशन कार्ड और 100+ भारतीय सरकारी सेवाओं के लिए — पूरी सूची, शुल्क और समय-सीमा आपकी भाषा में।",
  },
  searchPlaceholder: { en: "Search a service (e.g. Aadhaar, PAN, Passport)", hi: "सेवा खोजें (जैसे आधार, पैन, पासपोर्ट)" },
  browseAll: { en: "Browse all services", hi: "सभी सेवाएं देखें" },
  popular: { en: "Popular services", hi: "लोकप्रिय सेवाएं" },
  allServices: { en: "All Services", hi: "सभी सेवाएं", mr: "सर्व सेवा", gu: "બધી સેવાઓ" },
  compare: { en: "Compare", hi: "तुलना करें", mr: "तुलना करा", gu: "સરખામણી કરો" },
  compareTitle: { en: "Compare services side-by-side", hi: "सेवाओं की तुलना करें" },
  compareHint: { en: "Pick up to 3 services to compare documents, fees and timelines.", hi: "3 तक सेवाएं चुनें।" },
  print: { en: "Print checklist", hi: "सूची प्रिंट करें", mr: "यादी प्रिंट करा", gu: "ચેકલિસ્ટ પ્રિન્ટ કરો" },
  categories: { en: "Categories", hi: "श्रेणियाँ" },
  all: { en: "All", hi: "सभी" },
  required: { en: "Required", hi: "आवश्यक" },
  optional: { en: "Optional", hi: "वैकल्पिक" },
  documentsNeeded: { en: "Documents required", hi: "आवश्यक दस्तावेज़" },
  eligibility: { en: "Eligibility", hi: "पात्रता" },
  authority: { en: "Issuing authority", hi: "जारीकर्ता प्राधिकरण" },
  processingTime: { en: "Processing time", hi: "प्रसंस्करण समय" },
  fee: { en: "Govt. fee", hi: "सरकारी शुल्क" },
  applyOfficial: { en: "Apply on official portal", hi: "आधिकारिक पोर्टल पर आवेदन करें" },
  back: { en: "Back to services", hi: "सेवाओं पर वापस" },
  notFound: { en: "Service not found", hi: "सेवा नहीं मिली" },
  noResults: { en: "No services match your search.", hi: "कोई सेवा नहीं मिली।" },
  noResultsTitle: { en: "No results found", hi: "कोई परिणाम नहीं मिला" },
  noResultsTip1: { en: "Try a different keyword or spelling", hi: "कृपया अलग शब्द या वर्तनी आज़माएं" },
  noResultsTip2: { en: "Check All India services", hi: "सभी भारत सेवाएं देखें" },
  noResultsTip3: { en: "Browse all categories", hi: "सभी श्रेणियाँ देखें" },
  noResultsClear: { en: "Reset all filters", hi: "सभी फ़िल्टर हटाएं" },
  noResultsClearSearch: { en: "Clear search", hi: "खोज हटाएं" },
  noResultsClearCategory: { en: "Clear category", hi: "श्रेणी हटाएं" },
  noResultsClearState: { en: "Clear state filter", hi: "राज्य फ़िल्टर हटाएं" },
  footerNote: {
    en: "DocSetu is an information aggregator. We are not affiliated with the Government of India. Always verify on official portals.",
    hi: "डॉकसेतु एक सूचना मंच है। हम भारत सरकार से संबद्ध नहीं हैं। आधिकारिक पोर्टल पर सत्यापन करें।",
  },
  language: { en: "Language", hi: "भाषा" },
  whyTitle: { en: "Built for every Indian", hi: "हर भारतीय के लिए" },
  whyDesc: {
    en: "From a first-time applicant in a village to a busy professional in a metro — DocSetu gives you a single, trustworthy answer for every government formality.",
    hi: "गाँव के पहले आवेदक से लेकर शहर के व्यस्त पेशेवर तक — डॉकसेतु हर सरकारी औपचारिकता का एक भरोसेमंद उत्तर देता है।",
  },
  stat1: { en: "Govt. services covered", hi: "सरकारी सेवाएं" },
  stat2: { en: "Indian languages", hi: "भारतीय भाषाएं" },
  stat3: { en: "Always free to check", hi: "जाँचना हमेशा निःशुल्क" },
  feat1Title: { en: "Plain-language checklists", hi: "सरल भाषा में सूची" },
  feat1Desc: { en: "No jargon. Just the exact documents, in the order you need them.", hi: "कोई जटिल भाषा नहीं — बस ज़रूरी दस्तावेज़।" },
  feat2Title: { en: "Fees & timelines upfront", hi: "शुल्क और समय पहले से" },
  feat2Desc: { en: "Know what to pay and how long it takes before you start.", hi: "शुरू करने से पहले शुल्क और समय जानें।" },
  feat3Title: { en: "Multi-language", hi: "बहुभाषी" },
  feat3Desc: { en: "Available in English, Hindi, Tamil, Bengali, Telugu, Marathi and Gujarati.", hi: "अंग्रेज़ी, हिंदी, तमिल, बंगाली, तेलुगु, मराठी और गुजराती में।" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? dict[key]?.en ?? String(key);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be inside I18nProvider");
  return v;
}

export function localized<T extends { en: string; hi: string }>(field: T, lang: Lang): string {
  // fall back to english for languages without full translation yet
  // @ts-expect-error - dynamic
  return field[lang] ?? field.en;
}
