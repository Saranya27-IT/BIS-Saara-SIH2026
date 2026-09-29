export interface IndianStandard {
  id: string;
  isNumber: string;
  title: string;
  hindiTitle: string;
  tamilTitle: string;
  category: string;
  status: 'Active' | 'Mandatory (QCO)' | 'Voluntary' | 'Mandatory (CRS)';
  year: number;
  scope: string;
  keyParameters: string[];
  applicableProducts: string[];
  testingLabsCount: number;
  scheme: 'Scheme-I (ISI Mark)' | 'Scheme-II (CRS)' | 'Hallmarking';
  applicationFee: number;
  annualMarkingFee: number;
  sampleTestingTimeDays: number;
  gazetteOrderRef?: string;
  relatedStandards?: {
    isNumber: string;
    title: string;
    reason: string;
    similarity: string;
  }[];
}

export interface ISILicense {
  cmlNumber: string;
  brandName: string;
  manufacturerName: string;
  factoryAddress: string;
  district: string;
  state: string;
  isNumber: string;
  productName: string;
  validFrom: string;
  validUpto: string;
  status: 'Genuine' | 'Certified' | 'VALID' | 'EXPIRED' | 'SUSPENDED' | 'INVALID';
  inspectionRating: string;
  lastTestedDate: string;
  huid?: string;
  remarks?: string;
}

export interface KnowledgeItem {
  keywords: string[];
  questionEn: string;
  questionHi: string;
  questionTa: string;
  answerEn: string;
  answerHi: string;
  answerTa: string;
  relatedIS?: string;
  category: string;
  recommendations?: { isNumber: string; title: string; reason: string; similarity: string }[];
}

export interface MockPDFDocument {
  id: string;
  fileName: string;
  title: string;
  gazetteRef: string;
  notifyingMinistry: string;
  effectiveDate: string;
  pages: number;
  fileSize: string;
  executiveSummary: string;
  executiveSummaryHi: string;
  executiveSummaryTa: string;
  keyClauses: { clause: string; title: string; requirement: string }[];
  testingParameters: string[];
  penaltyProvisions: string;
  msmeExemptions: string;
  applicableIS: string;
}

export const BIS_KPI_DATA = {
  indianStandards: '24,860',
  activeCertifications: '8,420',
  isiVerifications: '15,780',
  aiQueriesToday: '1,245'
};

