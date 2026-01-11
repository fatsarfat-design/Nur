
import React, { useState, useMemo } from 'react';
import { AppHistory, DayProgress } from '../../types';

interface JourneyTabProps {
  history: AppHistory;
}

// Праздники и значимые даты (2024-2026)
const ISLAMIC_EVENTS = [
  // 2024
  { name: 'Рамадан 2024', start: '2024-03-11', end: '2024-04-09', type: 'ramadan' },
  { name: 'Ураза-Байрам', date: '2024-04-10', type: 'holiday' },
  { name: 'День Арафа', date: '2024-06-15', type: 'holiday' },
  { name: 'Курбан-Байрам', date: '2024-06-16', type: 'holiday' },
  { name: 'День Ашура', date: '2024-07-16', type: 'holiday' },
  { name: 'Мавлид', date: '2024-09-15', type: 'holiday' },
  // 2025
  { name: 'Рамадан 2025', start: '2025-03-01', end: '2025-03-29', type: 'ramadan' },
  { name: 'Ураза-Байрам', date: '2025-03-30', type: 'holiday' },
  { name: 'День Арафа', date: '2025-06-05', type: 'holiday' },
  { name: 'Курбан-Байрам', date: '2025-06-06', type: 'holiday' },
  { name: 'День Ашура', date: '2025-07-05', type: 'holiday' },
  { name: 'Мавлид', date: '2025-09-04', type: 'holiday' },
  // 2026
  { name: 'Рамадан 2026', start: '2026-02-18', end: '2026-03-19', type: 'ramadan' },
  { name: 'Ураза-Байрам', date: '2026-03-20', type: 'holiday' },
  { name: 'День Арафа', date: '2026-05-26', type: 'holiday' },
  { name: 'Курбан-Байрам', date: '2026-05-27', type: 'holiday' },
  { name: 'День Ашура', date: '2026-06-25', type: 'holiday' },
  { name: 'Мавлид', date: '2026-08-25', type: 'holiday' },
];

