
import React, { useState, useEffect } from 'react';
import { Tab, Settings, DayProgress, AppHistory } from './types';
import TodayTab from './components/Tabs/TodayTab';
import JourneyTab from './components/Tabs/JourneyTab';
import NamazTab from './components/Tabs/NamazTab';
import QuranTab from './components/Tabs/QuranTab';
import SettingsTab from './components/Tabs/SettingsTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Today);
  const [settings, setSettings] = useState<Settings>({
    haidMode: false,
    city: 'Москва, Россия',
    latitude: 55.7558,
    longitude: 37.6173,
    showNiyyah: true,
    quietDay: false,
    notifications: true,
    mosqueImage: 'https://images.unsplash.com/photo-1542365887-11499f1ddee5?q=80&w=2070&auto=format&fit=crop',
    font: 'manrope',
    textSize: 'standard',
    appBackground: 'default',
    nightMode: false,
    beadType: 'dark_wood',
    zikrSound: 'soft_click',
    zikrVibration: true,
    zikrDefaultCount: 33,
  });

  const getTodayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [history, setHistory] = useState<AppHistory>({
    [getTodayKey()]: {
      date: getTodayKey(),
      displayDate: new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date()),
      hijriDate: new Intl.DateTimeFormat('ru-RU-u-ca-islamic-uma', { day: 'numeric', month: 'long' }).format(new Date()),
      mood: 20,
      prideLevel: 10,
      tasbihCount: 0,
      tasbihTarget: settings.zikrDefaultCount,
      tasbihCycles: 0,
      completedPrayers: ['fajr'],
      completedSunnah: [],
      completedAdditional: [],
      completedPractices: [],
      completedQuran: [],
      repeatedSurahs: [],
      repeatedJuzs: [],
      witrCompleted: false,
      gratitude: '',
      niyyah: 'Начать день с Бисмиллях и быть терпимой.',
      soulState: 'Спокойно и радостно',
      charityNotes: '',
      duaNotes: '',
      sadaqaNotes: '',
      goodDeedsNotes: '',
      selectedSurah: 'Аль-Фатиха',
      selectedJuz: 'Джуз 1'
    }
  });

  const updateProgress = (key: keyof DayProgress, value: any, dateKey?: string) => {
    const targetDate = dateKey || getTodayKey();
    setHistory(prev => {
      const existing = prev[targetDate] || {
        date: targetDate,
        displayDate: new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(targetDate)),
        hijriDate: new Intl.DateTimeFormat('ru-RU-u-ca-islamic-uma', { day: 'numeric', month: 'long' }).format(new Date(targetDate)),
        mood: 50,
        prideLevel: 50,
        tasbihCount: 0,
        tasbihTarget: settings.zikrDefaultCount,
        tasbihCycles: 0,
        completedPrayers: [],
        completedSunnah: [],
        completedAdditional: [],
        completedPractices: [],
        completedQuran: [],
        repeatedSurahs: [],
        repeatedJuzs: [],
        witrCompleted: false,
        gratitude: '',
        niyyah: '',
        soulState: 'Не заполнено',
        charityNotes: '',
        duaNotes: '',
        sadaqaNotes: '',
        goodDeedsNotes: '',
        selectedSurah: 'Аль-Фатиха',
        selectedJuz: 'Джуз 1'
      };
      return {
        ...prev,
        [targetDate]: { ...existing, [key]: value }
      };
    });
  };

  const getAppStyle = () => {
    let classes = settings.nightMode ? 'dark bg-[#121212] text-white' : 'bg-primary-bg text-text-main';
    const fontClass = settings.font === 'serif' ? 'font-serif' : settings.font === 'elegant' ? 'font-display' : 'font-sans';
    const sizeClass = settings.textSize === 'small' ? 'text-xs' : settings.textSize === 'large' ? 'text-lg' : 'text-base';
    
    // Применение фона
    const bgMap: Record<string, string> = {
      default: 'bg-primary-bg',
      sand: 'bg-[#FDF5E6]',
      mint: 'bg-[#F0F7F0]',
      rose: 'bg-[#FDF2F2]',
      sky: 'bg-[#F0F5FD]',
      beige: 'bg-[#F5F1EB]'
    };
    
    const bgColor = settings.nightMode ? 'bg-[#121212]' : bgMap[settings.appBackground] || 'bg-primary-bg';
    
    return `${fontClass} ${sizeClass} ${bgColor} min-h-screen transition-colors duration-500`;
  };

  const renderTab = () => {
    switch (activeTab) {
      case Tab.Today:
        return <TodayTab progress={history[getTodayKey()]} updateProgress={(k, v) => updateProgress(k, v)} settings={settings} />;
      case Tab.Journey:
        return <JourneyTab history={history} />;
      case Tab.Namaz:
        return <NamazTab settings={settings} onToggleHaid={() => setSettings({...settings, haidMode: !settings.haidMode})} onUpdateSettings={(s) => setSettings({...settings, ...s})} />;
      case Tab.Quran:
        return <QuranTab />;
      case Tab.Settings:
        return <SettingsTab settings={settings} setSettings={setSettings} />;
      default:
        return <TodayTab progress={history[getTodayKey()]} updateProgress={(k, v) => updateProgress(k, v)} settings={settings} />;
    }
  };

  return (
    <div className={`relative flex h-full min-h-screen w-full max-w-[430px] mx-auto flex-col overflow-x-hidden shadow-[0_0_100px_rgba(0,0,0,0.05)] ${getAppStyle()}`}>
      <div className="flex-1 overflow-y-auto pb-32">
        {renderTab()}
      </div>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] glass-nav rounded-[48px] flex items-center justify-around py-3 px-2 z-[100] border border-white/40 shadow-[0_20px_50px_rgba(150,163,136,0.15)]">
        <button onClick={() => setActiveTab(Tab.Today)} className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === Tab.Today ? 'text-primary' : 'text-text-muted opacity-40 hover:opacity-70'}`}>
          <span className={`material-symbols-outlined text-[28px] ${activeTab === Tab.Today ? 'fill-active' : ''}`}>auto_awesome</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest">Nur</span>
        </button>
        <button onClick={() => setActiveTab(Tab.Journey)} className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === Tab.Journey ? 'text-primary' : 'text-text-muted opacity-40 hover:opacity-70'}`}>
          <span className={`material-symbols-outlined text-[28px] ${activeTab === Tab.Journey ? 'fill-active' : ''}`}>calendar_today</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest">Путь</span>
        </button>
        <button onClick={() => setActiveTab(Tab.Quran)} className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === Tab.Quran ? 'text-primary' : 'text-text-muted opacity-40 hover:opacity-70'}`}>
          <span className={`material-symbols-outlined text-[28px] ${activeTab === Tab.Quran ? 'fill-active' : ''}`}>menu_book</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest">Коран</span>
        </button>
        <button onClick={() => setActiveTab(Tab.Namaz)} className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === Tab.Namaz ? 'text-primary' : 'text-text-muted opacity-40 hover:opacity-70'}`}>
          <span className={`material-symbols-outlined text-[28px] ${activeTab === Tab.Namaz ? 'fill-active' : ''}`}>wb_twilight</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest">Намаз</span>
        </button>
        <button onClick={() => setActiveTab(Tab.Settings)} className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === Tab.Settings ? 'text-primary' : 'text-text-muted opacity-40 hover:opacity-70'}`}>
          <span className={`material-symbols-outlined text-[28px] ${activeTab === Tab.Settings ? 'fill-active' : ''}`}>settings</span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest">Опции</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
