/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, UserRole, Language } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { DashboardTab } from './components/DashboardTab.tsx';
import { AIAssistantTab } from './components/AIAssistantTab.tsx';
import { StandardsSearchTab } from './components/StandardsSearchTab.tsx';
import { CertificationGuideTab } from './components/CertificationGuideTab.tsx';
import { VerifyISITab } from './components/VerifyISITab.tsx';
import { AnalyticsTab } from './components/AnalyticsTab.tsx';
import { PDFSummarizerTab } from './components/PDFSummarizerTab.tsx';
import { ShieldCheck, Phone, Mail, ExternalLink, Award } from 'lucide-react';
import { ToastProvider } from './context/ToastContext.tsx';

function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('manufacturer');
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Top Tricolor Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" /> {/* Saffron */}
        <div className="flex-1 bg-white" />    {/* White */}
        <div className="flex-1 bg-[#138808]" /> {/* India Green */}
      </div>

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 transition-all duration-300">
        {activeTab === 'dashboard' && (
          <DashboardTab
            setActiveTab={setActiveTab}
            userRole={userRole}
            lang={lang}
          />
        )}

        {activeTab === 'assistant' && (
          <AIAssistantTab
            setActiveTab={setActiveTab}
            lang={lang}
            setLang={setLang}
          />
        )}

        {activeTab === 'summarizer' && (
          <PDFSummarizerTab
            setActiveTab={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsSearchTab
            setActiveTab={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 'certification' && (
          <CertificationGuideTab
            setActiveTab={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 'verify' && (
          <VerifyISITab
            setActiveTab={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-1 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>BIS Saara Portal</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-mono">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>SIH26107 | Smart Automation</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">
                Quick Navigation
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition cursor-pointer">
                    Dashboard Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('assistant')} className="hover:text-white transition cursor-pointer">
                    BIS Saara AI Chatbot
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('standards')} className="hover:text-white transition cursor-pointer">
                    Indian Standards Directory (IS)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('certification')} className="hover:text-white transition cursor-pointer">
                    Certification Roadmap & Fees
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('verify')} className="hover:text-white transition cursor-pointer">
                    Verify ISI Mark & HUID
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">
                Official Portals & References
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://www.services.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>BIS Manakonline Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Department of Consumer Affairs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.sih.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Smart India Hackathon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://e-gazette.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>The Gazette of India (QCOs)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">
                Helpline & Grievance
              </h4>
              <p className="text-xs text-slate-400 mb-2">
                Toll-free National Consumer Helpline:
              </p>
              <div className="flex items-center gap-2 text-white font-mono font-bold mb-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>1800-11-0800 / 1915</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>info@bis.gov.in</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-3">
                Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              © 2026 Bureau of Indian Standards (BIS). Smart India Hackathon Prototype.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational (Manakonline Mirror)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
