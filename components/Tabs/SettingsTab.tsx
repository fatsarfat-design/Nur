
import React, { useState } from 'react';
import { Settings } from '../../types';

interface SettingsTabProps {
  settings: Settings;
  setSettings: (s: Settings) => void;
}

type SubPage = 'main' | 'appearance' | 'zikr' | 'handbook' | 'wudu' | 'haid' | 'ghusl' | 'namaz_info';

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, setSettings }) => {
  const [activeSubPage, setActiveSubPage] = useState<SubPage>('main');

  const BackButton = ({ to = 'main' as SubPage }) => (
    <button onClick={() => setActiveSubPage(to)} className="size-11 rounded-2xl bg-white border border-border-light flex items-center justify-center text-text-main shadow-soft active:scale-90 transition-all">
      <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
    </button>
  );

  const SettingRow = ({ label, sub, icon, onClick }: { label: string, sub: string, icon: string, onClick: () => void }) => (
    <div onClick={onClick} className="bg-white rounded-[32px] p-6 border border-border-light shadow-soft flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="size-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <div>
          <p className="text-base font-black text-text-main leading-tight">{label}</p>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1.5 opacity-80">{sub}</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-text-muted/40">chevron_right</span>
    </div>
  );

  const renderMain = () => (
    <div className="animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-black text-text-main tracking-tight">Опции</h2>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mt-1">Личные настройки</p>
        </div>
        <div className="size-11 rounded-2xl bg-white border border-border-light flex items-center justify-center text-primary shadow-soft">
          <span className="material-symbols-outlined">tune</span>
        </div>
      </header>

      <div className="space-y-4">
        <SettingRow label="Внешний вид" sub="Шрифты, цвета, ночной режим" icon="palette" onClick={() => setActiveSubPage('appearance')} />
        <SettingRow label="Зикр и ощущения" sub="Вид бусин, звук, вибрация" icon="vibration" onClick={() => setActiveSubPage('zikr')} />
        <SettingRow label="Справочник" sub="Вуду, Хайд, Гусль, Намаз" icon="import_contacts" onClick={() => setActiveSubPage('handbook')} />
        
        <div className="pt-6 space-y-4">
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] ml-3">ОСНОВНОЕ</h3>
          <div className="bg-white rounded-[32px] p-6 border border-border-light shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="size-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary"><span className="material-symbols-outlined">location_on</span></div>
               <div><p className="text-base font-black text-text-main">{settings.city}</p><p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Город</p></div>
            </div>
            <span className="material-symbols-outlined text-text-muted/40 text-sm">edit</span>
          </div>
          <div className="bg-white rounded-[32px] p-6 border border-border-light shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="size-11 rounded-2xl bg-accent-rose/5 flex items-center justify-center text-accent-rose"><span className="material-symbols-outlined">spa</span></div>
               <div><p className="text-base font-black text-text-main">Режим Хайд</p><p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Бережное отношение</p></div>
            </div>
            <label className="switch scale-90">
              <input type="checkbox" checked={settings.haidMode} onChange={() => setSettings({...settings, haidMode: !settings.haidMode})} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="animate-in slide-in-from-right-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton />
        <h2 className="text-xl font-black text-text-main">Внешний вид</h2>
      </header>

      <div className="space-y-10">
        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">ШРИФТ ИНТЕРФЕЙСА</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'manrope', name: 'Manrope', style: 'font-sans' },
              { id: 'serif', name: 'Serif', style: 'font-serif' },
              { id: 'elegant', name: 'Elegant', style: 'font-display' },
            ].map(f => (
              <button 
                key={f.id} onClick={() => setSettings({...settings, font: f.id as any})}
                className={`p-4 rounded-[28px] border-2 flex flex-col items-center gap-2 transition-all ${settings.font === f.id ? 'border-primary bg-white shadow-soft scale-[1.05]' : 'border-border-light opacity-60'}`}
              >
                <span className={`text-2xl ${f.style}`}>Aa</span>
                <span className="text-[11px] font-bold">{f.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">РАЗМЕР ТЕКСТА</h3>
          <div className="bg-[#F5F1EB] p-1.5 rounded-[32px] flex">
            {['Мелкий', 'Стандарт', 'Крупный'].map((s, i) => {
               const val = i === 0 ? 'small' : i === 1 ? 'standard' : 'large';
               return (
                <button 
                  key={val} onClick={() => setSettings({...settings, textSize: val as any})}
                  className={`flex-1 py-3.5 rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all ${settings.textSize === val ? 'bg-white text-primary shadow-sm' : 'text-text-muted opacity-60'}`}
                >
                  {s}
                </button>
               );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">ФОН ПРИЛОЖЕНИЯ</h3>
          <div className="bg-white rounded-[40px] p-6 border border-border-light shadow-soft space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {['default', 'sand', 'mint', 'rose', 'sky', 'beige'].map(bg => (
                <button 
                  key={bg} onClick={() => setSettings({...settings, appBackground: bg as any})}
                  className={`size-12 rounded-full border-2 transition-all shadow-sm ${settings.appBackground === bg ? 'border-primary ring-4 ring-primary/5' : 'border-white'}`}
                  style={{ backgroundColor: bg === 'default' ? '#FDF8F5' : bg === 'sand' ? '#FDF5E6' : bg === 'mint' ? '#F0F7F0' : bg === 'rose' ? '#FDF2F2' : bg === 'sky' ? '#F0F5FD' : '#F5F1EB' }}
                />
              ))}
              <div className="size-12 rounded-full border-2 border-white bg-primary-bg flex items-center justify-center text-text-muted opacity-40"><span className="material-symbols-outlined">palette</span></div>
            </div>
            <button className="w-full py-5 rounded-[32px] bg-primary/5 border border-primary/10 flex items-center justify-center gap-3 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-primary">add_a_photo</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-text-main">Загрузить фото</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary-bg flex items-center justify-center text-text-muted"><span className="material-symbols-outlined">dark_mode</span></div>
              <div><p className="text-base font-black text-text-main">Ночной режим</p><p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Комфортно для глаз</p></div>
           </div>
           <label className="switch scale-90">
             <input type="checkbox" checked={settings.nightMode} onChange={() => setSettings({...settings, nightMode: !settings.nightMode})} />
             <span className="slider"></span>
           </label>
        </section>
      </div>
    </div>
  );

  const renderZikrSettings = () => (
    <div className="animate-in slide-in-from-right-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton />
        <h2 className="text-xl font-black text-text-main">Зикр и ощущения</h2>
      </header>

      <div className="space-y-10">
        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">ВИД БУСИН</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'dark_wood', name: 'Тёмное дерево', sub: 'Круглые', color: '#4A3728' },
              { id: 'light_wood', name: 'Светлое дерево', sub: 'Овал', color: '#D2B48C' },
              { id: 'stone', name: 'Матовый камень', sub: 'Круглые', color: '#A9A9A9' },
              { id: 'ivory', name: 'Слоновая кость', sub: 'Овал', color: '#FFFFF0' },
            ].map(b => (
              <button 
                key={b.id} onClick={() => setSettings({...settings, beadType: b.id as any})}
                className={`p-6 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${settings.beadType === b.id ? 'border-primary bg-white shadow-soft scale-[1.03]' : 'border-border-light opacity-70'}`}
              >
                <div className={`size-12 rounded-full shadow-inner border border-black/5`} style={{ backgroundColor: b.color }}></div>
                <div className="text-center">
                  <p className="text-sm font-black text-text-main leading-tight">{b.name}</p>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1.5 opacity-80">{b.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">ЗВУК</h3>
          <div className="bg-white rounded-[40px] border border-border-light shadow-soft divide-y divide-border-light/40">
             {[
               { id: 'off', name: 'Выкл' },
               { id: 'soft_click', name: 'Мягкий клик', sub: 'Едва слышный шелест дерева' },
               { id: 'neutral_touch', name: 'Нейтральное касание' },
             ].map(s => (
               <div key={s.id} onClick={() => setSettings({...settings, zikrSound: s.id as any})} className="p-6 flex items-center justify-between cursor-pointer active:bg-primary-bg/50 transition-colors">
                  <div>
                    <p className="text-base font-black text-text-main">{s.name}</p>
                    {s.sub && <p className="text-[11px] text-text-muted italic opacity-70">{s.sub}</p>}
                  </div>
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center ${settings.zikrSound === s.id ? 'border-primary bg-primary/5' : 'border-border-light'}`}>
                    {settings.zikrSound === s.id && <div className="size-3 rounded-full bg-primary"></div>}
                  </div>
               </div>
             ))}
          </div>
        </section>

        <section className="bg-white rounded-[40px] p-7 border border-border-light shadow-soft flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary-bg flex items-center justify-center text-text-muted"><span className="material-symbols-outlined">vibration</span></div>
              <div><p className="text-base font-black text-text-main">Мягкий отклик</p><p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Тактильное подтверждение</p></div>
           </div>
           <label className="switch scale-90">
             <input type="checkbox" checked={settings.zikrVibration} onChange={() => setSettings({...settings, zikrVibration: !settings.zikrVibration})} />
             <span className="slider"></span>
           </label>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">КОЛИЧЕСТВО ПО УМОЛЧАНИЮ</h3>
          <div className="bg-[#F5F1EB] p-1.5 rounded-[32px] flex">
            {[33, 99, 'Своё'].map((c, i) => (
               <button 
                key={i} onClick={() => typeof c === 'number' && setSettings({...settings, zikrDefaultCount: c})}
                className={`flex-1 py-3.5 rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all ${settings.zikrDefaultCount === c ? 'bg-white text-primary shadow-sm' : 'text-text-muted opacity-60'}`}
               >
                 {c}
               </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderHandbook = () => (
    <div className="animate-in slide-in-from-right-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton />
        <h2 className="text-xl font-black text-text-main">Справочник</h2>
      </header>
      
      <p className="text-3xl font-serif italic text-primary/60 text-center px-10 mb-12 leading-relaxed">Мир в каждом движении</p>

      <div className="space-y-4">
        <SettingRow label="Что такое намаз" sub="Твоя ежедневная связь с Создателем" icon="favorite" onClick={() => setActiveSubPage('namaz_info')} />
        <SettingRow label="Обязательные намазы" sub="Пять встреч, разделяющих твой день" icon="schedule" onClick={() => setActiveSubPage('namaz_info')} />
        <SettingRow label="Вуду: Коротко" sub="Важные шаги перед диалогом с Аллахом" icon="water_drop" onClick={() => setActiveSubPage('wudu')} />
        <SettingRow label="Милость и облегчение" sub="Хайд, Гусль и особые периоды" icon="eco" onClick={() => setActiveSubPage('haid')} />
        <SettingRow label="Гусль (Полное омовение)" sub="Когда и как очищать всё тело" icon="shower" onClick={() => setActiveSubPage('ghusl')} />
      </div>

      <div className="pt-20 text-center opacity-60">
        <p className="font-serif italic text-2xl text-text-main">Пусть твоё сердце обретёт покой</p>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] mt-3 text-text-muted">Справочник осознанности</p>
      </div>
    </div>
  );

  const renderWudu = () => (
    <div className="animate-in slide-in-from-bottom-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton to="handbook" />
        <h2 className="text-xl font-black text-text-main">Вуду: Коротко</h2>
      </header>

      <section className="mb-8">
        <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 ml-3">ОБЯЗАТЕЛЬНО (ФАРД)</h3>
        <div className="space-y-3">
           {[
             { name: 'Намерение', sub: 'Искренне в сердце', icon: 'favorite' },
             { name: 'Лицо', sub: 'От волос до подбородка', icon: 'face' },
             { name: 'Руки', sub: 'До локтей включительно', icon: 'front_hand' },
             { name: 'Голова', sub: 'Влажное протирание (масх)', icon: 'waves' },
             { name: 'Ноги', sub: 'До щиколоток', icon: 'footprint' },
           ].map((step, i) => (
             <div key={i} className="bg-white rounded-[28px] p-6 border border-border-light flex items-center gap-6 shadow-sm">
               <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">{step.icon}</span></div>
               <div><p className="text-base font-black text-text-main">{step.name}</p><p className="text-[11px] text-text-muted italic opacity-80">{step.sub}</p></div>
             </div>
           ))}
        </div>
      </section>

      <div className="space-y-6">
        <div className="bg-[#FFF9F9] rounded-[40px] p-8 border border-accent-rose/20 space-y-4 shadow-sm">
           <h4 className="text-[11px] font-black text-accent-rose uppercase tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined">cancel</span> НАРУШАЕТ
           </h4>
           <ul className="space-y-4 text-[14px] font-bold text-text-main/80 italic px-2">
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-accent-rose"></div>Естественные выделения</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-accent-rose"></div>Крепкий сон (лежа)</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-accent-rose"></div>Потеря сознания</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-accent-rose"></div>Кровотечение (уточняйте мазхаб)</li>
           </ul>
        </div>

        <div className="bg-[#F8FAF7] rounded-[40px] p-8 border border-primary/20 space-y-4 shadow-sm">
           <h4 className="text-[11px] font-black text-[#5DB45B] uppercase tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined">check_circle</span> НЕ НАРУШАЕТ
           </h4>
           <ul className="space-y-4 text-[14px] font-bold text-text-main/80 italic px-2">
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-[#5DB45B]"></div>Кормление грудью</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-[#5DB45B]"></div>Стрижка волос/ногтей</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-[#5DB45B]"></div>Плач и слезы</li>
             <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-[#5DB45B]"></div>Прикосновение к еде/детям</li>
           </ul>
        </div>
      </div>
      
      <p className="text-center italic text-primary/60 py-20 font-serif text-lg">Чистота — половина веры</p>
    </div>
  );

  const renderHaid = () => (
    <div className="animate-in slide-in-from-bottom-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton to="handbook" />
        <h2 className="text-xl font-black text-text-main">Хайд</h2>
      </header>

      <div className="bg-white rounded-[40px] p-8 border border-border-light shadow-soft mb-10 flex gap-6 items-start">
        <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">info</span></div>
        <div className="space-y-2">
          <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">СУТЬ</p>
          <p className="text-base font-bold text-text-main leading-relaxed italic">Хайд — это время естественного очищения и отдыха от некоторых видов поклонения.</p>
        </div>
      </div>

      <section className="mb-10 space-y-4">
        <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] ml-3">ГЛАВНЫЕ ПРАВИЛА</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: 'Намаз', val: 'Намазы не совершаются и не восполняются.' },
            { name: 'Пост', val: 'В Рамадан не держится, но восполняется позже 1 к 1.' },
            { name: 'Коран', val: 'Нельзя касаться арабского текста без преграды.' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 border border-border-light shadow-sm">
              <p className="text-[12px] font-black text-[#5DB45B] uppercase tracking-[0.2em] mb-2">{r.name}</p>
              <p className="text-base font-bold text-text-main italic">{r.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F0F7ED] rounded-[40px] p-8 space-y-8 shadow-inner border border-primary/10">
        <h3 className="text-[11px] font-black text-[#5DB45B] uppercase tracking-[0.4em] text-center">ЧТО РАЗРЕШЕНО</h3>
        <div className="space-y-4">
          {[
            { name: 'Чтение зикров и дуа', icon: 'favorite' },
            { name: 'Изучение знаний и книг', icon: 'menu_book' },
            { name: 'Любые добрые дела', icon: 'thumb_up' },
          ].map((r, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-[32px] flex items-center gap-6 border border-white/60 shadow-sm">
              <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><span className="material-symbols-outlined text-xl">{r.icon}</span></div>
              <p className="text-base font-black text-text-main">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
      
      <p className="text-center italic text-primary/60 py-20 font-serif text-lg">Мир и благословение твоему сердцу</p>
    </div>
  );

  const renderGhusl = () => (
    <div className="animate-in slide-in-from-bottom-10 duration-500">
      <header className="flex items-center gap-6 mb-10">
        <BackButton to="handbook" />
        <h2 className="text-xl font-black text-text-main">Гусль</h2>
      </header>

      <div className="bg-[#F8FAF7] rounded-[40px] p-8 border border-primary/20 mb-10 space-y-5 shadow-sm">
        <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2"><span className="material-symbols-outlined">report</span> КОГДА НЕОБХОДИМ</h4>
        <ul className="space-y-4 text-[15px] font-bold text-text-main italic px-2">
          <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-primary/40"></div>Окончание менструации (Хайд)</li>
          <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-primary/40"></div>Окончание послеродового очищения</li>
          <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-primary/40"></div>Супружеская близость</li>
          <li className="flex items-center gap-4"><div className="size-1.5 rounded-full bg-primary/40"></div>Смерть (омовение усопшего)</li>
        </ul>
      </div>

      <div className="bg-white rounded-[40px] p-10 border border-border-light shadow-soft space-y-8">
        <h4 className="text-[11px] font-black text-[#5DB45B] uppercase tracking-[0.3em] mb-4 text-center">ПОРЯДОК (ФАРДЫ)</h4>
        <div className="space-y-10 relative">
           <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-primary/10"></div>
           {[
             { name: 'Намерение', val: 'Искренне в сердце очиститься ради Аллаха.' },
             { name: 'Полоскание рта', val: 'Трижды тщательно прополоскать рот.' },
             { name: 'Промывание носа', val: 'Трижды промыть носовые ходы.' },
             { name: 'Омовение всего тела', val: 'Вода должна коснуться каждого волоска и каждой складочки кожи.' },
           ].map((step, i) => (
             <div key={i} className="relative pl-16">
                <div className="absolute left-4 top-1 size-7 rounded-full bg-primary flex items-center justify-center text-xs text-white font-black z-10 border-4 border-white shadow-sm">{i+1}</div>
                <p className="text-base font-black text-text-main mb-2 tracking-tight">{step.name}</p>
                <p className="text-[13px] text-text-main/60 font-bold italic leading-relaxed">{step.val}</p>
             </div>
           ))}
        </div>
      </div>
      
      <p className="text-center italic text-primary/60 py-20 font-serif text-lg">Чистота души начинается с намерения</p>
    </div>
  );

  const renderContent = () => {
    switch (activeSubPage) {
      case 'appearance': return renderAppearance();
      case 'zikr': return renderZikrSettings();
      case 'handbook': return renderHandbook();
      case 'wudu': return renderWudu();
      case 'haid': return renderHaid();
      case 'ghusl': return renderGhusl();
      default: return renderMain();
    }
  };

  return (
    <div className="pb-40 px-6 pt-6 min-h-screen">
      {renderContent()}
    </div>
  );
};

export default SettingsTab;
