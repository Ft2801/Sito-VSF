import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const KitCategory: React.FC<{ title: string; icon: string; items: string[] }> = ({ title, icon, items }) => (
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


const EmergencyKitPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-briefcase-medical text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Il Kit di Emergenza</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Prepara uno zaino per essere autosufficiente per diversi giorni. Tienilo in un posto facile da raggiungere.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedComponent delay={100}>
                <KitCategory 
                    title="Acqua e Cibo" 
                    icon="fa-bottle-water"
                    items={[
                        "Acqua (almeno 3 litri a persona al giorno)",
                        "Cibo a lunga conservazione (scatolame, barrette energetiche)",
                        "Apriscatole manuale",
                        "Gavette e posate"
                    ]}
                />
            </AnimatedComponent>
            <AnimatedComponent delay={200}>
                <KitCategory 
                    title="Primo Soccorso e Igiene" 
                    icon="fa-kit-medical"
                    items={[
                        "Kit di primo soccorso completo",
                        "Medicinali personali (con prescrizione)",
                        "Disinfettante e garze sterili",
                        "Mascherine FFP2",
                        "Salviette umidificate e sapone"
                    ]}
                />
            </AnimatedComponent>
            <AnimatedComponent delay={300}>
                <KitCategory 
                    title="Strumenti e Documenti" 
                    icon="fa-toolbox"
                    items={[
                        "Torcia a dinamo o con batterie di scorta",
                        "Radio a batterie",
                        "Fischietto per segnalazioni",
                        "Coltellino multiuso",
                        "Copia dei documenti e contanti",
                        "Caricabatterie portatile per cellulare"
                    ]}
                />
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default EmergencyKitPage;