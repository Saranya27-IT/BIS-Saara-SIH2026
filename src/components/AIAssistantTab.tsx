import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  BookOpen, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Languages,
  Mic,
  MicOff,
  Radio,
  Layers,
  FileText
} from 'lucide-react';
import { ActiveTab, Language } from '../types/index.ts';
import { PREDEFINED_FAQS, INDIAN_STANDARDS } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  textEn: string;
  textHi: string;
  textTa: string;
  timestamp: string;
  relatedIS?: string;
  suggestedAction?: {
    label: string;
    tab: ActiveTab;
  };
  recommendations?: {
    isNumber: string;
    title: string;
    reason: string;
    similarity: string;
  }[];
}

interface AIAssistantTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const AIAssistantTab: React.FC<AIAssistantTabProps> = ({ setActiveTab, lang, setLang }) => {
  const { showToast } = useToast();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});
  
  // Voice Query State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'm-1',
      sender: 'assistant',
      textEn: "Namaste! I am BIS Saara, your AI-powered Intelligent Assistant for Indian Standards, ISI Mark Certification, and Quality Regulations. How can I assist your business or consumer queries today?",
      textHi: "नमस्ते! मैं 'बीआईएस सारा' (BIS Saara) हूँ — भारतीय मानकों, ISI मार्क प्रमाणन और गुणवत्ता नियमों के लिए आपका AI सहायक। आज मैं आपकी क्या सहायता कर सकता हूँ?",
      textTa: "வணக்கம்! நான் BIS சாரா (BIS Saara) — இந்திய தரநிலைகள், ISI சான்றிதழ் மற்றும் தர விதிமுறைகளுக்கான உங்கள் AI உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      timestamp: 'Just now'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    {
      labelEn: "Electric Iron → IS 302",
      labelHi: "इलेक्ट्रिक आयरन → IS 302",
      labelTa: "மின்சார இஸ்திரி → IS 302",
      query: "Which Indian Standard applies to Electric Iron and what are the certification requirements?"
    },
    {
      labelEn: "Drinking Water → IS 14543",
      labelHi: "पेयजल → IS 14543",
      labelTa: "குடிநீர் → IS 14543",
      query: "Which standard regulates Packaged Drinking Water and how can plants comply?"
    },
    {
      labelEn: "TMT Steel → IS 1786",
      labelHi: "TMT स्टील → IS 1786",
      labelTa: "TMT எஃகு → IS 1786",
      query: "Which BIS standard governs TMT Steel Bars for earthquake-resistant construction?"
    },
    {
      labelEn: "Helmet → IS 15644",
      labelHi: "हेलमेट → IS 15644",
      labelTa: "தலைக்கவசம் → IS 15644",
      query: "Which standard applies to Protective Helmet and two-wheeler safety in India?"
    },
    {
      labelEn: "PVC Cable (IS 694)",
      labelHi: "पीवीसी केबल (IS 694)",
      labelTa: "PVC கேபிள் (IS 694)",
      query: "What are the compliance requirements for PVC Insulated Cables under IS 694?"
    }
  ];

  const findBestResponse = (query: string): { 
    textEn: string; 
    textHi: string; 
    textTa: string; 
    relatedIS?: string; 
    action?: { label: string; tab: ActiveTab };
    recommendations?: { isNumber: string; title: string; reason: string; similarity: string }[];
  } => {
    const qLower = query.toLowerCase();

    // Check predefined FAQs with high priority
    for (const faq of PREDEFINED_FAQS) {
      if (faq.keywords.some(k => qLower.includes(k.toLowerCase()))) {
        const matchedStd = INDIAN_STANDARDS.find(s => s.isNumber === faq.relatedIS);
        return {
          textEn: faq.answerEn,
          textHi: faq.answerHi,
          textTa: faq.answerTa,
          relatedIS: faq.relatedIS,
          action: faq.relatedIS ? { label: `View ${faq.relatedIS} Standard`, tab: 'standards' } : undefined,
          recommendations: faq.recommendations || matchedStd?.relatedStandards
        };
      }
    }

    // Check standards
    for (const std of INDIAN_STANDARDS) {
      if (
        qLower.includes(std.isNumber.toLowerCase().split(':')[0]) || 
        qLower.includes(std.title.toLowerCase()) || 
        std.applicableProducts.some(p => qLower.includes(p.toLowerCase()))
      ) {
        return {
          textEn: `Regarding ${std.isNumber} (${std.title}):\n\n` +
            `• Status: ${std.status}\n` +
            `• Scope: ${std.scope}\n` +
            `• Key Testing Parameters: ${std.keyParameters.join(', ')}\n` +
            `• Application Fee: ₹${std.applicationFee.toLocaleString('en-IN')}, Annual Marking Fee: ₹${std.annualMarkingFee.toLocaleString('en-IN')}\n` +
            `• Typical Sample Testing Duration: ${std.sampleTestingTimeDays} days across ${std.testingLabsCount} recognized labs.`,
          textHi: `${std.isNumber} (${std.hindiTitle}) के संदर्भ में:\n\n` +
            `• स्थिति: ${std.status}\n` +
            `• कार्यक्षेत्र: ${std.scope}\n` +
            `• प्रमुख परीक्षण मापदंड: ${std.keyParameters.join(', ')}\n` +
            `• आवेदन शुल्क: ₹${std.applicationFee.toLocaleString('en-IN')}, वार्षिक अंकन शुल्क: ₹${std.annualMarkingFee.toLocaleString('en-IN')}\n` +
            `• परीक्षण समय: ${std.sampleTestingTimeDays} दिन (${std.testingLabsCount} अधिकृत प्रयोगशालाएं)।`,
          textTa: `${std.isNumber} (${std.tamilTitle}) விவரங்கள்:\n\n` +
            `• நிலை: ${std.status}\n` +
            `• நோக்கம்: ${std.scope}\n` +
            `• முக்கிய சோதனை அளவுருக்கள்: ${std.keyParameters.join(', ')}\n` +
            `• விண்ணப்பக் கட்டணம்: ₹${std.applicationFee.toLocaleString('en-IN')}, ஆண்டு முத்திரைக் கட்டணம்: ₹${std.annualMarkingFee.toLocaleString('en-IN')}\n` +
            `• சோதனை காலம்: ${std.sampleTestingTimeDays} நாட்கள் (${std.testingLabsCount} ஆய்வகங்கள்).`,
          relatedIS: std.isNumber,
          action: { label: `Inspect ${std.isNumber} Details`, tab: 'standards' },
          recommendations: std.relatedStandards
        };
      }
    }

    // Fallback general guidance
    return {
      textEn: `Thank you for your question regarding Indian Standards and BIS compliance. Under the BIS Act 2016, products affecting consumer safety, health, and national infrastructure are regulated under Scheme-I (ISI Mark) or Scheme-II (CRS). You can browse our Standards Directory or verify existing CML licenses on the tabs above. Would you like to check specific testing requirements or download application forms for your industry?`,
      textHi: `भारतीय मानक और BIS अनुपालन से संबंधित आपके प्रश्न के लिए धन्यवाद। BIS अधिनियम 2016 के तहत जन-सुरक्षा, स्वास्थ्य और राष्ट्रीय बुनियादी ढांचे से जुड़े उत्पाद योजना-I (ISI मार्क) अथवा योजना-II (CRS) के अंतर्गत विनियमित हैं। आप ऊपर दिए गए टैब से संबंधित मानक विवरण या CML लाइसेंस की प्रामाणिकता जांच सकते हैं।`,
      textTa: `இந்திய தரநிலைகள் மற்றும் BIS இணக்கம் குறித்த உங்கள் கேள்விக்கு நன்றி. BIS சட்டம் 2016 இன் கீழ், நுகர்வோர் பாதுகாப்பு மற்றும் சுகாதாரத்தை பாதிக்கும் பொருட்கள் திட்டம்-I (ISI முத்திரை) அல்லது திட்டம்-II (CRS) இன் கீழ் கட்டுப்படுத்தப்படுகின்றன. மேலே உள்ள தாவல்களில் நீங்கள் தரநிலைகள் மற்றும் உரிமங்களைச் சரிபார்க்கலாம்.`,
      action: { label: 'Explore Standards Catalog', tab: 'standards' },
      recommendations: [
        { isNumber: 'IS 10500:2012', title: 'Drinking Water Specification', reason: 'Universal baseline consumer safety standard', similarity: 'Popular' },
        { isNumber: 'IS 1417:2016', title: 'Gold Hallmarking HUID', reason: 'Mandatory consumer purity scheme', similarity: 'Popular' }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      textEn: query,
      textHi: query,
      textTa: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const match = findBestResponse(query);
      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        textEn: match.textEn,
        textHi: match.textHi,
        textTa: match.textTa,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedIS: match.relatedIS,
        suggestedAction: match.action,
        recommendations: match.recommendations
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  // Voice Query Simulation
  const handleStartVoice = () => {
    setIsListening(true);
    setVoiceTranscript('');
    showToast('Voice Assistant listening... Speak now', 'info');

    // Simulate speech-to-text recognition with progressive transcript
    const sampleQueries = lang === 'ta' ? [
      'பேக்கேஜ் செய்யப்பட்ட குடிநீர் ஆலைக்கான ISI உரிமம் பெறுவது எப்படி?',
      'இருசக்கர வாகன ஹெல்மெட்டுகளுக்கு BIS ISI கட்டாயமா?',
      'தங்க ஹால்மார்க்கிங் 6 இலக்க HUID என்றால் என்ன?'
    ] : lang === 'hi' ? [
      'पैकेज्ड पेयजल के लिए ISI मार्क कैसे प्राप्त करें?',
      'क्या हेलमेट के लिए BIS सर्टिफिकेशन अनिवार्य है?',
      'स्वर्ण हॉलमार्किंग HUID कैसे काम करता है?'
    ] : [
      'How to obtain ISI mark certification for Packaged Drinking Water under IS 14543?',
      'Is BIS ISI certification mandatory for two-wheeler helmets in India?',
      'What is Gold Hallmarking with 6-digit HUID?'
    ];

    const chosenQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];

    setTimeout(() => {
      setVoiceTranscript(chosenQuery.slice(0, Math.floor(chosenQuery.length / 2)) + '...');
      setTimeout(() => {
        setVoiceTranscript(chosenQuery);
        setTimeout(() => {
          setIsListening(false);
          handleSend(chosenQuery);
          showToast('Voice query captured & processed!', 'success');
        }, 900);
      }, 1000);
    }, 800);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied answer to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        showToast('Audio paused', 'info');
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      showToast('Reading response aloud...', 'info');
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('Speech synthesis not supported in this browser', 'error');
    }
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedback({ ...feedback, [id]: type });
    showToast(type === 'up' ? 'Feedback recorded! Marked helpful.' : 'Feedback recorded! We will improve this answer.', 'success');
  };

  const getDisplayText = (msg: Message) => {
    if (lang === 'ta') return msg.textTa;
    if (lang === 'hi') return msg.textHi;
    return msg.textEn;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12 animate-slide-up">
      {/* Top Banner / Controls */}
      <div className="glass-card rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 text-white flex items-center justify-center shadow-md shadow-blue-950/20 border border-blue-700/50">
            <Bot className="w-6 h-6 text-amber-400 drop-shadow-xs" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span>
                {lang === 'hi' ? 'BIS Saara AI बुद्धिमान सहायक' : lang === 'ta' ? 'BIS சாரா AI நுண்ணறிவு உதவியாளர்' : 'BIS Saara AI Assistant'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Pretrained
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'hi' 
                ? 'भारतीय मानक, QCO आदेश और प्रमाणन प्रक्रियाओं पर सटीक मार्गदर्शन' 
                : lang === 'ta'
                ? 'இந்திய தரநிலைகள், QCO உத்தரவுகள் மற்றும் சான்றிதழ் நடைமுறைகளுக்கான வழிகாட்டி'
                : 'Instant guidance on 21,000+ Indian Standards, QCO orders & SIT parameters'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Trilingual Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => { setLang('en'); showToast('English Mode Active', 'info'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                lang === 'en' ? 'bg-blue-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { setLang('hi'); showToast('हिन्दी मोड सक्रिय', 'info'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                lang === 'hi' ? 'bg-blue-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => { setLang('ta'); showToast('தமிழ் பயன்முறை செயல்படுத்தப்பட்டது', 'info'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                lang === 'ta' ? 'bg-blue-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>

          <button
            onClick={() => {
              setMessages(initialMessages);
              showToast('Chat history reset', 'info');
            }}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-orange-50/50 rounded-2xl p-4 border border-blue-100/90 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {lang === 'hi' 
              ? 'लोकप्रिय प्रश्न (1-क्लिक में पूछें):' 
              : lang === 'ta' 
              ? 'பரிந்துரைக்கப்பட்ட கேள்விகள் (1-கிளிக்):' 
              : 'Suggested FAQs (Click to Ask):'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q.query)}
              className="text-xs bg-white hover:bg-blue-100/80 text-blue-950 font-semibold px-3 py-1.5 rounded-xl border border-blue-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer"
            >
              {lang === 'ta' ? q.labelTa : lang === 'hi' ? q.labelHi : q.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Query Listening Modal Overlay */}
      {isListening && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-slide-up">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 text-center shadow-2xl border border-slate-200 relative">
            <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center shadow-lg shadow-blue-900/40 relative z-10">
                <Mic className="w-8 h-8 text-amber-400 animate-bounce" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-950 font-serif">
              {lang === 'ta' ? 'குரல் உள்ளீட்டைக் கேட்கிறது...' : lang === 'hi' ? 'आपकी आवाज सुन रहा है...' : 'Listening to your voice...'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Speak in English, हिन्दी, or தமிழ் regarding Indian Standards
            </p>

            {/* Simulated live audio waveform */}
            <div className="flex items-center justify-center gap-1.5 my-4 h-8">
              {[40, 75, 95, 60, 85, 30, 90, 45, 80, 50].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-blue-600 rounded-full animate-pulse"
                  style={{ 
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>

            {/* Recognized transcript */}
            <div className="min-h-12 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-mono text-blue-950 font-semibold mb-4">
              {voiceTranscript || 'Detecting audio signal...'}
            </div>

            <button
              onClick={() => setIsListening(false)}
              className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Cancel Voice Query
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[540px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const displayText = getDisplayText(msg);

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm border border-blue-800">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-tr-none shadow-blue-950/20'
                      : 'bg-slate-50/90 border border-slate-200/90 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {/* Related IS badge if assistant */}
                  {!isUser && msg.relatedIS && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2.5 border border-blue-200">
                      <BookOpen className="w-3 h-3 text-blue-700" />
                      <span>{msg.relatedIS}</span>
                    </div>
                  )}

                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {displayText}
                  </div>

                  {/* Smart Recommendations: Related Standards Cards */}
                  {!isUser && msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Layers className="w-3.5 h-3.5 text-orange-600" />
                        <span>Smart Recommendations: Related Indian Standards</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.recommendations.map((rel, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveTab('standards');
                              showToast(`Navigated to inspect ${rel.isNumber}`, 'info');
                            }}
                            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition cursor-pointer flex flex-col justify-between group shadow-2xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-xs font-bold text-blue-950 group-hover:text-blue-700">
                                {rel.isNumber}
                              </span>
                              <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-md">
                                {rel.similarity}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-600 font-medium line-clamp-1">{rel.title}</span>
                            <span className="text-[10px] text-slate-400 italic line-clamp-1 mt-0.5">{rel.reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant Interactive Actions */}
                  {!isUser && msg.suggestedAction && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab(msg.suggestedAction!.tab);
                          showToast(`Navigated to ${msg.suggestedAction!.label}`, 'info');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </button>

                      <button
                        onClick={() => setActiveTab('summarizer')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 hover:bg-orange-100 text-xs font-bold transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-orange-600" />
                        <span>Summarize in PDF Tool</span>
                      </button>
                    </div>
                  )}

                  {/* Footer toolbar */}
                  <div
                    className={`mt-2.5 flex items-center justify-between text-[11px] ${
                      isUser ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-1 ml-4">
                        <button
                          onClick={() => handleSpeak(displayText, msg.id)}
                          className={`p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 cursor-pointer transition ${
                            speakingId === msg.id ? 'text-amber-600 bg-amber-100 font-bold' : ''
                          }`}
                          title="Read aloud"
                        >
                          {speakingId === msg.id ? (
                            <span className="flex items-center gap-1">
                              <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                              <span className="text-[10px]">Playing</span>
                            </span>
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(displayText, msg.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 cursor-pointer transition"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, 'up')}
                          className={`p-1.5 rounded-lg hover:bg-slate-200/80 cursor-pointer transition ${
                            feedback[msg.id] === 'up' ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-400'
                          }`}
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, 'down')}
                          className={`p-1.5 rounded-lg hover:bg-slate-200/80 cursor-pointer transition ${
                            feedback[msg.id] === 'down' ? 'text-rose-600 font-bold bg-rose-50' : 'text-slate-400'
                          }`}
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs py-2 animate-slide-up">
              <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div className="bg-slate-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2 font-bold text-slate-600 text-xs">
                  {lang === 'ta' ? 'BIS சாரா பதிலைத் தயார் செய்கிறது...' : lang === 'hi' ? 'BIS सारा उत्तर तैयार कर रहा है...' : 'BIS Saara is searching standards...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Query Button */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200/80 bg-slate-50/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2.5"
          >
            {/* Voice Query Button */}
            <button
              type="button"
              onClick={handleStartVoice}
              className="p-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 border border-amber-400/40 font-bold text-xs transition cursor-pointer shadow-2xs flex items-center gap-1.5 shrink-0"
              title="Voice Query (English, Hindi, Tamil)"
            >
              <Mic className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">Voice Query</span>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'ta'
                  ? 'உங்கள் கேள்வியை இங்கே உள்ளிடவும் (उदा. IS 14543, ஹெல்மெட் விதிகள், HUID)...'
                  : lang === 'hi'
                  ? 'अपना प्रश्न यहाँ लिखें (उदा. IS 14543 प्रमाणन, हेलमेट नियम, HUID)...'
                  : 'Ask about any IS code, QCO orders, SIT testing, or licensing...'
              }
              className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-2xs font-medium"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>{lang === 'ta' ? 'அனுப்பு' : lang === 'hi' ? 'भेजें' : 'Send'}</span>
              <Send className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </form>
          <div className="mt-2 text-center text-[11px] text-slate-400">
            Powered by Bureau of Indian Standards Knowledge Base (SIH PS: SIH26107). Trilingual English, हिन्दी & தமிழ்.
          </div>
        </div>
      </div>
    </div>
  );
};