export const INDIAN_STANDARDS: IndianStandard[] = [
  // 1. IS 302 | Electric Iron | Electrical | Active
  {
    id: 'is-302',
    isNumber: 'IS 302',
    title: 'Electric Iron',
    hindiTitle: 'विद्युत इस्त्री (इलेक्ट्रिक आयरन) — सुरक्षा आवश्यकताएं',
    tamilTitle: 'மின்சார இஸ்திரி பெட்டி (Electric Iron) — பாதுகாப்பு விவரக்குறிப்பு',
    category: 'Electrical',
    status: 'Active',
    year: 2024,
    scope: 'Prescribes general, electrical, and thermal safety requirements for domestic dry irons, steam irons, and cordless press appliances under household electrical safety regulations.',
    keyParameters: [
      'Insulation Resistance (>2 MΩ at 500V DC)',
      'High Voltage Flash Test (1500V AC for 1 min without breakdown)',
      'Leakage Current Limit (<0.75 mA at operating temperature)',
      'Thermostat Endurance (10,000 cycles continuous thermal cycling)',
      'Drop Impact Test (1 meter drop onto rigid hardwood floor)'
    ],
    applicableProducts: ['Dry Irons', 'Steam Irons', 'Cordless Electric Irons', 'Travel Press Irons', 'Automatic Heavy Dry Irons'],
    testingLabsCount: 42,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 58000,
    sampleTestingTimeDays: 14,
    gazetteOrderRef: 'Electrical Appliances (Quality Control) Order 2024',
    relatedStandards: [
      { isNumber: 'IS 694', title: 'PVC Insulated Cable', reason: 'Supply cord insulation companion standard', similarity: 'Core Supply Chain Component' },
      { isNumber: 'IS 1293', title: 'Plugs and Socket Outlets 16A/6A', reason: 'Mains plug connector standard', similarity: 'Complementary Safety Standard' },
      { isNumber: 'IS 302 (Part 1)', title: 'General Safety of Household Appliances', reason: 'Foundational baseline electrical code', similarity: 'Parent Standard' }
    ]
  },

  // 2. IS 14543 | Packaged Drinking Water | Food | Active
  {
    id: 'is-14543',
    isNumber: 'IS 14543',
    title: 'Packaged Drinking Water',
    hindiTitle: 'पैकेज्ड पेयजल (पैकेज्ड ड्रिंकिंग वॉटर) — विशिष्टि',
    tamilTitle: 'பேக்கேஜ் செய்யப்பட்ட குடிநீர் (Packaged Drinking Water)',
    category: 'Food',
    status: 'Active',
    year: 2024,
    scope: 'Mandatory technical specification for packaged drinking water (other than packaged natural mineral water) offered for direct human consumption in sealed containers.',
    keyParameters: [
      'Microbiological Purity (Zero E.coli, Coliforms, Faecal Streptococci & Pseudomonas in 250ml)',
      'Total Dissolved Solids (TDS 75 to 500 mg/L permissible range)',
      'pH Balance (6.5 to 8.5 neutral consumption band)',
      'Toxic Heavy Metals (Lead <0.01 mg/L, Arsenic <0.01 mg/L, Mercury <0.001 mg/L)',
      'Pesticide Residues (Individual <0.0001 mg/L, Total <0.0005 mg/L by GC-MS/MS)'
    ],
    applicableProducts: ['20L Polycarbonate Water Dispensers', '1L / 500ml Bottled Water', 'Packaged Water Pouches', 'Food-Grade Bulk Cans'],
    testingLabsCount: 86,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 84000,
    sampleTestingTimeDays: 12,
    gazetteOrderRef: 'FSSAI Notification & Packaged Water QCO Mandate',
    relatedStandards: [
      { isNumber: 'IS 10500', title: 'Drinking Water Specification', reason: 'Municipal baseline drinking water parameters', similarity: 'Prerequisite Baseline' },
      { isNumber: 'IS 13428', title: 'Packaged Natural Mineral Water', reason: 'Natural spring mineral water variant', similarity: 'Direct Sister Standard' },
      { isNumber: 'IS 15410', title: 'Containers for Packaged Drinking Water', reason: 'PET bottle hygiene standard', similarity: 'Packaging Material' }
    ]
  },

  // 3. IS 1786 | TMT Steel Bars | Construction | Active
  {
    id: 'is-1786',
    isNumber: 'IS 1786',
    title: 'TMT Steel Bars',
    hindiTitle: 'उच्च शक्ति विरूपित स्टील बार (TMT स्टील बार) — विशिष्टि',
    tamilTitle: 'TMT எஃகு கம்பிகள் (TMT Steel Bars) — கட்டுமான விவரக்குறிப்பு',
    category: 'Construction',
    status: 'Active',
    year: 2024,
    scope: 'Specifies physical, mechanical, and chemical requirements for high-strength thermo-mechanically treated (TMT) deformed steel bars and wires for concrete reinforcement (Fe 415, Fe 500, Fe 550, Fe 550D, Fe 600).',
    keyParameters: [
      '0.2% Proof Stress / Yield Strength (≥500 MPa for Fe 500D)',
      'Tensile Strength to Yield Ratio (TS/YS ≥ 1.10 for high seismic ductility)',
      'Total Elongation at Maximum Force (≥16% fracture resilience)',
      '180° Bend and Rebend Test without surface cracking',
      'Chemical Composition: Carbon ≤0.25%, Sulphur + Phosphorus ≤0.075%'
    ],
    applicableProducts: ['Fe 500D TMT Rebars', 'Fe 550D Seismic Resistant Steel', 'Fe 600 High Strength Structural Bars', 'Corrosion Resistant TMT Rebars'],
    testingLabsCount: 54,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 145000,
    sampleTestingTimeDays: 10,
    gazetteOrderRef: 'Steel and Steel Products (Quality Control) Order',
    relatedStandards: [
      { isNumber: 'IS 1079', title: 'Mild Steel Sheets', reason: 'Companion structural rolled steel standard', similarity: 'Metallurgical Steel Family' },
      { isNumber: 'IS 269', title: 'Ordinary Portland Cement', reason: 'Concrete mix reinforcement partner', similarity: 'Structural Concrete Matrix' },
      { isNumber: 'IS 432', title: 'Mild Steel and Medium Tensile Bars', reason: 'Traditional mild steel rebar standard', similarity: 'Predecessor Standard' }
    ]
  },

  // 4. IS 15644 | Protective Helmet | Safety | Active
  {
    id: 'is-15644',
    isNumber: 'IS 15644',
    title: 'Protective Helmet',
    hindiTitle: 'सुरक्षात्मक हेलमेट (प्रोटेक्टिव हेलमेट) — सुरक्षा एवं प्रभाव प्रतिरोध',
    tamilTitle: 'பாதுகாப்பு தலைக்கவசம் (Protective Helmet) — விவரக்குறிப்பு',
    category: 'Safety',
    status: 'Active',
    year: 2024,
    scope: 'Specifies design, shock absorption performance, chinstrap retention displacement, visor optical quality, and penetration resistance for protective safety helmets for motor riders and occupational safety.',
    keyParameters: [
      'Impact Shock Attenuation (<300g peak acceleration under 7.5 m/s drop)',
      'Penetration Resistance (3 kg conical steel striker drop at 3 meters)',
      'Dynamic Retention Harness Test (chinstrap elongation <25mm under 1 kN dynamic load)',
      'Peripheral Field of Vision (≥105° horizontal and ≥30° upward clearance)',
      'Optical Visor Clarity (≥85% luminous transmittance, scratch and mist proof)'
    ],
    applicableProducts: ['Full Face Motorcyclist Helmets', 'Open Face Commuter Helmets', 'Industrial Worker Safety Helmets', 'Modular Flip-Up Helmets'],
    testingLabsCount: 32,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 92000,
    sampleTestingTimeDays: 14,
    gazetteOrderRef: 'Two-Wheeled Motor Vehicles Helmets (QCO) Order 2024',
    relatedStandards: [
      { isNumber: 'IS 4151', title: 'Helmets for Two-Wheeler Motorcyclists', reason: 'Companion automotive helmet safety code', similarity: 'Direct Sister Code' },
      { isNumber: 'IS 2925', title: 'Industrial Safety Helmets', reason: 'Workplace cranial impact protection', similarity: 'Occupational PPE Extension' },
      { isNumber: 'IS 15298', title: 'Personal Protective Footwear', reason: 'Industrial personal protective suite', similarity: 'Safety PPE Suite' }
    ]
  },

  // 5. IS 694 | PVC Insulated Cable | Electrical | Active
  {
    id: 'is-694',
    isNumber: 'IS 694',
    title: 'PVC Insulated Cable',
    hindiTitle: 'पीवीसी इंसुलेटेड केबल (विद्युत तार एवं केबल) — विशिष्टि',
    tamilTitle: 'PVC இன்சுலேட்டட் மின் கம்பிகள் (PVC Insulated Cable)',
    category: 'Electrical',
    status: 'Active',
    year: 2024,
    scope: 'Specifies requirements for single-core and multi-core polyvinyl chloride (PVC) insulated and sheathed electric cables for working voltages up to and including 1100 V in residential, commercial, and industrial installations.',
    keyParameters: [
      'Conductor Resistance Test (Max 3.30 Ω/km for 6 sq.mm annealed copper)',
      'Insulation Resistance at 70°C (≥0.001 MΩ-km)',
      'Spark Testing at 6 kV AC continuous in-line during extrusion',
      'Tensile Strength of PVC Insulation (≥12.5 N/mm² with ≥150% elongation)',
      'Flame Retardant (FR) Oxygen Index (≥29% to prevent fire spread)'
    ],
    applicableProducts: ['Single Core FR Building Wires', 'Multi-Core Industrial Flexible Cables', 'Submersible Pump 3-Core Flat Cables', 'Solar Inverter DC Cables'],
    testingLabsCount: 48,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 78000,
    sampleTestingTimeDays: 11,
    gazetteOrderRef: 'Cables & Electrical Conductors (Quality Control) Order',
    relatedStandards: [
      { isNumber: 'IS 302', title: 'Electric Iron', reason: 'Internal and external appliance wiring cord', similarity: 'Appliance Component Standard' },
      { isNumber: 'IS 1293', title: 'Plugs and Socket Outlets', reason: 'Mains electrical distribution termination', similarity: 'Circuit Compatibility' },
      { isNumber: 'IS 1554', title: 'PVC Insulated Heavy Duty Electric Cables', reason: 'Heavy industrial power feeder line standard', similarity: 'Higher Voltage Companion' }
    ]
  },

  // 6. IS 1079 | Mild Steel Sheets | Steel | Active
  {
    id: 'is-1079',
    isNumber: 'IS 1079',
    title: 'Mild Steel Sheets',
    hindiTitle: 'हॉट रोल्ड कार्बन स्टील शीट और स्ट्रिप (माइल्ड स्टील शीट्स) — विशिष्टि',
    tamilTitle: 'லேசான எஃகு தாள்கள் (Mild Steel Sheets) — விவரக்குறிப்பு',
    category: 'Steel',
    status: 'Active',
    year: 2024,
    scope: 'Covers requirements for hot-rolled low-carbon mild steel sheet and strip of commercial (HR1), drawing (HR2), deep drawing (HR3), and extra-deep drawing (HR4) qualities used in automotive body pressings, industrial containers, and structural fabrication.',
    keyParameters: [
      'Tensile Strength (270 to 440 MPa across all drawing grades)',
      'Yield Stress (≥170 MPa with consistent plastic deformation)',
      'Percentage Elongation after Fracture (≥26% on 5.65√So gauge length)',
      '180° Close Bend Test without cracking on the outside of the bent portion',
      'Chemical Limits: Carbon ≤0.15%, Manganese ≤0.60%, Sulphur & Phosphorus ≤0.040%'
    ],
    applicableProducts: ['Hot Rolled Mild Steel Sheets (HR1 to HR4)', 'Automotive Body Stamping Strips', 'LPG Cylinder Body Steel', 'Industrial Drum Fabricated Sheets'],
    testingLabsCount: 38,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 112000,
    sampleTestingTimeDays: 9,
    gazetteOrderRef: 'Steel and Steel Products QCO Order Phase II',
    relatedStandards: [
      { isNumber: 'IS 1786', title: 'TMT Steel Bars', reason: 'Companion primary steel manufacturing standard', similarity: 'Primary Steel Vertical' },
      { isNumber: 'IS 513', title: 'Cold Reduced Low Carbon Steel Sheets', reason: 'Cold-rolled precision gauge equivalent', similarity: 'Cold Rolled Equivalent' },
      { isNumber: 'IS 2062', title: 'Hot Rolled Medium and High Tensile Structural Steel', reason: 'Heavy structural steel plate counterpart', similarity: 'Heavy Structural Sister' }
    ]
  },

  // Additional core standards for rich search
  {
    id: 'is-10500',
    isNumber: 'IS 10500',
    title: 'Drinking Water Specification',
    hindiTitle: 'पीने का पानी — विशिष्टि',
    tamilTitle: 'குடிநீர் விவரக்குறிப்பு',
    category: 'Food',
    status: 'Active',
    year: 2024,
    scope: 'Prescribes the quality parameters and limits for water intended for human consumption including municipal supplies, piped networks, and domestic water filtration systems.',
    keyParameters: ['pH (6.5 to 8.5)', 'TDS (<500 mg/L)', 'Total Hardness (<200 mg/L)', 'Heavy Metals absent', 'E. coli & Coliforms (Zero in 100ml)'],
    applicableProducts: ['Piped Municipal Drinking Water', 'Domestic RO Filtration Systems', 'Water Coolers'],
    testingLabsCount: 78,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 84000,
    sampleTestingTimeDays: 14,
    gazetteOrderRef: 'S.O. 4312(E) Min of Jal Shakti',
    relatedStandards: [
      { isNumber: 'IS 14543', title: 'Packaged Drinking Water', reason: 'Commercial packaged variant standard', similarity: '95% Overlap' }
    ]
  },
  {
    id: 'is-1417',
    isNumber: 'IS 1417',
    title: 'Gold Hallmarking & HUID',
    hindiTitle: 'स्वर्ण एवं स्वर्ण मिश्र धातुएं — शुद्धता अंकन एवं HUID',
    tamilTitle: 'தங்க ஹால்மார்க்கிங் மற்றும் 6-இலக்க HUID',
    category: 'Safety',
    status: 'Active',
    year: 2024,
    scope: 'Defines standard purity grades for hallmarked gold jewellery in India (14K, 18K, 20K, 22K, 23K, 24K) and mandates the 6-digit alphanumeric HUID (Hallmark Unique Identification).',
    keyParameters: ['Fire Assay Fineness', 'Laser Engraved 6-Digit HUID', 'BIS Hallmark Logo', 'Purity Grade (22K916)'],
    applicableProducts: ['Gold Bangles & Chains', 'Gold Rings', 'Gold Coins & Medallions'],
    testingLabsCount: 1400,
    scheme: 'Hallmarking',
    applicationFee: 2000,
    annualMarkingFee: 5000,
    sampleTestingTimeDays: 2,
    gazetteOrderRef: 'Hallmarking of Gold Order 2021',
    relatedStandards: [
      { isNumber: 'IS 2112', title: 'Silver Jewellery Marking', reason: 'Silver hallmarking fineness protocols', similarity: 'Precious Metals Standard' }
    ]
  },
  {
    id: 'is-1293',
    isNumber: 'IS 1293',
    title: 'Plugs and Socket Outlets 16A 250V',
    hindiTitle: 'घरेलू उपयोग के लिए प्लग और सॉकेट आउटलेट — विशिष्टि',
    tamilTitle: 'பிளக்குகள் மற்றும் சாக்கெட்டுகள் 16A 250V',
    category: 'Electrical',
    status: 'Active',
    year: 2024,
    scope: 'Requirements for plugs and fixed or portable socket outlets for AC only, with or without earthing contact, for voltages not exceeding 250 V and rated currents up to 16 A.',
    keyParameters: ['Insulation Resistance', 'Electric Strength Test', 'Glow Wire Fire Retardance (850°C)', 'Temperature Rise (≤45K)'],
    applicableProducts: ['6A Domestic Plugs', '16A Heavy Duty Power Plugs', 'Multi-plug Adapters'],
    testingLabsCount: 45,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 62000,
    sampleTestingTimeDays: 14,
    gazetteOrderRef: 'Plugs and Socket Outlets QCO 2020',
    relatedStandards: [
      { isNumber: 'IS 302', title: 'Electric Iron', reason: 'Plugs directly into IS 1293 socket', similarity: 'Complementary' },
      { isNumber: 'IS 694', title: 'PVC Insulated Cable', reason: 'Cord wire connected to plug terminals', similarity: 'Mains Circuit' }
    ]
  },
  {
    id: 'is-4151',
    isNumber: 'IS 4151',
    title: 'Helmets for Two-Wheeler Motorcyclists',
    hindiTitle: 'दुपहिया मोटर चालकों के लिए सुरक्षात्मक हेलमेट',
    tamilTitle: 'இருசக்கர வாகன ஓட்டிகளுக்கான பாதுகாப்பு தலைக்கவசம்',
    category: 'Safety',
    status: 'Active',
    year: 2024,
    scope: 'Mandatory standard for motorcycle rider helmets specifying rigorous drop tests, chin strap retention strength, and visor optical clarity.',
    keyParameters: ['Impact Attenuation', 'Penetration Resistance', 'Retention System Strength', 'Visor Transmittance'],
    applicableProducts: ['Motorcycle Helmets', 'Scooter Helmets'],
    testingLabsCount: 28,
    scheme: 'Scheme-I (ISI Mark)',
    applicationFee: 1000,
    annualMarkingFee: 85000,
    sampleTestingTimeDays: 15,
    gazetteOrderRef: 'Road Safety and Motor Vehicles QCO',
    relatedStandards: [
      { isNumber: 'IS 15644', title: 'Protective Helmet', reason: 'Primary companion safety standard', similarity: 'Direct Sister Code' }
    ]
  }
];

