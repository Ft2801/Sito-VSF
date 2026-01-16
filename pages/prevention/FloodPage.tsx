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

const FloodPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-house-flood-water text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Cosa Fare in Caso di Alluvione</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Il rischio idrogeologico è presente sul nostro territorio. Informarsi è il primo passo per la sicurezza.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedComponent delay={100}>
                <AdviceSection title="Prima dell'Alluvione" icon="fa-shield-halved">
                    <ul className="list-disc list-inside">
                        <li>Informati sull'allerta meteo e sui piani di evacuazione.</li>
                        <li>Metti in sicurezza i beni che si trovano in cantine o piani bassi.</li>
                        <li>Assicurati che tutti in famiglia conoscano le norme di comportamento.</li>
                        <li>Non ostruire tombini e sistemi di scarico.</li>
                        <li>Prepara il tuo kit di emergenza.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={200}>
                <AdviceSection title="Durante l'Alluvione" icon="fa-person-walking-arrow-right">
                    <ul className="list-disc list-inside">
                        <li>Non scendere in cantine, garage o seminterrati.</li>
                        <li>Sali ai piani alti dell'edificio.</li>
                        <li>Chiudi il gas e l'impianto elettrico.</li>
                        <li>Non usare l'automobile. Bastano pochi centimetri d'acqua per perdere il controllo.</li>
                        <li>Non attraversare a piedi sottopassi o zone allagate.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={300}>
                <AdviceSection title="Dopo l'Alluvione" icon="fa-house-chimney-medical">
                     <ul className="list-disc list-inside">
                        <li>Segui le indicazioni delle autorità prima di lasciare i luoghi sicuri.</li>
                        <li>Non toccare cavi elettrici caduti.</li>
                        <li>Non bere acqua dal rubinetto prima che sia dichiarata potabile.</li>
                        <li>Butta via i cibi che sono stati a contatto con l'acqua dell'alluvione.</li>
                        <li>Aiuta i vicini in difficoltà, se puoi farlo in sicurezza.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default FloodPage;