const FastingInfo: React.FC<{ type: 'ramadan' | 'sunnah'; eventName?: string }> = ({ type, eventName }) => (
  <div className="bg-[#F2F7F2] rounded-[32px] p-6 border border-primary/10 shadow-soft space-y-5 mb-6 animate-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-3 text-primary">
       <span className="material-symbols-outlined fill-active">nights_stay</span>
       <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">{eventName || (type === 'ramadan' ? 'Священный Рамадан' : 'Сунна-пост (Пн/Чт)')}</h4>
    </div>
    
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">Предписания:</p>
        <p className="text-[13px] text-text-main font-medium leading-relaxed italic">
          {type === 'ramadan' 
            ? 'Обязательный пост. Время духовного очищения, усиленного поклонения и щедрости.' 
            : 'Добровольный пост, следуя Сунне Пророка ﷺ. Очищение души и укрепление воли.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <p className="text-[9px] font-black text-[#5DB45B] uppercase tracking-widest">Не нарушает:</p>
          <ul className="text-[11px] text-text-muted space-y-1 font-medium italic">
            <li>• Глотание слюны</li>
            <li>• Чистка зубов</li>
            <li>• Душ / Купание</li>
            <li>• Случайная еда</li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-[9px] font-black text-accent-rose uppercase tracking-widest">Нарушает:</p>
          <ul className="text-[11px] text-text-muted space-y-1 font-medium italic">
            <li>• Еда / Питье</li>
            <li>• Курение</li>
            <li>• Рвота намеренно</li>
            <li>• Близость (днем)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const AnxietyAdvice: React.FC = () => (
  <div className="bg-[#FFF8F8] rounded-[32px] p-6 border border-accent-rose/20 shadow-soft space-y-4 mb-6 animate-in zoom-in-95 duration-500">
    <div className="flex items-center gap-3 text-accent-rose">
       <span className="material-symbols-outlined fill-active text-xl">spa</span>
       <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Сестра, твоё сердце не на месте?</h4>
    </div>
    <p className="text-[13px] text-text-main/70 italic leading-relaxed font-medium">
      «Разве не в поминании Аллаха находят утешение сердца?» (13:28). Попробуй это прямо сейчас:
    </p>
    <div className="grid grid-cols-2 gap-2 pt-1">
       <div className="bg-white px-3 py-3 rounded-2xl border border-border-light flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[18px]">water_drop</span>
          <span className="text-[10px] font-bold">Омовение</span>
       </div>
       <div className="bg-white px-3 py-3 rounded-2xl border border-border-light flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[18px]">front_hand</span>
          <span className="text-[10px] font-bold">2 ракаата</span>
       </div>
       <div className="bg-white px-3 py-3 rounded-2xl border border-border-light flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
          <span className="text-[10px] font-bold">Зикр</span>
       </div>
       <div className="bg-white px-3 py-3 rounded-2xl border border-border-light flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
          <span className="text-[10px] font-bold">Чтение Корана</span>
       </div>
    </div>
  </div>
);

const JourneyTab: React.FC<JourneyTabProps> = ({ history }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    for (let i = 0; i < offset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const date = new Date(year, month, i);
      const isRamadan = ISLAMIC_EVENTS.some(e => e.type === 'ramadan' && e.start && e.end && dateKey >= e.start && dateKey <= e.end);
      const holiday = ISLAMIC_EVENTS.find(e => e.type === 'holiday' && e.date === dateKey);

      days.push({
        day: i,
        key: dateKey,
        isRamadan,
        holidayName: holiday?.name,
        dayOfWeek: date.getDay()
      });
    }
    return days;
  }, [currentMonth]);

  const selectedData: DayProgress = history[selectedDateKey] || {
    date: selectedDateKey,
    displayDate: new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(selectedDateKey)),
    hijriDate: new Intl.DateTimeFormat('ru-RU-u-ca-islamic-uma', { day: 'numeric', month: 'long' }).format(new Date(selectedDateKey)),
    mood: 20,
    prideLevel: 10,
    tasbihCount: 0,
    tasbihTarget: 33,
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
    soulState: 'Спокойно и радостно',
    charityNotes: '',
    duaNotes: '',
    sadaqaNotes: '',
    goodDeedsNotes: '',
    selectedSurah: '',
    selectedJuz: ''
  };

  // Порог тревожности
  const isHighAnxiety = selectedData.mood > 70;
  
  // Проверка на пост
  const fastingStatus = useMemo(() => {
    const date = new Date(selectedDateKey);
    const dayOfWeek = date.getDay(); // 1 = Mon, 4 = Thu
    const ramadanEvent = ISLAMIC_EVENTS.find(e => e.type === 'ramadan' && e.start && e.end && selectedDateKey >= e.start && selectedDateKey <= e.end);
    const isSunnah = dayOfWeek === 1 || dayOfWeek === 4;
    return {
      isFasting: !!ramadanEvent || isSunnah,
      type: !!ramadanEvent ? 'ramadan' : 'sunnah',
      eventName: ramadanEvent?.name
    };
  }, [selectedDateKey]);

  const totalZikr = (selectedData.tasbihCount + (selectedData.tasbihCycles * 33));

  return (
    <div className="pb-40 pt-6 bg-primary-bg min-h-screen">
      <header className="px-6 mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">Путь</h1>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1">Твоя духовная история</p>
        </div>
        <div className="size-11 rounded-2xl bg-white border border-border-light flex items-center justify-center text-primary shadow-soft">
            <span className="material-symbols-outlined text-xl">history</span>
        </div>
      </header>

      {/* Календарь */}
      <section className="px-5 mb-8">
        <div className="bg-white rounded-[40px] p-6 border border-border-light shadow-soft">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="font-black text-sm text-text-main uppercase tracking-[0.2em]">{new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(currentMonth)}</h2>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="size-8 rounded-xl bg-primary-bg flex items-center justify-center text-primary border border-border-light active:scale-90 transition-all">
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="size-8 rounded-xl bg-primary-bg flex items-center justify-center text-primary border border-border-light active:scale-90 transition-all">
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center text-[8px] font-black text-text-muted/40 uppercase mb-3">
            <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-1.5">
            {calendarDays.map((dayObj, i) => {
              if (!dayObj) return <div key={`spacer-${i}`} className="h-8" />;
              const isSelected = selectedDateKey === dayObj.key;
              const hasData = !!history[dayObj.key];
              const isFastDay = dayObj.isRamadan || dayObj.dayOfWeek === 1 || dayObj.dayOfWeek === 4;
              
              return (
                <button 
                  key={dayObj.key} 
                  onClick={() => setSelectedDateKey(dayObj.key)}
                  className={`h-8 flex flex-col items-center justify-center rounded-[12px] transition-all relative 
                    ${isSelected ? 'bg-primary text-white shadow-soft scale-105 z-10 font-bold' : 'text-text-main font-medium'}
                    ${isFastDay && !isSelected ? 'bg-primary/5' : ''}
                    ${dayObj.holidayName && !isSelected ? 'bg-accent-gold/10' : ''}`}
                >
                  <span className="text-[12px]">{dayObj.day}</span>
                  {(hasData || dayObj.holidayName) && !isSelected && (
                    <div className={`size-1 rounded-full absolute bottom-1 ${dayObj.holidayName ? 'bg-accent-gold' : 'bg-accent-rose'}`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="px-6 space-y-4 animate-in fade-in duration-500">
        {/* Состояние души - Точно по дизайну */}
        <div className="bg-[#EDF6ED] rounded-[32px] p-6 border border-primary/5 flex items-center gap-5 shadow-sm">
          <div className="size-12 rounded-full bg-white flex items-center justify-center text-[#5DB45B] shadow-sm">
            <span className="material-symbols-outlined fill-active text-2xl">help_center</span>
          </div>
          <div>
            <p className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest mb-1">СОСТОЯНИЕ ДУШИ</p>
            <p className="text-lg font-black text-text-main leading-tight tracking-tight">{selectedData.soulState || 'Спокойно и радостно'}</p>
          </div>
        </div>

        {/* Информационные блоки: Пост и Тревога */}
        {isHighAnxiety && <AnxietyAdvice />}
        {fastingStatus.isFasting && <FastingInfo type={fastingStatus.type as any} eventName={fastingStatus.eventName} />}

        {/* Статистика дня */}
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-[28px] p-5 border border-border-light shadow-soft text-center flex flex-col gap-1.5">
                <p className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">ФАРД</p>
                <p className="text-[#5DB45B] text-2xl font-black">{selectedData.completedPrayers.length}/5</p>
            </div>
            <div className="bg-white rounded-[28px] p-5 border border-border-light shadow-soft text-center flex flex-col gap-1.5 items-center">
                <p className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">ВИТР</p>
                <div className={`size-8 rounded-full flex items-center justify-center transition-all ${selectedData.witrCompleted ? 'bg-[#5DB45B] text-white shadow-soft' : 'bg-primary/5 text-text-muted/20'}`}>
                    <span className="material-symbols-outlined text-[16px] font-black">check</span>
                </div>
            </div>
            <div className="bg-white rounded-[28px] p-5 border border-border-light shadow-soft text-center flex flex-col gap-1.5">
                <p className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">ЗИКР</p>
                <p className="text-text-main text-2xl font-black">
                    {totalZikr >= 300 ? '300+' : totalZikr}
                </p>
            </div>
        </div>

        {/* Намерение дня */}
        <div className="bg-white rounded-[32px] p-7 border border-border-light shadow-soft space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#5DB45B] text-lg fill-active">auto_awesome</span>
            <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">НАМЕРЕНИЕ ДНЯ</span>
          </div>
          <p className="text-[14px] italic leading-relaxed text-text-main font-medium border-l-2 border-primary/5 pl-5">
            «{selectedData.niyyah || 'Начать день с Бисмиллях и проявлять особую мягкость и терпение к детям и близким сегодня.'}»
          </p>
        </div>

        {/* Благодарность */}
        <div className="bg-white rounded-[32px] p-7 border border-border-light shadow-soft space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#5DB45B] text-lg fill-active">favorite</span>
            <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest">БЛАГОДАРНОСТЬ</span>
          </div>
          <p className="text-[14px] italic leading-relaxed text-text-main font-medium border-l-2 border-accent-rose/10 pl-5">
            «{selectedData.gratitude || 'Благодарна Аллаху за теплый ифтар в кругу семьи и возможность прочесть Коран в тишине.'}»
          </p>
        </div>

        {/* Финальное благословение */}
        <div className="py-14 flex flex-col items-center gap-6 text-center">
           <div className="size-16 rounded-full bg-[#F0F7ED] flex items-center justify-center text-[#5DB45B] shadow-inner">
             <span className="material-symbols-outlined text-3xl fill-active">eco</span>
           </div>
           <div className="space-y-2">
             <p className="text-base font-black text-text-main tracking-tight px-8 leading-snug">
               «Пусть Аллах примет твои старания, Сестра.»
             </p>
             <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] opacity-50">Твой духовный рост ценен</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default JourneyTab;
