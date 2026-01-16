import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const InfoSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-4">
            <i className={`fas ${icon} text-3xl text-amber-400 mr-4`}></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-3">
            {children}
        </div>
    </div>
);

const SelfProtectionPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-person-shelter text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Misure di Autoprotezione</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La protezione civile inizia da te. Un cittadino informato è una risorsa per tutta la comunità.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedComponent delay={100}>
                <InfoSection title="Il Tuo Ruolo Attivo" icon="fa-user-check">
                   <p>Essere resilienti significa essere capaci di affrontare un'emergenza riducendone l'impatto. Per farlo, ogni cittadino ha un ruolo fondamentale.</p>
                   <ul className="list-disc list-inside pl-4">
                       <li><strong>Informati:</strong> Conosci i rischi del tuo territorio e il piano di protezione civile del tuo comune.</li>
                       <li><strong>Preparati:</strong> Adotta le misure di prevenzione e prepara il tuo kit di emergenza.</li>
                       <li><strong>Partecipa:</strong> Segui i canali di informazione ufficiali e diffondi solo notizie verificate.</li>
                   </ul>
                </InfoSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={200}>
                <InfoSection title="Fonti di Informazione" icon="fa-satellite-dish">
                    <p>In emergenza, le informazioni corrette sono vitali. Fai sempre riferimento a fonti ufficiali per evitare notizie false o allarmismi.</p>
                     <ul className="list-disc list-inside pl-4">
                       <li>Sito e social del <strong>Dipartimento della Protezione Civile</strong>.</li>
                       <li>Sito e social della tua <strong>Regione</strong> e del tuo <strong>Comune</strong>.</li>
                       <li>Notiziari di radio e TV locali e nazionali.</li>
                       <li>Canali informativi della nostra associazione.</li>
                   </ul>
                </InfoSection>
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default SelfProtectionPage;