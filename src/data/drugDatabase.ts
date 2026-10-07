import { Interaction, Medication, PrescriptionSample } from '../types/medication';

export const COMMON_DRUGS_CATALOG: Array<{ name: string; genericName: string; defaultDose: string; defaultFrequency: string; class: string }> = [
  { name: 'Warfarin (Coumadin)', genericName: 'Warfarin', defaultDose: '5mg', defaultFrequency: 'Once daily (evening)', class: 'Anticoagulant (Vitamin K Antagonist)' },
  { name: 'Aspirin (Ecosprin)', genericName: 'Aspirin', defaultDose: '75mg', defaultFrequency: 'Once daily (after food)', class: 'Antiplatelet / NSAID' },
  { name: 'Metformin (Glucophage)', genericName: 'Metformin', defaultDose: '500mg', defaultFrequency: 'Twice daily with meals', class: 'Biguanide Antidiabetic' },
  { name: 'Amlodipine (Norvasc)', genericName: 'Amlodipine', defaultDose: '5mg', defaultFrequency: 'Once daily (morning)', class: 'Calcium Channel Blocker' },
  { name: 'Lisinopril (Zestril)', genericName: 'Lisinopril', defaultDose: '10mg', defaultFrequency: 'Once daily (morning)', class: 'ACE Inhibitor' },
  { name: 'Spironolactone (Aldactone)', genericName: 'Spironolactone', defaultDose: '25mg', defaultFrequency: 'Once daily (morning)', class: 'Potassium-Sparing Diuretic' },
  { name: 'Ibuprofen (Advil/Brufen)', genericName: 'Ibuprofen', defaultDose: '400mg', defaultFrequency: 'Every 8 hours as needed', class: 'NSAID' },
  { name: 'Potassium Chloride (K-Lyte)', genericName: 'Potassium Chloride', defaultDose: '600mg', defaultFrequency: 'Once daily with meals', class: 'Mineral Supplement' },
  { name: 'Atorvastatin (Lipitor)', genericName: 'Atorvastatin', defaultDose: '40mg', defaultFrequency: 'Once daily at bedtime', class: 'HMG-CoA Reductase Inhibitor (Statin)' },
  { name: 'Clarithromycin (Biaxin)', genericName: 'Clarithromycin', defaultDose: '500mg', defaultFrequency: 'Twice daily', class: 'Macrolide Antibiotic (Strong CYP3A4 Inhibitor)' },
  { name: 'Sertraline (Zoloft)', genericName: 'Sertraline', defaultDose: '50mg', defaultFrequency: 'Once daily (morning)', class: 'SSRI Antidepressant' },
  { name: 'Tramadol (Ultram)', genericName: 'Tramadol', defaultDose: '50mg', defaultFrequency: 'Every 6 hours as needed', class: 'Opioid Analgesic / SNRI' },
  { name: 'Omeprazole (Prilosec)', genericName: 'Omeprazole', defaultDose: '20mg', defaultFrequency: 'Once daily before breakfast', class: 'Proton Pump Inhibitor' },
  { name: 'Clopidogrel (Plavix)', genericName: 'Clopidogrel', defaultDose: '75mg', defaultFrequency: 'Once daily', class: 'P2Y12 Antiplatelet' },
  { name: 'Digoxin (Lanoxin)', genericName: 'Digoxin', defaultDose: '0.125mg', defaultFrequency: 'Once daily', class: 'Cardiac Glycoside' },
  { name: 'Amiodarone (Cordarone)', genericName: 'Amiodarone', defaultDose: '200mg', defaultFrequency: 'Once daily', class: 'Class III Antiarrhythmic' },
  { name: 'Levothyroxine (Synthroid)', genericName: 'Levothyroxine', defaultDose: '50mcg', defaultFrequency: 'Once daily 30m before breakfast', class: 'Thyroid Hormone' },
  { name: 'Calcium Carbonate', genericName: 'Calcium Carbonate', defaultDose: '500mg', defaultFrequency: 'Twice daily with meals', class: 'Mineral Supplement' },
  { name: 'Ciprofloxacin (Cipro)', genericName: 'Ciprofloxacin', defaultDose: '500mg', defaultFrequency: 'Twice daily', class: 'Fluoroquinolone Antibiotic' },
  { name: 'Paracetamol / Acetaminophen', genericName: 'Paracetamol', defaultDose: '500mg', defaultFrequency: 'Every 6 hours as needed', class: 'Analgesic / Antipyretic' },
  { name: 'Furosemide (Lasix)', genericName: 'Furosemide', defaultDose: '40mg', defaultFrequency: 'Once daily (morning)', class: 'Loop Diuretic' },
  { name: 'Metoprolol (Lopressor)', genericName: 'Metoprolol Succinate', defaultDose: '50mg', defaultFrequency: 'Once daily', class: 'Beta Blocker' },
  { name: 'Cetirizine 10mg (Cetzine / Zyrtec)', genericName: 'Cetirizine', defaultDose: '10mg', defaultFrequency: 'Once daily at bedtime', class: '2nd Gen Antihistamine (Allergies/Cold)' },
  { name: 'Phenylephrine 10mg (Sinarest Decongestant)', genericName: 'Phenylephrine', defaultDose: '10mg', defaultFrequency: 'Every 6 hours as needed', class: 'Nasal Decongestant / Alpha-1 Agonist' },
  { name: 'Dextromethorphan 15mg (Cough Syrup)', genericName: 'Dextromethorphan', defaultDose: '15mg', defaultFrequency: 'Every 6 hours as needed', class: 'Antitussive (Dry Cough Suppressant)' },
  { name: 'Gelusil / Digene Liquid Antacid', genericName: 'Aluminium + Magnesium Hydroxide', defaultDose: '10ml', defaultFrequency: 'After meals as needed', class: 'Antacid / Gastric Neutralizer' },
  { name: 'Pantoprazole 40mg (Pan 40)', genericName: 'Pantoprazole', defaultDose: '40mg', defaultFrequency: 'Once daily 30m before breakfast', class: 'Proton Pump Inhibitor (Acidity/GERD)' },
  { name: 'Loperamide 2mg (Imodium)', genericName: 'Loperamide', defaultDose: '2mg', defaultFrequency: 'After each loose stool (max 8mg/day)', class: 'Antidiarrheal (Opioid Receptor Agonist)' },
  { name: 'ORS (Oral Rehydration Salts)', genericName: 'Oral Rehydration Salts', defaultDose: '1 Liter', defaultFrequency: 'Sip throughout the day', class: 'Electrolyte Replenisher' },
  { name: 'Telmisartan 40mg (Micardis / Telma)', genericName: 'Telmisartan', defaultDose: '40mg', defaultFrequency: 'Once daily (morning)', class: 'Angiotensin Receptor Blocker (ARB)' },
  { name: 'Glimepiride 2mg (Amaryl)', genericName: 'Glimepiride', defaultDose: '2mg', defaultFrequency: 'Once daily before breakfast', class: 'Sulfonylurea Antidiabetic' },
  { name: 'Topical Diclofenac Gel (Volini / Omnigel)', genericName: 'Topical Diclofenac', defaultDose: 'Apply 3-4g', defaultFrequency: 'Apply over joint 3 times daily', class: 'Topical NSAID (Safe for Seniors)' },
  { name: 'Isabgol (Psyllium Husk 100g)', genericName: 'Psyllium Husk', defaultDose: '1-2 tablespoons', defaultFrequency: 'At bedtime with 2 glasses of water', class: 'Bulk-Forming Natural Fiber (Constipation)' },
  { name: 'Lactulose Syrup (Duphalac 15ml)', genericName: 'Lactulose Oral Solution', defaultDose: '15ml', defaultFrequency: 'Once daily after dinner', class: 'Osmotic Laxative' },
  { name: 'Cremaffin Emulsion (225ml)', genericName: 'Magnesium Hydroxide + Liquid Paraffin', defaultDose: '10ml-15ml', defaultFrequency: 'At bedtime with water', class: 'Laxative Emulsion' },
  { name: 'Melatonin 3mg (Sleep Support)', genericName: 'Melatonin', defaultDose: '3mg', defaultFrequency: '30 mins before bedtime', class: 'Pineal Circadian Hormone (Sleep Aid)' },
  { name: 'Calamine Soothing Lotion (120ml)', genericName: 'Calamine + Zinc Oxide', defaultDose: 'Apply topically', defaultFrequency: '2-3 times daily as needed', class: 'Topical Antipruritic (Allergies/Itching)' }
];

