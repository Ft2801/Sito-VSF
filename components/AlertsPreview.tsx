import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Alert } from '../types';
import { fetchAlertsData } from '../api/client';

const getAlertStyles = (level: Alert['level']) => {
  switch (level) {
    case 'red':
      return {
        borderColor: 'border-red-500',
        icon: 'fa-house-flood-water',
        iconColor: 'text-red-500',
        wrapperBg: 'bg-red-900/20'
      };
    case 'orange':
      return {
        borderColor: 'border-orange-500',
        icon: 'fa-cloud-showers-heavy',
        iconColor: 'text-orange-500',
        wrapperBg: 'bg-orange-900/20'
      };
    case 'yellow':
      return {
        borderColor: 'border-yellow-500',
        icon: 'fa-cloud-bolt',
        iconColor: 'text-yellow-500',
        wrapperBg: 'bg-yellow-900/20'
      };
    default: // green
      return {
        borderColor: 'border-green-500',
        icon: 'fa-circle-check',
        iconColor: 'text-green-500',
        wrapperBg: 'bg-green-50 dark:bg-gray-800'
      };
  }
};

const AlertsPreview: React.FC = () => {
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

  if (loading) {
    // Skeleton loader
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg min-h-[170px] h-full flex items-center justify-center animate-pulse">
        <div className="flex items-center gap-4">
          <i className="fas fa-spinner fa-spin text-3xl text-emerald-500"></i>
          <p className="text-gray-600 dark:text-gray-400">Caricamento allerte...</p>
        </div>
      </div>
    );
  }

  const activeLocalAlert = alerts.find(
    a => (a.type === 'Regionale' || a.type === 'Locale') && a.level !== 'green'
  );

  if (activeLocalAlert) {
    const styles = getAlertStyles(activeLocalAlert.level);
    
    return (
      <div 
        className={`rounded-lg shadow-lg h-full flex flex-col md:flex-row items-center gap-6 p-6 text-left border-l-8 ${styles.wrapperBg} ${styles.borderColor}`}
      >
        <i className={`fas ${styles.icon} ${styles.iconColor} text-5xl mb-4 md:mb-0 flex-shrink-0`}></i>
        <div className="flex-grow">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">{activeLocalAlert.type} - {activeLocalAlert.date}</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{activeLocalAlert.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{activeLocalAlert.description}</p>
        </div>
        <Link 
          to="/allerte" 
          className="mt-4 md:mt-0 flex-shrink-0 bg-emerald-600 text-white font-bold py-2 px-5 rounded-full hover:bg-emerald-700 transition-colors duration-300 self-center md:self-auto"
          aria-label="Scopri di più sulle allerte"
        >
            Dettagli <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    );
  }

  // No active local alerts
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <i className="fas fa-circle-check text-4xl text-green-500 flex-shrink-0"></i>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Nessuna Allerta sul Territorio</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Al momento non sono presenti criticità per la nostra zona.</p>
              </div>
            </div>
            <Link
              to="/allerte"
              className="mt-4 md:mt-0 flex-shrink-0 bg-emerald-600 text-white font-bold py-3 px-6 rounded-full hover:bg-emerald-700 transition-colors duration-300"
              aria-label="Consulta il bollettino nazionale"
            >
              Consulta Bollettino
            </Link>
        </div>
    </div>
  );
};

export default AlertsPreview;