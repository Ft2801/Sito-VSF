import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const AdviceSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-4">
            <i className={`fas ${icon} text-3xl text-amber-400 mr-4`}></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const FirePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-fire text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Rischio Incendi Boschivi</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La maggior parte degli incendi è causata dall'uomo. Bastano poche regole per proteggere i nostri boschi.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedComponent delay={100}>
                <AdviceSection title="Prevenzione" icon="fa-circle-exclamation">
                    <ul className="list-disc list-inside">
                        <li>Non gettare mozziconi di sigaretta o fiammiferi accesi.</li>
                        <li>Non accendere fuochi nelle aree boschive, se non negli spazi attrezzati.</li>
                        <li>Non parcheggiare l'auto su erba secca, la marmitta calda può innescare un incendio.</li>
                        <li>Pulisci il tuo terreno da sterpaglie e materiale infiammabile.</li>
                        <li>Segnala immediatamente ogni principio di incendio al 115 o al 1515.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={200}>
                <AdviceSection title="Se sei vicino a un Incendio" icon="fa-wind">
                    <ul className="list-disc list-inside">
                        <li>Allontanati subito, dando le spalle al vento per non essere investito dal fumo.</li>
                        <li>Se il fumo è denso, respira attraverso un panno bagnato.</li>
                        <li>Non cercare di attraversare il fronte del fuoco.</li>
                        <li>Se sei in auto, chiudi i finestrini e cerca un luogo sicuro e sgombro da vegetazione.</li>
                        <li>Rifugiati in un edificio o in un'area già percorsa dal fuoco.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={300}>
                <AdviceSection title="Dopo l'Incendio" icon="fa-seedling">
                     <ul className="list-disc list-inside">
                        <li>Rispetta i divieti di accesso alle aree percorse dal fuoco.</li>
                        <li>Fai attenzione al rischio di caduta di alberi o smottamenti.</li>
                        <li>Non disperdere nell'ambiente le ceneri, possono essere inquinanti.</li>
                        <li>Sostieni le campagne di rimboschimento e riqualificazione.</li>
                        <li>Collabora con le associazioni di volontariato per la tutela del territorio.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default FirePage;