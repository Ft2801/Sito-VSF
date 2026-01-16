import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import WeatherWidget from '../components/WeatherWidget';
import type { Alert } from '../types';
import { fetchAlertsData } from '../api/client';

const getAlertStyles = (level: Alert['level']) => {
  switch (level) {
    case 'red':
      return { borderColor: 'border-red-500', icon: 'fa-house-flood-water', iconColor: 'text-red-500' };
    case 'orange':
      return { borderColor: 'border-orange-500', icon: 'fa-cloud-showers-heavy', iconColor: 'text-orange-500' };
    case 'yellow':
      return { borderColor: 'border-yellow-500', icon: 'fa-cloud-bolt', iconColor: 'text-yellow-500' };
    default:
      return { borderColor: 'border-green-500', icon: 'fa-circle-check', iconColor: 'text-green-500' };
  }
};

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
    const styles = getAlertStyles(alert.level);
    return (
        <div className={`bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 ${styles.borderColor}`}>
            <div className="flex items-start gap-4">
                <i className={`fas ${styles.icon} ${styles.iconColor} text-2xl mt-1`}></i>
                <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{alert.type} - {alert.date}</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{alert.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{alert.description}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-500">Fonte: {alert.source}</p>
                </div>
            </div>
        </div>
    )
}

const LegendItem: React.FC<{ color: string, level: string, description: string }> = ({ color, level, description }) => (
    <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${color}`}></div>
        <div>
            <p className="font-bold text-gray-900 dark:text-white">{level}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);


const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
        setLoading(true);
        try {
            const data = await fetchAlertsData();
            setAlerts(data);
        } catch (error) {
            console.error("Errore nel recupero allerte:", error);
        } finally {
            setLoading(false);
        }
    };
    loadAlerts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-12">
          <i className="fas fa-satellite-dish text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Info in Tempo Reale</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Consulta il meteo e le allerte emesse dal Dipartimento di Protezione Civile per il nostro territorio.
          </p>
        </AnimatedComponent>

        <AnimatedComponent delay={100} className="mb-12">
          <WeatherWidget />
        </AnimatedComponent>
        
        <AnimatedComponent delay={200} className="mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Legenda Livelli di Allerta</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <LegendItem color="bg-green-500" level="Verde" description="Nessuna criticità" />
                    <LegendItem color="bg-yellow-500" level="Gialla" description="Criticità ordinaria" />
                    <LegendItem color="bg-orange-500" level="Arancione" description="Criticità moderata" />
                    <LegendItem color="bg-red-500" level="Rossa" description="Criticità elevata" />
                </div>
            </div>
        </AnimatedComponent>
        
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Allerte in Corso</h2>
            {loading ? (
                 <AnimatedComponent delay={300}>
                    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex items-center justify-center min-h-[150px]">
                        <i className="fas fa-spinner fa-spin text-3xl text-emerald-500 mr-4"></i>
                        <span className="text-gray-600 dark:text-gray-400">Caricamento allerte...</span>
                    </div>
                </AnimatedComponent>
             ) : alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <AnimatedComponent key={alert.id} delay={100 * (index + 3)}>
                        <AlertCard alert={alert} />
                    </AnimatedComponent>
                ))
            ) : (
                <AnimatedComponent delay={300} className="text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
                    <p>Al momento non ci sono allerte attive.</p>
                </AnimatedComponent>
            )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;