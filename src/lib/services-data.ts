export type ServiceCategory =
  | "Identity"
  | "Travel"
  | "Driving"
  | "Welfare"
  | "Finance"
  | "Civic"
  | "Education"
  | "Property";

export interface GovService {
  slug: string;
  name: { en: string; hi: string };
  category: ServiceCategory;
  authority: string;
  processingTime: string;
  fee: string;
  description: { en: string; hi: string };
  documents: {
    title: { en: string; hi: string };
    required: boolean;
    note?: { en: string; hi: string };
  }[];
  eligibility: { en: string[]; hi: string[] };
  applyUrl?: string;
}

export const services: GovService[] = [
  {
    slug: "aadhaar-card",
    name: { en: "Aadhaar Card", hi: "आधार कार्ड" },
    category: "Identity",
    authority: "UIDAI",
    processingTime: "15–30 days",
    fee: "Free (new enrolment) · ₹50 update",
    description: {
      en: "12-digit unique identity number issued by UIDAI to every resident of India.",
      hi: "यूआईडीएआई द्वारा भारत के प्रत्येक निवासी को जारी की गई 12 अंकों की विशिष्ट पहचान संख्या।",
    },
    documents: [
      { title: { en: "Proof of Identity (PAN / Voter ID / Passport)", hi: "पहचान का प्रमाण" }, required: true },
      { title: { en: "Proof of Address (Utility bill / Rent agreement)", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Proof of Date of Birth (Birth certificate / 10th marksheet)", hi: "जन्म तिथि का प्रमाण" }, required: true },
      { title: { en: "Recent passport-size photograph", hi: "हाल का पासपोर्ट साइज़ फोटो" }, required: false, note: { en: "Captured at enrolment centre", hi: "नामांकन केंद्र पर लिया जाता है" } },
    ],
    eligibility: {
      en: ["Any resident of India, including infants", "Must visit nearest Aadhaar enrolment centre for biometrics"],
      hi: ["भारत का कोई भी निवासी", "बायोमेट्रिक्स के लिए निकटतम केंद्र पर जाएं"],
    },
    applyUrl: "https://uidai.gov.in",
  },
  {
    slug: "pan-card",
    name: { en: "PAN Card", hi: "पैन कार्ड" },
    category: "Finance",
    authority: "Income Tax Department",
    processingTime: "7–15 days",
    fee: "₹110 (India) · ₹1,020 (Foreign address)",
    description: {
      en: "Permanent Account Number, a 10-character alphanumeric identifier for all tax-related transactions.",
      hi: "स्थायी खाता संख्या - सभी कर लेनदेन के लिए 10-वर्णों का अल्फ़ान्यूमेरिक पहचानकर्ता।",
    },
    documents: [
      { title: { en: "Proof of Identity (Aadhaar / Voter ID / Passport)", hi: "पहचान प्रमाण" }, required: true },
      { title: { en: "Proof of Address", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Proof of Date of Birth", hi: "जन्म तिथि प्रमाण" }, required: true },
      { title: { en: "Two passport-size photographs", hi: "दो पासपोर्ट साइज़ फोटो" }, required: true },
      { title: { en: "Form 49A (49AA for foreign citizens)", hi: "फॉर्म 49A" }, required: true },
    ],
    eligibility: {
      en: ["Indian citizens, NRIs, and foreign nationals earning in India", "Minors can also apply (parent acts as representative)"],
      hi: ["भारतीय नागरिक, एनआरआई और भारत में कमाई करने वाले विदेशी"],
    },
    applyUrl: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
  },
  {
    slug: "passport",
    name: { en: "Indian Passport", hi: "भारतीय पासपोर्ट" },
    category: "Travel",
    authority: "Ministry of External Affairs",
    processingTime: "30–45 days (Normal) · 7–14 days (Tatkal)",
    fee: "₹1,500–₹3,500 depending on pages & speed",
    description: {
      en: "Travel document issued for international travel, valid for 10 years for adults.",
      hi: "अंतर्राष्ट्रीय यात्रा के लिए जारी यात्रा दस्तावेज़, वयस्कों के लिए 10 वर्ष तक मान्य।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "PAN Card / Voter ID", hi: "पैन / वोटर आईडी" }, required: true },
      { title: { en: "Birth Certificate or 10th Marksheet", hi: "जन्म प्रमाणपत्र या 10वीं अंकपत्र" }, required: true },
      { title: { en: "Address Proof (Utility bill / Bank statement)", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Annexure as per applicant type (e.g. minor, govt employee)", hi: "आवेदक के अनुसार अनुलग्नक" }, required: false },
    ],
    eligibility: {
      en: ["Indian citizenship required", "Police verification will be conducted"],
      hi: ["भारतीय नागरिकता आवश्यक", "पुलिस सत्यापन किया जाएगा"],
    },
    applyUrl: "https://www.passportindia.gov.in",
  },
  {
    slug: "driving-licence",
    name: { en: "Driving Licence", hi: "ड्राइविंग लाइसेंस" },
    category: "Driving",
    authority: "RTO (State Transport Dept.)",
    processingTime: "30 days (after LL + test)",
    fee: "₹200–₹1,000 depending on vehicle class",
    description: {
      en: "Official permit to operate a motor vehicle on Indian roads, issued by your state RTO.",
      hi: "भारतीय सड़कों पर वाहन चलाने का आधिकारिक परमिट।",
    },
    documents: [
      { title: { en: "Learner's Licence (LL)", hi: "लर्नर लाइसेंस" }, required: true },
      { title: { en: "Form 4 (Application)", hi: "फॉर्म 4" }, required: true },
      { title: { en: "Age Proof (Birth certificate / 10th marksheet)", hi: "आयु प्रमाण" }, required: true },
      { title: { en: "Address Proof (Aadhaar / Utility bill)", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Passport-size photographs", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
      { title: { en: "Form 1A (Medical fitness, for HMV / age 40+)", hi: "मेडिकल फिटनेस फॉर्म" }, required: false },
    ],
    eligibility: {
      en: ["18+ for LMV (cars / 2-wheelers above 50cc)", "16+ for gearless 2-wheelers up to 50cc (with consent)", "20+ for commercial / HMV"],
      hi: ["एलएमवी के लिए 18+", "वाणिज्यिक वाहनों के लिए 20+"],
    },
    applyUrl: "https://parivahan.gov.in",
  },
  {
    slug: "voter-id",
    name: { en: "Voter ID (EPIC)", hi: "वोटर आईडी" },
    category: "Civic",
    authority: "Election Commission of India",
    processingTime: "15–30 days",
    fee: "Free",
    description: {
      en: "Electoral Photo Identity Card issued to eligible voters by the Election Commission.",
      hi: "चुनाव आयोग द्वारा पात्र मतदाताओं को जारी की गई पहचान पत्र।",
    },
    documents: [
      { title: { en: "Form 6 (New registration)", hi: "फॉर्म 6" }, required: true },
      { title: { en: "Age Proof", hi: "आयु प्रमाण" }, required: true },
      { title: { en: "Address Proof", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "One passport-size photograph", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
    ],
    eligibility: {
      en: ["Indian citizen aged 18 years or above on qualifying date", "Ordinary resident of the constituency"],
      hi: ["18 वर्ष या उससे अधिक का भारतीय नागरिक"],
    },
    applyUrl: "https://voters.eci.gov.in",
  },
  {
    slug: "ration-card",
    name: { en: "Ration Card", hi: "राशन कार्ड" },
    category: "Welfare",
    authority: "State Food & Civil Supplies Dept.",
    processingTime: "15–30 days",
    fee: "₹5–₹50 (varies by state)",
    description: {
      en: "Document enabling access to subsidised food grains under the Public Distribution System.",
      hi: "सार्वजनिक वितरण प्रणाली के तहत राशन प्राप्त करने का दस्तावेज़।",
    },
    documents: [
      { title: { en: "Aadhaar of all family members", hi: "परिवार के सदस्यों का आधार" }, required: true },
      { title: { en: "Proof of Residence", hi: "निवास प्रमाण" }, required: true },
      { title: { en: "Income Certificate", hi: "आय प्रमाणपत्र" }, required: true },
      { title: { en: "Cancelled cheque / Bank passbook copy", hi: "बैंक पासबुक की प्रति" }, required: true },
      { title: { en: "Family photograph", hi: "पारिवारिक फोटो" }, required: true },
    ],
    eligibility: {
      en: ["Indian citizen", "Not already holding a ration card elsewhere", "Income falls under BPL / APL / AAY criteria of the state"],
      hi: ["भारतीय नागरिक", "किसी अन्य राज्य में राशन कार्ड न हो"],
    },
  },
  {
    slug: "birth-certificate",
    name: { en: "Birth Certificate", hi: "जन्म प्रमाणपत्र" },
    category: "Civic",
    authority: "Municipal Corporation / Gram Panchayat",
    processingTime: "7–21 days",
    fee: "₹20–₹100",
    description: {
      en: "Official record of a child's birth, mandatory under the Registration of Births and Deaths Act.",
      hi: "बच्चे के जन्म का आधिकारिक रिकॉर्ड।",
    },
    documents: [
      { title: { en: "Hospital discharge summary / Birth proof from hospital", hi: "अस्पताल का जन्म प्रमाण" }, required: true },
      { title: { en: "Parents' Aadhaar Cards", hi: "माता-पिता का आधार" }, required: true },
      { title: { en: "Parents' Marriage Certificate", hi: "माता-पिता का विवाह प्रमाणपत्र" }, required: false },
      { title: { en: "Address Proof of parents", hi: "माता-पिता का पते का प्रमाण" }, required: true },
      { title: { en: "Affidavit (if registered after 1 year of birth)", hi: "शपथ पत्र (देरी की स्थिति में)" }, required: false },
    ],
    eligibility: { en: ["Birth must be registered within 21 days for free issuance"], hi: ["जन्म 21 दिन के भीतर पंजीकृत होना चाहिए"] },
  },
  {
    slug: "income-certificate",
    name: { en: "Income Certificate", hi: "आय प्रमाणपत्र" },
    category: "Welfare",
    authority: "Tehsildar / SDM Office",
    processingTime: "10–15 days",
    fee: "₹10–₹50",
    description: {
      en: "Document certifying annual income of a family, required for scholarships, EWS, and reservations.",
      hi: "छात्रवृत्ति, ईडब्ल्यूएस, आरक्षण आदि के लिए आवश्यक आय प्रमाण।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Ration Card", hi: "राशन कार्ड" }, required: true },
      { title: { en: "Salary slips / Form 16 / ITR (for salaried)", hi: "वेतन पर्ची / आईटीआर" }, required: true },
      { title: { en: "Self-declaration / Affidavit of income", hi: "स्व-घोषणा शपथ पत्र" }, required: true },
      { title: { en: "Address Proof", hi: "पते का प्रमाण" }, required: true },
    ],
    eligibility: { en: ["Resident of the state where applied", "Valid for 6 months to 1 year (state-dependent)"], hi: ["राज्य का निवासी होना आवश्यक"] },
  },
  {
    slug: "caste-certificate",
    name: { en: "Caste Certificate (SC/ST/OBC)", hi: "जाति प्रमाणपत्र" },
    category: "Welfare",
    authority: "Tehsildar / Revenue Dept.",
    processingTime: "21–30 days",
    fee: "₹10–₹40",
    description: {
      en: "Certificate proving belonging to a reserved category for availing reservation benefits.",
      hi: "आरक्षण लाभ हेतु जाति का प्रमाणपत्र।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Father / Blood relative's Caste Certificate", hi: "पिता का जाति प्रमाणपत्र" }, required: true },
      { title: { en: "Residence Proof", hi: "निवास प्रमाण" }, required: true },
      { title: { en: "School leaving certificate", hi: "स्कूल छोड़ने का प्रमाणपत्र" }, required: true },
      { title: { en: "Affidavit", hi: "शपथ पत्र" }, required: true },
    ],
    eligibility: { en: ["Belong to notified SC/ST/OBC community of the state"], hi: ["अधिसूचित समुदाय का सदस्य"] },
  },
  {
    slug: "gst-registration",
    name: { en: "GST Registration", hi: "जीएसटी पंजीकरण" },
    category: "Finance",
    authority: "GST Network (GSTN)",
    processingTime: "3–7 working days",
    fee: "Free (govt) · Professional fees vary",
    description: {
      en: "Mandatory registration for businesses with turnover above the GST threshold.",
      hi: "जीएसटी सीमा से अधिक टर्नओवर वाले व्यवसायों के लिए अनिवार्य पंजीकरण।",
    },
    documents: [
      { title: { en: "PAN of business / proprietor", hi: "व्यवसाय का पैन" }, required: true },
      { title: { en: "Aadhaar of proprietor / partners / directors", hi: "आधार" }, required: true },
      { title: { en: "Business address proof (Electricity bill / Rent agreement + NOC)", hi: "व्यवसाय पते का प्रमाण" }, required: true },
      { title: { en: "Bank account proof (Cancelled cheque / Passbook)", hi: "बैंक खाता प्रमाण" }, required: true },
      { title: { en: "Digital Signature (for companies & LLPs)", hi: "डिजिटल हस्ताक्षर" }, required: false },
      { title: { en: "Photograph of proprietor / partners", hi: "फोटो" }, required: true },
    ],
    eligibility: {
      en: ["Turnover > ₹40 lakh (goods) / ₹20 lakh (services)", "Inter-state suppliers and e-commerce sellers regardless of turnover"],
      hi: ["वस्तुओं हेतु ₹40 लाख से अधिक टर्नओवर"],
    },
    applyUrl: "https://www.gst.gov.in",
  },
  {
    slug: "domicile-certificate",
    name: { en: "Domicile Certificate", hi: "अधिवास प्रमाणपत्र" },
    category: "Civic",
    authority: "Tehsildar / Revenue Dept.",
    processingTime: "15–30 days",
    fee: "₹10–₹50",
    description: { en: "Proves permanent residency in a particular state for education and job quotas.", hi: "राज्य में स्थायी निवास का प्रमाण।" },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Voter ID / Ration Card", hi: "वोटर आईडी / राशन कार्ड" }, required: true },
      { title: { en: "School / College certificate showing state of study", hi: "विद्यालय प्रमाणपत्र" }, required: true },
      { title: { en: "Self-declaration affidavit", hi: "शपथ पत्र" }, required: true },
      { title: { en: "Parents' domicile (if applying as minor)", hi: "माता-पिता का अधिवास" }, required: false },
    ],
    eligibility: { en: ["Resided continuously in the state for the period prescribed (usually 3+ years)"], hi: ["राज्य में 3+ वर्ष का निवास"] },
  },
  {
    slug: "ayushman-bharat",
    name: { en: "Ayushman Bharat (PM-JAY) Card", hi: "आयुष्मान भारत कार्ड" },
    category: "Welfare",
    authority: "National Health Authority",
    processingTime: "Instant–7 days",
    fee: "Free",
    description: {
      en: "Health insurance cover up to ₹5 lakh per family per year for eligible beneficiaries.",
      hi: "पात्र परिवारों के लिए ₹5 लाख तक का स्वास्थ्य बीमा।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Ration Card", hi: "राशन कार्ड" }, required: true },
      { title: { en: "Mobile number linked with Aadhaar", hi: "आधार से जुड़ा मोबाइल नंबर" }, required: true },
      { title: { en: "Family ID / SECC reference", hi: "पारिवारिक आईडी" }, required: false },
    ],
    eligibility: { en: ["Name listed in SECC-2011 database, or under state-specific scheme"], hi: ["एसईसीसी-2011 सूची में नाम होना चाहिए"] },
    applyUrl: "https://beneficiary.nha.gov.in",
  },
];

export const categories: ServiceCategory[] = [
  "Identity",
  "Travel",
  "Driving",
  "Welfare",
  "Finance",
  "Civic",
  "Education",
  "Property",
];