export const KNOWN_INTERACTIONS: Interaction[] = [
  {
    id: 'war-asp',
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Significantly elevated risk of major gastrointestinal and intracranial bleeding',
    mechanism: 'Additive antithrombotic effects: Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X), while Aspirin irreversibly inhibits platelet COX-1 thromboxane A2 and causes gastric mucosal injury.',
    clinicalImpact: 'Bleeding hazard ratio increases 3- to 5-fold in polypharmacy elderly patients.',
    recommendation: 'Evaluate if concurrent therapy is clinically mandatory (e.g. recent coronary stent + mechanical heart valve). If not, discontinue Aspirin or switch to low-dose therapy with gastroprotection (PPI like Pantoprazole). Frequently monitor INR (target 2.0–2.5).',
    saferAlternatives: ['Clopidogrel (monotherapy if indicated)', 'Paracetamol for analgesia', 'Add PPI (Pantoprazole 40mg daily)'],
    cypEnzyme: 'CYP2C9 / Platelet COX-1',
    patientAlerts: {
      english: 'CAUTION: Taking Warfarin and Aspirin together creates a high danger of serious internal bleeding or stomach ulcers. Do not take them together without direct physician supervision.',
      hindi: 'सावधान! वॉर्फरिन (Warfarin) और एस्पिरिन (Aspirin) को एक साथ लेने से पेट में अल्सर और गंभीर रक्तस्राव (खून बहने) का बड़ा खतरा है। तुरंत डॉक्टर से संपर्क करें।',
      tamil: 'எச்சரிக்கை! வார்ஃபரின் மற்றும் ஆஸ்பிரின் ஆகியவற்றை ஒன்றாக உட்கொண்டால் கடுமையான உள் இரத்தப்போக்கு மற்றும் வயிற்றுப் புண் ஏற்படும் அபாயம் உள்ளது. மருத்துவரை உடனே அணுகவும்.',
      telugu: 'హెచ్చరిక! వార్ఫరిన్ మరియు ఆస్పిరిన్ కలిపి తీసుకోవడం వల్ల కడుపులో పుండ్లు మరియు తీవ్రమైన రక్తస్రావం జరిగే ప్రమాదం ఉంది. వెంటనే మీ వైద్యుడిని సంప్రదించండి.',
      bengali: 'সতর্কতা! ওয়ারফারিন এবং অ্যাসপিরিন একসঙ্গে গ্রহণ করলে মারাত্মক রক্তক্ষরণ ও পাকস্থলীর ক্ষতের ঝুঁকি বাড়ে। অবিলম্বে ডাক্তারের পরামর্শ নিন।',
      spanish: 'PRECAUCIÓN: Tomar Warfarina y Aspirina juntas aumenta drásticamente el riesgo de hemorragia interna grave o úlceras estomacales. Consulte a su médico de inmediato.'
    }
  },
  {
    id: 'met-alc',
    drug1: 'Metformin',
    drug2: 'Alcohol (Ethanol)',
    severity: 'MODERATE',
    type: 'drug-food',
    effect: 'Increased risk of potentially fatal lactic acidosis and prolonged hypoglycemia',
    mechanism: 'Ethanol inhibits gluconeogenesis and augments Metformin-induced lactate accumulation in hepatic mitochondria by increasing the cytosolic NADH/NAD+ ratio.',
    clinicalImpact: 'Symptoms include severe malaise, myalgia, respiratory distress, abdominal pain, and hypothermia.',
    recommendation: 'Strictly advise elderly patients to abstain from excessive or binge alcohol consumption while on Metformin. Instruct on warning signs of lactic acidosis.',
    saferAlternatives: ['Non-alcoholic hydration', 'Limit to strictly 1 standard unit with food if cleared by physician'],
    foodOrHerb: 'Alcohol / Beer / Spirits',
    patientAlerts: {
      english: 'WARNING: Do NOT drink alcoholic beverages while taking Metformin. Alcohol triggers sudden low blood sugar and a life-threatening build-up of lactic acid in your bloodstream.',
      hindi: 'चेतावनी: मेटफॉर्मिन (Metformin) लेते समय शराब (अल्कोहल) बिल्कुल न पिएं। इससे शरीर में लैक्टिक एसिड बढ़ सकता है जो बेहद खतरनाक है।',
      tamil: 'எச்சரிக்கை: மெட்ஃபோர்மின் மருந்து சாப்பிடும் போது மது அருந்த வேண்டாம். இது இரத்தத்தில் லாக்டிக் அமிலம் சேர வழிவகுத்து உயிருக்கு ஆபத்தை விளைவிக்கும்.',
      telugu: 'హెచ్చరిక: మెట్‌ఫార్మిన్ తీసుకుంటున్నప్పుడు మద్యం సేవించవద్దు. ఇది శరీరంలో ప్రమాదకరమైన లాక్టిక్ యాసిడ్ స్థాయిలను పెంచుతుంది.',
      bengali: 'সতর্কতা: মেটফর্মিন খাওয়ার সময় অ্যালকোহল পান করবেন না। এটি রক্তে মারাত্মক ল্যাকটিক অ্যাসিডোসিস তৈরি করতে পারে।',
      spanish: 'ADVERTENCIA: NO consuma alcohol mientras toma Metformina. El alcohol puede desencadenar acidosis láctica potencialmente mortal.'
    }
  },
  {
    id: 'war-vitk',
    drug1: 'Warfarin',
    drug2: 'Vitamin K Rich Foods (Spinach/Kale/Broccoli)',
    severity: 'MODERATE',
    type: 'drug-food',
    effect: 'Dramatic decrease in Warfarin anticoagulant efficacy, increasing blood clot and stroke risk',
    mechanism: 'High dietary Vitamin K overcomes competitive inhibition of Vitamin K epoxide reductase (VKORC1), replenishing active clotting factors.',
    clinicalImpact: 'INR falls below therapeutic range (<2.0), leaving patient vulnerable to thromboembolism or DVT.',
    recommendation: 'Maintain a stable, consistent intake of green leafy vegetables rather than sudden binge consumption or sudden complete elimination. Recheck INR after dietary shifts.',
    saferAlternatives: ['Keep consistent weekly leafy green portions', 'Avoid Vitamin K nutritional supplements or green teas in excess'],
    foodOrHerb: 'Spinach, Kale, Broccoli, Brussels Sprouts, Green Tea',
    patientAlerts: {
      english: 'FOOD ALERT: Spinach, kale, broccoli, and green tea contain high Vitamin K which weakens Warfarin. Keep your daily intake of green vegetables steady and avoid sudden changes.',
      hindi: 'आहार चेतावनी: पालक, मेथी, ब्रोकोली जैसी हरी पत्तेदार सब्जियों में विटामिन K अधिक होता है, जिससे वॉर्फरिन का असर कम हो जाता है। अचानक अधिक मात्रा में न खाएं।',
      tamil: 'உணவு எச்சரிக்கை: பசலைக்கீரை, ப்ரோக்கோலி போன்ற கீரைகளில் வைட்டமின் K அதிகம் உள்ளது. இது வார்ஃபரின் மருந்தின் வீரியத்தைக் குறைக்கும். நிலையான அளவில் உட்கொள்ளுங்கள்.',
      telugu: 'ఆహార హెచ్చరిక: పాలకూర, బ్రోకలీ వంటి ఆకుకూరలలో విటమిన్ K ఎక్కువగా ఉంటుంది. ఇది వార్ఫరిన్ ప్రభావాన్ని తగ్గిస్తుంది. రోజూ ఒకే పరిమాణంలో తీసుకోండి.',
      bengali: 'খাবারের সতর্কতা: পালংশাক ও ব্রকলিতে প্রচুর ভিটামিন K থাকে, যা ওয়ারফারিনের কার্যকারিতা কমিয়ে দেয়। খাবারে সবুজ শাকসবজি নির্দিষ্ট মাত্রায় রাখুন।',
      spanish: 'ALERTA DE ALIMENTOS: La espinaca, el brócoli y las verduras de hoja verde contienen mucha Vitamina K, lo que reduce la eficacia de la Warfarina. Mantenga un consumo constante.'
    }
  },
  {
    id: 'lis-spiro-pot',
    drug1: 'Lisinopril',
    drug2: 'Spironolactone',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Synergistic severe hyperkalemia leading to cardiac arrhythmias or arrest',
    mechanism: 'Lisinopril inhibits aldosterone synthesis via angiotensin-converting enzyme blockage; Spironolactone directly blocks aldosterone mineralocorticoid receptors. Both prevent renal potassium excretion in distal convoluted tubules.',
    clinicalImpact: 'Serum potassium (K+) can rapidly exceed 6.0 mEq/L, especially in elderly with age-related GFR reduction.',
    recommendation: 'Monitor serum potassium and creatinine within 1 week of initiation and regularly. Discontinue potassium supplements and salt substitutes. Reduce Spironolactone dose to <=25mg daily.',
    saferAlternatives: ['Monitor K+ weekly', 'Avoid OTC salt substitutes containing potassium chloride', 'Consider loop diuretic (Furosemide) if hyperkalemic'],
    cypEnzyme: 'Renal RAAS system',
    patientAlerts: {
      english: 'CRITICAL ALERT: Lisinopril and Spironolactone together can trap dangerous levels of potassium in your body, risking irregular heart rhythms. Avoid potassium salt substitutes.',
      hindi: 'गंभीर चेतावनी: लिसिनोप्रिल और स्पिरोनोलैक्टोन एक साथ लेने से खून में पोटेशियम खतरनाक स्तर तक बढ़ सकता है, जिससे दिल की धड़कन अनियमित हो सकती है।',
      tamil: 'முக்கிய எச்சரிக்கை: லிசினோப்ரில் மற்றும் ஸ்பைரோனோலாக்டோன் இரண்டும் உடலில் பொட்டாசியத்தை ஆபத்தான அளவுக்கு உயர்த்தக்கூடும். இது இதயத்துடிப்பை பாதிக்கலாம்.',
      telugu: 'తీవ్ర హెచ్చరిక: లిసినోప్రిల్ మరియు స్పిరోనోలాక్టోన్ కలిపి తీసుకుంటే శరీరంలో పొటాషియం ప్రమాదకర స్థాయికి చేరుకుంటుంది. గుండె లయ తప్పే ప్రమాదం ఉంది.',
      bengali: 'মারাত্মক সতর্কতা: লিসিনোপ্রিল এবং স্পিরোনোল্যাকটোন একসঙ্গে খেলে রক্তে পটাসিয়াম বিপজ্জনকভাবে বেড়ে যেতে পারে, যা হৃৎপিণ্ডের সমস্যা তৈরি করে।',
      spanish: 'ALERTA CRÍTICA: Lisinopril y Espironolactona juntos pueden retener niveles peligrosos de potasio en el cuerpo, provocando arritmias cardíacas graves.'
    }
  },
  {
    id: 'lis-ibu',
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'MODERATE',
    type: 'drug-drug',
    effect: 'Acute kidney injury (triple whammy component) and blunted blood pressure control',
    mechanism: 'Ibuprofen inhibits renal prostaglandin-mediated afferent arteriole vasodilation, while Lisinopril dilates the efferent arteriole, drastically reducing glomerular capillary hydrostatic filtration pressure.',
    clinicalImpact: 'Pre-renal azotemia and acute kidney injury, particularly in elderly or volume-depleted patients.',
    recommendation: 'Avoid systemic NSAIDs in patients on ACE inhibitors. Substitute with Paracetamol / Acetaminophen or topical NSAID gel for localized pain.',
    saferAlternatives: ['Paracetamol (up to 2000mg/day for seniors)', 'Topical Diclofenac gel', 'Physical therapy'],
    patientAlerts: {
      english: 'WARNING: Ibuprofen counters your Lisinopril blood pressure medication and can damage kidney function in seniors. Use Paracetamol for pain instead.',
      hindi: 'चेतावनी: इबुप्रोफेन (Ibuprofen) दर्द की दवा लिसिनोप्रिल के असर को कम करती है और गुर्दे (किडनी) को नुकसान पहुंचा सकती है। दर्द के लिए पैरासिटामोल लें।',
      tamil: 'எச்சரிக்கை: இபுபுரூஃபன் உங்கள் இரத்த அழுத்த மருந்தின் பலனைக் குறைத்து சிறுநீரகத்தைப் பாதிக்கலாம். வலிக்கு பாராசிட்டமால் பயன்படுத்துங்கள்.',
      telugu: 'హెచ్చరిక: ఇబుప్రోఫెన్ నొప్పి నివారిణి రక్తపోటు నియంత్రణను తగ్గిస్తుంది మరియు మూత్రపిండాలను దెబ్బతీస్తుంది. బదులుగా పారాసిటమాల్ వాడండి.',
      bengali: 'সতর্কতা: আইবুপ্রোফেন ব্যথানাশক ওষুধ কিডনির ক্ষতি করতে পারে এবং রক্তচাপের ওষুধকে অকেজো করতে পারে। ব্যথার জন্য প্যারাসিটামল ব্যবহার করুন।',
      spanish: 'ADVERTENCIA: El Ibuprofeno contrarresta el efecto antihipertensivo del Lisinopril y puede dañar los riñones en adultos mayores. Use Paracetamol para el dolor.'
    }
  },
  {
    id: 'ator-clari',
    drug1: 'Atorvastatin',
    drug2: 'Clarithromycin',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Severe rhabdomyolysis, profound muscle toxicity, and acute renal failure',
    mechanism: 'Clarithromycin is a potent mechanism-based irreversible inhibitor of hepatic CYP3A4 and OATP1B1 uptake transporters, leading to a 4- to 10-fold surge in systemic Atorvastatin exposure.',
    clinicalImpact: 'Marked increase in serum creatine kinase, myoglobinuria, and kidney tubular necrosis.',
    recommendation: 'CONTRAINDICATED concurrent use. Temporarily suspend Atorvastatin during Clarithromycin course, or switch antibiotic to Azithromycin (which has minimal CYP3A4 inhibition).',
    saferAlternatives: ['Switch antibiotic to Azithromycin 500mg', 'Hold Atorvastatin for duration of antibiotic course + 3 days'],
    cypEnzyme: 'Potent CYP3A4 & OATP1B1 inhibition',
    patientAlerts: {
      english: 'DANGER: Clarithromycin antibiotic drastically spikes cholesterol medicine (Atorvastatin) levels, which can destroy muscle tissue and damage kidneys. Stop Atorvastatin while taking this antibiotic.',
      hindi: 'खतरा: क्लैरिथ्रोमाइसिन एंटीबायोटिक और एटोरवास्टेटिन को एक साथ कभी न लें। इससे मांसपेशियों और गुर्दों (किडनी) को गंभीर नुकसान पहुंच सकता है।',
      tamil: 'ஆபத்து: கிளாரித்ரோமைசின் மற்றும் அடோர்வாஸ்டாடின் ஒன்றாக உட்கொள்வது தசை அழிவு மற்றும் சிறுநீரக செயலிழப்பை ஏற்படுத்தும். மருத்துவரிடம் உடனடியாக பேசுங்கள்.',
      telugu: 'ప్రమాదం: క్లారిత్రోమైసిన్ మరియు అటోర్వాస్టాటిన్ కలిపి తీసుకుంటే కండరాలు నాశనం కావడం మరియు మూత్రపిండాలు దెబ్బతినే ప్రమాదం ఉంది.',
      bengali: 'বিপদ: ক্ল্যারিথ্রোমাইসিন এবং অ্যাটরভাস্ট্যাটিন একসঙ্গে খেলে পেশী নষ্ট হওয়া এবং কিডনি ফেইলিওরের ঝুঁকি থাকে। অবিলম্বে ডাক্তারকে জানান।',
      spanish: 'PELIGRO: La Claritromicina dispara los niveles de Atorvastatina a niveles tóxicos, pudiendo provocar rabdomiólisis (daño muscular grave) e insuficiencia renal.'
    }
  },
  {
    id: 'ator-grapefruit',
    drug1: 'Atorvastatin',
    drug2: 'Grapefruit / Grapefruit Juice',
    severity: 'MODERATE',
    type: 'drug-food',
    effect: 'Intestinal CYP3A4 inhibition increases statin bioavailability, causing muscle pain and cramps',
    mechanism: 'Furanocoumarins in grapefruit irreversibly inactivate enterocyte CYP3A4, dramatically increasing oral bioavailability of CYP3A4-metabolized statins.',
    clinicalImpact: 'Patient reports unexplained symmetric calf or back muscle soreness, myalgia, or elevated transaminases.',
    recommendation: 'Instruct patient to completely avoid grapefruit juice or whole grapefruit fruit while on Atorvastatin, or switch to Rosuvastatin or Pravastatin (non-CYP3A4 statins).',
    saferAlternatives: ['Switch to Rosuvastatin 10mg (metabolized by CYP2C9)', 'Substitute with orange or apple juice'],
    foodOrHerb: 'Grapefruit & Pomelo Juice',
    patientAlerts: {
      english: 'FOOD ALERT: Grapefruit blocks how your liver breaks down Atorvastatin, making the pill several times stronger and causing muscle breakdown. Do not drink grapefruit juice.',
      hindi: 'आहार चेतावनी: चकोतरा (ग्रेपफ्रूट) का रस एटोरवास्टेटिन दवा को बहुत तेज बना देता है जिससे मांसपेशियों में दर्द और कमजोरी हो सकती है। चकोतरा न खाएं।',
      tamil: 'உணவு எச்சரிக்கை: திராட்சைப்பழம் (Grapefruit) சாறு உங்கள் கொலஸ்ட்ரால் மருந்தின் வீரியத்தை அபாயகரமான அளவுக்கு அதிகரிக்கும். இதை முற்றிலும் தவிர்க்கவும்.',
      telugu: 'ఆహార హెచ్చరిక: గ్రేప్‌ఫ్రూట్ రసం మీ కొలెస్ట్రాల్ మందుల ప్రభావాన్ని ప్రమాదకరంగా పెంచుతుంది. దీనిని పూర్తిగా నివారించండి.',
      bengali: 'খাবারের সতর্কতা: জাম্বুরা বা গ্রেপফ্রুট রস অ্যাটরভাস্ট্যাটিনের তীব্রতা বহু গুণ বাড়িয়ে দেয়। এটি এড়িয়ে চলুন।',
      spanish: 'ALERTA DE ALIMENTOS: El pomelo/toronja inhibe la degradación de la Atorvastatina, multiplicando su potencia y el riesgo de toxicidad muscular. Evítelo por completo.'
    }
  },
  {
    id: 'sert-tram',
    drug1: 'Sertraline',
    drug2: 'Tramadol',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Serotonin Syndrome and substantially lowered seizure threshold',
    mechanism: 'Additive serotonergic neurotransmission. Sertraline blocks serotonin reuptake (SSRI); Tramadol is both a mu-opioid agonist and a serotonin-norepinephrine reuptake inhibitor, plus a weak CYP2D6 substrate.',
    clinicalImpact: 'Tremors, hyperreflexia, clonus, diaphoresis, hyperthermia, agitation, delirium, and potential grand mal seizures.',
    recommendation: 'AVOID concurrent prescription if possible. If opioid analgesia is mandatory, consider agents with lower serotonergic activity (e.g. low-dose Codeine or Paracetamol/NSAID alternatives) and educate patient on serotonin toxicity symptoms.',
    saferAlternatives: ['Paracetamol 650mg QDS', 'Topical analgesics', 'Non-serotonergic opioid with close monitoring if essential'],
    cypEnzyme: 'Serotonergic synapsis / CYP2D6',
    patientAlerts: {
      english: 'CRITICAL ALERT: Sertraline and Tramadol together can cause "Serotonin Syndrome" — a dangerous spike in brain chemicals causing tremors, high fever, confusion, and seizures.',
      hindi: 'गंभीर चेतावनी: सेर्ट्रालीन (अवसाद की दवा) और ट्रामाडोल (दर्द की दवा) एक साथ लेने से सेरोटोनिन सिंड्रोम और दौरे (सीज़र) पड़ सकते हैं। डॉक्टर से तुरंत बात करें।',
      tamil: 'முக்கிய எச்சரிக்கை: செர்ட்ராலைன் மற்றும் ட்ரமடால் ஆகியவை நடுக்கம், அதிக காய்ச்சல் மற்றும் வலிப்புக்கு வழிவகுக்கும் செரோடோனின் நோய்க்குறியை ஏற்படுத்தலாம்.',
      telugu: 'తీవ్ర హెచ్చరిక: సెర్ట్రాలైన్ మరియు ట్రామడోల్ కలిపి తీసుకుంటే మెదడులో సెరోటోనిన్ పెరిగి వణుకు, తీవ్రమైన జ్వరం మరియు మూర్ఛ వచ్చే ప్రమాదం ఉంది.',
      bengali: 'মারাত্মক সতর্কতা: সার্ট্রালিন ও ট্রামাডল একসঙ্গে নিলে কাঁপুনি, প্রচণ্ড জ্বর ও খিঁচুনি হতে পারে। এটি মারাত্মক ক্ষতিকর।',
      spanish: 'ALERTA CRÍTICA: La Sertralina y el Tramadol combinados pueden causar el Síndrome Serotoninérgico: temblores, fiebre alta, confusión y convulsiones.'
    }
  },
  {
    id: 'levo-cal',
    drug1: 'Levothyroxine',
    drug2: 'Calcium Carbonate',
    severity: 'MODERATE',
    type: 'drug-drug',
    effect: 'Insoluble chelation reduces Levothyroxine absorption by 30-50%, triggering clinical hypothyroidism',
    mechanism: 'Calcium ions bind to levothyroxine molecules in the acidic gastrointestinal tract, forming unabsorbable insoluble chelates.',
    clinicalImpact: 'TSH levels rebound, causing fatigue, cold intolerance, weight gain, and sluggishness.',
    recommendation: 'Separate oral administration by at least 4 hours. Take Levothyroxine upon waking on an empty stomach with a full glass of water, and Calcium at lunch or dinner.',
    saferAlternatives: ['Take Levothyroxine 6:00 AM, Calcium Carbonate 1:00 PM', 'Separate doses by minimum 4 hours'],
    patientAlerts: {
      english: 'TIMING ALERT: Calcium tablets trap thyroid medicine (Levothyroxine) in your stomach so your body cannot absorb it. Separate them by at least 4 hours (e.g., thyroid pill in morning, calcium at lunch).',
      hindi: 'समय की चेतावनी: कैल्शियम की गोली थायरॉयड की दवा (Levothyroxine) को सोखने से रोकती है। दोनों के बीच कम से कम 4 घंटे का अंतर रखें।',
      tamil: 'நேர எச்சரிக்கை: கால்சியம் மாத்திரைகள் தைராய்டு மருந்தின் உறிஞ்சுதலைத் தடுக்கும். இரண்டிற்கும் இடையே குறைந்தது 4 மணி நேர இடைவெளி விடுங்கள்.',
      telugu: 'సమయ హెచ్చరిక: కాల్షియం మాత్రలు థైరాయిడ్ మందులు శరీరం శోషించుకోకుండా అడ్డుకుంటాయి. కనీసం 4 గంటల వ్యవధిలో వేసుకోండి.',
      bengali: 'সময়ের সতর্কতা: ক্যালসিয়াম বড়ি থাইরয়েডের ওষুধের কার্যকারিতা নষ্ট করে। দুটি ওষুধের মধ্যে অন্তত ৪ ঘণ্টার ব্যবধান রাখুন।',
      spanish: 'ALERTA DE HORARIO: El calcio bloquea la absorción de la Levotiroxina tiroidea. Separe ambas tomas al menos 4 horas (tiroides en ayunas, calcio al almuerzo).'
    }
  },
  {
    id: 'dig-amio',
    drug1: 'Digoxin',
    drug2: 'Amiodarone',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Doubling of serum Digoxin concentration leading to lethal Digoxin toxicity',
    mechanism: 'Amiodarone potently inhibits P-glycoprotein (MDR1) efflux transport in renal tubular cells and biliary canaliculi, halving Digoxin systemic clearance.',
    clinicalImpact: 'Nausea, visual halo halos, yellow vision, sinus bradycardia, heart block, and ventricular tachycardia.',
    recommendation: 'Proactively reduce Digoxin dosage by 50% immediately upon initiating Amiodarone. Check serum Digoxin concentration after 7–14 days. Monitor serial ECGs.',
    saferAlternatives: ['Halve Digoxin dose immediately (e.g. from 0.25mg to 0.125mg or alternate days)', 'Check serum digoxin trough levels'],
    cypEnzyme: 'P-glycoprotein efflux inhibition',
    patientAlerts: {
      english: 'CRITICAL ALERT: Amiodarone doubles the strength of Digoxin in your body. Watch closely for nausea, yellow-tinted vision, or a dangerously slow pulse. Contact clinic immediately.',
      hindi: 'गंभीर चेतावनी: एमियोडेरोन दवा से डिगॉक्सिन का असर दोगुना हो जाता है। यदि उल्टी, पीली रोशनी दिखना या धीमी नब्ज लगे तो तुरंत अस्पताल जाएं।',
      tamil: 'முக்கிய எச்சரிக்கை: அமியோடரோன் உங்கள் உடலில் டிகாக்சின் அளவை இரட்டிப்பாக்கும். குமட்டல் அல்லது பார்வை மங்குதல் ஏற்பட்டால் உடனே மருத்துவரை அணுகவும்.',
      telugu: 'తీవ్ర హెచ్చరిక: అమియోడారోన్ డిగాక్సిన్ ప్రభావాన్ని రెట్టింపు చేస్తుంది. వికారం లేదా చూపులో తేడాలు వస్తే వెంటనే ఆసుపత్రికి వెళ్లండి.',
      bengali: 'মারাত্মক সতর্কতা: অ্যামিওডারোন ডাইগক্সিনের কার্যকারিতা দ্বিগুণ করে দেয়। বমি বমি ভাব বা হলুদ দৃষ্টি দেখলে দ্রুত ডাক্তারের কাছে যান।',
      spanish: 'ALERTA CRÍTICA: La Amiodarona duplica los niveles de Digoxina en sangre. Esté alerta a náuseas, visión amarillenta o pulso lento. Llame al médico.'
    }
  },
  {
    id: 'cipro-dairy',
    drug1: 'Ciprofloxacin',
    drug2: 'Milk & Dairy Products (Calcium)',
    severity: 'MODERATE',
    type: 'drug-food',
    effect: 'Chelation with divalent calcium ions slashes antibiotic absorption by up to 70%',
    mechanism: 'Ciprofloxacin fluoroquinolone forms polyvalent cation chelates with calcium, magnesium, and iron in the intestine, blocking systemic absorption.',
    clinicalImpact: 'Antibiotic therapy failure, persistent bacterial infection, and emergence of antibiotic resistance.',
    recommendation: 'Do not take Ciprofloxacin with milk, yogurt, or calcium-fortified juices alone. Take the antibiotic at least 2 hours before or 4 hours after consuming dairy products.',
    saferAlternatives: ['Take with water only', 'Consume milk/yogurt 4 hours after the antibiotic dose'],
    foodOrHerb: 'Milk, Yogurt, Cheese, Calcium-fortified juices',
    patientAlerts: {
      english: 'FOOD ALERT: Milk, yogurt, and cheese destroy the power of Ciprofloxacin antibiotic. Take this medicine with plain water only, and wait 2 to 4 hours before having dairy.',
      hindi: 'आहार चेतावनी: दूध, दही या पनीर सिप्रोफ्लोक्सासिन एंटीबायोटिक के असर को 70% तक खत्म कर देते हैं। इसे केवल सादे पानी से लें।',
      tamil: 'உணவு எச்சரிக்கை: பால் மற்றும் தயிர் சிப்ரோஃப்ளோக்சசின் ஆன்டிபயாடிக்கின் வீரியத்தை இழக்கச் செய்யும். வெறும் தண்ணீருடன் மட்டுமே உட்கொள்ளவும்.',
      telugu: 'ఆహార హెచ్చరిక: పాలు మరియు పెరుగు సిప్రోఫ్లోక్సాసిన్ యాంటీబయాటిక్ ప్రభావాన్ని చాలా వరకు తగ్గిస్తాయి. మంచినీటితో మాత్రమే వేసుకోండి.',
      bengali: 'খাবারের সতর্কতা: দুধ বা দই সিপ্রোফ্লক্সাসিনের কার্যকারিতা নষ্ট করে। শুধুমাত্র সাধারণ জল দিয়ে এই ওষুধটি খান।',
      spanish: 'ALERTA DE ALIMENTOS: La leche, yogur y quesos impiden que el cuerpo absorba el antibiótico Ciprofloxacino. Tómelo solo con agua y espere 2-4 horas para tomar lácteos.'
    }
  },
  {
    id: 'phen-aml',
    drug1: 'Phenylephrine',
    drug2: 'Amlodipine',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Acute spike in systemic blood pressure and hypertensive crisis',
    mechanism: 'Phenylephrine is a potent selective alpha-1 adrenergic vasoconstrictor that directly opposes the arteriolar vasodilatory mechanism of Amlodipine.',
    clinicalImpact: 'Systolic blood pressure can spike by 25-40 mmHg, precipitating angina, severe headache, or intracranial hemorrhage.',
    recommendation: 'CONTRAINDICATED in elderly hypertensive patients. Replace oral decongestant cold tablets with drug-free Normal Saline nasal spray or steam inhalation.',
    saferAlternatives: ['Normal Saline Nasal Spray', 'Steam Inhalation', 'Cetirizine (for allergic sneezing)'],
    cypEnzyme: 'Alpha-1 Adrenergic Receptor',
    patientAlerts: {
      english: 'HIGH DANGER: Cold decongestant pills (like Phenylephrine/Sinarest) counteract your blood pressure pill (Amlodipine) and cause dangerous spikes in blood pressure. Use Saline nasal drops instead.',
      hindi: 'बड़ा खतरा: सर्दी-जुकाम की गोली (Phenylephrine/Sinarest) आपकी बीपी की दवा (Amlodipine) के असर को काटकर बीपी बहुत तेज बढ़ा देती है। इसके बदले सादे सलाइन स्प्रे या भाप का इस्तेमाल करें।',
      tamil: 'உயர் ஆபத்து: சளி மாத்திரைகள் உங்கள் இரத்த அழுத்த மாத்திரையை எதிர்த்து இரத்த அழுத்தத்தை மிக அதிகமாக உயர்த்தும். அதற்கு பதிலாக சலைன் ஸ்ப்ரே பயன்படுத்துங்கள்.',
      telugu: 'తీవ్ర ప్రమాదం: జలుబు మాత్రలు మీ రక్తపోటు మందుల ప్రభావాన్ని రద్దు చేసి రక్తపోటును ప్రమాదకరంగా పెంచుతాయి. బదులుగా సెలైన్ స్ప్రే వాడండి.',
      bengali: 'মারাত্মক বিপদ: সর্দির ওষুধ ফিনাইলফ্রিন আপনার রক্তচাপের ওষুধকে অকার্যকর করে রক্তচাপ বিপজ্জনকভাবে বাড়িয়ে দেয়। এর বদলে স্যালাইন ড্রপ ব্যবহার করুন।',
      spanish: 'ALTO PELIGRO: Los antigripales con fenilefrina anulan el efecto de su antihipertensivo (amlodipino) y provocan picos hipertensivos peligrosos. Use suero fisiológico nasal.'
    }
  },
  {
    id: 'dex-sert',
    drug1: 'Dextromethorphan',
    drug2: 'Sertraline',
    severity: 'SEVERE',
    type: 'drug-drug',
    effect: 'Serotonin Syndrome (hyperthermia, neuromuscular clonus, seizures)',
    mechanism: 'Additive serotonergic toxicity. Dextromethorphan acts as a serotonin reuptake inhibitor and sigma-1 agonist; Sertraline blocks serotonin reuptake and inhibits CYP2D6-mediated dextromethorphan clearance.',
    clinicalImpact: 'Patient presents with acute agitation, tremors, hyperreflexia, autonomic instability, and potentially fatal hyperthermia.',
    recommendation: 'AVOID concurrent prescription. For cough relief, substitute with Guaifenesin syrup, warm saline gargles, or honey-ginger soothing teas.',
    saferAlternatives: ['Guaifenesin Expectorant Syrup', 'Warm Saline Gargle with Turmeric', 'Honey and Ginger'],
    cypEnzyme: 'CYP2D6 / Serotonin Transporter',
    patientAlerts: {
      english: 'CRITICAL WARNING: Taking Dextromethorphan cough syrup with antidepressant pills (Sertraline) triggers dangerous Serotonin Syndrome — high fever, tremors, confusion, and muscle twitching. Use warm honey water instead.',
      hindi: 'गंभीर चेतावनी: खांसी का सिरप (Dextromethorphan) डिप्रेशन की दवा (Sertraline) के साथ लेने से सेरोटोनिन सिंड्रोम का गंभीर खतरा है, जिससे तेज बुखार, कंपकंपी और बेचैनी हो सकती है। गुनगुना पानी और शहद लें।',
      tamil: 'முக்கிய எச்சரிக்கை: டெக்ஸ்ட்ரோமெத்தார்பான் இருமல் சிரப் மற்றும் செர்ட்ராலைன் மாத்திரையை ஒன்றாக எடுத்தால் கடுமையான செரோடோனின் நச்சுத்தன்மை ஏற்படும். தேன் கலந்த வெந்நீர் அருந்துங்கள்.',
      telugu: 'తీవ్ర హెచ్చరిక: దగ్గు సిరప్ మరియు సెర్ట్రాలైన్ కలిపి తీసుకుంటే సెరోటోనిన్ సిండ్రోమ్ వచ్చి తీవ్ర జ్వరం, వణుకు వస్తాయి. బదులుగా తేనె మరియు అల్లం రసం తీసుకోండి.',
      bengali: 'মারাত্মক সতর্কতা: কাশির সিরাপ এবং সার্ট্রালিন একসঙ্গে খেলে মারাত্মক কাঁপুনি, প্রচণ্ড জ্বর ও মানসিক বিভ্রান্তি হতে পারে। এর বদলে গরম জলে মধু পান করুন।',
      spanish: 'ADVERTENCIA CRÍTICA: El jarabe para la tos con dextrometorfano combinado con sertralina puede causar el Síndrome Serotoninérgico con fiebre alta, temblores y convulsiones.'
    }
  },
  {
    id: 'antacid-levo',
    drug1: 'Gelusil / Antacid',
    drug2: 'Levothyroxine',
    severity: 'MODERATE',
    type: 'drug-drug',
    effect: 'Chelation reduces thyroid hormone absorption, triggering clinical hypothyroidism',
    mechanism: 'Aluminium and magnesium ions form non-absorbable insoluble chelates with levothyroxine in the acidic gastric environment.',
    clinicalImpact: 'TSH surges above normal reference range, causing profound fatigue, weight gain, constipation, and cold intolerance in seniors.',
    recommendation: 'Separate oral administration by at least 4 full hours. Take Levothyroxine first thing in the morning on an empty stomach, and antacids after meals.',
    saferAlternatives: ['Separate by at least 4 hours (Thyroid at 6:30 AM, Antacids after 11:00 AM)'],
    patientAlerts: {
      english: 'TIMING CAUTION: Antacid syrups (Gelusil / Digene) trap thyroid medicine (Levothyroxine) and destroy its power. Always maintain a minimum 4-hour gap between antacids and your thyroid tablet.',
      hindi: 'समय की सावधानी: जेलुसिल (Gelusil) या डाइजीन जैसे एंटासिड सिरप थायरॉयड की दवा (Levothyroxine) को सोखने नहीं देते। दोनों के बीच कम से कम 4 घंटे का अंतर जरूर रखें।',
      tamil: 'நேர எச்சரிக்கை: அமில எதிர்ப்பு ஜெல் தைராய்டு மருந்தின் உறிஞ்சுதலைத் தடுக்கும். இரண்டிற்கும் இடையே குறைந்தது 4 மணி நேர இடைவெளி விட வேண்டும்.',
      telugu: 'సమయ హెచ్చరిక: యాంటాసిడ్ సిరప్‌లు థైరాయిడ్ మందుల ప్రభావాన్ని నాశనం చేస్తాయి. కనీసం 4 గంటల సమయ వ్యవధిని పాటించండి.',
      bengali: 'সময়ের সতর্কতা: এন্টাসিড সিরাপ থাইরয়েডের ওষুধের কার্যকারিতা নষ্ট করে দেয়। অন্তত ৪ ঘণ্টার ব্যবধান রাখুন।',
      spanish: 'PRECAUCIÓN DE HORARIO: Los antiácidos líquidos (Gelusil) bloquean la absorción de la hormona tiroidea. Separe ambas tomas un mínimo de 4 horas.'
    }
  },
  {
    id: 'cetz-tram',
    drug1: 'Cetirizine',
    drug2: 'Tramadol',
    severity: 'MODERATE',
    type: 'drug-drug',
    effect: 'Synergistic severe CNS depression, extreme drowsiness, and fall hazard in elderly',
    mechanism: 'Additive central sedation via histaminergic H1 receptor blockade and mu-opioid receptor stimulation in the reticular activating system.',
    clinicalImpact: 'Marked impairment of motor coordination, daytime somnolence, confusion, and high incidence of hip fractures from nighttime falls.',
    recommendation: 'Monitor patient closely. Administer Cetirizine strictly at bedtime. If daytime analgesia is required, use topical NSAID gels or Paracetamol instead of Tramadol.',
    saferAlternatives: ['Paracetamol for pain', 'Topical Diclofenac gel', 'Take Cetirizine only at bedtime'],
    patientAlerts: {
      english: 'FALL RISK WARNING: Allergy pill (Cetirizine) and pain medicine (Tramadol) together cause intense dizziness, heavy sleepiness, and a severe risk of tripping or falling in seniors.',
      hindi: 'गिरने का खतरा: एलर्जी की दवा (Cetirizine) और दर्द की दवा (Tramadol) एक साथ लेने से बहुत ज्यादा चक्कर और नींद आती है, जिससे बुजुर्गों के फिसलकर गिरने की संभावना बहुत बढ़ जाती है।',
      tamil: 'விழும் அபாயம்: அலர்ஜி மாத்திரை மற்றும் வலி மாத்திரை ஒன்றாக எடுக்கும் போது கடுமையான மயக்கம் மற்றும் கீழே விழும் அபாயம் ஏற்படும்.',
      telugu: 'పడుపోయే ప్రమాదం: అలర్జీ మందు మరియు నొప్పి మందు కలిపి తీసుకుంటే తీవ్రమైన మగత వచ్చి వృద్ధులు కింద పడిపోయే ప్రమాదం ఉంది.',
      bengali: 'পড়ে যাওয়ার ঝুঁকি: অ্যালার্জির ওষুধ এবং ট্রামাডল একসঙ্গে খেলে প্রচণ্ড তন্দ্রাচ্ছন্নতা ও বয়স্কদের পা পিছলে পড়ে যাওয়ার আশঙ্কা থাকে।',
      spanish: 'RIESGO DE CAÍDAS: La cetirizina combinada con tramadol potencia la somnolencia y la sedación, aumentando drásticamente el riesgo de caídas y fracturas en personas mayores.'
    }
  },
  {
    id: 'ome-clop',
    drug1: 'Omeprazole',
    drug2: 'Clopidogrel',
    severity: 'MODERATE',
    type: 'drug-drug',
    effect: 'Reduced antiplatelet efficacy, increasing risk of stent thrombosis and ischemic stroke',
    mechanism: 'Omeprazole competitively inhibits CYP2C19, the primary cytochrome enzyme responsible for bioactivating the Clopidogrel prodrug into its active thiol metabolite.',
    clinicalImpact: 'Up to 45% reduction in platelet inhibition, increasing major adverse cardiovascular events (MACE) in post-angioplasty patients.',
    recommendation: 'Switch gastroprotective PPI from Omeprazole to Pantoprazole (Pan 40), which exhibits minimal CYP2C19 inhibition.',
    saferAlternatives: ['Switch Omeprazole to Pantoprazole 40mg', 'Consider Famotidine (H2 blocker)'],
    cypEnzyme: 'CYP2C19 competitive inhibition',
    patientAlerts: {
      english: 'CAUTION: Acidity medicine Omeprazole weakens your heart blood-thinner (Clopidogrel), raising blood clot risks. Ask your doctor to switch to Pantoprazole instead.',
      hindi: 'सावधानी: एसिडिटी की दवा ओमेप्राजोल (Omeprazole) खून पतला करने वाली दवा (Clopidogrel) का असर कम कर देती है। इसके बदले डॉक्टर से पेंटोप्राजोल (Pantoprazole) लिखने को कहें।',
      tamil: 'எச்சரிக்கை: ஒமேபிரசோல் உங்கள் இதய இரத்தத்தை நீர்க்கும் மருந்தின் சக்தியைக் குறைக்கும். அதற்கு பதிலாக பாண்டோபிரசோல் பயன்படுத்துங்கள்.',
      telugu: 'హెచ్చరిక: ఒమెప్రజోల్ మీ రక్తం పల్చబడే మందు ప్రభావాన్ని తగ్గిస్తుంది. బదులుగా పాంటోప్రజోల్ వాడమని వైద్యుడిని అడగండి.',
      bengali: 'সতর্কতা: ওমেপ্রাজল আপনার হার্টের রক্ত পাতলা করার ওষুধের কার্যকারিতা কমিয়ে দেয়। এর বদলে প্যান্টোপ্রাজল ব্যবহার করুন।',
      spanish: 'PRECAUCIÓN: El omeprazol disminuye la activación del antiagregante clopidogrel, aumentando el riesgo de trombosis del stent. Cambie a pantoprazol.'
    }
  }
];

