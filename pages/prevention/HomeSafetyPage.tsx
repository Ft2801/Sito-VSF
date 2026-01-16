import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const SafetyCategory: React.FC<{ title: string; icon: string; items: string[] }> = ({ title, icon, items }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-4">
            <i className={`fas ${icon} text-3xl text-amber-400 mr-4`}></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

const HomeSafetyPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-house-lock text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Sicurezza in Casa</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La tua casa è il tuo rifugio. Rendila un luogo sicuro con poche e semplici attenzioni.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedComponent delay={100}>
                <SafetyCategory 
                    title="Impianto Elettrico" 
                    icon="fa-bolt"
                    items={[
                        "Non sovraccaricare le prese elettriche con troppe spine.",
                        "Utilizza prese multiple (ciabatte) con marchio di qualità e interruttore.",
                        "Controlla periodicamente l'integrità di cavi e spine.",
                        "Fai installare un interruttore differenziale (salvavita) e testalo regolarmente."
                    ]}
                />
            </AnimatedComponent>
            <AnimatedComponent delay={200}>
                <SafetyCategory 
                    title="Gas e Monossido" 
                    icon="fa-fire-burner"
                    items={[
                        "Assicurati che ci sia sempre una corretta ventilazione nei locali con apparecchi a gas.",
                        "Fai controllare la caldaia e i fumi da un tecnico specializzato ogni anno.",
                        "Chiudi il rubinetto del gas quando non usi gli apparecchi per lunghi periodi.",
                        "Installa rilevatori di monossido di carbonio, specialmente vicino alle camere da letto."
                    ]}
                />
            </AnimatedComponent>
            <AnimatedComponent delay={300}>
                <SafetyCategory 
                    title="Prevenzione Incendi" 
                    icon="fa-fire-extinguisher"
                    items={[
                        "Installa rilevatori di fumo e controlla le batterie periodicamente.",
                        "Tieni un estintore a portata di mano e impara ad usarlo.",
                        "Non lasciare mai candele accese incustodite.",
                        "Pulisci regolarmente la cappa della cucina dai residui di grasso."
                    ]}
                />
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default HomeSafetyPage;