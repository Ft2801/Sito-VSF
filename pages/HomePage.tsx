import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedComponent from '../components/AnimatedComponent';
import AlertsPreview from '../components/AlertsPreview';
import WeatherWidget from '../components/WeatherWidget';

const HomePage: React.FC = () => {
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroImageLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isHeroImageLoaded ? 'opacity-30 dark:opacity-40' : 'opacity-0'}`}
          style={{ backgroundImage: "url('https://picsum.photos/1600/900?image=985')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent"></div>
        <div className="relative z-10 text-center p-4">
          <AnimatedComponent delay={400}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Insieme, per la Comunità</h1>
          </AnimatedComponent>
        </div>
      </section>

      {/* Real-time Info Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
            <AnimatedComponent className="text-center mb-12" delay={800}>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Info in Tempo Reale</h2>
                <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                    La situazione attuale a Pescara: bollettino meteo e allerte di protezione civile.
                </p>
            </AnimatedComponent>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                    <AnimatedComponent delay={800}>
                        <WeatherWidget />
                    </AnimatedComponent>
                </div>
                <div className="lg:col-span-3 h-full">
                  <AnimatedComponent delay={800} className="h-full">
                    <AlertsPreview />
                  </AnimatedComponent>
                </div>
            </div>
        </div>
      </section>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Services Preview */}
        <AnimatedComponent delay={100}>
          <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="px-6 container mx-auto flex-1">
              <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">I Nostri Servizi</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Siamo attivi sul territorio con una vasta gamma di interventi, dalla prevenzione dei rischi alla gestione delle emergenze.
                  </p>
                  <div className="lg:hidden my-6">
                     <img src="https://www.quotidianocontribuenti.com/wp-content/uploads/2023/02/protezione-civile.jpg" alt="Volontari al lavoro per i servizi" className="rounded-lg shadow-2xl mx-auto"/>
                  </div>
                  <Link to="/servizi" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                    Scopri tutti i servizi
                  </Link>
                </div>
                <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                  <img src="https://www.quotidianocontribuenti.com/wp-content/uploads/2023/02/protezione-civile.jpg" alt="Volontari al lavoro per i servizi" className="rounded-lg shadow-2xl"/>
                </div>
              </div>
            </div>
          </section>
        </AnimatedComponent>

        {/* News Preview */}
        <AnimatedComponent delay={200}>
          <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="px-6 container mx-auto flex-1">
              <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ultime Notizie</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Rimani aggiornato sulle nostre più recenti attività e interventi sul campo.
                  </p>
                   <div className="lg:hidden my-6">
                    <img src="https://picsum.photos/600/400?image=1015" alt="Notizie e aggiornamenti" className="rounded-lg shadow-2xl mx-auto"/>
                  </div>
                  <Link to="/news" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                    Leggi tutte le notizie
                  </Link>
                </div>
                <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                  <img src="https://picsum.photos/600/400?image=1015" alt="Notizie e aggiornamenti" className="rounded-lg shadow-2xl"/>
                </div>
              </div>
            </div>
          </section>
        </AnimatedComponent>
        
        {/* Gallery Preview */}
        <AnimatedComponent delay={100}>
          <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="px-6 container mx-auto flex-1">
              <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                 <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Galleria Fotografica</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Uno sguardo da vicino al nostro impegno quotidiano attraverso le immagini più significative.
                  </p>
                  <div className="lg:hidden my-6">
                    <img src="https://picsum.photos/600/400?image=10" alt="Galleria fotografica" className="rounded-lg shadow-2xl mx-auto"/>
                  </div>
                  <Link to="/galleria" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                    Guarda le foto
                  </Link>
                </div>
                <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                  <img src="https://picsum.photos/600/400?image=10" alt="Galleria fotografica" className="rounded-lg shadow-2xl"/>
                </div>
              </div>
            </div>
          </section>
        </AnimatedComponent>

        {/* Prevention Preview */}
        <AnimatedComponent delay={200}>
          <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="px-6 container mx-auto flex-1">
              <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                 <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Cultura della Prevenzione</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Essere preparati è il primo passo verso la sicurezza. Scopri con noi le buone pratiche di protezione civile.
                  </p>
                  <div className="lg:hidden my-6">
                    <img src="https://picsum.photos/600/400?image=54" alt="Cultura della prevenzione" className="rounded-lg shadow-2xl mx-auto"/>
                  </div>
                  <Link to="/prevenzione" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                    Scopri di più
                  </Link>
                </div>
                <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                  <img src="https://picsum.photos/600/400?image=54" alt="Cultura della prevenzione" className="rounded-lg shadow-2xl"/>
                </div>
              </div>
            </div>
          </section>
        </AnimatedComponent>

         {/* About Us Preview */}
        <AnimatedComponent delay={100}>
          <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="px-6 container mx-auto flex-1">
              <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Chi Siamo</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Siamo un gruppo di cittadini che ha deciso di dedicare parte del proprio tempo alla comunità. Nati nel 2005, ci impegniamo ogni giorno per garantire un futuro più sicuro al nostro territorio.
                  </p>
                  <div className="lg:hidden my-6">
                    <img src="https://picsum.photos/600/400?image=1050" alt="Gruppo di volontari" className="rounded-lg shadow-2xl mx-auto"/>
                  </div>
                  <Link to="/chi-siamo" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                    La Nostra Storia
                  </Link>
                </div>
                <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                  <img src="https://picsum.photos/600/400?image=1050" alt="Gruppo di volontari" className="rounded-lg shadow-2xl"/>
                </div>
              </div>
            </div>
          </section>
        </AnimatedComponent>

        {/* Location Preview */}
        <AnimatedComponent delay={200}>
            <section className="py-8 bg-white dark:bg-gray-900 flex h-full">
            <div className="container mx-auto px-6 flex-1">
                <div className="flex flex-col lg:flex-row items-center h-full text-center lg:text-left">
                    <div className="w-full lg:w-1/2 p-4 lg:pr-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Dove Siamo</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                        La nostra sede è il cuore pulsante delle nostre attività. Un luogo di incontro, formazione e pianificazione. Vieni a trovarci per scoprire di persona la nostra realtà.
                        </p>
                        <div className="lg:hidden my-6">
                           <img src="https://picsum.photos/600/400?image=212" alt="Paesaggio representativo" className="rounded-lg shadow-2xl mx-auto"/>
                        </div>
                        <Link to="/dove-siamo" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                        Raggiungici
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 p-4 hidden lg:block">
                        <img src="https://picsum.photos/600/400?image=212" alt="Paesaggio representativo" className="rounded-lg shadow-2xl"/>
                    </div>
                </div>
            </div>
            </section>
        </AnimatedComponent>

        {/* Collaborate Preview */}
        <AnimatedComponent delay={100}>
            <section className="py-8 bg-white dark:bg-gray-900 flex h-full items-center justify-center text-center">
                <div className="container mx-auto px-6 flex-1">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Fai la Differenza</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
                        Ogni nuovo volontario porta energia, idee e competenze preziose. Unisciti alla nostra squadra per proteggere attivamente la comunità.
                    </p>
                    <Link to="/collabora" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                        Collabora con Noi
                    </Link>
                </div>
            </section>
        </AnimatedComponent>

        {/* Donations Preview */}
        <AnimatedComponent delay={200}>
            <section className="py-8 bg-white dark:bg-gray-900 flex h-full items-center justify-center text-center">
                <div className="container mx-auto px-6 flex-1">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Sostienici</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
                        Il tuo supporto è essenziale per le nostre operazioni. Con un piccolo gesto puoi aiutarci ad aiutare gli altri. Scopri come contribuire.
                    </p>
                    <Link to="/donazioni" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                        Dona Ora
                    </Link>
                </div>
            </section>
        </AnimatedComponent>
      </div>

    </div>
  );
};

export default HomePage;