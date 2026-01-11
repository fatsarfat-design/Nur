
import React, { useState, useEffect, useRef } from 'react';
import { Settings } from '../../types';

interface NamazTabProps {
  settings: Settings;
  onToggleHaid: () => void;
  onUpdateSettings: (s: Partial<Settings>) => void;
}

const NamazTab: React.FC<NamazTabProps> = ({ settings, onToggleHaid, onUpdateSettings }) => {
  const [subTab, setSubTab] = useState<'schedule' | 'qibla'>('schedule');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = [
    { name: 'Фаджр', time: '05:12', icon: 'wb_twilight', type: 'dawn' },
    { name: 'Шурук', time: '06:45', icon: 'wb_sunny', type: 'sunrise' },
    { name: 'Зухр', time: '12:30', icon: 'sunny', type: 'midday' },
    { name: 'Аср', time: '15:45', icon: 'cloud', type: 'afternoon', current: true },
    { name: 'Магриб', time: '18:20', icon: 'bedtime', type: 'sunset' },
    { name: 'Иша', time: '19:50', icon: 'dark_mode', type: 'night' },
  ];

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        onUpdateSettings({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: 'Текущее местоположение'
        });
      }, (error) => {
        console.error("Geolocation error:", error);
        alert("Разрешите доступ к геопозиции в настройках браузера.");
      });
    }
  };

  return (
    <div className="pb-40 min-h-screen bg-primary-bg pt-6">
      <header className="px-6 mb-8 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-text-main tracking-tight">Намаз</h2>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mt-1">{new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(currentTime)}</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setIsSearching(!isSearching)} className={`size-11 rounded-2xl flex items-center justify-center transition-all shadow-soft border ${isSearching ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-border-light'}`}>
              <span className="material-symbols-outlined text-xl">{isSearching ? 'close' : 'search'}</span>
           </button>
        </div>
      </header>

      {isSearching && (
        <div className="px-6 mb-8 animate-in slide-in-from-top-4 duration-300">
           <form onSubmit={(e) => { e.preventDefault(); if(searchQuery.trim()){ onUpdateSettings({city: searchQuery}); setIsSearching(false); } }} className="relative">
             <input 
               autoFocus
               type="text" 
               placeholder="Город..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border border-border-light rounded-[28px] py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none shadow-soft"
             />
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40">public</span>
           </form>
           <button onClick={detectLocation} className="mt-4 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] px-5 py-2.5 bg-primary/5 rounded-full border border-primary/10">
             <span className="material-symbols-outlined text-base">my_location</span>
             Геопозиция
           </button>
        </div>
      )}

      <div className="px-6">
        <div className="flex bg-[#E9E4E0] p-1.5 rounded-[32px] mb-10">
          <button 
            onClick={() => setSubTab('schedule')}
            className={`flex-1 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${subTab === 'schedule' ? 'bg-white text-primary shadow-soft' : 'text-text-muted opacity-60'}`}
          >
            Расписание
          </button>
          <button 
            onClick={() => setSubTab('qibla')}
            className={`flex-1 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${subTab === 'qibla' ? 'bg-white text-primary shadow-soft' : 'text-text-muted opacity-60'}`}
          >
            Кибла
          </button>
        </div>

        {subTab === 'schedule' ? (
          <div className="animate-in fade-in duration-500">
            {/* Hero Card */}
            <div className="relative w-full h-80 rounded-[48px] overflow-hidden mb-10 shadow-soft group transition-transform active:scale-[0.99]">
              <img src={settings.mosqueImage} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Mosque" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">СЛЕДУЮЩИЙ НАМАЗ</p>
                  <h3 className="text-5xl font-black tracking-tight mb-6">Магриб</h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">через 01:24:15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer List */}
            <div className="space-y-4">
              {prayerTimes.map((p, i) => (
                <div key={i} className={`flex items-center justify-between p-6 rounded-[32px] border transition-all duration-300 ${p.current ? 'bg-primary/5 border-primary shadow-soft scale-[1.02]' : 'bg-white border-border-light'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`size-11 rounded-2xl flex items-center justify-center transition-colors ${p.current ? 'bg-primary text-white shadow-soft' : 'bg-primary-bg text-text-muted'}`}>
                       <span className="material-symbols-outlined text-xl">{p.icon}</span>
                    </div>
                    <div>
                      <p className={`text-base font-black ${p.current ? 'text-primary' : 'text-text-main'}`}>{p.name}</p>
                      {p.current && <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-0.5">сейчас</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`font-mono font-black text-xl tracking-tight ${p.current ? 'text-primary' : 'text-text-main'}`}>{p.time}</span>
                    <span className={`material-symbols-outlined text-xl ${p.current ? 'text-primary' : 'text-text-muted/30'}`}>
                      {p.current ? 'notifications_active' : 'notifications'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-10 animate-in zoom-in duration-700">
            <div className="bg-accent-gold/5 p-5 rounded-[32px] flex gap-4 items-center mb-16 border border-accent-gold/10 max-w-[340px]">
              <span className="material-symbols-outlined text-accent-gold animate-bounce">vibration</span>
              <p className="text-[11px] text-accent-gold font-black leading-relaxed uppercase tracking-tighter text-center">
                Держи телефон горизонтально, чтобы стрелка указала на Каабу
              </p>
            </div>
            
            <div className="relative size-80 flex items-center justify-center mb-16 group">
              <div className="absolute inset-0 rounded-full border-2 border-primary/5"></div>
              <div className="absolute inset-8 rounded-full border border-primary/5"></div>
              <div className="absolute inset-16 rounded-full border border-primary/5 shadow-inner"></div>
              
              <div className="relative w-full h-full flex items-center justify-center rotate-[65deg] transition-transform duration-1000">
                <div className="absolute top-0 w-16 h-16 bg-accent-gold rounded-3xl shadow-rose flex items-center justify-center text-white -translate-y-8 ring-8 ring-white">
                  <span className="material-symbols-outlined text-3xl fill-active">mosque</span>
                </div>
                <div className="w-1 h-[70%] bg-gradient-to-t from-transparent via-accent-gold to-accent-gold rounded-full opacity-60"></div>
              </div>

              <div className="absolute top-4 text-[12px] font-black text-text-muted/40">N</div>
              <div className="absolute bottom-4 text-[12px] font-black text-text-muted/40">S</div>
            </div>

            <div className="text-center bg-white rounded-[40px] p-10 border border-border-light shadow-soft w-full">
               <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-3">Локация</p>
               <h3 className="text-2xl font-black text-text-main mb-8 flex items-center justify-center gap-3">
                 <span className="material-symbols-outlined text-primary">location_on</span>
                 {settings.city}
               </h3>
               
               <div className="h-px bg-border-light w-24 mx-auto mb-8"></div>
               
               <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Дистанция до Каабы</p>
               <p className="text-4xl font-black text-text-main tracking-tighter">3,820 <span className="text-sm font-bold text-text-muted uppercase tracking-widest ml-1">км</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NamazTab;
