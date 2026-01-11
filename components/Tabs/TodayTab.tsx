
import React, { useState } from 'react';
import { DayProgress, Settings } from '../../types';

interface TodayTabProps {
  progress: DayProgress;
  updateProgress: (key: keyof DayProgress, value: any) => void;
  settings: Settings;
}

// Улучшенный компонент раскрывающегося аята по референсу
const ExpandableVerse: React.FC<{ surah: string; verse: string; arabic: string; translation: string }> = ({ surah, verse, arabic, translation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#E9F0EB]/60 rounded-[28px] p-4 mb-4 border border-primary/5 transition-all duration-300">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
            <div className="flex items-center gap-1">
              <span className="text-[14px] font-bold text-primary/80">{surah} {verse}</span>
              <span className={`material-symbols-outlined text-primary/40 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
        </div>
        <button className="text-primary/30" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
      
      {isOpen && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="arabic-text text-xl text-right font-bold text-primary/90 leading-relaxed">{arabic}</p>
          <p className="text-[13px] font-medium italic text-text-main/70 leading-relaxed text-center px-2">
            «{translation}»
          </p>
        </div>
      )}
    </div>
  );
};

const CheckboxItem: React.FC<{ 
  label: string; 
  subLabel?: string; 
  checked: boolean; 
  onToggle: () => void;
  icon?: string;
}> = ({ label, subLabel, checked, onToggle, icon }) => (
  <div className="flex items-center justify-between group py-3 cursor-pointer" onClick={onToggle}>
    <div className="flex items-center gap-4">
      <div className={`size-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${checked ? 'bg-primary border-primary' : 'border-[#EBE4E0]'}`}>
        {checked && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
      </div>
      <div>
        <p className={`text-[15px] font-bold tracking-tight transition-colors ${checked ? 'text-primary' : 'text-text-main'}`}>{label}</p>
        {subLabel && <p className="text-[11px] text-text-muted/60 leading-tight font-arabic mt-0.5">{subLabel}</p>}
      </div>
    </div>
    {icon && <span className="material-symbols-outlined text-text-muted/30 text-lg">{icon}</span>}
  </div>
);

const TodayTab: React.FC<TodayTabProps> = ({ progress, updateProgress, settings }) => {
  const [sections, setSections] = useState({
    fard: true,
    sunnah: true,
    additional: true,
    ibadat: true,
    zakat: true,
    quran: true,
    character: true,
  });

  const [expandedSelectors, setExpandedSelectors] = useState<{ surah: boolean, juz: boolean }>({ surah: false, juz: false });

  const surahs = ["Аль-Фатиха", "Аль-Бакара", "Аль-Имран", "Ан-Ниса", "Аль-Маида", "Йа Син", "Ар-Рахман", "Аль-Мульк", "Аль-Ихляс", "Аль-Фаляк", "Ан-Нас"];
  const juzs = Array.from({ length: 30 }, (_, i) => `Джуз ${i + 1}`);

  const zikrList = [
    { id: 'subhanallah', name: 'Субханаллах', ar: 'سبحان الله' },
    { id: 'alhamdulillah', name: 'Альхамдулиллях', ar: 'الحمد لله' },
    { id: 'allahuakbar', name: 'Аллаху Акбар', ar: 'الله أكبر' },
    { id: 'astaghfirullah', name: 'Астагфируллах', ar: 'أستغفر الله' },
    { id: 'salavat', name: 'Салават Пророку ﷺ', ar: 'اللهم صل على محمد' },
  ];

  const toggleSection = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleList = (id: string, listKey: keyof DayProgress) => {
    const currentList = (progress[listKey] || []) as string[];
    const updatedList = currentList.includes(id) 
      ? currentList.filter(item => item !== id) 
      : [...currentList, id];
    updateProgress(listKey, updatedList);
  };

  return (
    <div className="px-6 pb-40 pt-6 space-y-6 bg-primary-bg min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-white shadow-soft text-primary border border-border-light">
          <span className="material-symbols-outlined text-2xl">account_circle</span>
        </div>
        <div className="text-center">
            <h2 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Nur</h2>
            <p className="text-sm font-extrabold text-text-main mt-0.5">{progress.displayDate} • {progress.hijriDate}</p>
        </div>
        <div className="flex size-11 items-center justify-center text-text-muted bg-white rounded-2xl border border-border-light shadow-soft">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </div>
      </header>

      {/* 1. Пятикратный намаз */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft overflow-hidden">
        <button onClick={() => toggleSection('fard')} className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined fill-active text-xl">star</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Пятикратный намаз</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.fard ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.fard && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <ExpandableVerse 
              surah="Та-Ха" verse="20:14" 
              arabic="إِنَّنِي أَنَا اللَّهُ لَا إِلَهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي"
              translation="Воистину, Я — Аллах! Нет божества, кроме Меня. Поклоняйся же Мне и совершай намаз, чтобы помнить обо Мне."
            />
            
            <div className="space-y-1">
              {[
                { id: 'fajr', name: 'Фаджр', ar: 'الفجر' },
                { id: 'dhuhr', name: 'Зухр', ar: 'الظهر' },
                { id: 'asr', name: 'Аср', ar: 'العصر' },
                { id: 'maghrib', name: 'Магриб', ar: 'المغرب' },
                { id: 'isha', name: 'Иша', ar: 'العشاء' },
              ].map(p => (
                <CheckboxItem 
                  key={p.id} label={p.name} subLabel={p.ar} 
                  checked={progress.completedPrayers.includes(p.id)} 
                  onToggle={() => toggleList(p.id, 'completedPrayers')} 
                />
              ))}
              
              <div className="h-px bg-border-light w-full my-4" />
              
              <CheckboxItem 
                label="Витр" subLabel="الوتر — особо важный ночной намаз" 
                checked={progress.witrCompleted} 
                onToggle={() => updateProgress('witrCompleted', !progress.witrCompleted)} 
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Сунна-намазы */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft overflow-hidden">
        <button onClick={() => toggleSection('sunnah')} className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-accent-gold/10 flex items-center justify-center text-accent-gold">
              <span className="material-symbols-outlined fill-active text-xl">star_outline</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Сунна-намазы</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.sunnah ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.sunnah && (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
            {[
              { id: 's_fajr_b', name: 'Сунна Фаджра (до)' },
              { id: 's_zuhr_b', name: 'Сунна Зухра (до)' },
              { id: 's_zuhr_a', name: 'Сунна Зухра (после)' },
              { id: 's_maghrib_a', name: 'Сунна Магриба (после)' },
              { id: 's_isha_a', name: 'Сунна Иша (после)' },
            ].map(p => (
              <CheckboxItem 
                key={p.id} label={p.name}
                checked={progress.completedSunnah.includes(p.id)} 
                onToggle={() => toggleList(p.id, 'completedSunnah')} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. Дополнительные намазы */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft overflow-hidden">
        <button onClick={() => toggleSection('additional')} className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined fill-active text-xl">auto_awesome</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Дополнительные намазы</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.additional ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.additional && (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
            <p className="text-[12px] italic text-text-muted/60 mb-4 px-1 leading-relaxed">
              Дополнительный намаз, выполненный добровольно ради Аллаха
            </p>
            {[
              { id: 'duha', name: 'Духа', ar: 'صلاة الضحى' },
              { id: 'tahajjud', name: 'Тахаджуд', ar: 'صلاة التهجد' },
              { id: 'ishraq', name: 'Ишрак', ar: 'صلاة الإшراق' },
              { id: 'avvabin', name: 'Аввабин', ar: 'صلاة الأوابين' },
              { id: 'other', name: 'Другой' },
            ].map(p => (
              <CheckboxItem 
                key={p.id} label={p.name} subLabel={p.ar}
                checked={progress.completedAdditional.includes(p.id)} 
                onToggle={() => toggleList(p.id, 'completedAdditional')} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. Ибадаты (Зикр) */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft overflow-hidden">
        <button onClick={() => toggleSection('ibadat')} className="w-full flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-accent-rose/10 flex items-center justify-center text-accent-rose">
              <span className="material-symbols-outlined fill-active text-xl">self_improvement</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Ибадаты и Зикр</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.ibadat ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.ibadat && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
             <div className="relative flex flex-col items-center">
                <div className="relative size-64 flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border border-primary/5"></div>
                   <div className="absolute inset-6 rounded-full border border-accent-rose/10 shadow-soft"></div>
                   <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-[-90deg]">
                      {[...Array(33)].map((_, i) => {
                          const angle = (i * 360) / 33;
                          const x = 50 + 44 * Math.cos((angle * Math.PI) / 180);
                          const y = 50 + 44 * Math.sin((angle * Math.PI) / 180);
                          const isActive = i < (progress.tasbihCount % 33) || (progress.tasbihCount !== 0 && progress.tasbihCount % 33 === 0);
                          return (
                              <circle 
                                  key={i} cx={x} cy={y} r="1.8" 
                                  fill={isActive ? '#96A388' : '#EBE4E0'} 
                                  className="transition-all duration-300"
                              />
                          );
                      })}
                   </svg>
                   <button 
                      onClick={() => {
                        let nextCount = progress.tasbihCount + 1;
                        if (nextCount > progress.tasbihTarget) {
                          updateProgress('tasbihCycles', progress.tasbihCycles + 1);
                          updateProgress('tasbihCount', 1);
                        } else {
                          updateProgress('tasbihCount', nextCount);
                        }
                      }}
                      className="size-44 rounded-full bg-white flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(150,163,136,0.1)] active:scale-95 transition-all border border-border-light z-10"
                   >
                      <span className="text-5xl font-black text-primary tracking-tighter">{progress.tasbihCount}</span>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">НАЖАТЬ</p>
                   </button>
                </div>
                <div className="flex justify-between w-full mt-6 px-4">
                   <div className="text-center">
                      <p className="text-lg font-black text-primary">{progress.tasbihCycles}</p>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Циклов</p>
                   </div>
                   <button 
                      onClick={() => { updateProgress('tasbihCount', 0); updateProgress('tasbihCycles', 0); }}
                      className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
                   >
                      <span className="material-symbols-outlined text-xl">refresh</span>
                   </button>
                </div>
             </div>

             <div className="space-y-1 pt-4 border-t border-border-light/40">
               <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 ml-1 opacity-50">Список зикров</p>
               {zikrList.map(z => (
                 <CheckboxItem 
                   key={z.id} label={z.name} subLabel={z.ar}
                   checked={progress.completedPractices.includes(z.id)} 
                   onToggle={() => toggleList(z.id, 'completedPractices')} 
                 />
               ))}
               <div className="h-4"></div>
               {[
                 { id: 'dua', name: 'Дуа', ar: 'الدعاء', icon: 'info' },
                 { id: 'morning_azkar', name: 'Утренние азкары', ar: 'أذكار الصباح' },
                 { id: 'evening_azkar', name: 'Вечерние азкары', ar: 'أذكار المساء' },
               ].map(p => (
                 <CheckboxItem 
                   key={p.id} label={p.name} subLabel={p.ar} icon={p.icon}
                   checked={progress.completedPractices.includes(p.id)} 
                   onToggle={() => toggleList(p.id, 'completedPractices')} 
                 />
               ))}
             </div>
          </div>
        )}
      </div>

      {/* 5. Закат и садака */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft transition-all duration-500">
          <h3 className="text-base font-black text-text-main mb-4">Закат и садака</h3>
          <textarea 
            value={progress.sadaqaNotes}
            onChange={(e) => updateProgress('sadaqaNotes', e.target.value)}
            placeholder="Опиши свою садака сегодня..."
            className="w-full bg-primary-bg/40 rounded-[28px] border-none focus:ring-2 focus:ring-primary/10 p-5 text-sm h-28 resize-none placeholder:text-text-muted/40 font-medium italic"
          />
      </div>

      {/* 6. Благие дела */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft transition-all duration-500">
          <h3 className="text-base font-black text-text-main mb-4">Благие дела</h3>
          <ExpandableVerse 
            surah="Аль-Бакара" verse="2:195" 
            arabic="وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ"
            translation="Творите добро, ведь Аллах любит добродетельных"
          />
          <textarea 
            value={progress.goodDeedsNotes}
            onChange={(e) => updateProgress('goodDeedsNotes', e.target.value)}
            placeholder="Какие благие дела ты совершила сегодня?"
            className="w-full bg-primary-bg/40 rounded-[28px] border-none focus:ring-2 focus:ring-primary/10 p-5 text-sm h-28 resize-none placeholder:text-text-muted/40 font-medium italic"
          />
      </div>

      {/* 7. Коран */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft overflow-hidden">
        <button onClick={() => toggleSection('quran')} className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined fill-active text-xl">menu_book</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Коран</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.quran ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.quran && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
            <CheckboxItem 
              label="Чтение Корана на арабском" subLabel="تلاوة القرآن"
              checked={progress.completedQuran.includes('q_arabic')} 
              onToggle={() => toggleList('q_arabic', 'completedQuran')} 
            />
            
            <div className="space-y-6 pl-11">
               <div className="space-y-2">
                  <p className="text-[11px] font-bold text-text-muted/50 uppercase tracking-widest">СУРА</p>
                  <div 
                    onClick={() => setExpandedSelectors(prev => ({ ...prev, surah: !prev.surah }))}
                    className="bg-primary-bg/40 rounded-2xl p-4 flex items-center justify-between border border-border-light cursor-pointer active:scale-95 transition-all"
                  >
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-primary/40 text-lg">menu_book</span>
                         <span className="text-sm font-bold text-text-main">{progress.selectedSurah}</span>
                      </div>
                      <span className="material-symbols-outlined text-text-muted/30">expand_more</span>
                  </div>
                  {expandedSelectors.surah && (
                    <div className="mt-2 grid grid-cols-1 gap-1 max-h-48 overflow-y-auto bg-white border border-border-light rounded-2xl p-2 scrollbar-hide animate-in fade-in zoom-in-95 z-20">
                      {surahs.map(s => (
                        <div 
                          key={s} 
                          onClick={() => { updateProgress('selectedSurah', s); setExpandedSelectors(prev => ({ ...prev, surah: false })); }}
                          className={`p-3 rounded-xl text-sm font-bold cursor-pointer transition-colors ${progress.selectedSurah === s ? 'bg-primary text-white' : 'hover:bg-primary/5 text-text-main'}`}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               <div className="space-y-2">
                  <p className="text-[11px] font-bold text-text-muted/50 uppercase tracking-widest">ДЖУЗ</p>
                  <div 
                    onClick={() => setExpandedSelectors(prev => ({ ...prev, juz: !prev.juz }))}
                    className="bg-primary-bg/40 rounded-2xl p-4 flex items-center justify-between border border-border-light cursor-pointer active:scale-95 transition-all"
                  >
                      <span className="text-sm font-bold text-text-main">{progress.selectedJuz}</span>
                      <span className="material-symbols-outlined text-text-muted/30">expand_more</span>
                  </div>
                  {expandedSelectors.juz && (
                    <div className="mt-2 grid grid-cols-1 gap-1 max-h-48 overflow-y-auto bg-white border border-border-light rounded-2xl p-2 scrollbar-hide animate-in fade-in zoom-in-95 z-20">
                      {juzs.map(j => (
                        <div 
                          key={j} 
                          onClick={() => { updateProgress('selectedJuz', j); setExpandedSelectors(prev => ({ ...prev, juz: false })); }}
                          className={`p-3 rounded-xl text-sm font-bold cursor-pointer transition-colors ${progress.selectedJuz === j ? 'bg-primary text-white' : 'hover:bg-primary/5 text-text-main'}`}
                        >
                          {j}
                        </div>
                      ))}
                    </div>
                  )}
               </div>
            </div>

            <CheckboxItem 
              label="Повтор пройденных джузов" subLabel="مراجعة الأجزاء"
              checked={progress.completedQuran.includes('q_revision')} 
              onToggle={() => toggleList('q_revision', 'completedQuran')} 
            />

            <div className="space-y-3 pl-11">
              <p className="w-full text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40">Отметить повторенное:</p>
              <div className="flex flex-wrap gap-3">
                {["Аль-Мульк", "Йа Син", "Ар-Рахман"].map(s => (
                  <div key={s} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleList(s, 'repeatedSurahs')}>
                     <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${progress.repeatedSurahs.includes(s) ? 'bg-primary border-primary' : 'border-border-light'}`}>
                        {progress.repeatedSurahs.includes(s) && <span className="material-symbols-outlined text-white text-[10px]">check</span>}
                     </div>
                     <span className={`text-[12px] font-bold ${progress.repeatedSurahs.includes(s) ? 'text-primary' : 'text-text-muted'}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {[28, 29, 30].map(j => (
                  <div key={j} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleList(`Джуз ${j}`, 'repeatedJuzs')}>
                     <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${progress.repeatedJuzs.includes(`Джуз ${j}`) ? 'bg-primary border-primary' : 'border-border-light'}`}>
                        {progress.repeatedJuzs.includes(`Джуз ${j}`) && <span className="material-symbols-outlined text-white text-[10px]">check</span>}
                     </div>
                     <span className={`text-[12px] font-bold ${progress.repeatedJuzs.includes(`Джуз ${j}`) ? 'text-primary' : 'text-text-muted'}`}>Джуз {j}</span>
                  </div>
                ))}
              </div>
            </div>

            <CheckboxItem 
              label="Чтение перевода Корана" subLabel="قراءة ترجمة القرآن"
              checked={progress.completedQuran.includes('q_translation')} 
              onToggle={() => toggleList('q_translation', 'completedQuran')} 
            />
          </div>
        )}
      </div>

      {/* 8. Характер и душа */}
      <div className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft transition-all duration-500 overflow-hidden">
        <button onClick={() => toggleSection('character')} className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-[18px] bg-accent-rose/10 flex items-center justify-center text-accent-rose">
              <span className="material-symbols-outlined fill-active text-xl">favorite</span>
            </div>
            <h3 className="text-lg font-black text-text-main tracking-tight">Характер и душа</h3>
          </div>
          <span className={`material-symbols-outlined text-text-muted/40 transition-transform ${sections.character ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {sections.character && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
            <ExpandableVerse 
              surah="Ат-Талак" verse="65:2" 
              arabic="وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
              translation="Тому, кто боится Аллаха, Он создает выход из положения"
            />
            
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[15px] font-bold text-text-main">Стабильность нервного состояния</p>
                        <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1 rounded-full">Отлично</span>
                    </div>
                    <input type="range" min="0" max="100" value={progress.mood} onChange={(e) => updateProgress('mood', parseInt(e.target.value))} className="ios-slider" />
                    <div className="flex justify-between text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40">
                        <span>Спокойно</span>
                        <span>Напряжённо</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[15px] font-bold text-text-main">Уровень горделивости</p>
                        <span className="bg-accent-rose/10 text-accent-rose text-[10px] font-black uppercase px-3 py-1 rounded-full">Нормально</span>
                    </div>
                    <input type="range" min="0" max="100" value={progress.prideLevel} onChange={(e) => updateProgress('prideLevel', parseInt(e.target.value))} className="ios-slider" />
                    <div className="flex justify-between text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40">
                        <span>Скромность</span>
                        <span>Гордыня</span>
                    </div>
                </div>

                <div className="pt-2">
                    <CheckboxItem 
                        label="Послушание родителям" subLabel="بر الوالدين"
                        checked={progress.completedPractices.includes('parents')} 
                        onToggle={() => toggleList('parents', 'completedPractices')} 
                    />
                </div>
            </div>

            <div className="space-y-4 border-t border-border-light/40 pt-8">
                <div className="flex items-center gap-2 mb-2">
                   <h3 className="text-[15px] font-black text-text-main">За что ты благодарна сегодня, сестра?</h3>
                   <span className="material-symbols-outlined text-accent-rose text-[18px]">favorite</span>
                </div>
                <ExpandableVerse 
                  surah="Лукман" verse="31:12" 
                  arabic="أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ"
                  translation="Будь благодарен Аллаху! Кто благодарен, тот благодарен во благо себе"
                />
                <textarea 
                    value={progress.gratitude}
                    onChange={(e) => updateProgress('gratitude', e.target.value)}
                    placeholder="Напиши здесь свою благодарность Аллаху..."
                    className="w-full bg-primary-bg/40 rounded-[28px] border-none focus:ring-2 focus:ring-primary/10 p-5 text-sm h-32 resize-none placeholder:text-text-muted/40 font-medium italic"
                />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 px-2 pt-10 pb-10">
        <button className="w-full bg-primary text-white py-5 rounded-[32px] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(150,163,136,0.3)] active:scale-95 transition-all duration-300">
            🌙 Завершить день
        </button>
        <p className="text-center opacity-40 italic text-[11px] font-bold uppercase tracking-[0.2em]">
            «Твои старания ценны у Господа»
        </p>
      </div>
    </div>
  );
};

export default TodayTab;
