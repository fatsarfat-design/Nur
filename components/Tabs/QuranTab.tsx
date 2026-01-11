
import React, { useState, useMemo, useEffect } from 'react';

interface Surah {
  id: number;
  name: string;
  englishName: string;
  ayats: number;
  arabicName: string;
}

interface Juz {
  id: number;
  name: string;
  range: string;
}

interface Ayat {
  id: number;
  verse_key: string;
  text_arabic: string;
  text_translation: string;
}

type TranslationLang = 'ru_kuliev' | 'en_sahih' | 'tr_diyanet';

const translationIds: Record<TranslationLang, number> = {
  ru_kuliev: 45, 
  en_sahih: 20,   
  tr_diyanet: 77  
};

const QuranTab: React.FC = () => {
  const [view, setView] = useState<'main' | 'reader'>('main');
  const [activeTab, setActiveTab] = useState<'juz' | 'surah' | 'bookmarks'>('surah');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentReading, setCurrentReading] = useState<{ id: number; type: 'surah' | 'juz' | 'verse'; title: string; subtitle: string; specificVerse?: string } | null>(null);
  const [translationLang, setTranslationLang] = useState<TranslationLang>('ru_kuliev');
  const [readerDarkMode, setReaderDarkMode] = useState(false);
  const [ayats, setAyats] = useState<Ayat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const surahs: Surah[] = useMemo(() => [
    { id: 1, name: 'Аль-Фатиха', englishName: 'Открывающая', ayats: 7, arabicName: 'الفاتحة' },
    { id: 2, name: 'Аль-Бакара', englishName: 'Корова', ayats: 286, arabicName: 'البقرة' },
    { id: 3, name: 'Аль-Имран', englishName: 'Семейство Имрана', ayats: 200, arabicName: 'آл عمران' },
    { id: 4, name: 'Ан-Ниса', englishName: 'Женщины', ayats: 176, arabicName: 'النساء' },
    { id: 5, name: 'Аль-Маида', englishName: 'Трапеза', ayats: 120, arabicName: 'المائدة' },
    { id: 6, name: 'Аль-Анам', englishName: 'Скот', ayats: 165, arabicName: 'الأنعام' },
    { id: 7, name: 'Аль-Араф', englishName: 'Преграды', ayats: 206, arabicName: 'الأعراف' },
    { id: 8, name: 'Аль-Анфаль', englishName: 'Трофеи', ayats: 75, arabicName: 'الأنفال' },
    { id: 9, name: 'Ат-Тауба', englishName: 'Покаяние', ayats: 129, arabicName: 'التوبة' },
    { id: 10, name: 'Юнус', englishName: 'Юнус', ayats: 109, arabicName: 'يونس' },
    { id: 11, name: 'Худ', englishName: 'Худ', ayats: 123, arabicName: 'هود' },
    { id: 12, name: 'Юсуф', englishName: 'Юсуф', ayats: 111, arabicName: 'يوسف' },
    { id: 13, name: 'Ар-Рад', englishName: 'Гром', ayats: 43, arabicName: 'الرعد' },
    { id: 14, name: 'Ибрахим', englishName: 'Ибрахим', ayats: 52, arabicName: 'إبراهيم' },
    { id: 15, name: 'Аль-Хиджр', englishName: 'Хиджр', ayats: 99, arabicName: 'الحجر' },
    { id: 16, name: 'Ан-Нахль', englishName: 'Пчелы', ayats: 128, arabicName: 'النحل' },
    { id: 17, name: 'Аль-Исра', englishName: 'Ночной перенос', ayats: 111, arabicName: 'الإсраء' },
    { id: 18, name: 'Аль-Кахф', englishName: 'Пещера', ayats: 110, arabicName: 'الكهф' },
    { id: 19, name: 'Марьям', englishName: 'Марьям', ayats: 98, arabicName: 'مريم' },
    { id: 20, name: 'Та Ха', englishName: 'Та Ха', ayats: 135, arabicName: 'طه' },
    { id: 36, name: 'Йа Син', englishName: 'Йа Син', ayats: 83, arabicName: 'يس' },
    { id: 55, name: 'Ар-Рахман', englishName: 'Милостивый', ayats: 78, arabicName: 'الرحمن' },
    { id: 67, name: 'Аль-Мульк', englishName: 'Власть', ayats: 30, arabicName: 'الملк' },
    { id: 112, name: 'Аль-Ихляс', englishName: 'Очищение веры', ayats: 4, arabicName: 'الإخلاص' },
    { id: 113, name: 'Аль-Фаляк', englishName: 'Рассвет', ayats: 5, arabicName: 'الفلق' },
    { id: 114, name: 'Ан-Нас', englishName: 'Люди', ayats: 6, arabicName: 'الناس' },
  ], []);

  const juzs: Juz[] = useMemo(() => [
    { id: 30, name: 'Джуз 30', range: 'Ан-Наба (78:1) — Ан-Нас (114:6)' },
    { id: 29, name: 'Джуз 29', range: 'Аль-Мульк (67:1) — Аль-Мурсалят (77:50)' },
    { id: 1, name: 'Джуз 1', range: 'Аль-Фатиха (1:1) — Аль-Бакара (2:141)' },
  ], []);

  const fetchData = async () => {
    if (!currentReading) return;
    setLoading(true);
    try {
      const tid = translationIds[translationLang];
      let url = currentReading.type === 'surah' 
        ? `https://api.quran.com/api/v4/verses/by_chapter/${currentReading.id}?language=ru&words=false&translations=${tid}&fields=text_uthmani&per_page=300`
        : `https://api.quran.com/api/v4/verses/by_juz/${currentReading.id}?language=ru&words=false&translations=${tid}&fields=text_uthmani&per_page=300`;

      const res = await fetch(url);
      const data = await res.json();
      const formatted = data.verses.map((v: any) => ({
        id: v.id,
        verse_key: v.verse_key,
        text_arabic: v.text_uthmani,
        text_translation: (v.translations?.find((t: any) => t.resource_id === tid) || v.translations?.[0])?.text.replace(/<sup[^>]*>.*?<\/sup>/g, '') || ''
      }));
      setAyats(formatted);
    } catch (err) { setError("Ошибка загрузки"); } finally { setLoading(false); }
  };

  useEffect(() => { if (view === 'reader') fetchData(); }, [currentReading, translationLang, view]);

  const openReader = (id: number, type: 'surah' | 'juz' | 'verse', title: string, subtitle: string) => {
    setCurrentReading({ id, type, title, subtitle });
    setView('reader');
    window.scrollTo(0,0);
  };

  if (view === 'reader') {
    return (
      <div className={`min-h-screen pb-40 transition-colors duration-500 relative ${readerDarkMode ? 'bg-[#121212] text-white' : 'bg-primary-bg text-text-main'}`}>
        <header className={`sticky top-0 z-[100] p-5 flex items-center justify-between backdrop-blur-xl border-b transition-colors duration-500 ${readerDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-border-light'}`}>
          <button onClick={() => setView('main')} className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary active:scale-90">
             <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="text-center flex-1 mx-4">
             <h3 className="text-base font-black tracking-tight leading-tight truncate">{currentReading?.title}</h3>
             <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{currentReading?.subtitle}</p>
          </div>
          <button onClick={() => setIsSettingsOpen(true)} className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary active:scale-90">
             <span className="material-symbols-outlined">tune</span>
          </button>
        </header>

        {isSettingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center animate-in fade-in duration-300">
             {/* Оверлей без избыточного размытия для четкости */}
             <div className="absolute inset-0 bg-black/60" onClick={() => setIsSettingsOpen(false)}></div>
             <div className={`w-full max-w-lg rounded-t-[48px] p-8 space-y-8 animate-in slide-in-from-bottom-10 duration-500 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] ${readerDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                   <h4 className={`text-xl font-black tracking-tight ${readerDarkMode ? 'text-white' : 'text-text-main'}`}>Настройки чтения</h4>
                   <button onClick={() => setIsSettingsOpen(false)} className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary active:scale-90">
                      <span className="material-symbols-outlined">close</span>
                   </button>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between bg-primary-bg/50 p-4 rounded-3xl border border-border-light/40">
                      <div className="flex items-center gap-4">
                         <div className="size-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary"><span className="material-symbols-outlined">translate</span></div>
                         <span className={`text-[15px] font-bold ${readerDarkMode ? 'text-white' : 'text-text-main'}`}>Отображать перевод</span>
                      </div>
                      <label className="switch scale-90">
                        <input type="checkbox" checked={showTranslation} onChange={() => setShowTranslation(!showTranslation)} />
                        <span className="slider"></span>
                      </label>
                   </div>

                   <div className="flex items-center justify-between bg-primary-bg/50 p-4 rounded-3xl border border-border-light/40">
                      <div className="flex items-center gap-4">
                         <div className="size-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary"><span className="material-symbols-outlined">dark_mode</span></div>
                         <span className={`text-[15px] font-bold ${readerDarkMode ? 'text-white' : 'text-text-main'}`}>Ночной режим</span>
                      </div>
                      <label className="switch scale-90">
                        <input type="checkbox" checked={readerDarkMode} onChange={() => setReaderDarkMode(!readerDarkMode)} />
                        <span className="slider"></span>
                      </label>
                   </div>

                   <div className="space-y-4 px-2">
                      <div className="flex justify-between items-center">
                         <span className="text-[11px] font-black uppercase text-text-muted tracking-[0.2em]">Размер шрифта</span>
                         <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{fontSize}px</span>
                      </div>
                      <input type="range" min="12" max="32" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="ios-slider" />
                   </div>

                   <div className="space-y-4 px-2">
                      <div className="flex justify-between">
                         <span className="text-[11px] font-black uppercase text-text-muted tracking-[0.2em]">Язык перевода</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {(['ru_kuliev', 'en_sahih', 'tr_diyanet'] as TranslationLang[]).map((lang) => (
                          <button 
                            key={lang} 
                            onClick={() => setTranslationLang(lang)}
                            className={`py-4 rounded-[24px] text-[11px] font-black uppercase tracking-widest border-2 transition-all shadow-sm ${translationLang === lang ? 'bg-primary border-primary text-white shadow-soft scale-[1.05]' : 'bg-primary-bg/50 border-border-light text-text-muted opacity-80'}`}
                          >
                            {lang === 'ru_kuliev' ? 'RU' : lang === 'en_sahih' ? 'EN' : 'TR'}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        <main className="max-w-lg mx-auto p-6 space-y-12">
          {loading ? (
             <div className="py-40 flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Бисмиллях...</p>
             </div>
          ) : (
            ayats.map((ayat, i) => (
              <div key={ayat.id} className={`space-y-6 pt-10 ${i !== 0 ? 'border-t border-border-light/40' : ''}`}>
                 <div className="flex justify-between items-center opacity-30">
                    <span className="text-[10px] font-black uppercase tracking-widest">Аят {ayat.verse_key}</span>
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                 </div>
                 <p className="arabic-text text-right font-bold transition-all duration-300" style={{ fontSize: `${fontSize * 1.8}px`, lineHeight: lineHeight * 1.5 }}>{ayat.text_arabic}</p>
                 {showTranslation && (
                    <p className={`font-medium italic leading-relaxed text-center px-2 transition-all duration-300 ${readerDarkMode ? 'text-white/80' : 'text-text-main/70'}`} style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ __html: ayat.text_translation }}></p>
                 )}
              </div>
            ))
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="pb-40 pt-6 min-h-screen bg-primary-bg">
      <header className="px-6 mb-10">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-black text-text-main tracking-tight">Коран</h1>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1">Священное писание</p>
            </div>
            <div className="size-11 rounded-2xl bg-white border border-border-light flex items-center justify-center text-primary shadow-soft">
                <span className="material-symbols-outlined text-2xl fill-active">menu_book</span>
            </div>
        </div>

        <div className="relative mb-8">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40">search</span>
            <input 
              type="text" 
              placeholder="Поиск суры или аята..."
              className="w-full bg-white border border-border-light rounded-[32px] py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none shadow-soft transition-all"
            />
        </div>

        <div className="flex bg-[#E9E4E0] p-1.5 rounded-[32px]">
          {['juz', 'surah', 'bookmarks'].map(t => (
            <button 
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`flex-1 py-3 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-primary shadow-soft' : 'text-text-muted opacity-60'}`}
            >
                {t === 'juz' ? 'Джузы' : t === 'surah' ? 'Суры' : 'Закладки'}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6">
        <div className="space-y-4 animate-in fade-in duration-500">
           {activeTab === 'surah' && surahs.map(s => (
             <div key={s.id} onClick={() => openReader(s.id, 'surah', s.name, s.englishName)} className="bg-white p-5 rounded-[32px] border border-border-light flex items-center justify-between group active:scale-[0.98] transition-all shadow-soft">
                <div className="flex items-center gap-5">
                    <div className="size-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm group-hover:scale-110 transition-transform">
                        {s.id}
                    </div>
                    <div>
                        <h4 className="font-black text-text-main text-base">{s.name}</h4>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">{s.englishName} • {s.ayats}</p>
                    </div>
                </div>
                <span className="arabic-text text-2xl text-primary/40 group-hover:text-primary transition-colors">{s.arabicName}</span>
             </div>
           ))}
           {activeTab === 'juz' && juzs.map(j => (
             <div key={j.id} onClick={() => openReader(j.id, 'juz', j.name, j.range)} className="bg-white p-6 rounded-[40px] border border-border-light flex items-center justify-between group active:scale-[0.98] transition-all shadow-soft">
                <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-black text-text-main">{j.name}</h4>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{j.range}</p>
                </div>
                <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined">auto_stories</span>
                </div>
             </div>
           ))}
           {activeTab === 'bookmarks' && (
              <div className="py-20 text-center bg-white rounded-[40px] border border-border-light shadow-soft p-10">
                 <span className="material-symbols-outlined text-6xl text-primary/10 mb-6">bookmark_heart</span>
                 <p className="text-sm font-medium italic text-text-main/60 leading-relaxed">
                   «Сестра, здесь будут храниться аяты, которые коснулись твоего сердца. Нажми на иконку закладки при чтении.»
                 </p>
              </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default QuranTab;
