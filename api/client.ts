import type {
    Alert,
    WeatherApiResponse,
    NewsArticle,
    Service,
    Testimonial,
    GalleryImage,
    PreventionArticle,
    PreventionArticleDetail,
    DonationInfo,
    ContactInfo
} from '../types';

// Coordinate per Pescara
const PESCARA_LAT = 42.4643;
const PESCARA_LON = 14.2142;

// Endpoint per Open-Meteo
const API_ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${PESCARA_LAT}&longitude=${PESCARA_LON}&current=temperature_2m,apparent_temperature,is_day,weather_code&timezone=Europe/Rome`;

// Tipi per la risposta di Open-Meteo
interface OpenMeteoCurrentWeather {
    temperature_2m: number;
    apparent_temperature: number;
    is_day: number; // 1 per giorno, 0 per notte
    weather_code: number;
}

interface OpenMeteoResponse {
    current: OpenMeteoCurrentWeather;
}

/**
 * Mappa il codice meteo WMO a una descrizione e un'icona compatibile con WeatherWidget.
 * @param code - Il codice meteo WMO da Open-Meteo.
 * @param isDay - Booleano che indica se è giorno.
 * @returns Un oggetto con la descrizione e il codice dell'icona.
 */
const getWeatherInfoFromCode = (code: number, isDay: boolean): { description: string; icon: string } => {
    const timeSuffix = isDay ? 'd' : 'n';
    switch (code) {
        case 0: return { description: 'Cielo sereno', icon: `01${timeSuffix}` };
        case 1: return { description: 'Prevalentemente sereno', icon: `02${timeSuffix}` };
        case 2: return { description: 'Parzialmente nuvoloso', icon: `03${timeSuffix}` };
        case 3: return { description: 'Nuvoloso', icon: `04${timeSuffix}` };
        case 45:
        case 48: return { description: 'Nebbia', icon: `50${timeSuffix}` };
        case 51:
        case 53:
        case 55: return { description: 'Pioggerella', icon: `09${timeSuffix}` };
        case 56:
        case 57: return { description: 'Pioggerella gelata', icon: `13${timeSuffix}` };
        case 61:
        case 63:
        case 65: return { description: 'Pioggia', icon: `10${timeSuffix}` };
        case 66:
        case 67: return { description: 'Pioggia gelata', icon: `13${timeSuffix}` };
        case 71:
        case 73:
        case 75: return { description: 'Nevicata', icon: `13${timeSuffix}` };
        case 77: return { description: 'Gragnola', icon: `13${timeSuffix}` };
        case 80:
        case 81:
        case 82: return { description: 'Acquazzone', icon: `09${timeSuffix}` };
        case 85:
        case 86: return { description: 'Acquazzone di neve', icon: `13${timeSuffix}` };
        case 95: return { description: 'Temporale', icon: `11${timeSuffix}` };
        case 96:
        case 99: return { description: 'Temporale con grandine', icon: `11${timeSuffix}` };
        default: return { description: 'Dati non disponibili', icon: '01d' };
    }
};

/**
 * Recupera i dati meteo attuali da Open-Meteo e li trasforma nel formato atteso.
 * @returns Una promessa che si risolve con i dati meteo.
 */
export const fetchWeatherData = async (): Promise<WeatherApiResponse> => {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data from Open-Meteo.');
    }
    const data: OpenMeteoResponse = await response.json();

    const { current } = data;
    const weatherInfo = getWeatherInfoFromCode(current.weather_code, current.is_day === 1);

    // Trasforma i dati nel formato WeatherApiResponse per compatibilità con il widget
    const transformedData: WeatherApiResponse = {
        name: 'Pescara', // Hardcoded perché Open-Meteo non fornisce il nome della città
        main: {
            temp: current.temperature_2m,
            feels_like: current.apparent_temperature,
            temp_min: 0, // Non fornito da questo endpoint Open-Meteo
            temp_max: 0, // Non fornito
            pressure: 0, // Non fornito
            humidity: 0, // Non fornito
        },
        weather: [
            {
                id: current.weather_code,
                main: weatherInfo.description,
                description: weatherInfo.description,
                icon: weatherInfo.icon,
            },
        ],
    };

    return transformedData;
};


// --- ALERTS ---
const mockAlerts: Alert[] = [
    {
        id: 1,
        level: 'yellow',
        type: 'Regionale',
        title: 'Allerta Gialla per Rischio Temporali',
        description: 'Previsti rovesci di forte intensità, frequente attività elettrica, grandinate e forti raffiche di vento sulla regione Abruzzo. Prestare attenzione.',
        source: 'Dipartimento Protezione Civile',
        date: '20 Ottobre 2025'
    },
    {
        id: 2,
        level: 'green',
        type: 'Nazionale',
        title: 'Nessuna Allerta Meteo Nazionale',
        description: 'La situazione meteorologica sulla penisola non presenta criticità significative nelle prossime 24 ore.',
        source: 'Dipartimento Protezione Civile',
        date: '20 Ottobre 2025'
    }
];

export const fetchAlertsData = async (): Promise<Alert[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockAlerts);
        }, 1500);
    });
};

// --- NEWS ---
const mockNews: NewsArticle[] = [
    {
        id: 1,
        date: '14 Settembre 2025',
        title: 'Partecipazione a "Città Sicura"',
        description: 'I nostri volontari hanno partecipato attivamente all\'evento "Città Sicura", tenendo dimostrazioni di primo soccorso e manovre di disostruzione pediatrica per la cittadinanza.',
        imageUrl: 'https://picsum.photos/400/300?image=10',
        category: 'Eventi',
    },
    {
        id: 2,
        date: '6 Agosto 2025',
        title: 'Esercitazione Antincendio Boschivo',
        description: 'In collaborazione con i Vigili del Fuoco, abbiamo svolto un\'importante esercitazione per testare le nuove attrezzature e affinare le procedure di intervento in caso di incendi boschivi estivi.',
        imageUrl: 'https://picsum.photos/400/300?image=204',
        category: 'Esercitazioni',
    },
    {
        id: 3,
        date: '22 Giugno 2025',
        title: 'Supporto alla Sagra del Paese',
        description: 'Come ogni anno, abbiamo garantito l\'assistenza sanitaria e il supporto logistico durante la tradizionale sagra del paese, assicurando che tutto si svolgesse in piena sicurezza.',
        imageUrl: 'https://picsum.photos/400/300?image=1074',
        category: 'Eventi',
    },
    {
        id: 4,
        date: '1 Maggio 2025',
        title: 'Consegna Pacchi Alimentari',
        description: 'Grazie alla generosità dei cittadini, abbiamo raccolto e distribuito pacchi alimentari a oltre 50 famiglie in difficoltà del nostro territorio, un piccolo gesto di grande solidarietà.',
        imageUrl: 'https://picsum.photos/400/300?image=433',
        category: 'Interventi',
    },
];

export const fetchNewsData = async (): Promise<NewsArticle[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockNews);
        }, 1200);
    });
};

// --- SERVICES ---
const mockServices: Service[] = [
    {
        id: 1,
        title: 'Gestione Emergenza Alluvione',
        description: 'Intervento tempestivo durante l\'alluvione di Novembre, con evacuazione di famiglie e messa in sicurezza degli argini del fiume con sacchi di sabbia.',
        imageUrl: `${import.meta.env.BASE_URL}images/alluvione.webp`
    },
    {
        id: 2,
        title: 'Campagna Antincendio Boschivo Estiva',
        description: 'Pattugliamento e monitoraggio delle aree boschive per tutta la stagione estiva. Diversi principi di incendio sono stati spenti sul nascere grazie alla nostra vigilanza.',
        imageUrl: `${import.meta.env.BASE_URL}images/pattugliamento-incendi.webp`
    },
    {
        id: 3,
        title: 'Presidio Strade per Eventi e Manifestazioni',
        description: 'Forniamo supporto logistico e di sicurezza stradale durante eventi sportivi, sagre e manifestazioni, garantendo la sicurezza di partecipanti e spettatori.',
        imageUrl: `${import.meta.env.BASE_URL}images/eventi-strada.webp`
    },
    {
        id: 5,
        title: 'Distribuzione Viveri e Beni di Prima Necessità',
        description: 'Organizzazione di un centro di raccolta e distribuzione di aiuti per le famiglie colpite dalla crisi economica, fornendo cibo, vestiti e supporto morale.',
        imageUrl: `${import.meta.env.BASE_URL}images/distribuzione.webp`
    },
    {
        id: 6,
        title: 'Formazione nelle Scuole',
        description: 'Ciclo di incontri nelle scuole primarie e secondarie per educare i più giovani sulle norme di comportamento in caso di terremoto e altri rischi.',
        imageUrl: `${import.meta.env.BASE_URL}images/scuole.webp`
    },
];

export const fetchServicesData = async (): Promise<Service[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockServices);
        }, 800);
    });
};

// --- TESTIMONIALS ---
const mockTestimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Marco Rossi',
        role: 'Volontario dal 2018',
        quote: 'Essere un volontario mi ha cambiato la vita. Ho imparato il valore del lavoro di squadra e la gioia di aiutare chi è in difficoltà. È un\'esperienza che consiglio a tutti.',
        imageUrl: 'https://picsum.photos/id/64/100/100'
    },
    {
        id: 2,
        name: 'Giulia Bianchi',
        role: 'Volontaria dal 2020',
        quote: 'Pensavo di dare solo il mio tempo, invece ho ricevuto molto di più. Ho trovato una seconda famiglia e ho acquisito competenze che mi sono utili anche nella vita di tutti i giorni.',
        imageUrl: 'https://picsum.photos/id/65/100/100'
    },
    {
        id: 3,
        name: 'Alessandro Verdi',
        role: 'Caposquadra',
        quote: 'Ogni intervento è una sfida, ma la gratitudine negli occhi delle persone che aiutiamo ripaga di ogni fatica. Siamo una squadra unita, pronta a tutto per la nostra comunità.',
        imageUrl: 'https://picsum.photos/id/237/100/100'
    }
];

export const fetchTestimonialsData = async (): Promise<Testimonial[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockTestimonials);
        }, 1000);
    });
};

// --- GALLERY ---
const localGalleryImages: GalleryImage[] = [
    { id: 'gallery-1', src: `${import.meta.env.BASE_URL}images/alluvione.webp`, alt: 'Intervento alluvione', category: 'Interventi' },
    { id: 'gallery-2', src: `${import.meta.env.BASE_URL}images/distribuzione.webp`, alt: 'Distribuzione beni', category: 'Interventi' },
    { id: 'gallery-3', src: `${import.meta.env.BASE_URL}images/eventi-strada.webp`, alt: 'Sicurezza eventi stradali', category: 'Eventi' },
    { id: 'gallery-4', src: `${import.meta.env.BASE_URL}images/pattugliamento-incendi.webp`, alt: 'Pattugliamento AIB', category: 'Interventi' },
    { id: 'gallery-5', src: `${import.meta.env.BASE_URL}images/scuole.webp`, alt: 'Formazione nelle scuole', category: 'Formazione' },
    { id: 'gallery-6', src: `${import.meta.env.BASE_URL}images/chi-siamo.webp`, alt: 'Gruppo Volontari', category: 'Eventi' },
    { id: 'gallery-7', src: `${import.meta.env.BASE_URL}images/notizie.webp`, alt: 'Operatività', category: 'Esercitazioni' },
];

export const fetchAllGalleryImages = async (): Promise<GalleryImage[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(localGalleryImages);
        }, 800);
    });
};

// --- PREVENTION ARTICLES ---
const mockPreventionArticles: PreventionArticle[] = [
    { id: 1, title: 'Cosa Fare in Caso di Terremoto', description: 'Le norme di comportamento da adottare prima, durante e dopo una scossa sismica.', icon: 'fa-house-crack', slug: 'terremoto' },
    { id: 2, title: 'Il Kit di Emergenza', description: 'Prepara uno zaino con l\'essenziale: acqua, cibo, medicinali e altri oggetti vitali.', icon: 'fa-briefcase-medical', slug: 'kit-emergenza' },
    { id: 3, title: 'Rischio Alluvioni', description: 'Azioni e manutenzione per ridurre il rischio idrogeologico e proteggersi dall\'acqua.', icon: 'fa-house-flood-water', slug: 'alluvioni' },
    { id: 4, title: 'Rischio Incendi Boschivi', description: 'Come riconoscere i comportamenti a rischio e segnalare un incendio per salvaguardare i boschi.', icon: 'fa-fire', slug: 'incendi' },
    { id: 5, title: 'Sicurezza in Casa', description: 'Semplici controlli per rendere la tua abitazione un luogo più sicuro per tutta la famiglia.', icon: 'fa-house-lock', slug: 'sicurezza-casa' },
    { id: 6, title: 'Misure di Autoprotezione', description: 'Essere un cittadino consapevole e informato è il primo passo per una comunità resiliente.', icon: 'fa-person-shelter', slug: 'autoprotezione' },
];

export const fetchPreventionArticles = async (): Promise<PreventionArticle[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockPreventionArticles), 700);
    });
};

// --- PREVENTION DETAILS ---
const mockPreventionDetails: PreventionArticleDetail[] = [
    {
        slug: 'terremoto',
        title: 'Cosa Fare in Caso di Terremoto',
        subtitle: 'Un terremoto è un evento improvviso. Essere preparati può fare la differenza.',
        mainIcon: 'fa-house-crack',
        content: [
            { title: 'Prima del Terremoto', icon: 'fa-shield-halved', points: ['Individua i punti sicuri in casa (sotto tavoli robusti, contro muri portanti).', 'Fissa alle pareti mobili alti, librerie e scaffali.', 'Tieni a portata di mano un kit di emergenza.', 'Chiudi i rubinetti di gas, acqua e l\'interruttore generale della luce.', 'Informa i tuoi familiari sui comportamenti da adottare.'] },
            { title: 'Durante il Terremoto', icon: 'fa-person-shelter', points: ['Cerca riparo nel punto sicuro più vicino.', 'Non precipitarti fuori, le scale potrebbero essere danneggiate.', 'Stai lontano da vetri, finestre e oggetti che potrebbero cadere.', 'Se sei all\'aperto, allontanati da edifici, alberi e linee elettriche.', 'Se sei in auto, non fermarti sotto ponti o cavalcavia.'] },
            { title: 'Dopo il Terremoto', icon: 'fa-first-aid', points: ['Assicurati del tuo stato di salute e di quello degli altri.', 'Non usare l\'ascensore e fai attenzione alle scale.', 'Non usare il telefono se non per emergenze, per non intasare le linee.', 'Raggiungi le aree di attesa individuate dal piano di protezione civile.', 'Limita l\'uso dell\'auto per non intralciare i soccorsi.'] }
        ]
    },
    {
        slug: 'kit-emergenza',
        title: 'Il Kit di Emergenza',
        subtitle: 'Prepara uno zaino per essere autosufficiente per diversi giorni. Tienilo in un posto facile da raggiungere.',
        mainIcon: 'fa-briefcase-medical',
        content: [
            { title: 'Acqua e Cibo', icon: 'fa-bottle-water', points: ['Acqua (almeno 3 litri a persona al giorno)', 'Cibo a lunga conservazione (scatolame, barrette energetiche)', 'Apriscatole manuale', 'Gavette e posate'] },
            { title: 'Primo Soccorso e Igiene', icon: 'fa-kit-medical', points: ['Kit di primo soccorso completo', 'Medicinali personali (con prescrizione)', 'Disinfettante e garze sterili', 'Mascherine FFP2', 'Salviette umidificate e sapone'] },
            { title: 'Strumenti e Documenti', icon: 'fa-toolbox', points: ['Torcia a dinamo o con batterie di scorta', 'Radio a batterie', 'Fischietto per segnalazioni', 'Coltellino multiuso', 'Copia dei documenti e contanti', 'Caricabatterie portatile per cellulare'] }
        ]
    },
    {
        slug: 'alluvioni',
        title: 'Cosa Fare in Caso di Alluvione',
        subtitle: 'Il rischio idrogeologico è presente sul nostro territorio. Informarsi è il primo passo per la sicurezza.',
        mainIcon: 'fa-house-flood-water',
        content: [
            { title: 'Prima dell\'Alluvione', icon: 'fa-shield-halved', points: ['Informati sull\'allerta meteo e sui piani di evacuazione.', 'Metti in sicurezza i beni che si trovano in cantine o piani bassi.', 'Assicurati che tutti in famiglia conoscano le norme di comportamento.', 'Non ostruire tombini e sistemi di scarico.', 'Prepara il tuo kit di emergenza.'] },
            { title: 'Durante l\'Alluvione', icon: 'fa-person-walking-arrow-right', points: ['Non scendere in cantine, garage o seminterrati.', 'Sali ai piani alti dell\'edificio.', 'Chiudi il gas e l\'impianto elettrico.', 'Non usare l\'automobile. Bastano pochi centimetri d\'acqua per perdere il controllo.', 'Non attraversare a piedi sottopassi o zone allagate.'] },
            { title: 'Dopo l\'Alluvione', icon: 'fa-house-chimney-medical', points: ['Segui le indicazioni delle autorità prima di lasciare i luoghi sicuri.', 'Non toccare cavi elettrici caduti.', 'Non bere acqua dal rubinetto prima che sia dichiarata potabile.', 'Butta via i cibi che sono stati a contatto con l\'acqua dell\'alluvione.', 'Aiuta i vicini in difficoltà, se puoi farlo in sicurezza.'] }
        ]
    },
    {
        slug: 'incendi',
        title: 'Rischio Incendi Boschivi',
        subtitle: 'La maggior parte degli incendi è causata dall\'uomo. Bastano poche regole per proteggere i nostri boschi.',
        mainIcon: 'fa-fire',
        content: [
            { title: 'Prevenzione', icon: 'fa-circle-exclamation', points: ['Non gettare mozziconi di sigaretta o fiammiferi accesi.', 'Non accendere fuochi nelle aree boschive, se non negli spazi attrezzati.', 'Non parcheggiare l\'auto su erba secca, la marmitta calda può innescare un incendio.', 'Pulisci il tuo terreno da sterpaglie e materiale infiammabile.', 'Segnala immediatamente ogni principio di incendio al 115 o al 1515.'] },
            { title: 'Se sei vicino a un Incendio', icon: 'fa-wind', points: ['Allontanati subito, dando le spalle al vento per non essere investito dal fumo.', 'Se il fumo è denso, respira attraverso un panno bagnato.', 'Non cercare di attraversare il fronte del fuoco.', 'Se sei in auto, chiudi i finestrini e cerca un luogo sicuro e sgombro da vegetazione.', 'Rifugiati in un edificio o in un\'area già percorsa dal fuoco.'] },
            { title: 'Dopo l\'Incendio', icon: 'fa-seedling', points: ['Rispetta i divieti di accesso alle aree percorse dal fuoco.', 'Fai attenzione al rischio di caduta di alberi o smottamenti.', 'Non disperdere nell\'ambiente le ceneri, possono essere inquinanti.', 'Sostieni le campagne di rimboschimento e riqualificazione.', 'Collabora con le associazioni di volontariato per la tutela del territorio.'] }
        ]
    },
    {
        slug: 'sicurezza-casa',
        title: 'Sicurezza in Casa',
        subtitle: 'La tua casa è il tuo rifugio. Rendila un luogo sicuro con poche e semplici attenzioni.',
        mainIcon: 'fa-house-lock',
        content: [
            { title: 'Impianto Elettrico', icon: 'fa-bolt', points: ['Non sovraccaricare le prese elettriche con troppe spine.', 'Utilizza prese multiple (ciabatte) con marchio di qualità e interruttore.', 'Controlla periodicamente l\'integrità di cavi e spine.', 'Fai installare un interruttore differenziale (salvavita) e testalo regolarmente.'] },
            { title: 'Gas e Monossido', icon: 'fa-fire-burner', points: ['Assicurati che ci sia sempre una corretta ventilazione nei locali con apparecchi a gas.', 'Fai controllare la caldaia e i fumi da un tecnico specializzato ogni anno.', 'Chiudi il rubinetto del gas quando non usi gli apparecchi per lunghi periodi.', 'Installa rilevatori di monossido di carbonio, specialmente vicino alle camere da letto.'] },
            { title: 'Prevenzione Incendi', icon: 'fa-fire-extinguisher', points: ['Installa rilevatori di fumo e controlla le batterie periodicamente.', 'Tieni un estintore a portata di mano e impara ad usarlo.', 'Non lasciare mai candele accese incustodite.', 'Pulisci regolarmente la cappa della cucina dai residui di grasso.'] }
        ]
    },
    {
        slug: 'autoprotezione',
        title: 'Misure di Autoprotezione',
        subtitle: 'La protezione civile inizia da te. Un cittadino informato è una risorsa per tutta la comunità.',
        mainIcon: 'fa-person-shelter',
        content: [
            { title: 'Il Tuo Ruolo Attivo', icon: 'fa-user-check', points: ['Essere resilienti significa essere capaci di affrontare un\'emergenza riducendone l\'impatto. Per farlo, ogni cittadino ha un ruolo fondamentale.', 'Informati: Conosci i rischi del tuo territorio e il piano di protezione civile del tuo comune.', 'Preparati: Adotta le misure di prevenzione e prepara il tuo kit di emergenza.', 'Partecipa: Segui i canali di informazione ufficiali e diffondi solo notizie verificate.'] },
            { title: 'Fonti di Informazione', icon: 'fa-satellite-dish', points: ['In emergenza, le informazioni corrette sono vitali. Fai sempre riferimento a fonti ufficiali per evitare notizie false o allarmismi.', 'Sito e social del Dipartimento della Protezione Civile.', 'Sito e social della tua Regione e del tuo Comune.', 'Notiziari di radio e TV locali e nazionali.', 'Canali informativi della nostra associazione.'] }
        ]
    }
];

export const fetchPreventionArticleDetail = async (slug: string): Promise<PreventionArticleDetail | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const article = mockPreventionDetails.find(p => p.slug === slug);
            resolve(article);
        }, 600);
    });
};

// --- DONATION INFO ---
const mockDonationInfo: DonationInfo = {
    codiceFiscale: '98765432109',
    iban: 'IT60 X050 3401 6010 0000 0012 345',
    paypalLink: '#'
};

export const fetchDonationInfo = async (): Promise<DonationInfo> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockDonationInfo), 500);
    });
};

// --- CONTACT INFO ---
const mockContactInfo: ContactInfo = {
    addressLine1: "Via Lago Sant'Angelo, 9/1",
    addressLine2: "65129 Pescara PE",
    email: "volontarisenzafrontiere@yahoo.it",
    phone: "+39 012 345 6789"
};

export const fetchContactInfo = async (): Promise<ContactInfo> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockContactInfo), 400);
    });
};