export const MOCK_LICENSES: ISILicense[] = [
  // 1. ISI30245891 → Genuine (Electric Iron - IS 302)
  {
    cmlNumber: 'ISI30245891',
    brandName: 'Bajaj SteamGlide Pro',
    manufacturerName: 'Bajaj Electricals Limited',
    factoryAddress: 'Plot 18, MIDC Industrial Estate, Chakan',
    district: 'Pune',
    state: 'Maharashtra',
    isNumber: 'IS 302',
    productName: 'Electric Iron (1200W Dry & Steam with Auto Cutoff)',
    validFrom: '2024-01-01',
    validUpto: '2028-12-31',
    status: 'Genuine',
    inspectionRating: 'Grade A+ (Exemplary Flash & Drop Test Record)',
    lastTestedDate: '2026-09-12',
    remarks: 'Complies with all thermal insulation, high voltage flash (1500V), and drop endurance requirements.'
  },

  // 2. ISI145431245 → Genuine (Packaged Drinking Water - IS 14543)
  {
    cmlNumber: 'ISI145431245',
    brandName: 'AquaPure Reserve Mineral Fresh',
    manufacturerName: 'Himalayan Waters India Private Limited',
    factoryAddress: 'Plot 42-B, UPSIDC Industrial Area, Selaqui',
    district: 'Dehradun',
    state: 'Uttarakhand',
    isNumber: 'IS 14543',
    productName: 'Packaged Drinking Water (20L Polycarbonate Jars and 1L PET Bottles)',
    validFrom: '2023-04-01',
    validUpto: '2027-03-31',
    status: 'Genuine',
    inspectionRating: 'Grade A+ (In-house NABL-aligned Microbiology Lab)',
    lastTestedDate: '2026-09-18',
    remarks: 'Tested negative for pesticide residues and pathogenic coliforms. TDS stabilized at 120 mg/L.'
  },

  // 3. ISI69499881 → Genuine (PVC Insulated Cable - IS 694)
  {
    cmlNumber: 'ISI69499881',
    brandName: 'Polycab FlameGuard FR Wires',
    manufacturerName: 'Polycab India Limited',
    factoryAddress: 'Survey No. 74/1, GIDC Estate, Halol',
    district: 'Panchmahal',
    state: 'Gujarat',
    isNumber: 'IS 694',
    productName: 'PVC Insulated Cable 1100V Single Core 2.5 sq.mm FR Copper Building Wire',
    validFrom: '2024-02-15',
    validUpto: '2028-02-14',
    status: 'Genuine',
    inspectionRating: 'Grade A (Automated Spark Testing & Oxygen Index Verification)',
    lastTestedDate: '2026-08-25',
    remarks: 'High flame retardance oxygen index (>30%). Spark tested up to 6000V AC without puncture.'
  },

  // 4. ISI156440721 → Certified (Protective Helmet - IS 15644)
  {
    cmlNumber: 'ISI156440721',
    brandName: 'Steelbird Aerodynamic Max Pro',
    manufacturerName: 'Steelbird Hi-Tech India Limited',
    factoryAddress: 'Plot 5, EPIP Industrial Zone, Phase-I, Jharmajri',
    district: 'Solan',
    state: 'Himachal Pradesh',
    isNumber: 'IS 15644',
    productName: 'Protective Helmet for Motorcyclists (Full Face Impact Safety Model)',
    validFrom: '2023-08-01',
    validUpto: '2027-07-31',
    status: 'Certified',
    inspectionRating: 'Certified (Drop Impact & Penetration Attenuation Passed)',
    lastTestedDate: '2026-09-20',
    remarks: 'Certified under Scheme-I. Dynamic retention chinstrap displacement is 14mm (<25mm threshold).'
  },

  // Additional test cases: Valid TMT & Mild steel, and an invalid counterfeit test case
  {
    cmlNumber: 'ISI17865500',
    brandName: 'Tata Tiscon 550D TMT',
    manufacturerName: 'Tata Steel Limited',
    factoryAddress: 'Jamshedpur Works, Sakchi',
    district: 'East Singhbhum',
    state: 'Jharkhand',
    isNumber: 'IS 1786',
    productName: 'TMT Steel Bars (Fe 550D High Ductility Earthquake Resistant)',
    validFrom: '2022-05-10',
    validUpto: '2027-05-09',
    status: 'Genuine',
    inspectionRating: 'Grade A+ (Spectrometric Heat Analysis)',
    lastTestedDate: '2026-09-05',
    remarks: 'Yield strength 575 MPa; elongation 18.5%. Full bend & rebend 180° passed.'
  },
  {
    cmlNumber: 'ISI10793210',
    brandName: 'JSW Steel HR Sheet Commercial',
    manufacturerName: 'JSW Steel Coated Products Ltd',
    factoryAddress: 'Vijayanagar Works, Toranagallu',
    district: 'Bellary',
    state: 'Karnataka',
    isNumber: 'IS 1079',
    productName: 'Mild Steel Sheets (Hot Rolled Sheet and Strip Quality HR1 & HR2)',
    validFrom: '2023-01-01',
    validUpto: '2027-12-31',
    status: 'Genuine',
    inspectionRating: 'Grade A (Tensile & Close Bend Tested)',
    lastTestedDate: '2026-08-28',
    remarks: 'Tensile strength 360 MPa, elongation 31%. Clean chemical assay.'
  },
  {
    cmlNumber: 'ISI99990000',
    brandName: 'Local Cheap Moto Gear (Counterfeit)',
    manufacturerName: 'Unregistered Workshop',
    factoryAddress: 'Unknown Alley, Seelampur',
    district: 'North East Delhi',
    state: 'Delhi',
    isNumber: 'IS 15644',
    productName: 'Fake Plastic Helmet (Uncertified Imitation)',
    validFrom: '2020-01-01',
    validUpto: '2021-01-01',
    status: 'INVALID',
    inspectionRating: 'Counterfeit / Raid Seizure Record',
    lastTestedDate: '2021-01-01',
    remarks: 'WARNING: Fraudulent ISI imprint. No valid BIS license exists for this number. Subject to seizure under Section 29.'
  }
];

