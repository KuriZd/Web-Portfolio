import rentitImage from "../assets/projects/rentit-app.png";
import multimodalImage from "../assets/projects/multimodal-tutor-system.png";
import damiansPosImage from "../assets/projects/damians-pos-desktop.png";
import aboutMeImage from "../assets/projects/about-me-android.jpg";
import webPortfolioImage from "../assets/projects/web-portfolio.png";
import techaniImage from "../assets/projects/techani.png";

export const projects = [
  {
    id: "rentit-app",
    title: "RentIt App",
    category: "Mobile App",
    image: rentitImage,
    shortDescription:
      "Aplicación móvil para publicar, rentar y calificar artículos dentro de un ecosistema colaborativo.",
    description:
      "RentIt es una aplicación móvil desarrollada para facilitar la renta temporal de artículos entre usuarios. Permite publicar productos con fotos, descripción, costo y disponibilidad, además de gestionar rentas, aprobaciones, historial de usuario, reseñas y autenticación segura con Supabase.",
    tech: ["React Native", "Expo", "NativeWind", "Supabase", "Flask"],
    features: [
      "Publicación de artículos con fotos, descripción, costo y disponibilidad",
      "Flujo de renta con validación de costo y aprobación del arrendador",
      "Sistema de reseñas y calificaciones para artículos y arrendadores",
      "Autenticación con Supabase e integración con servicios Flask",
    ],
    role: "Desarrollo mobile, UI responsive, integración con Supabase, flujo de renta y conexión con backend complementario.",
    demoUrl: null,
    githubUrl: "https://github.com/KuriZd/RentIt_app",
    visual: {
      accent: "from-cyan-400 via-blue-500 to-indigo-500",
      grid: "bg-[radial-gradient(circle_at_24%_20%,rgba(34,211,238,0.42),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.36),transparent_24%),linear-gradient(135deg,#07111f,#101827_48%,#05070d)]",
    },
  },
  {
    id: "multimodal-tutor-system",
    title: "Multimodal Tutor’s System",
    category: "Full-stack App",
    image: multimodalImage,
    shortDescription:
      "Sistema web para gestión de tutorías académicas, tutorados, asistencias, reportes y seguimiento estudiantil.",
    description:
      "Multimodal Tutor’s System es una plataforma full-stack para la administración de grupos de tutoría, tutorados, ciclos escolares, asistencias semanales y necesidades especiales. Incluye funcionalidades basadas en roles para tutores y estudiantes, reportes por grupo, edición de perfiles y seguimiento de actividades académicas.",
    tech: ["React", "Vite", "TailwindCSS", "Laravel 11", "Sanctum"],
    features: [
      "Gestión de grupos, tutorados, tutores y ciclos escolares",
      "Control de asistencia semanal y cálculo de porcentajes por grupo",
      "Seguimiento de necesidades especiales en áreas como Psicología y Enfermería",
      "API RESTful con Laravel Sanctum, Eloquent ORM y validaciones",
    ],
    role: "Desarrollo full-stack, integración de API REST, diseño responsive, gestión de vistas dinámicas y lógica de reportes académicos.",
    demoUrl: null,
    githubUrl: "https://github.com/KuriZd/Multimodal_Tutor-sSystem",
    visual: {
      accent: "from-emerald-300 via-cyan-400 to-sky-500",
      grid: "bg-[radial-gradient(circle_at_30%_24%,rgba(16,185,129,0.38),transparent_24%),radial-gradient(circle_at_75%_70%,rgba(14,165,233,0.32),transparent_28%),linear-gradient(135deg,#061417,#0f172a_54%,#05070d)]",
    },
  },
  {
    id: "damians-pos-desktop",
    title: "Damian’s POS Desktop",
    category: "Desktop App",
    image: damiansPosImage,
    shortDescription:
      "Sistema POS de escritorio con ventas, productos, servicios, inventario, usuarios y sincronización con Supabase.",
    description:
      "Damian’s POS Desktop es una aplicación de escritorio para punto de venta construida con Electron, React y TypeScript. Opera con SQLite local y sincroniza el catálogo con Supabase, integrando módulos de login, dashboard, productos, servicios, inventario, ventas, usuarios, roles y KPIs de negocio.",
    tech: ["Electron", "React", "TypeScript", "SQLite", "Supabase"],
    features: [
      "Arquitectura local-first con SQLite, IPC y preload bridge seguro",
      "Módulos de ventas, productos, servicios, inventario, usuarios y dashboard",
      "Sincronización pull-only de catálogo remoto desde Supabase",
      "Control de roles, sesión persistida, descuentos, métodos de pago y KPIs",
    ],
    role: "Arquitectura Electron, desarrollo frontend con React, comunicación IPC, base de datos local, sincronización remota y diseño de módulos POS.",
    demoUrl: null,
    githubUrl: "https://github.com/KuriZd/Damians-POS_Desktop",
    visual: {
      accent: "from-amber-300 via-orange-400 to-rose-500",
      grid: "bg-[radial-gradient(circle_at_18%_24%,rgba(251,191,36,0.36),transparent_22%),radial-gradient(circle_at_78%_30%,rgba(249,115,22,0.32),transparent_28%),linear-gradient(135deg,#160d08,#111827_50%,#06070b)]",
    },
  },
  {
    id: "about-me-android",
    title: "About Me Android",
    category: "Android App",
    image: aboutMeImage,
    shortDescription:
      "Portafolio móvil nativo en Android con perfil profesional, habilidades, proyectos, contacto e integración con Spotify.",
    description:
      "About Me Android es una aplicación nativa desarrollada en Kotlin con Jetpack Compose. Presenta un perfil profesional bilingüe con secciones de habilidades, experiencia, proyectos y contacto, además de una interfaz moderna basada en Material Design 3 e integración con Spotify para mostrar información musical.",
    tech: ["Kotlin", "Jetpack Compose", "Material 3", "Retrofit", "Coil"],
    features: [
      "Interfaz nativa con Jetpack Compose y Material Design 3",
      "Soporte bilingüe ES/EN para la presentación profesional",
      "Secciones de perfil, habilidades, experiencia, proyectos y contacto",
      "Integración con Spotify usando autenticación, Retrofit y carga de imágenes con Coil",
    ],
    role: "Desarrollo Android nativo, diseño de UI con Compose, estructura de contenido profesional e integración con servicios externos.",
    demoUrl: null,
    githubUrl: "https://github.com/KuriZd/about-me_android",
    visual: {
      accent: "from-violet-400 via-purple-500 to-fuchsia-500",
      grid: "bg-[radial-gradient(circle_at_28%_18%,rgba(139,92,246,0.36),transparent_24%),radial-gradient(circle_at_74%_62%,rgba(217,70,239,0.32),transparent_28%),linear-gradient(135deg,#0b0713,#111827_48%,#05070d)]",
    },
  },
  {
    id: "web-portfolio",
    title: "Web Portfolio",
    category: "Creative Website",
    image: webPortfolioImage,
    shortDescription:
      "Portafolio web personal con secciones profesionales, animaciones, proyectos destacados y experiencia visual moderna.",
    description:
      "Web Portfolio es un sitio personal desarrollado para presentar perfil profesional, tecnologías, proyectos y medios de contacto en una experiencia visual moderna. Integra una pantalla de introducción animada, navegación por secciones, componentes reutilizables, fondo dinámico con Three.js y una sección de proyectos con interacción mediante modales.",
    tech: ["React", "Vite", "TailwindCSS", "Motion", "Three.js"],
    features: [
      "Pantalla de introducción animada con transiciones suaves",
      "Hero profesional con enlaces sociales, stack tecnológico y llamadas a la acción",
      "Sección de proyectos destacados con tarjetas interactivas y modal de detalle",
      "Fondo visual dinámico con shaders usando Three.js",
    ],
    role: "Diseño visual, desarrollo frontend, animaciones, estructura de componentes y optimización de experiencia de usuario.",
    demoUrl: "https://kuri-zd-p.vercel.app/",
    githubUrl: "https://github.com/KuriZd/Web-Portfolio",
    visual: {
      accent: "from-cyan-300 via-indigo-400 to-purple-500",
      grid: "bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,0.36),transparent_24%),radial-gradient(circle_at_74%_62%,rgba(168,85,247,0.34),transparent_28%),linear-gradient(135deg,#070b13,#111827_48%,#05070d)]",
    },
  },
  {
    id: "techani",
    title: "Techani 2",
    category: "HealthTech Platform",
    image: techaniImage,
    shortDescription:
      "Sistema de gestión, registro y seguimiento para pacientes con diabetes tipo 1.",
    description:
      "Techani 2 es un sistema enfocado en la gestión, registro y seguimiento de pacientes con diabetes tipo 1. La plataforma está orientada al monitoreo de información relevante para el control del paciente, permitiendo organizar registros, dar seguimiento a datos de salud y apoyar la visualización de información útil para el acompañamiento del tratamiento.",
    tech: ["React", "Supabase", "TailwindCSS", "ApexCharts", "JavaScript"],
    features: [
      "Registro y seguimiento de información relacionada con pacientes con diabetes tipo 1",
      "Panel de análisis dinámico para visualizar registros y patrones de seguimiento",
      "Integración con base de datos para consulta y sincronización de información",
      "Interfaz responsiva enfocada en usabilidad y claridad para el monitoreo de datos",
    ],
    role: "Desarrollo frontend, diseño de interfaz, integración con base de datos, visualización de datos y construcción de módulos de seguimiento.",
    demoUrl: "https://www.techani.net/",
    githubUrl: null,
    visual: {
      accent: "from-sky-300 via-cyan-400 to-emerald-400",
      grid: "bg-[radial-gradient(circle_at_22%_20%,rgba(14,165,233,0.38),transparent_25%),radial-gradient(circle_at_78%_68%,rgba(16,185,129,0.32),transparent_28%),linear-gradient(135deg,#06111f,#0f172a_52%,#05070d)]",
    },
  },
];
