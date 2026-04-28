import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  de: {
    dashboard: "Dashboard",
    timeTracking: "Zeiterfassung",
    projects: "Projekte",
    tasks: "Aufgaben",
    calendar: "Kalender",
    leave: "Urlaub",
    documents: "Dokumente",
    tickets: "Tickets",
    team: "Mitarbeiter",
    reports: "Auswertungen",
    settings: "Einstellungen",
    searchPlaceholder: "Suche nach Projekten, Aufgaben, Personen...",
    welcomeBack: "Willkommen zurück im",
    central: "Zentrale",
    sunny: "Sonnig",
    quickAccess: "Schnellzugriff",
    timeLog: "Zeit erfassen",
    requestLeave: "Urlaub beantragen",
    docs: "Dokumente",
    report: "Meldung",
    news: "Unternehmensnachrichten",
    viewAll: "Alle ansehen",
    importantLinks: "Wichtige Links",
    employeePortal: "Mitarbeiter-Portal",
    allInfo: "Alle Informationen an einem Ort",
    openNow: "Jetzt öffnen",
    activeProjects: "Aktive Projekte",
    openTasks: "Offene Aufgaben",
    totalHours: "Gesamtstunden",
    loading: "Lade...",
    connectionError: "Verbindungsfehler",
    serverOffline: "Server Offline - Verbindung zum Backend konnte nicht hergestellt werden.",
    retry: "Erneut versuchen",
    manualEntry: "Nachträgliche Zeiterfassung",
    date: "Datum",
    duration: "Dauer (Stunden)",
    description: "Tätigkeitsbeschreibung",
    projectCostCenter: "Projekt / Kostenstelle",
    saveEntry: "Eintrag speichern",
    recentLogs: "Letzte Zeitbuchungen",
    status: "Status",
    actions: "Aktionen",
    pending: "Ausstehend",
    approved: "Genehmigt",
    export: "Export (CSV)",
    saved: "Gespeichert!",
    noLogs: "Keine Zeitbuchungen gefunden.",
    loadingLogs: "Lade Buchungen...",
    execute: "Ausführen",
    readMore: "Mehr lesen",
    noNews: "Keine Neuigkeiten verfügbar.",
    timeLogDesc: "Erfassen Sie Ihre tägliche Arbeitszeit und Projektstunden.",
    leaveDesc: "Reichen Sie neue Urlaubsanträge oder Abwesenheiten ein.",
    docsDesc: "Greifen Sie auf Ihre Lohnabrechnungen und Verträge zu.",
    reportDesc: "Melden Sie Zwischenfälle oder technische Probleme.",
    safety: "Arbeitsschutz",
    logistics: "Logistik",
    plan: "Lageplan",
    contacts: "Kontakte",
    reports_link: "Berichte",
    tech: "Technik",
    whatDidYouDo: "Was haben Sie heute getan?",
    featureOptimizing: "Diese Funktion wird aktuell für das DLC Enterprise Portal optimiert.",
    comingSoon: "Steht in Kürze zur Verfügung."
  },
  en: {
    dashboard: "Dashboard",
    timeTracking: "Time Tracking",
    projects: "Projects",
    tasks: "Tasks",
    calendar: "Calendar",
    leave: "Leave",
    documents: "Documents",
    tickets: "Tickets",
    team: "Team",
    reports: "Reports",
    settings: "Settings",
    searchPlaceholder: "Search for projects, tasks, people...",
    welcomeBack: "Welcome back to",
    central: "Headquarters",
    sunny: "Sunny",
    quickAccess: "Quick Access",
    timeLog: "Track Time",
    requestLeave: "Request Leave",
    docs: "Documents",
    report: "Report",
    news: "Company News",
    viewAll: "View All",
    importantLinks: "Important Links",
    employeePortal: "Employee Portal",
    allInfo: "All information in one place",
    openNow: "Open Now",
    activeProjects: "Active Projects",
    openTasks: "Open Tasks",
    totalHours: "Total Hours",
    loading: "Loading...",
    connectionError: "Connection Error",
    serverOffline: "Server Offline - Could not connect to backend.",
    retry: "Retry",
    manualEntry: "Manual Time Tracking",
    date: "Date",
    duration: "Duration (Hours)",
    description: "Task Description",
    projectCostCenter: "Project / Cost Center",
    saveEntry: "Save Entry",
    recentLogs: "Recent Time Logs",
    status: "Status",
    actions: "Actions",
    pending: "Pending",
    approved: "Approved",
    export: "Export (CSV)",
    saved: "Saved!",
    noLogs: "No time logs found.",
    loadingLogs: "Loading logs...",
    execute: "Execute",
    readMore: "Read more",
    noNews: "No news available.",
    timeLogDesc: "Record your daily working time and project hours.",
    leaveDesc: "Submit new leave requests or absences.",
    docsDesc: "Access your payslips and contracts.",
    reportDesc: "Report incidents or technical problems.",
    safety: "Safety",
    logistics: "Logistics",
    plan: "Site Plan",
    contacts: "Contacts",
    reports_link: "Reports",
    tech: "Technology",
    whatDidYouDo: "What did you do today?",
    featureOptimizing: "This feature is currently being optimized for the DLC Enterprise Portal.",
    comingSoon: "Will be available shortly."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'de');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
