import React from 'react';
import { Pill, ShieldAlert, Volume2, User, Stethoscope, Eye, Sparkles, ShoppingBag } from 'lucide-react';
import { LanguageCode } from '../types/medication';

interface HeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  viewMode: 'patient' | 'doctor';
  onViewModeChange: (mode: 'patient' | 'doctor') => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onFontSizeChange: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  onHighContrastToggle: () => void;
  hasInteractions: boolean;
  severeCount: number;
  onOpenPharmacy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  viewMode,
  onViewModeChange,
  fontSize,
  onFontSizeChange,
  highContrast,
  onHighContrastToggle,
  hasInteractions,
  severeCount,
  onOpenPharmacy,
}) => {
  return (
    <header className="border-b border-teal-900/10 bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white shadow-md">
      {/* Top Banner & Accessibility Bar */}
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-teal-100">
          <ShieldAlert className="h-4 w-4 text-amber-300" />
          <span className="font-medium">Geriatric & Polypharmacy Drug Safety Network</span>
          <span className="hidden md:inline text-teal-200/60">·</span>
          <span className="hidden md:inline text-teal-200/90">Multilingual Voice Cautions & Clinical Decision Support</span>
        </div>

        {/* Accessibility controls */}
        <div className="flex items-center gap-3">
          {/* Font size toggle for seniors */}
          <div className="flex items-center gap-1 bg-teal-900/40 rounded-lg p-0.5 border border-white/10">
            <span className="px-1.5 text-teal-200 font-medium">Text:</span>
            <button
              onClick={() => onFontSizeChange('normal')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                fontSize === 'normal' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
              title="Normal text size"
            >
              A
            </button>
            <button
              onClick={() => onFontSizeChange('large')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                fontSize === 'large' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
              title="Large text size (+20%)"
            >
              A+
            </button>
            <button
              onClick={() => onFontSizeChange('xlarge')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                fontSize === 'xlarge' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
              title="Extra large text size (+40%)"
            >
              A++
            </button>
          </div>

          {/* High contrast toggle */}
          <button
            onClick={onHighContrastToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-xs'
                : 'bg-teal-900/40 text-teal-100 border-white/10 hover:bg-teal-900/60'
            }`}
            title="Toggle high contrast mode for improved readability"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>High Contrast</span>
          </button>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-sm border border-white/15 shadow-inner">
              <Pill className="h-7 w-7 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  MediSafe
                </h1>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-950/60 text-teal-200 border border-teal-400/20 font-mono">
                  v2.6 Rx
                </span>
                {severeCount > 0 && (
                  <span className="animate-pulse flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/90 text-white text-xs font-semibold shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    {severeCount} Critical Conflict{severeCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-teal-100/90 font-medium">
                Drug-Drug & Drug-Food Interaction Checker for Polypharmacy Patients
              </p>
            </div>
          </div>

          {/* Controls: Language & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-teal-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15">
              <span className="text-xs text-teal-200 flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5 text-teal-300" />
                Language:
              </span>
              <select
                id="languageSelect"
                aria-label="Language"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-medium text-white focus:outline-hidden cursor-pointer"
              >
                <option value="english" className="text-slate-900">English (US/UK)</option>
                <option value="hindi" className="text-slate-900">हिंदी (Hindi)</option>
                <option value="tamil" className="text-slate-900">தமிழ் (Tamil)</option>
                <option value="telugu" className="text-slate-900">తెలుగు (Telugu)</option>
                <option value="bengali" className="text-slate-900">বাংলা (Bengali)</option>
                <option value="spanish" className="text-slate-900">Español (Spanish)</option>
              </select>
            </div>

            {/* View Mode Segmented Switcher */}
            <div className="flex items-center p-1 bg-teal-950/60 rounded-xl border border-white/15 shadow-inner">
              <button
                onClick={() => onViewModeChange('patient')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'patient'
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-teal-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Patient View</span>
              </button>
              <button
                onClick={() => onViewModeChange('doctor')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'doctor'
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-teal-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Doctor View</span>
              </button>
            </div>

            {/* Pharmacy Quick Button */}
            {onOpenPharmacy && (
              <button
                onClick={onOpenPharmacy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Order Prescribed Medicines Online"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-slate-900" />
                <span>Buy Meds Online</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
