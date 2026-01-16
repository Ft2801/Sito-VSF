export type Category = 'Interventi' | 'Esercitazioni' | 'Eventi' | 'Formazione';

export interface Service {
  id: number;
  title: string;
  description:string;
  imageUrl: string;
}

export interface NewsArticle {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
}

export interface PreventionArticle {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface PreventionContentSection {
  title: string;
  icon: string;
  points: string[];
}

export interface PreventionArticleDetail {
    slug: string;
    title: string;
    subtitle: string;
    mainIcon: string;
    content: PreventionContentSection[];
}


export interface Alert {
  id: number;
  level: 'green' | 'yellow' | 'orange' | 'red';
  type: 'Nazionale' | 'Regionale' | 'Locale';
  title: string;
  description: string;
  source: string;
  date: string;
}

// Tipi per la risposta dell'API OpenWeatherMap
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherApiResponse {
  weather: Weather[];
  main: MainWeatherData;
  name: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
}

export interface DonationInfo {
    codiceFiscale: string;
    iban: string;
    paypalLink: string;
}

export interface ContactInfo {
    addressLine1: string;
    addressLine2: string;
    email: string;
    phone: string;
}