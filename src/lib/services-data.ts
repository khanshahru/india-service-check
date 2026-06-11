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
  state?: string; // undefined = Central / pan-India
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
    applyUrl: "https://nfsa.gov.in",
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
    applyUrl: "https://crsorgi.gov.in",
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
    applyUrl: "https://services.india.gov.in",
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
    applyUrl: "https://services.india.gov.in",
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
    applyUrl: "https://services.india.gov.in",
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
  {
    slug: "marriage-certificate",
    name: { en: "Marriage Certificate", hi: "विवाह प्रमाणपत्र" },
    category: "Civic",
    authority: "Registrar of Marriages (State Govt.)",
    processingTime: "15–60 days",
    fee: "₹100–₹500",
    description: {
      en: "Legal proof of marriage under the Hindu Marriage Act or Special Marriage Act.",
      hi: "हिंदू विवाह अधिनियम या विशेष विवाह अधिनियम के तहत विवाह का कानूनी प्रमाण।",
    },
    documents: [
      { title: { en: "Aadhaar of both spouses", hi: "दोनों पति-पत्नी का आधार" }, required: true },
      { title: { en: "Age Proof of both (10th marksheet / Birth certificate)", hi: "आयु प्रमाण" }, required: true },
      { title: { en: "Wedding invitation card / Priest's certificate", hi: "विवाह आमंत्रण पत्र" }, required: true },
      { title: { en: "Joint photograph of couple", hi: "जोड़े का फोटो" }, required: true },
      { title: { en: "Two witnesses with ID proof", hi: "दो गवाह" }, required: true },
      { title: { en: "Affidavit declaring marriage", hi: "विवाह शपथ पत्र" }, required: true },
    ],
    eligibility: {
      en: ["Bride 18+ and groom 21+", "Marriage must already be solemnised"],
      hi: ["वधू 18+ और वर 21+"],
    },
    applyUrl: "https://services.india.gov.in",
  },
  {
    slug: "death-certificate",
    name: { en: "Death Certificate", hi: "मृत्यु प्रमाणपत्र" },
    category: "Civic",
    authority: "Municipal Corporation / Gram Panchayat",
    processingTime: "7–21 days",
    fee: "₹20–₹100",
    description: {
      en: "Official record of death, required for inheritance, insurance and pension claims.",
      hi: "उत्तराधिकार, बीमा और पेंशन दावों के लिए आवश्यक मृत्यु का आधिकारिक रिकॉर्ड।",
    },
    documents: [
      { title: { en: "Hospital / Doctor's death certificate", hi: "अस्पताल का मृत्यु प्रमाण" }, required: true },
      { title: { en: "Deceased's Aadhaar Card", hi: "मृतक का आधार" }, required: true },
      { title: { en: "Applicant's ID proof (relative)", hi: "आवेदक की पहचान" }, required: true },
      { title: { en: "Cremation / Burial ground receipt", hi: "अंतिम संस्कार रसीद" }, required: true },
      { title: { en: "Affidavit (if registered after 21 days)", hi: "शपथ पत्र (देरी पर)" }, required: false },
    ],
    eligibility: { en: ["Filed by family / next of kin within 21 days for free issuance"], hi: ["21 दिनों के भीतर परिजन द्वारा"] },
    applyUrl: "https://crsorgi.gov.in",
  },
  {
    slug: "ews-certificate",
    name: { en: "EWS Certificate", hi: "ईडब्ल्यूएस प्रमाणपत्र" },
    category: "Welfare",
    authority: "Tehsildar / SDM Office",
    processingTime: "15–21 days",
    fee: "₹10–₹50",
    description: {
      en: "Economically Weaker Section certificate for 10% reservation in jobs and education.",
      hi: "नौकरियों और शिक्षा में 10% आरक्षण के लिए आर्थिक रूप से कमजोर वर्ग प्रमाणपत्र।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "PAN Card", hi: "पैन कार्ड" }, required: true },
      { title: { en: "Income proof (ITR / salary slip / Form 16)", hi: "आय प्रमाण" }, required: true },
      { title: { en: "Land / Property documents", hi: "भूमि दस्तावेज़" }, required: true },
      { title: { en: "Domicile / Residence Certificate", hi: "निवास प्रमाणपत्र" }, required: true },
      { title: { en: "Self-declaration affidavit", hi: "स्व-घोषणा" }, required: true },
    ],
    eligibility: {
      en: ["Family income below ₹8 lakh per annum", "Agricultural land below 5 acres", "Not covered under SC/ST/OBC reservation"],
      hi: ["पारिवारिक आय ₹8 लाख से कम"],
    },
    applyUrl: "https://services.india.gov.in",
  },
  {
    slug: "udid-disability",
    name: { en: "UDID (Disability Certificate)", hi: "यूडीआईडी (विकलांगता प्रमाणपत्र)" },
    category: "Welfare",
    authority: "Dept. of Empowerment of Persons with Disabilities",
    processingTime: "30–60 days",
    fee: "Free",
    description: {
      en: "Unique Disability ID granting access to disability welfare schemes and benefits.",
      hi: "विकलांगता कल्याण योजनाओं के लिए विशिष्ट विकलांगता पहचान पत्र।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Recent passport-size photograph", hi: "फोटो" }, required: true },
      { title: { en: "Medical certificate from notified hospital", hi: "मेडिकल प्रमाण" }, required: true },
      { title: { en: "Signature / thumb impression", hi: "हस्ताक्षर" }, required: true },
      { title: { en: "Income certificate (for some benefits)", hi: "आय प्रमाण" }, required: false },
    ],
    eligibility: { en: ["Person with 21 specified disabilities under RPWD Act 2016"], hi: ["RPWD अधिनियम 2016 के तहत विकलांगता"] },
    applyUrl: "https://www.swavlambancard.gov.in",
  },
  {
    slug: "pm-kisan",
    name: { en: "PM-Kisan Samman Nidhi", hi: "पीएम-किसान सम्मान निधि" },
    category: "Welfare",
    authority: "Ministry of Agriculture & Farmers Welfare",
    processingTime: "Instant–30 days",
    fee: "Free",
    description: {
      en: "₹6,000 per year in three instalments directly to bank accounts of eligible farmers.",
      hi: "पात्र किसानों के बैंक खातों में सालाना ₹6,000 तीन किस्तों में।",
    },
    documents: [
      { title: { en: "Aadhaar Card (mandatory)", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Land ownership records (Khasra / Khatauni)", hi: "भूमि दस्तावेज़" }, required: true },
      { title: { en: "Bank account passbook", hi: "बैंक पासबुक" }, required: true },
      { title: { en: "Citizenship / Residence proof", hi: "नागरिकता प्रमाण" }, required: true },
      { title: { en: "Mobile number linked to Aadhaar", hi: "आधार लिंक्ड मोबाइल" }, required: true },
    ],
    eligibility: {
      en: ["Small & marginal landholding farmer family", "Excludes income-tax payers and govt employees above Group D"],
      hi: ["छोटे और सीमांत किसान परिवार"],
    },
    applyUrl: "https://pmkisan.gov.in",
  },
  {
    slug: "epfo-uan",
    name: { en: "EPFO UAN (Provident Fund)", hi: "ईपीएफओ यूएएन" },
    category: "Finance",
    authority: "Employees' Provident Fund Organisation",
    processingTime: "Instant (via employer)",
    fee: "Free",
    description: {
      en: "Universal Account Number that ties together all PF accounts of an employee across jobs.",
      hi: "एक कर्मचारी के सभी पीएफ खातों को जोड़ने वाला सार्वभौमिक खाता नंबर।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "PAN Card", hi: "पैन कार्ड" }, required: true },
      { title: { en: "Bank account details (IFSC + account no.)", hi: "बैंक विवरण" }, required: true },
      { title: { en: "Address proof", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Appointment letter / Salary slip", hi: "नियुक्ति पत्र" }, required: false },
    ],
    eligibility: { en: ["Salaried employee in an establishment covered under EPF Act"], hi: ["ईपीएफ अधिनियम के अंतर्गत कर्मचारी"] },
    applyUrl: "https://unifiedportal-mem.epfindia.gov.in",
  },
  {
    slug: "itr-filing",
    name: { en: "Income Tax Return (ITR) Filing", hi: "आयकर रिटर्न (आईटीआर) फाइलिंग" },
    category: "Finance",
    authority: "Income Tax Department",
    processingTime: "Instant filing · 30–90 days for refund",
    fee: "Free (govt) · CA fees vary",
    description: {
      en: "Annual declaration of income, deductions and tax paid to the Income Tax Department.",
      hi: "आयकर विभाग को आय, कटौती और कर का वार्षिक विवरण।",
    },
    documents: [
      { title: { en: "PAN Card", hi: "पैन कार्ड" }, required: true },
      { title: { en: "Aadhaar Card (linked with PAN)", hi: "आधार" }, required: true },
      { title: { en: "Form 16 (from employer)", hi: "फॉर्म 16" }, required: true },
      { title: { en: "Form 26AS / AIS / TIS", hi: "फॉर्म 26AS" }, required: true },
      { title: { en: "Bank statements & interest certificates", hi: "बैंक स्टेटमेंट" }, required: true },
      { title: { en: "Investment proofs (80C, 80D, etc.)", hi: "निवेश प्रमाण" }, required: false },
      { title: { en: "Capital gains statements (if applicable)", hi: "पूंजीगत लाभ" }, required: false },
    ],
    eligibility: {
      en: ["Income above basic exemption limit (₹2.5L old / ₹3L new regime)", "Mandatory if claiming refund or holding foreign assets"],
      hi: ["मूल छूट सीमा से अधिक आय वाले व्यक्ति"],
    },
    applyUrl: "https://www.incometax.gov.in",
  },
  {
    slug: "vehicle-rc",
    name: { en: "Vehicle Registration (RC)", hi: "वाहन पंजीकरण (आरसी)" },
    category: "Driving",
    authority: "RTO (State Transport Dept.)",
    processingTime: "7–30 days",
    fee: "₹600–₹1,500 + road tax (state-wise)",
    description: {
      en: "Mandatory registration of every motor vehicle issuing a Registration Certificate (RC).",
      hi: "प्रत्येक मोटर वाहन का अनिवार्य पंजीकरण।",
    },
    documents: [
      { title: { en: "Form 20 (Application)", hi: "फॉर्म 20" }, required: true },
      { title: { en: "Sale certificate (Form 21) from dealer", hi: "विक्रय प्रमाण" }, required: true },
      { title: { en: "Roadworthiness certificate (Form 22)", hi: "फॉर्म 22" }, required: true },
      { title: { en: "Valid insurance certificate", hi: "बीमा" }, required: true },
      { title: { en: "PUC certificate", hi: "प्रदूषण प्रमाण" }, required: true },
      { title: { en: "Address & ID proof of owner", hi: "मालिक की पहचान व पता" }, required: true },
      { title: { en: "PAN / Form 60 + 61", hi: "पैन / फॉर्म 60" }, required: true },
    ],
    eligibility: { en: ["Owner of a newly purchased vehicle in India"], hi: ["भारत में नए वाहन का मालिक"] },
    applyUrl: "https://parivahan.gov.in",
  },
  {
    slug: "police-clearance",
    name: { en: "Police Clearance Certificate (PCC)", hi: "पुलिस क्लीयरेंस प्रमाणपत्र" },
    category: "Civic",
    authority: "Passport Seva / Local Police",
    processingTime: "7–30 days",
    fee: "₹500 (via Passport Seva)",
    description: {
      en: "Confirms the applicant has no criminal record; needed for foreign visas, employment and immigration.",
      hi: "विदेशी वीज़ा, रोज़गार और आव्रजन के लिए आवश्यक।",
    },
    documents: [
      { title: { en: "Original Passport", hi: "मूल पासपोर्ट" }, required: true },
      { title: { en: "Self-attested copy of passport", hi: "पासपोर्ट की प्रति" }, required: true },
      { title: { en: "Address proof (current)", hi: "वर्तमान पता प्रमाण" }, required: true },
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Visa copy / Employment letter (if abroad)", hi: "वीज़ा प्रति" }, required: false },
    ],
    eligibility: { en: ["Indian passport holder above 18 years"], hi: ["18+ भारतीय पासपोर्ट धारक"] },
    applyUrl: "https://www.passportindia.gov.in",
  },
  {
    slug: "msme-udyam",
    name: { en: "MSME Udyam Registration", hi: "एमएसएमई उद्यम पंजीकरण" },
    category: "Finance",
    authority: "Ministry of MSME",
    processingTime: "1–7 days",
    fee: "Free",
    description: {
      en: "Online recognition for Micro, Small and Medium Enterprises, unlocking schemes and credit benefits.",
      hi: "एमएसएमई की ऑनलाइन मान्यता।",
    },
    documents: [
      { title: { en: "Aadhaar of proprietor / authorised signatory", hi: "आधार" }, required: true },
      { title: { en: "PAN of business / proprietor", hi: "पैन" }, required: true },
      { title: { en: "GSTIN (if applicable)", hi: "जीएसटीआईएन" }, required: false },
      { title: { en: "Bank account details", hi: "बैंक विवरण" }, required: true },
      { title: { en: "Business address & NIC activity code", hi: "व्यवसाय पता" }, required: true },
    ],
    eligibility: {
      en: ["Investment & turnover within Micro / Small / Medium thresholds notified by govt"],
      hi: ["अधिसूचित सीमा के भीतर निवेश व टर्नओवर"],
    },
    applyUrl: "https://udyamregistration.gov.in",
  },
  {
    slug: "property-registration",
    name: { en: "Property Registration", hi: "संपत्ति पंजीकरण" },
    category: "Property",
    authority: "Sub-Registrar Office (State Revenue Dept.)",
    processingTime: "1–7 days (after appointment)",
    fee: "5–8% stamp duty + 1% registration (state-wise)",
    description: {
      en: "Legal registration of sale / purchase of immovable property under the Registration Act, 1908.",
      hi: "अचल संपत्ति की बिक्री / खरीद का कानूनी पंजीकरण।",
    },
    documents: [
      { title: { en: "Sale Deed (drafted & printed on stamp paper)", hi: "विक्रय विलेख" }, required: true },
      { title: { en: "Aadhaar & PAN of buyer and seller", hi: "खरीदार व विक्रेता का आधार और पैन" }, required: true },
      { title: { en: "Latest property tax receipts", hi: "संपत्ति कर रसीद" }, required: true },
      { title: { en: "Encumbrance Certificate (EC)", hi: "बोझ प्रमाणपत्र" }, required: true },
      { title: { en: "Khata / Patta / Title documents", hi: "स्वामित्व दस्तावेज़" }, required: true },
      { title: { en: "Two witnesses with ID proof", hi: "दो गवाह" }, required: true },
      { title: { en: "Stamp duty & registration fee receipt", hi: "स्टांप शुल्क रसीद" }, required: true },
    ],
    eligibility: { en: ["Buyer must be 18+ and competent to contract", "Property must have clear title and approvals"], hi: ["18+ और सक्षम खरीदार"] },
    applyUrl: "https://services.india.gov.in",
  },
  {
    slug: "nsp-scholarship",
    name: { en: "NSP Scholarship", hi: "एनएसपी छात्रवृत्ति" },
    category: "Education",
    authority: "National Scholarship Portal · MoE",
    processingTime: "60–120 days (academic year)",
    fee: "Free",
    description: {
      en: "Single-window portal for Central & State scholarships for SC/ST/OBC, minorities and disabled students.",
      hi: "एससी/एसटी/ओबीसी, अल्पसंख्यक व विकलांग छात्रों के लिए केंद्रीय और राज्य छात्रवृत्ति का एकल पोर्टल।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Income Certificate", hi: "आय प्रमाणपत्र" }, required: true },
      { title: { en: "Caste / Category Certificate", hi: "जाति प्रमाणपत्र" }, required: true },
      { title: { en: "Previous year's marksheet", hi: "पिछले वर्ष की अंकपत्र" }, required: true },
      { title: { en: "Bank passbook (Aadhaar-linked)", hi: "बैंक पासबुक" }, required: true },
      { title: { en: "Institution verification (bonafide certificate)", hi: "संस्थान प्रमाण" }, required: true },
    ],
    eligibility: {
      en: ["Indian student enrolled in recognised institution", "Meets scheme-specific income & category criteria"],
      hi: ["मान्यता प्राप्त संस्थान में नामांकित भारतीय छात्र"],
    },
    applyUrl: "https://scholarships.gov.in",
  },
  {
    slug: "fssai-licence",
    name: { en: "FSSAI Food Licence", hi: "एफएसएसएआई लाइसेंस" },
    category: "Finance",
    authority: "Food Safety and Standards Authority of India",
    processingTime: "7–60 days",
    fee: "₹100/year (Basic) · ₹2,000–₹7,500/year (State/Central)",
    description: {
      en: "Mandatory licence/registration for any food business in India — manufacturing, storage, distribution or sale.",
      hi: "खाद्य व्यवसाय के लिए अनिवार्य लाइसेंस।",
    },
    documents: [
      { title: { en: "PAN of business / proprietor", hi: "व्यवसाय का पैन" }, required: true },
      { title: { en: "Aadhaar / ID proof of proprietor / partners", hi: "पहचान प्रमाण" }, required: true },
      { title: { en: "Business address proof (Rent agreement / Utility bill)", hi: "व्यवसाय पते का प्रमाण" }, required: true },
      { title: { en: "Passport-size photograph", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
      { title: { en: "List of food products to be handled", hi: "खाद्य उत्पाद सूची" }, required: true },
      { title: { en: "Form B (signed declaration)", hi: "फॉर्म बी" }, required: true },
      { title: { en: "NOC from municipality / panchayat", hi: "नगर निगम से एनओसी" }, required: false },
    ],
    eligibility: {
      en: ["Any food business — basic (turnover < ₹12L), state (₹12L–₹20Cr), central (> ₹20Cr or interstate)"],
      hi: ["कोई भी खाद्य व्यवसाय"],
    },
    applyUrl: "https://foscos.fssai.gov.in",
  },
  {
    slug: "shop-establishment",
    name: { en: "Shop & Establishment Licence", hi: "दुकान एवं स्थापना लाइसेंस" },
    category: "Finance",
    authority: "State Labour Department",
    processingTime: "7–30 days",
    fee: "₹100–₹5,000 (varies by state & employee count)",
    description: {
      en: "Mandatory registration under the state Shops & Establishments Act for any commercial premises.",
      hi: "किसी भी वाणिज्यिक प्रतिष्ठान के लिए अनिवार्य पंजीकरण।",
    },
    documents: [
      { title: { en: "PAN of business / proprietor", hi: "पैन कार्ड" }, required: true },
      { title: { en: "Aadhaar of proprietor / partners", hi: "आधार" }, required: true },
      { title: { en: "Premises address proof (Rent agreement / Electricity bill)", hi: "परिसर पते का प्रमाण" }, required: true },
      { title: { en: "Photo of shop / establishment", hi: "दुकान की फोटो" }, required: true },
      { title: { en: "List of employees with details", hi: "कर्मचारियों की सूची" }, required: false },
      { title: { en: "Partnership deed / MoA (if applicable)", hi: "पार्टनरशिप डीड" }, required: false },
    ],
    eligibility: { en: ["Any shop, office, hotel, restaurant or commercial establishment in the state"], hi: ["राज्य में कोई भी वाणिज्यिक प्रतिष्ठान"] },
    applyUrl: "https://labour.gov.in",
  },
  {
    slug: "trade-licence",
    name: { en: "Municipal Trade Licence", hi: "व्यापार लाइसेंस" },
    category: "Finance",
    authority: "Municipal Corporation / Local Body",
    processingTime: "15–30 days",
    fee: "₹500–₹10,000 (depends on trade & city)",
    description: {
      en: "Permission from the local municipal body to carry out a particular trade or business at a given location.",
      hi: "किसी विशिष्ट स्थान पर व्यापार करने हेतु नगर निगम की अनुमति।",
    },
    documents: [
      { title: { en: "Aadhaar / PAN of applicant", hi: "आधार / पैन" }, required: true },
      { title: { en: "Property tax receipt / Rent agreement + NOC", hi: "संपत्ति कर रसीद / किराया अनुबंध" }, required: true },
      { title: { en: "Layout / site plan of premises", hi: "परिसर का नक्शा" }, required: true },
      { title: { en: "NOC from fire department (if applicable)", hi: "अग्निशमन एनओसी" }, required: false },
      { title: { en: "Incorporation / partnership documents", hi: "निगमन दस्तावेज़" }, required: false },
    ],
    eligibility: { en: ["18+ applicant", "Business must not be in a notified prohibited category for that locality"], hi: ["18+ आवेदक"] },
    applyUrl: "https://services.india.gov.in",
  },
  {
    slug: "senior-citizen-card",
    name: { en: "Senior Citizen Card", hi: "वरिष्ठ नागरिक कार्ड" },
    category: "Welfare",
    authority: "State Social Welfare Department",
    processingTime: "15–30 days",
    fee: "Free – ₹50 (state-dependent)",
    description: {
      en: "ID card that helps senior citizens avail concessions in railways, healthcare, banking and other services.",
      hi: "वरिष्ठ नागरिकों को रियायतों के लिए पहचान पत्र।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Age proof (Birth certificate / PAN / Passport)", hi: "आयु प्रमाण" }, required: true },
      { title: { en: "Address proof", hi: "पते का प्रमाण" }, required: true },
      { title: { en: "Passport-size photographs", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
      { title: { en: "Blood group / medical info (optional)", hi: "रक्त समूह जानकारी" }, required: false },
    ],
    eligibility: { en: ["Indian citizen aged 60 years or above"], hi: ["60+ वर्ष का भारतीय नागरिक"] },
    applyUrl: "https://services.india.gov.in",
  },
  {
    slug: "labour-card",
    name: { en: "Labour Card (e-Shram)", hi: "श्रम कार्ड (ई-श्रम)" },
    category: "Welfare",
    authority: "Ministry of Labour & Employment",
    processingTime: "Instant (online)",
    fee: "Free",
    description: {
      en: "Universal ID for unorganised workers, granting access to welfare schemes and ₹2 lakh accident insurance.",
      hi: "असंगठित श्रमिकों के लिए सार्वभौमिक पहचान पत्र।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Mobile number linked to Aadhaar", hi: "आधार से जुड़ा मोबाइल" }, required: true },
      { title: { en: "Bank account details (IFSC + account no.)", hi: "बैंक खाता विवरण" }, required: true },
    ],
    eligibility: {
      en: ["Aged 16–59 years", "Unorganised worker not covered under EPFO/ESIC", "Not an income-tax payer"],
      hi: ["16–59 वर्ष", "असंगठित श्रमिक"],
    },
    applyUrl: "https://eshram.gov.in",
  },
  {
    slug: "kisan-credit-card",
    name: { en: "Kisan Credit Card (KCC)", hi: "किसान क्रेडिट कार्ड" },
    category: "Finance",
    authority: "Banks (NABARD scheme)",
    processingTime: "14–30 days",
    fee: "Nil processing fee up to ₹3 lakh",
    description: {
      en: "Short-term credit for farmers to meet crop, allied and household needs at subsidised interest rates.",
      hi: "किसानों को सस्ती ब्याज दर पर ऋण।",
    },
    documents: [
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "PAN Card", hi: "पैन कार्ड" }, required: true },
      { title: { en: "Land records / Ownership proof", hi: "भूमि अभिलेख" }, required: true },
      { title: { en: "Crop pattern & sowing details", hi: "फसल विवरण" }, required: true },
      { title: { en: "Passport-size photographs", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
      { title: { en: "Existing bank account passbook", hi: "बैंक पासबुक" }, required: true },
    ],
    eligibility: {
      en: ["Individual / joint farmers (owner cultivators)", "Tenant farmers, sharecroppers, SHGs and JLGs also eligible"],
      hi: ["किसान, बटाईदार, स्वयं सहायता समूह"],
    },
    applyUrl: "https://pmkisan.gov.in",
  },
  {
    slug: "passport-renewal",
    name: { en: "Passport Renewal / Re-issue", hi: "पासपोर्ट नवीनीकरण" },
    category: "Travel",
    authority: "Ministry of External Affairs",
    processingTime: "15–30 days (Normal) · 3–7 days (Tatkal)",
    fee: "₹1,500–₹3,500",
    description: {
      en: "Re-issue of passport on expiry, exhaustion of pages, or change in personal particulars.",
      hi: "पासपोर्ट की समाप्ति या विवरण बदलने पर नवीनीकरण।",
    },
    documents: [
      { title: { en: "Existing / Expired Passport (original + copy)", hi: "पुराना पासपोर्ट" }, required: true },
      { title: { en: "Aadhaar Card", hi: "आधार कार्ड" }, required: true },
      { title: { en: "Address proof (if changed)", hi: "पते का प्रमाण" }, required: false },
      { title: { en: "Marriage certificate (for name change)", hi: "विवाह प्रमाणपत्र" }, required: false },
      { title: { en: "Annexure as per change required", hi: "अनुलग्नक" }, required: false },
    ],
    eligibility: { en: ["Existing Indian passport holder", "Apply up to 1 year before expiry or any time after"], hi: ["मौजूदा पासपोर्ट धारक"] },
    applyUrl: "https://www.passportindia.gov.in",
  },
  {
    slug: "international-driving-permit",
    name: { en: "International Driving Permit", hi: "अंतर्राष्ट्रीय ड्राइविंग परमिट" },
    category: "Driving",
    authority: "RTO (State Transport Dept.)",
    processingTime: "3–7 days",
    fee: "₹1,000 (approx.)",
    description: {
      en: "Permit allowing the holder to drive in foreign countries that recognise the IDP under the 1949 Geneva Convention.",
      hi: "विदेश में ड्राइविंग की अनुमति देने वाला परमिट।",
    },
    documents: [
      { title: { en: "Valid Indian Driving Licence", hi: "वैध भारतीय ड्राइविंग लाइसेंस" }, required: true },
      { title: { en: "Passport (original + copy)", hi: "पासपोर्ट" }, required: true },
      { title: { en: "Valid Visa for destination country", hi: "वीज़ा" }, required: true },
      { title: { en: "Confirmed air ticket", hi: "हवाई टिकट" }, required: true },
      { title: { en: "Form 4A + Form 1A (medical)", hi: "फॉर्म 4A और 1A" }, required: true },
      { title: { en: "Passport-size photographs", hi: "पासपोर्ट साइज़ फोटो" }, required: true },
    ],
    eligibility: { en: ["Valid Indian DL holder", "18 years or above"], hi: ["वैध भारतीय डीएल धारक, 18+"] },
    applyUrl: "https://parivahan.gov.in",
  },
  {
    slug: "pollution-certificate",
    name: { en: "Pollution Under Control (PUC) Certificate", hi: "प्रदूषण नियंत्रण प्रमाणपत्र" },
    category: "Driving",
    authority: "Authorised PUC centres (under RTO)",
    processingTime: "Instant",
    fee: "₹60–₹100 (2W/3W) · ₹100–₹150 (4W)",
    description: {
      en: "Mandatory certificate confirming a vehicle's emissions are within permissible limits.",
      hi: "वाहन उत्सर्जन मानकों की पुष्टि करने वाला अनिवार्य प्रमाणपत्र।",
    },
    documents: [
      { title: { en: "Vehicle Registration Certificate (RC)", hi: "वाहन आरसी" }, required: true },
      { title: { en: "Previous PUC certificate (for renewal)", hi: "पिछला पीयूसी" }, required: false },
    ],
    eligibility: { en: ["Mandatory for all motor vehicles plying on Indian roads"], hi: ["सभी वाहनों के लिए अनिवार्य"] },
    applyUrl: "https://parivahan.gov.in",
  },
];

import { stateServices, INDIAN_STATES } from "./state-services";
import { catalogServices } from "./services-catalog";

// Merge central + state-level + bulk catalog services into a single list.
// Existing curated entries win on slug collisions.
const _seen = new Set(services.map((s) => s.slug));
for (const s of [...stateServices, ...catalogServices]) {
  if (_seen.has(s.slug)) continue;
  _seen.add(s.slug);
  services.push(s);
}

export { INDIAN_STATES };

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
