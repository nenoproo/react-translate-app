import { useState, useEffect, useRef } from 'react';
import copyIcon from '../assets/images/copy.svg';
import expandDownIcon from '../assets/images/expand-down.svg';
import horizontalTopLeftMainIcon from '../assets/images/horizontal-top-left-main.svg';
import sortAlfaIcon from '../assets/images/sort-alfa.svg';
import soundMaxFillIcon from '../assets/images/sound-max-fill.svg';
import axios from 'axios';

const Main = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openTargetMenu, setOpenTargetMenu] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [sourceLangMenu, setSourceLangMenu] = useState('russian');
  const [targetLang, setTargetLang] = useState('en');
  const [targetLangMenu, setTargetLangMenu] = useState('russian');
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const sourceLangMenuRef = useRef<HTMLDivElement | null>(null);
  const targetLangMenuRef = useRef<HTMLDivElement | null>(null);

   const fetchTranslate = async () => {
      console.log('fetchTranslate is initiated.');
  
      try {
        const res = await axios.get(
          `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`,
        );
  
        setTargetText(res.data.responseData.translatedText);
      } catch (error) {
        console.error('Error fetching data!', error);
      }
    };
  
    // function for source text to speech
    const speakSourceText = () => {
      if (!sourceText) return;
  
      const speech = new SpeechSynthesisUtterance(sourceText);
      speech.lang = sourceLang; // for ex. speech.lang = 'es'
      console.log('TTS Language:', speech.lang);
      window.speechSynthesis.speak(speech);
    };
  
    // function for target text to speech
    const speakTargetText = () => {
      if (!targetText) return;
  
      const speech = new SpeechSynthesisUtterance(targetText);
      speech.lang = targetLang;
      window.speechSynthesis.speak(speech);
    };
  
    // Test for changing src lang
    useEffect(() => {
      console.log('Current source language to be sent selected: ', sourceLang);
    }, [sourceLang]);
  
    // Test for changing target lang
    useEffect(() => {
      console.log('current target lang: ', targetLang);
    }, [targetLang]);
  
    // Го копира current sourceText од sourceText стејтот и го запишува во меморијата на оперативниот систем на корисникот, користејќи го browser clipboard API
    const copySourceText = () => {
      navigator.clipboard.writeText(sourceText);
      console.log('Copied: ', sourceText);
    };
  
    const copyTargetText = () => {
      navigator.clipboard.writeText(targetText);
      console.log('Copied: ', targetText);
    };
  
    useEffect(() => {
      let handler = (e: MouseEvent) => {
        if (!sourceLangMenuRef.current?.contains(e.target as Node)) {
          setOpenMenu(false);
        }
      };
  
      document.addEventListener('mousedown', handler);
  
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    });
  
    useEffect(() => {
      // функцијa handler за да се смени свичот за да се затвори
      let handler = (e: MouseEvent) => {
        if (!targetLangMenuRef.current?.contains(e.target as Node)) { // ако корисникот не кликнал на менито, а без ! значи ако корисникот кликнал
          setOpenTargetMenu(false);
        }
      };
  
      // повикување на функцијата handler
      document.addEventListener('mousedown', handler);
  
      // чистење на функцијата handler
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    });

    // alert
    const switchLanguages = () => {
        alert('This function is not avaliable yet!');
    }

  return (
    <main className="flex lg:flex-row flex-col gap-3">
            <section className="bg-bg-secondary p-7 border border-icon rounded-2xl lg:w-1/2">
              <div className="flex flex-col gap-2 text-sm">
                {/* first row */}
                <div className="flex gap-2 font-bold">
                  <button
                    onClick={() => setSourceLang('en')}
                    className={`${sourceLang === 'en' ? 'text-white bg-icon' : 'text-text-muted bg-none'} px-3 py-2 rounded-xl transition-colors duration-250 ease-in-out cursor-pointer`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSourceLang('da')}
                    className={`${sourceLang === 'da' ? 'bg-icon  text-white' : 'text-text-muted bg-none'} px-3 py-2 rounded-xl transition-colors duration-250 ease-in-out cursor-pointer`}
                  >
                    Danish
                  </button>
    
                  <div className="relative">
                    <button
                      className={`${
                        sourceLang === 'en' || sourceLang === 'da'
                          ? 'text-text-muted bg-none'
                          : 'bg-icon text-white '
                      } flex gap-1  px-3 py-2 rounded-xl  capitalize transition-colors duration-250 ease-in-out cursor-pointer`}
                      onClick={() => {
                        setOpenMenu(!openMenu);
                      }}
                    >
                      {sourceLangMenu}
                      <img src={expandDownIcon} aria-hidden="true" />
                    </button>
    
                    {/* dropdown menu */}
                    <div
                      ref={sourceLangMenuRef}
                      className={`${openMenu ? 'opactiy-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} flex absolute flex-col gap-2.5 bg-bg-dropdown shadow-[0_12px_28px_rgba(0,0,0,0.45)] p-3 rounded-sm w-full transition-all duration-150 ease-out origin-top`}
                    >
                      <button
                        onClick={() => {
                          setSourceLang('ru');
                          setSourceLangMenu('russian');
                          setOpenMenu(false);
                        }}
                        className="text-white text-left capitalize cursor-pointer"
                      >
                        Russian
                      </button>
                      <button
                        onClick={() => {
                          setSourceLang('no');
                          setSourceLangMenu('norwegian');
                          setOpenMenu(false);
                        }}
                        className="text-white text-left capitalize cursor-pointer"
                      >
                        Norwegian
                      </button>
                      <button
                        onClick={() => {
                          setSourceLang('es');
                          setSourceLangMenu('spanish');
                          setOpenMenu(false);
                        }}
                        className="text-white text-left cursor-pointer capitaize"
                      >
                        Spanish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    
              <hr className="mt-6 mb-8 border-icon" />
    
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                maxLength={500}
                className="border-none outline-none w-full h-35 overflow-auto text-white resize-none scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
                placeholder="Type your text here..."
              >
                Hello, how are you?
              </textarea>
              <p className="my-3 text-text-muted text-xs text-end">
                {sourceText.length}/500
              </p>
    
              <div className="flex justify-between items-end">
                <div className="flex gap-2">
                  <button
                    onClick={speakSourceText}
                    className="inline-flex justify-center items-center hover:bg-icon-hover border-2 border-icon rounded-[0.625rem] w-9 h-9 transition-colors duration-250 ease-in-out cursor-pointer"
                    aria-label="Play text as speech"
                  >
                    <img src={soundMaxFillIcon} className="w-5 h-5" alt="" />
                  </button>
                  <button
                    onClick={copySourceText}
                    className="inline-flex justify-center items-center hover:bg-icon-hover border-2 border-icon rounded-[0.625rem] w-9 h-9 transition-colors duration-250 ease-in-out cursor-pointer"
                    aria-label="Copy text to clipboard"
                  >
                    <img src={copyIcon} className="w-5 h-5" alt="" />
                  </button>
                </div>
                <button
                  onClick={fetchTranslate}
                  className="flex items-center gap-1 bg-btn-secondary hover:bg-btn-secondary-hover px-6 py-3 border rounded-xl font-semibold text-white transition-colors border-btn-translate-border duration-250 ease-in-out cursor-pointer"
                >
                  <img src={sortAlfaIcon} alt="" />
                  Translate
                </button>
              </div>
            </section>
    
            <section className="bg-bg-secondary p-7 border border-icon rounded-2xl lg:w-1/2">
              {/* first and only row */}
              <div className="flex justify-between">
                <div className="relative flex gap-2 text-sm">
                  <button
                    onClick={() => setTargetLang('en')}
                    className={`${
                      targetLang === 'en'
                        ? 'bg-icon text-white'
                        : 'text-text-muted bg-none'
                    } px-3 py-2 rounded-xl font-semibold  whitespace-nowrap transition-colors duration-250 ease-in-out cursor-pointer`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setTargetLang('da')}
                    className={`${
                      targetLang === 'da'
                        ? 'bg-icon text-white'
                        : 'text-text-muted bg-none'
                    } px-3 py-2 rounded-xl font-semibold  whitespace-nowrap transition-colors duration-250 ease-in-out cursor-pointer`}
                  >
                    Danish
                  </button>
    
                  {/* dropdown menu */}
                  <div ref={targetLangMenuRef} className="relative">
                    <button
                      className={`${
                        targetLang === 'en' || targetLang === 'da'
                          ? 'text-text-muted bg-none'
                          : 'bg-icon text-white '
                      } flex gap-1  px-3 py-2 rounded-xl  capitalize transition-colors duration-250 ease-in-out cursor-pointer font-semibold`}
                      onClick={() => {
                        setOpenTargetMenu(!openTargetMenu);
                      }}
                    >
                      {targetLangMenu}
                      <img src={expandDownIcon} aria-hidden="true" />
                    </button>
    
                    {/* Dropdown target menu */}
                    <div
                      className={`${openTargetMenu ? 'opactiy-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} flex absolute flex-col gap-2.5 bg-bg-dropdown shadow-[0_12px_28px_rgba(0,0,0,0.45)] p-3 rounded-sm w-full transition-all duration-150 ease-out origin-top`}
                    >
                      <button
                        onClick={() => {
                          setTargetLang('ru');
                          setTargetLangMenu('russian');
                          setOpenTargetMenu(false);
                        }}
                        className="font-semibold text-white text-left capitalize cursor-pointer"
                      >
                        Russian
                      </button>
                      <button
                        onClick={() => {
                          setTargetLang('no');
                          setTargetLangMenu('norwegian');
                          setOpenTargetMenu(false);
                        }}
                        className="font-semibold text-white text-left capitalize cursor-pointer"
                      >
                        Norwegian
                      </button>
                      <button
                        onClick={() => {
                          setTargetLang('es');
                          setTargetLangMenu('spanish');
                          setOpenTargetMenu(false);
                        }}
                        className="font-semibold text-white text-left capitalize cursor-pointer"
                      >
                        Spanish
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={switchLanguages}
                  className="inline-flex justify-center items-center hover:bg-icon-hover border-2 border-icon rounded-[0.625rem] w-9 h-9 transition-colors duration-250 ease-in-out cursor-pointer"
                  aria-label="Switch text section"
                >
                  <img src={horizontalTopLeftMainIcon} className="w-5 h-5" alt="" />
                </button>
              </div>
    
              <hr className="mt-6 mb-8 border-icon" />
              <textarea
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                maxLength={500}
                className="border-none outline-none w-full h-35 overflow-auto text-white resize-none scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
                placeholder="Your translation will appear here."
              >
                {targetText}
              </textarea>
    
              <p className="my-3 text-text-muted text-xs text-end">
                {targetText.length}/500
              </p>
    
              <div className="flex justify-between items-end">
                <div className="flex gap-2">
                  <button
                    onClick={speakTargetText}
                    className="inline-flex justify-center items-center hover:bg-icon-hover border-2 border-icon rounded-[0.625rem] w-9 h-9 transition-colors duration-250 ease-in-out cursor-pointer"
                    aria-label="Play text as speech"
                  >
                    <img src={soundMaxFillIcon} className="w-5 h-5" alt="" />
                  </button>
                  <button
                    onClick={copyTargetText}
                    className="inline-flex justify-center items-center hover:bg-icon-hover border-2 border-icon rounded-[0.625rem] w-9 h-9 transition-colors duration-250 ease-in-out cursor-pointer"
                    aria-label="Copy text to clipboard"
                  >
                    <img src={copyIcon} className="w-5 h-5" alt="" />
                  </button>
                </div>
              </div>
            </section>
          </main>
  )
};

export default Main;