export const SAMPLE_PRESCRIPTIONS: PrescriptionSample[] = [
  {
    id: 'sample-1',
    title: 'Cardiovascular & Diabetes (Elderly Polypharmacy)',
    subtitle: 'Warfarin + Aspirin + Metformin + Amlodipine',
    category: 'Geriatric Cardiology',
    patientName: 'Ramachandran Sharma',
    patientAge: 74,
    doctorName: 'Dr. Priya Nambiar, MD, DM (Cardiology)',
    hospitalName: 'Apollo Heart & Vascular Institute',
    date: '2026-10-04',
    diagnosis: 'Atrial Fibrillation, Non-STEMI status post PCI, Type 2 Diabetes Mellitus, Essential Hypertension',
    rawText: 'Rx: Warfarin 5mg PO QPM, Aspirin 75mg PO OD post-meal, Metformin 500mg PO BD with meals, Amlodipine 5mg PO OD morning. Regular INR monitoring scheduled.',
    badge: 'High Bleeding Risk',
    notes: 'Patient reported occasional black stools and easy bruising on arms. Creatinine clearance 52 mL/min.',
    medications: [
      { id: 'm1', name: 'Warfarin 5mg', genericName: 'Warfarin', dosage: '5mg', frequency: 'Once daily (evening)', timingSlot: 'bedtime', route: 'Oral', purpose: 'Anticoagulation for Atrial Fibrillation', active: true },
      { id: 'm2', name: 'Aspirin 75mg', genericName: 'Aspirin', dosage: '75mg', frequency: 'Once daily (after food)', timingSlot: 'morning', route: 'Oral', purpose: 'Secondary prevention post-stent', active: true },
      { id: 'm3', name: 'Metformin 500mg', genericName: 'Metformin', dosage: '500mg', frequency: 'Twice daily with food', timingSlot: 'with-meals', route: 'Oral', purpose: 'Blood glucose regulation', active: true },
      { id: 'm4', name: 'Amlodipine 5mg', genericName: 'Amlodipine', dosage: '5mg', frequency: 'Once daily (morning)', timingSlot: 'morning', route: 'Oral', purpose: 'Blood pressure control', active: true }
    ]
  },
  {
    id: 'sample-2',
    title: 'Hypertension, Nephropathy & Pain',
    subtitle: 'Lisinopril + Spironolactone + Ibuprofen',
    category: 'Renal / Rheumatology',
    patientName: 'Arthur Pendelton',
    patientAge: 68,
    doctorName: 'Dr. Kevin Vance, MD (Nephrology & Internal Med)',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    date: '2026-10-02',
    diagnosis: 'Hypertensive Nephrosclerosis, Osteoarthritis of Bilateral Knees, Congestive Heart Failure NYHA II',
    rawText: 'Rx: Lisinopril 20mg PO OD, Spironolactone 25mg PO OD morning, Ibuprofen 400mg PO TID PRN knee pain, Potassium Chloride 600mg PO OD.',
    badge: 'Hyperkalemia / AKI Hazard',
    notes: 'Prescribed Ibuprofen by emergency walk-in clinic for severe knee pain without cross-checking ACE-i and aldosterone antagonist.',
    medications: [
      { id: 'm21', name: 'Lisinopril 20mg', genericName: 'Lisinopril', dosage: '20mg', frequency: 'Once daily (morning)', timingSlot: 'morning', route: 'Oral', purpose: 'Hypertension & Cardioprotection', active: true },
      { id: 'm22', name: 'Spironolactone 25mg', genericName: 'Spironolactone', dosage: '25mg', frequency: 'Once daily (morning)', timingSlot: 'morning', route: 'Oral', purpose: 'CHF Diuretic & Aldosterone blockade', active: true },
      { id: 'm23', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily PRN', timingSlot: 'afternoon', route: 'Oral', purpose: 'Severe osteoarthritis flare', active: true },
      { id: 'm24', name: 'Potassium Chloride 600mg', genericName: 'Potassium Chloride', dosage: '600mg', frequency: 'Once daily with meals', timingSlot: 'with-meals', route: 'Oral', purpose: 'Electrolyte repletion', active: true }
    ]
  },
  {
    id: 'sample-3',
    title: 'Severe Infection & Dyslipidemia',
    subtitle: 'Atorvastatin + Clarithromycin + Grapefruit',
    category: 'Infectious Disease',
    patientName: 'Devika Krishnan',
    patientAge: 62,
    doctorName: 'Dr. Sunita Sen, MD (Pulmonology)',
    hospitalName: 'Global Care Superspeciality Hospital',
    date: '2026-10-05',
    diagnosis: 'Community-Acquired Bronchial Pneumonia, Hypercholesterolemia, Family history of CAD',
    rawText: 'Rx: Clarithromycin 500mg PO BD x 7 days, Atorvastatin 40mg PO QHS, Paracetamol 650mg PO TDS PRN fever.',
    badge: 'Rhabdomyolysis Risk',
    notes: 'Patient drinks fresh grapefruit juice every morning with breakfast. Started on macrolide for respiratory tract infection.',
    medications: [
      { id: 'm31', name: 'Atorvastatin 40mg', genericName: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily (bedtime)', timingSlot: 'bedtime', route: 'Oral', purpose: 'Lipid lowering', active: true },
      { id: 'm32', name: 'Clarithromycin 500mg', genericName: 'Clarithromycin', dosage: '500mg', frequency: 'Twice daily x 7 days', timingSlot: 'morning', route: 'Oral', purpose: 'Acute bacterial bronchitis', active: true },
      { id: 'm33', name: 'Paracetamol 650mg', genericName: 'Paracetamol', dosage: '650mg', frequency: 'Every 8 hours PRN fever', timingSlot: 'afternoon', route: 'Oral', purpose: 'Fever and pleuritic pain relief', active: true }
    ]
  },
  {
    id: 'sample-4',
    title: 'Psychiatry & Chronic Neuropathic Pain',
    subtitle: 'Sertraline + Tramadol + Omeprazole',
    category: 'Neuropsychiatry',
    patientName: 'Margaret O\'Connor',
    patientAge: 71,
    doctorName: 'Dr. Raymond Clark, MD (Neurology)',
    hospitalName: 'Mercy Memorial Medical Hospital',
    date: '2026-09-29',
    diagnosis: 'Major Depressive Disorder, Diabetic Peripheral Neuropathy, Gastroesophageal Reflux Disease',
    rawText: 'Rx: Sertraline 50mg PO OD morning, Tramadol 50mg PO BD PRN pain, Omeprazole 20mg PO OD before meals.',
    badge: 'Serotonin Syndrome',
    notes: 'Patient complains of tremor, restless legs, and muscle twitching after initiating analgesic for neuropathic foot burning.',
    medications: [
      { id: 'm41', name: 'Sertraline 50mg', genericName: 'Sertraline', dosage: '50mg', frequency: 'Once daily (morning)', timingSlot: 'morning', route: 'Oral', purpose: 'Depressive disorder and anxiety', active: true },
      { id: 'm42', name: 'Tramadol 50mg', genericName: 'Tramadol', dosage: '50mg', frequency: 'Twice daily PRN severe pain', timingSlot: 'evening', route: 'Oral', purpose: 'Peripheral diabetic neuropathic pain', active: true },
      { id: 'm43', name: 'Omeprazole 20mg', genericName: 'Omeprazole', dosage: '20mg', frequency: 'Once daily before breakfast', timingSlot: 'morning', route: 'Oral', purpose: 'Gastric acid suppression', active: true }
    ]
  },
  {
    id: 'sample-5',
    title: 'Common Cold & Sinus in Senior on Heart Rx',
    subtitle: 'Amlodipine + Warfarin + Phenylephrine + Paracetamol',
    category: 'Geriatric Internal Med & ENT',
    patientName: 'Subhash Chandra Verma',
    patientAge: 69,
    doctorName: 'Dr. Anita Roy, MD (Family Medicine)',
    hospitalName: 'CareWell Community Health Clinic',
    date: '2026-10-06',
    diagnosis: 'Acute Viral Upper Respiratory Infection, Essential Hypertension, Permanent Atrial Fibrillation',
    rawText: 'Rx: Amlodipine 5mg PO OD morning, Warfarin 5mg PO QPM, Phenylephrine 10mg (Sinarest tablet) PO TID PRN blocked nose, Paracetamol 500mg PO TDS PRN fever.',
    badge: 'Hypertensive Crisis Hazard',
    notes: 'Patient bought OTC decongestant tablet for runny nose. Complained of throbbing headache and sudden BP spike to 178/104 mmHg.',
    medications: [
      { id: 'm51', name: 'Amlodipine 5mg', genericName: 'Amlodipine', dosage: '5mg', frequency: 'Once daily (morning)', timingSlot: 'morning', route: 'Oral', purpose: 'Blood pressure control', active: true },
      { id: 'm52', name: 'Warfarin 5mg', genericName: 'Warfarin', dosage: '5mg', frequency: 'Once daily (evening)', timingSlot: 'bedtime', route: 'Oral', purpose: 'Stroke prevention in Atrial Fibrillation', active: true },
      { id: 'm53', name: 'Phenylephrine 10mg (Sinarest)', genericName: 'Phenylephrine', dosage: '10mg', frequency: 'Every 8 hours PRN', timingSlot: 'afternoon', route: 'Oral', purpose: 'Nasal decongestion for cold', active: true },
      { id: 'm54', name: 'Paracetamol 500mg', genericName: 'Paracetamol', dosage: '500mg', frequency: 'Every 8 hours as needed', timingSlot: 'afternoon', route: 'Oral', purpose: 'Mild fever and body ache', active: true }
    ]
  }
];

export function findInteractionsForMeds(meds: Medication[]): {
  interactions: Interaction[];
  summary: {
    riskScore: 'HIGH' | 'MODERATE' | 'LOW';
    severeCount: number;
    moderateCount: number;
    minorCount: number;
    foodCount: number;
    safeToDispense: boolean;
    clinicalConclusion: string;
    cypPathwaysInvolved: string[];
  };
} {
  const activeMeds = meds.filter(m => m.active);
  const detectedInteractions: Interaction[] = [];
  const cypPathways = new Set<string>();

  // Compare each active pair
  for (let i = 0; i < activeMeds.length; i++) {
    for (let j = i + 1; j < activeMeds.length; j++) {
      const g1 = activeMeds[i].genericName.toLowerCase();
      const g2 = activeMeds[j].genericName.toLowerCase();

      KNOWN_INTERACTIONS.forEach(inter => {
        if (inter.type === 'drug-drug') {
          const d1 = inter.drug1.toLowerCase();
          const d2 = inter.drug2.toLowerCase();
          if ((g1.includes(d1) && g2.includes(d2)) || (g1.includes(d2) && g2.includes(d1))) {
            if (!detectedInteractions.some(x => x.id === inter.id)) {
              detectedInteractions.push(inter);
              if (inter.cypEnzyme) cypPathways.add(inter.cypEnzyme);
            }
          }
        }
      });
    }
  }

  // Also include relevant drug-food interactions for each active drug
  activeMeds.forEach(med => {
    const g = med.genericName.toLowerCase();
    KNOWN_INTERACTIONS.forEach(inter => {
      if (inter.type === 'drug-food') {
        const d1 = inter.drug1.toLowerCase();
        if (g.includes(d1) && !detectedInteractions.some(x => x.id === inter.id)) {
          detectedInteractions.push(inter);
          if (inter.cypEnzyme) cypPathways.add(inter.cypEnzyme);
        }
      }
    });
  });

  const severeCount = detectedInteractions.filter(i => i.severity === 'SEVERE').length;
  const moderateCount = detectedInteractions.filter(i => i.severity === 'MODERATE').length;
  const minorCount = detectedInteractions.filter(i => i.severity === 'MINOR').length;
  const foodCount = detectedInteractions.filter(i => i.type === 'drug-food').length;

  let riskScore: 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';
  if (severeCount > 0) riskScore = 'HIGH';
  else if (moderateCount > 0) riskScore = 'MODERATE';

  const safeToDispense = severeCount === 0;

  let clinicalConclusion = 'No acute critical interactions flagged among active medications. Standard monitoring advised.';
  if (severeCount > 0) {
    clinicalConclusion = `CRITICAL ALERT: Detected ${severeCount} severe interaction(s). Physician intervention or medication substitution strongly mandated prior to dispensing.`;
  } else if (moderateCount > 0) {
    clinicalConclusion = `MODERATE RISK: Detected ${moderateCount} interaction(s) requiring dosage separation or clinical monitoring.`;
  }

  return {
    interactions: detectedInteractions,
    summary: {
      riskScore,
      severeCount,
      moderateCount,
      minorCount,
      foodCount,
      safeToDispense,
      clinicalConclusion,
      cypPathwaysInvolved: Array.from(cypPathways)
    }
  };
}