export const PREDEFINED_FAQS: KnowledgeItem[] = [
  // AI Recommendation 1: Electric Iron → IS 302
  {
    keywords: ['electric iron', 'iron', 'is 302', 'dry iron', 'steam iron', 'press'],
    questionEn: 'Which Indian Standard applies to Electric Iron and what are the certification requirements?',
    questionHi: 'इलेक्ट्रिक आयरन (विद्युत इस्त्री) के लिए कौन सा भारतीय मानक लागू होता है?',
    questionTa: 'மின்சார இஸ்திரி பெட்டிக்கு (Electric Iron) எந்த இந்திய தரநிலை பொருந்தும்?',
    answerEn: `For Electric Iron, the governing mandatory Indian Standard is IS 302 (Safety of Household Electrical Appliances - Electric Irons):\n
• Applicable Standard: IS 302 (Electrical safety, insulation, and performance)
• Scheme: Scheme-I (Mandatory ISI Mark under Electrical Appliances QCO)
• Key Testing Parameters: Insulation resistance (>2 MΩ), high voltage flash test (1500V AC), leakage current (<0.75 mA), thermostat endurance (10,000 cycles), and 1-meter drop test.
• Associated Standard: IS 694 for the PVC insulated power cord.`,
    answerHi: `इलेक्ट्रिक आयरन (विद्युत इस्त्री) के लिए अनिवार्य भारतीय मानक IS 302 लागू होता है:\n
• लागू मानक: IS 302 (घरेलू विद्युत उपकरणों की सुरक्षा — विद्युत इस्त्री)
• योजना: योजना-I (अनिवार्य ISI मार्क)
• प्रमुख परीक्षण: 1500V हाई-वोल्टेज फ्लैश टेस्ट, लीकेज करंट (<0.75 mA), 10,000 साइकिल थर्मोस्टेट धीरज परीक्षण एवं ड्रॉप प्रभाव परीक्षण।
• संबंधित मानक: पावर कॉर्ड के लिए IS 694 (पीवीसी इंसुलेटेड केबल)।`,
    answerTa: `மின்சார இஸ்திரி பெட்டிக்கு (Electric Iron) பொருந்தும் அதிகாரப்பூர்வ இந்திய தரநிலை IS 302 ஆகும்:\n
• தரநிலை எண்: IS 302 (மின் சாதனங்களின் பாதுகாப்பு)
• திட்டம்: திட்டம்-I (கட்டாய ISI முத்திரை)
• முக்கிய சோதனைகள்: 1500V மின்னழுத்த தாங்கும் சோதனை, மின்கசிவு வரம்பு (<0.75 mA), தெர்மோஸ்டாட் ஆயுள் சோதனை மற்றும் தரை வீழ்ச்சி தாங்குதிறன் சோதனை.`,
    relatedIS: 'IS 302',
    category: 'Electrical',
    recommendations: [
      { isNumber: 'IS 302', title: 'Electric Iron Specification', reason: 'Primary safety specification standard for electric irons', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 694', title: 'PVC Insulated Cable', reason: 'Mandatory power supply cord standard', similarity: 'Core Component' },
      { isNumber: 'IS 1293', title: 'Plugs and Socket Outlets', reason: 'Appliance power plug interface', similarity: 'Complementary' }
    ]
  },

  // AI Recommendation 2: Drinking Water → IS 14543
  {
    keywords: ['drinking water', 'packaged drinking water', 'is 14543', 'water', 'water plant', 'mineral water'],
    questionEn: 'Which standard regulates Packaged Drinking Water and how can plants comply?',
    questionHi: 'पैकेज्ड पेयजल (Drinking Water) के लिए कौन सा BIS मानक आवश्यक है?',
    questionTa: 'குடிநீருக்கு (Drinking Water) எந்த இந்திய தரநிலை கட்டாயமானது?',
    answerEn: `For Packaged Drinking Water, the mandatory standard is IS 14543 (Packaged Drinking Water - other than packaged natural mineral water):\n
• Applicable Standard: IS 14543 (Food & Water safety)
• Scheme: Scheme-I (Compulsory ISI Certification mark)
• In-House Lab: Must have fully equipped microbiological & chemical testing setup (incubators, autoclave, spectrophotometer).
• Key Quality Limits: Zero E. coli / Coliforms, TDS between 75 and 500 mg/L, heavy metals absent, and total pesticide residues <0.0005 mg/L.`,
    answerHi: `पैकेज्ड पेयजल (Drinking Water) के लिए अनिवार्य मानक IS 14543 है:\n
• लागू मानक: IS 14543 (पैकेज्ड ड्रिंकिंग वॉटर)
• योजना: योजना-I (अनिवार्य ISI प्रमाणन)
• परीक्षण लैब: लैमिनार एयरफ्लो, ऑटोक्लेव और इनक्यूबेटर युक्त इन-हाउस माइक्रोबायोलॉजी लैब अनिवार्य।
• गुणवत्ता सीमा: शून्य ई.कोली/कोलीफॉर्म, TDS 75-500 mg/L, कीटनाशक अवशेष शून्य स्तर पर।`,
    answerTa: `பேக் செய்யப்பட்ட குடிநீருக்கு (Drinking Water) கட்டாயமான இந்திய தரநிலை IS 14543 ஆகும்:\n
• தரநிலை எண்: IS 14543 (பேக்கேஜ் செய்யப்பட்ட குடிநீர்)
• திட்டம்: திட்டம்-I (கட்டாய ISI முத்திரை)
• ஆய்வக அமைப்பு: நுண்ணுயிரியல் மற்றும் இரசாயன ஆய்வகம் தொழிற்சாலையில் கட்டாயம் இருக்க வேண்டும்.
• தர அளவுருக்கள்: பூஜ்ஜிய ஈகோலி/கோலிபார்ம் பாக்டீரியா, TDS 75-500 mg/L, பூச்சிக்கொல்லி எச்சங்கள் கட்டுப்பாடு.`,
    relatedIS: 'IS 14543',
    category: 'Food',
    recommendations: [
      { isNumber: 'IS 14543', title: 'Packaged Drinking Water', reason: 'Statutory standard for commercial packaged drinking water', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 10500', title: 'Drinking Water Specification', reason: 'Universal municipal and potable water quality standard', similarity: 'Prerequisite Baseline' }
    ]
  },

  // AI Recommendation 3: TMT Steel → IS 1786
  {
    keywords: ['tmt steel', 'tmt', 'is 1786', 'steel bars', 'steel', 'rebars', 'construction steel'],
    questionEn: 'Which BIS standard governs TMT Steel Bars for earthquake-resistant construction?',
    questionHi: 'TMT स्टील बार्स (TMT Steel Bars) के लिए कौन सा भारतीय मानक लागू होता है?',
    questionTa: 'TMT எஃகு கம்பிகளுக்கு (TMT Steel Bars) எந்த BIS தரநிலை பொருந்தும்?',
    answerEn: `For TMT Steel Bars, the governing standard is IS 1786 (High Strength Deformed Steel Bars and Wires for Concrete Reinforcement):\n
• Applicable Standard: IS 1786 (Grades Fe 415, Fe 500, Fe 550, Fe 550D, Fe 600)
• Scheme: Scheme-I (Mandatory ISI Mark under Steel QCO)
• Key Specifications: Yield strength ≥500 MPa (for Fe 500D), tensile strength/yield ratio ≥1.10 for earthquake energy absorption, elongation ≥16%, and 180° bend/rebend test without rupture.`,
    answerHi: `TMT स्टील बार्स के लिए भारतीय मानक IS 1786 अनिवार्य है:\n
• लागू मानक: IS 1786 (उच्च शक्ति विरूपित स्टील बार)
• योजना: योजना-I (स्टील QCO आदेश के तहत अनिवार्य ISI मार्क)
• मुख्य परीक्षण: यील्ड स्ट्रेंथ (≥500 MPa Fe 500D हेतु), भूकंपीय तन्यता हेतु TS/YS अनुपात ≥1.10, कुल बढ़ाव ≥16%, 180° मोड़ और पुनः मोड़ परीक्षण।`,
    answerTa: `TMT எஃகு கம்பிகளுக்கு (TMT Steel Bars) கட்டாயமான தரநிலை IS 1786 ஆகும்:\n
• தரநிலை எண்: IS 1786 (கான்கிரீட் வலுவூட்டலுக்கான உயர் வலிமை எஃகு)
• திட்டம்: திட்டம்-I (கட்டாய ISI முத்திரை)
• முக்கிய விவரங்கள்: Fe 500D தரத்திற்கு 500 MPa மகசூல் வலிமை, பூகம்ப எதிர்ப்புக்கான 16% நீட்சித்திறன் மற்றும் 180° வளைவு சோதனை.`,
    relatedIS: 'IS 1786',
    category: 'Construction',
    recommendations: [
      { isNumber: 'IS 1786', title: 'TMT Steel Bars Specification', reason: 'Primary standard for concrete reinforcement TMT rebars', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 1079', title: 'Mild Steel Sheets', reason: 'Companion hot-rolled carbon steel standard', similarity: 'Steel Family' }
    ]
  },

  // AI Recommendation 4: Helmet → IS 15644
  {
    keywords: ['helmet', 'protective helmet', 'is 15644', 'is 4151', 'two-wheeler helmet', 'bike helmet', 'helmets'],
    questionEn: 'Which standard applies to Protective Helmet and two-wheeler safety in India?',
    questionHi: 'प्रोटेक्टिव हेलमेट (Protective Helmet) के लिए कौन सा BIS मानक अनिवार्य है?',
    questionTa: 'பாதுகாப்பு தலைக்கவசத்திற்கு (Protective Helmet) எந்த தரநிலை கட்டாயமானது?',
    answerEn: `For Protective Helmets, the governing mandatory standards are IS 15644 and IS 4151 (Protective Helmets for Motorcyclists and Safety):\n
• Applicable Standard: IS 15644 & IS 4151
• Scheme: Scheme-I (Mandatory ISI Mark under Central Motor Vehicles Rules & QCO)
• Crucial Tests: 7.5 m/s drop impact shock attenuation (<300g peak acceleration), 3 kg conical striker penetration resistance, dynamic chinstrap retention displacement (<25mm), and scratch-resistant visor optical transmission (≥85%).`,
    answerHi: `प्रोटेक्टिव हेलमेट (Protective Helmet) के लिए IS 15644 एवं IS 4151 अनिवार्य मानक हैं:\n
• लागू मानक: IS 15644 / IS 4151 (दुपहिया चालकों के लिए सुरक्षात्मक हेलमेट)
• योजना: योजना-I (सड़क सुरक्षा QCO के तहत अनिवार्य ISI मार्क)
• मुख्य परीक्षण: 7.5 मीटर/सेकंड ड्रॉप शॉक टेस्ट (<300g पीक), 3 किलो शंक्वाकार पेनेट्रेशन टेस्ट, चिनस्ट्रैप रिटेंशन (<25 मिमी विस्थापन) और 85% पारदर्शी विज़र।`,
    answerTa: `பாதுகாப்பு தலைக்கவசத்திற்கு (Protective Helmet) கட்டாயமான இந்திய தரநிலை IS 15644 / IS 4151 ஆகும்:\n
• தரநிலை எண்: IS 15644 & IS 4151 (இருசக்கர வாகன ஓட்டிகளுக்கான பாதுகாப்பு தலைக்கவசம்)
• திட்டம்: திட்டம்-I (கட்டாய ISI முத்திரை)
• முக்கிய சோதனைகள்: 7.5 மீ/வி வேகத்தில் தலை அதிர்ச்சி தாங்குதிறன், 3 கிலோ ஊடுருவல் எதிர்ப்பு சோதனை மற்றும் சின்ஸ்ட்ராப் பிடிப்பு சோதனை.`,
    relatedIS: 'IS 15644',
    category: 'Safety',
    recommendations: [
      { isNumber: 'IS 15644', title: 'Protective Helmet Specification', reason: 'Primary impact absorption and retention standard for helmets', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 4151', title: 'Helmets for Two-Wheeler Motorcyclists', reason: 'Automotive protective motorcycle helmet code', similarity: 'Companion Standard' }
    ]
  },

  // PVC Cable & Mild Steel FAQs
  {
    keywords: ['pvc insulated cable', 'cable', 'wire', 'is 694', 'electric cable'],
    questionEn: 'What are the compliance requirements for PVC Insulated Cables under IS 694?',
    questionHi: 'IS 694 के तहत पीवीसी इंसुलेटेड केबल के अनुपालन नियम क्या हैं?',
    questionTa: 'IS 694 இன் கீழ் PVC இன்சுலேட்டட் கேபிள்களுக்கான விதிகள் யாவை?',
    answerEn: `Under IS 694, PVC Insulated Cables for voltages up to 1100 V require Scheme-I ISI Mark:\n
• Tests: Conductor resistance, insulation resistance at 70°C, in-line spark testing at 6 kV AC, and Flame Retardant (FR) oxygen index ≥29%.`,
    answerHi: `IS 694 के तहत 1100V तक के पीवीसी इंसुलेटेड तारों के लिए योजना-I ISI मार्क अनिवार्य है। परीक्षणों में कंडक्टर प्रतिरोध, 70°C इंसुलेशन प्रतिरोध, 6 kV स्पार्क परीक्षण एवं फ्लेम रिटार्डेंट ऑक्सीजन इंडेक्स शामिल हैं।`,
    answerTa: `IS 694 இன் கீழ் 1100V வரையிலான மின் கம்பிகளுக்கு திட்டம்-I ISI முத்திரை கட்டாயமாகும். இதில் 6 kV ஸ்பார்க் சோதனை மற்றும் தீப்பிடிக்காத ஆக்ஸிஜன் குறியீடு சோதனைகள் அடங்கும்.`,
    relatedIS: 'IS 694',
    category: 'Electrical',
    recommendations: [
      { isNumber: 'IS 694', title: 'PVC Insulated Cable', reason: 'Mandatory standard for domestic wiring cables', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 302', title: 'Electric Iron', reason: 'Household appliance using IS 694 wiring', similarity: 'Related Appliance' }
    ]
  },
  {
    keywords: ['mild steel sheets', 'steel sheets', 'is 1079', 'hr sheet'],
    questionEn: 'What are the quality specifications for Mild Steel Sheets under IS 1079?',
    questionHi: 'IS 1079 के तहत माइल्ड स्टील शीट्स की गुणवत्ता विशिष्टताएं क्या हैं?',
    questionTa: 'IS 1079 இன் கீழ் லேசான எஃகு தாள்களுக்கான தர விவரக்குறிப்புகள் என்ன?',
    answerEn: `Under IS 1079, Hot Rolled Mild Steel Sheets & Strips are classified into HR1, HR2, HR3, and HR4 drawing qualities:\n
• Tests: Tensile strength (270 to 440 MPa), minimum elongation (≥26%), 180° close bend test, and low carbon limits (≤0.15%).`,
    answerHi: `IS 1079 के तहत हॉट रोल्ड माइल्ड स्टील शीट्स को HR1 से HR4 ग्रेड में वर्गीकृत किया गया है। इसमें तनन शक्ति (270-440 MPa), 26% बढ़ाव और 180° बेंड टेस्ट अनिवार्य है।`,
    answerTa: `IS 1079 இன் கீழ் ஹாட் ரோல்டு மைல்ட் ஸ்டீல் தாள்கள் HR1 முதல் HR4 வரை வகைப்படுத்தப்படுகின்றன. இதில் இழுவிசை வலிமை மற்றும் 180° வளைவு சோதனைகள் முக்கியமானவை.`,
    relatedIS: 'IS 1079',
    category: 'Steel',
    recommendations: [
      { isNumber: 'IS 1079', title: 'Mild Steel Sheets', reason: 'Direct technical specification standard for hot-rolled steel sheets', similarity: 'Exact Recommendation' },
      { isNumber: 'IS 1786', title: 'TMT Steel Bars', reason: 'Companion structural rolled steel benchmark', similarity: 'Related Steel Standard' }
    ]
  }
];

export const LATEST_NOTIFICATIONS = [
  {
    id: 'notif-1',
    date: '12 Sep 2026',
    title: 'IS 302 revised for household electrical appliances',
    category: 'Electrical',
    tag: 'Standard Revision',
    linkText: 'View Gazette Order & Scope of IS 302'
  },
  {
    id: 'notif-2',
    date: '18 Sep 2026',
    title: 'New BIS guideline for packaged drinking water',
    category: 'Food',
    tag: 'Mandatory QCO',
    linkText: 'Download Updated IS 14543 Hygiene Protocol'
  },
  {
    id: 'notif-3',
    date: '22 Sep 2026',
    title: 'ISI certification process digitized for MSMEs',
    category: 'MSME Policy',
    tag: 'Smart Automation',
    linkText: 'Check Fast-Track Portal Guidelines'
  },
  {
    id: 'notif-4',
    date: '25 Sep 2026',
    title: 'Safety standards updated for helmets',
    category: 'Safety',
    tag: 'Consumer Protection',
    linkText: 'View Helmet Safety Guidelines under IS 15644 / IS 4151'
  }
];

export const ANALYTICS_DATA = {
  // Certification Requests by State (Requested by User)
  stateRequests: [
    { state: 'Maharashtra', requests: 510, fill: '#1e3a8a' },
    { state: 'Tamil Nadu', requests: 420, fill: '#2563eb' },
    { state: 'Karnataka', requests: 365, fill: '#059669' },
    { state: 'Gujarat', requests: 290, fill: '#f59e0b' },
    { state: 'Delhi', requests: 185, fill: '#7c3aed' }
  ],
  monthlyApplications: [
    { month: 'Oct 25', applications: 2840, grants: 2410, queries: 14200 },
    { month: 'Nov 25', applications: 3120, grants: 2650, queries: 16100 },
    { month: 'Dec 25', applications: 3450, grants: 2890, queries: 18400 },
    { month: 'Jan 26', applications: 3900, grants: 3320, queries: 21500 },
    { month: 'Feb 26', applications: 4210, grants: 3750, queries: 24800 },
    { month: 'Mar 26', applications: 4680, grants: 4190, queries: 28900 },
    { month: 'Apr 26', applications: 5120, grants: 4620, queries: 32400 },
    { month: 'May 26', applications: 5430, grants: 4980, queries: 36100 },
    { month: 'Jun 26', applications: 5910, grants: 5420, queries: 40200 },
    { month: 'Jul 26', applications: 6380, grants: 5890, queries: 44500 },
    { month: 'Aug 26', applications: 6850, grants: 6310, queries: 49100 },
    { month: 'Sep 26', applications: 7420, grants: 6940, queries: 54300 }
  ],
  topStandards: [
    { name: 'IS 302 (Electric Iron)', count: 9140, fill: '#1e3a8a' },
    { name: 'IS 14543 (Drinking Water)', count: 8420, fill: '#2563eb' },
    { name: 'IS 1786 (TMT Steel)', count: 7210, fill: '#059669' },
    { name: 'IS 15644 (Helmets)', count: 6890, fill: '#f97316' },
    { name: 'IS 694 (PVC Cables)', count: 5430, fill: '#7c3aed' },
    { name: 'IS 1079 (Mild Steel)', count: 4890, fill: '#0284c7' }
  ],
  categoryDistribution: [
    { name: 'Electrical', value: 32, color: '#2563eb' },
    { name: 'Food', value: 24, color: '#059669' },
    { name: 'Construction', value: 20, color: '#1e3a8a' },
    { name: 'Safety', value: 14, color: '#f97316' },
    { name: 'Steel', value: 10, color: '#7c3aed' }
  ],
  zoneDistribution: [
    { zone: 'Northern Zone (Delhi/HR/PB/UP)', licenses: 14850, share: '34.5%' },
    { zone: 'Western Zone (MH/GJ/MP)', licenses: 12240, share: '28.5%' },
    { zone: 'Southern Zone (KA/TN/TS/AP/KL)', licenses: 9620, share: '22.4%' },
    { zone: 'Eastern Zone (WB/OD/JH/BR)', licenses: 4120, share: '9.6%' },
    { zone: 'Central & NE Zone (AS/ML/CG)', licenses: 2120, share: '5.0%' }
  ],
  impactMetrics: [
    {
      metric: 'Average Discovery Time for Indian Standards',
      before: '4 to 6 Business Days (Manual gazette review & departmental queries)',
      after: 'Under 3 Seconds (Instant AI semantic search with scope & SIT)',
      improvement: '99.8% Faster'
    },
    {
      metric: 'Certification Application Preparation Time',
      before: '45 to 60 Days (Fragmented document lists, multiple agency visits)',
      after: '7 to 10 Days (Automated readiness checklist & fee calculator)',
      improvement: '82% Reduction'
    },
    {
      metric: 'Consumer ISI Mark & HUID Verification Speed',
      before: 'No real-time self-service tool (High reliance on merchant claims)',
      after: 'Instant 1-Click Verification with factory geolocation & counterfeit alert',
      improvement: 'Real-time (0 sec)'
    },
    {
      metric: 'Linguistic Accessibility',
      before: 'Only dense legalistic English regulatory gazette texts',
      after: 'Trilingual English, Hindi & Tamil conversational assistant with voice',
      improvement: 'National Public Reach'
    },
    {
      metric: 'Grievance Redressal Turnaround Time',
      before: '30 to 45 Days via physical postal petitions',
      after: '72 Hours with automated ticket routing to regional BIS offices',
      improvement: '92% Faster'
    }
  ]
};

export const MOCK_PDF_DOCUMENTS: MockPDFDocument[] = [
  {
    id: 'pdf-iron-electrical',
    fileName: 'IS_302_Electric_Iron_Safety_Revision_2026.pdf',
    title: 'Indian Standard IS 302: Electric Iron Safety Requirements & QCO Amendments',
    gazetteRef: 'DPIIT Order S.O. 3102(E) / Household Electrical Appliances',
    notifyingMinistry: 'Ministry of Heavy Industries & DPIIT',
    effectiveDate: '12 September 2026',
    pages: 26,
    fileSize: '3.1 MB',
    applicableIS: 'IS 302',
    executiveSummary: 'Mandates revised statutory safety standards for dry, steam, and cordless electric press irons under Scheme-I. Extends mandatory 1500V dielectric strength, thermal cutoff endurance, and shock absorption.',
    executiveSummaryHi: 'इलेक्ट्रिक आयरन (विद्युत इस्त्री) के लिए संशोधित तकनीकी सुरक्षा नियम एवं योजना-I (ISI मार्क) की अनिवार्यता निर्धारित करता है।',
    executiveSummaryTa: 'மின்சார இஸ்திரி பெட்டிகளுக்கான திருத்தப்பட்ட பாதுகாப்பு விதிகள் மற்றும் கட்டாய ISI முத்திரை தேவைகளை விவரிக்கிறது.',
    keyClauses: [
      { clause: 'Clause 7.1', title: 'Dielectric Insulation Resistance', requirement: 'Appliance insulation resistance must exceed 2 MΩ after 48 hours tropical humidity exposure chamber test.' },
      { clause: 'Clause 11.2', title: 'Thermal Limiter & Cutoff', requirement: 'Fitted non-self-resetting thermal fuse must permanently disconnect power if iron soleplate exceeds 260°C.' },
      { clause: 'Clause 15.3', title: 'Supply Cord Strain Relief', requirement: 'Flexible cord must withstand 100 Newton pull test and 20,000 flexing cycles without insulation rupture.' }
    ],
    testingParameters: [
      'High Voltage Dielectric Flash Test at 1500 V AC',
      'Operating Leakage Current measurement (<0.75 mA)',
      'Thermostat mechanical endurance over 10,000 thermal cycles',
      'Free fall drop test from 1000mm height onto beechwood floor'
    ],
    penaltyProvisions: 'Manufacturing or retail distribution of non-certified electric irons carries penalties under Section 29 of BIS Act 2016.',
    msmeExemptions: 'Micro enterprises receive 50% concession on annual marking fee and 90-day grace period for testing equipment setup.'
  },
  {
    id: 'pdf-water-standard',
    fileName: 'IS_14543_Packaged_Water_Specification_Digest.pdf',
    title: 'Indian Standard IS 14543: Packaged Drinking Water Technical Specification',
    gazetteRef: 'FSSAI Notification GSR 760(E) & BIS Mandate',
    notifyingMinistry: 'Ministry of Consumer Affairs & FSSAI',
    effectiveDate: '18 September 2026',
    pages: 34,
    fileSize: '4.1 MB',
    applicableIS: 'IS 14543',
    executiveSummary: 'Comprehensive technical specification establishing bacteriological purity, chemical thresholds, maximum permissible limits for 50+ contaminants, and packaging hygiene in food-grade virgin polymers.',
    executiveSummaryHi: 'पैकेज्ड पेयजल हेतु 50+ दूषक तत्वों, रासायनिक सीमाओं, बैक्टीरिया रहित स्वच्छता और फूड-ग्रेड पॉलिमर बोतलबंद पैकेजिंग के कड़े तकनीकी मापदंड निर्धारित करता है।',
    executiveSummaryTa: 'பேக் செய்யப்பட்ட குடிநீருக்கான 50+ அசுத்தங்களின் வரம்புகள், நுண்ணுயிர் அற்ற தூய்மை மற்றும் உணவு தர பாலிமர் பேக்கேஜிங் விதிமுறைகளை வரையறுக்கும் விரிவான தொழில்நுட்ப ஆவணம்.',
    keyClauses: [
      { clause: 'Clause 5.1', title: 'Microbiological Sterility Criteria', requirement: 'Zero presence of Escherichia coli, coliform bacteria, Faecal Streptococci, and Pseudomonas aeruginosa in 250ml sample.' },
      { clause: 'Clause 5.2', title: 'Pesticide Residue Cap', requirement: 'Individual pesticide residue must not exceed 0.0001 mg/L; total pesticide residues must not exceed 0.0005 mg/L.' },
      { clause: 'Clause 6.3', title: 'In-House Laboratory Equipment', requirement: 'Continuous in-house chemical & microbiological test lab operated by qualified approved chemists.' }
    ],
    testingParameters: [
      'Pesticide multiresidue analysis by GC-MS/MS & LC-MS/MS',
      'Heavy metals detection (Lead, Arsenic, Cadmium, Mercury, Chromium)',
      'Total dissolved solids range (75 to 500 mg/L) and pH balance (6.5 to 8.5)',
      'Bromate byproduct restriction (<0.01 mg/L) post ozonation'
    ],
    penaltyProvisions: 'Immediate cancellation of CML license, factory sealing, and prosecution under Food Safety and Standards Act along with BIS Act.',
    msmeExemptions: 'Standard test fee relief for startup bottled water testing at regional BIS Central Laboratories.'
  },
  {
    id: 'pdf-helmet-standard',
    fileName: 'IS_15644_Protective_Helmet_Safety_Standards.pdf',
    title: 'Indian Standard IS 15644: Protective Helmets Safety & Crash Shock Attenuation',
    gazetteRef: 'Ministry of Road Transport & Highways S.O. 4201(E)',
    notifyingMinistry: 'Ministry of Road Transport & Highways (MoRTH)',
    effectiveDate: '25 September 2026',
    pages: 20,
    fileSize: '2.8 MB',
    applicableIS: 'IS 15644',
    executiveSummary: 'Specifies mandatory safety benchmarks for motorcycle and protective helmets. Mandates rigorous impact shock absorption, conical striker penetration tests, and chinstrap retention displacement.',
    executiveSummaryHi: 'दुपहिया वाहन चालकों के लिए हेलमेट की शॉक एटेन्यूएशन, पेनिट्रेशन प्रतिरोध और चिनस्ट्रैप मजबूती के कड़े मानक अनिवार्य करता है।',
    executiveSummaryTa: 'இருசக்கர வாகன ஓட்டிகளுக்கான தலைக்கவசங்களின் தாங்குதிறன் மற்றும் விபத்து பாதுகாப்பு விதிகளை கட்டாயமாக்குகிறது.',
    keyClauses: [
      { clause: 'Clause 4.1', title: 'Shock Attenuation Drop Test', requirement: 'Transmitted headform acceleration must not exceed 300g when dropped from 7.5 m/s velocity onto flat and hemispherical steel anvils.' },
      { clause: 'Clause 5.2', title: 'Penetration Resistance', requirement: 'Point of conical metal striker must not come in contact with headform surface when dropped from 3000mm height.' },
      { clause: 'Clause 6.4', title: 'Dynamic Retention', requirement: 'Chinstrap assembly elongation under 1000 N dynamic loading must not exceed 25mm.' }
    ],
    testingParameters: [
      'Drop test shock attenuation under ambient, hot (+50°C), and water-submerged conditioning',
      'Steel conical striker penetration impact testing',
      'Chinstrap dynamic displacement and release buckle endurance',
      'Visor luminous transmittance and mechanical abrasion resistance'
    ],
    penaltyProvisions: 'Sale of non-ISI helmets punishable with seizure, imprisonment, and fines under Motor Vehicles Act & BIS Act.',
    msmeExemptions: 'Testing fee subsidies at accredited regional government testing centers.'
  }
];

export const CERTIFICATION_STEPS = [
  {
    stepNumber: 1,
    title: 'Standard Identification & Feasibility',
    titleHi: 'मानक पहचान और व्यवहार्यता जांच',
    description: 'Identify the applicable Indian Standard (e.g. IS 302, IS 14543, IS 1786, IS 15644, IS 694, IS 1079). Check if your product falls under Mandatory QCO, Scheme-I (ISI), or Scheme-II (CRS).',
    duration: '1-3 Days',
    responsibleParty: 'Manufacturer',
    requiredDocs: ['Product technical specifications', 'Manufacturing process flowchart', 'Applicable IS standard document copy'],
    tips: 'Use BIS Saara Search to verify if your product has a recent Quality Control Order (QCO).'
  },
  {
    stepNumber: 2,
    title: 'In-House Testing Lab & Quality Control Setup',
    titleHi: 'इन-हाउस टेस्टिंग लैब और गुणवत्ता नियंत्रण स्थापना',
    description: 'Procure and calibrate all mandatory testing apparatus specified in the Scheme of Inspection and Testing (SIT) for the chosen IS standard. Appoint qualified quality testing personnel.',
    duration: '10-25 Days',
    responsibleParty: 'Factory Quality Manager',
    requiredDocs: ['List of manufacturing machinery with capacity', 'List of in-house testing equipment with NABL calibration certificates', 'Quality control personnel educational degrees & appointment letters'],
    tips: 'Calibration certificates must be valid and issued by NABL-accredited calibration laboratories.'
  },
  {
    stepNumber: 3,
    title: 'Online Application on Manakonline',
    titleHi: 'मानकऑनलाइन पर ऑनलाइन आवेदन',
    description: 'Register enterprise profile on the BIS portal (manakonline.in), submit Form-V application, upload factory layout, and pay the ₹1,000 application fee with initial inspection charges.',
    duration: '1-2 Days',
    responsibleParty: 'Applicant / Regulatory Team',
    requiredDocs: ['Udyam Registration / Industrial License', 'Factory location electricity bill / Lease deed', 'Authorized signatory authorization letter', 'Bank receipt of statutory fee payment'],
    tips: 'MSMEs (Micro & Small enterprises) get a 20% concession on application and minimum marking fees.'
  },
  {
    stepNumber: 4,
    title: 'Factory Audit by BIS Technical Officer',
    titleHi: 'BIS तकनीकी अधिकारी द्वारा फैक्ट्री निरीक्षण',
    description: 'A designated BIS inspecting officer visits the factory premises to inspect the manufacturing line, verify in-house test capabilities, interview chemists, and draw official surveillance samples.',
    duration: '1 Day (Scheduled within 15 days of application)',
    responsibleParty: 'BIS Inspection Officer & Factory Team',
    requiredDocs: ['Original registers of raw material testing', 'Batch manufacturing records', 'Sample sealing kits & tamper-proof bags'],
    tips: 'Ensure raw materials test certificates and plant hygienic conditions comply with guidelines.'
  },
  {
    stepNumber: 5,
    title: 'Independent Laboratory Sample Testing',
    titleHi: 'स्वतंत्र प्रयोगशाला नमूना परीक्षण',
    description: 'The sealed factory sample is coded and dispatched to a BIS Central Laboratory or empaneled NABL accredited lab for complete physical, chemical, and safety testing.',
    duration: '10-30 Days (depending on product test parameters)',
    responsibleParty: 'BIS Empaneled NABL Testing Lab',
    requiredDocs: ['Test requisition form', 'Sample coding sheet', 'Testing fee deposit voucher'],
    tips: 'You can monitor test progress transparently in real time via the BIS Saara portal.'
  },
  {
    stepNumber: 6,
    title: 'Grant of License & CML Number Allocation',
    titleHi: 'लाइसेंस अनुदान और CML नंबर आवंटन',
    description: 'Upon receiving a passing independent lab report, the BIS Competent Authority approves the grant of Certification Marks Licence (CML). The manufacturer can now imprint the official ISI mark.',
    duration: '3-5 Days',
    responsibleParty: 'BIS Branch Office Head',
    requiredDocs: ['Signed undertaking for Scheme of Inspection and Testing (SIT)', 'Performance bank guarantee (if applicable)', 'Annual minimum marking fee payment'],
    tips: 'License is initially valid for 1 or 2 years and can be renewed online seamlessly for up to 5 years.'
  }
];
