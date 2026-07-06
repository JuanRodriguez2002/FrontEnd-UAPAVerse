/** Campos opcionales provenientes de la API UAPAverse */
export interface StandApiFields {
  categoryId?: number;
  categoryName?: string;
  categoryDescription?: string;
  developmentStatus?: string;
  maturityLevel?: string;
  technicalInfo?: string;
  commercialInfo?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactRole?: string;
  groupName?: string;
  registeredAt?: string;
}

/** Plantillas de proyectos — se usan para generar los stands del metaverso */
export interface StandTemplate extends StandApiFields {
  id: string;
  title: string;
  organization: string;
  career: string;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  videoUrl: string;
  demoUrl: string;
  gallery: string[];
  color: string;
}

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
];

const G = (i: number) => [
  GALLERY_POOL[i % GALLERY_POOL.length],
  GALLERY_POOL[(i + 1) % GALLERY_POOL.length],
  GALLERY_POOL[(i + 2) % GALLERY_POOL.length],
];

export const STAND_TEMPLATES: StandTemplate[] = [
  {
    id: "uapaverse",
    title: "UAPAverse",
    organization: "CADESOFT × UAPA",
    career: "Metaverso Educativo",
    shortDescription: "Metaverso educativo 3D navegable para la feria tecnológica UAPA.",
    detailedDescription:
      "UAPAverse es el metaverso oficial de la UAPA, desarrollado por CADESOFT. Permite explorar stands, ver videos y conversar con un asistente de IA por voz.",
    features: ["Entorno 3D navegable", "Stands interactivos", "Asistente IA", "Diseño cósmico", "React Three Fiber"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(1),
    color: "#00d4ff",
  },
  {
    id: "domotica-iot",
    title: "Domótica IoT ESP32",
    organization: "UAPA — Ing. Software",
    career: "Ingeniería en Software",
    shortDescription: "Automatización del hogar con microcontroladores ESP32 e internet.",
    detailedDescription:
      "Sistema de domótica con ESP32, sensores y actuadores controlados desde web o móvil, aplicando estándares de la industria IoT.",
    features: ["Control remoto", "ESP32", "Sensores", "Interfaz web", "Protocolos IoT"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    demoUrl: "https://uapa.edu.do",
    gallery: G(2),
    color: "#00d4ff",
  },
  {
    id: "cadesoft",
    title: "CADESOFT",
    organization: "CADESOFT",
    career: "Desarrollo de Software",
    shortDescription: "Soluciones educativas y plataformas digitales a medida.",
    detailedDescription:
      "CADESOFT desarrolla sistemas de gestión académica, apps web/móviles y experiencias inmersivas como UAPAverse para la UAPA.",
    features: ["Software a medida", "LMS", "Apps móviles", "Metaverso", "Consultoría digital"],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    demoUrl: "https://cadesoft.com.do",
    gallery: G(3),
    color: "#6b5bff",
  },
  {
    id: "educacion-virtual",
    title: "Educación Virtual",
    organization: "UAPA",
    career: "Educación a Distancia",
    shortDescription: "Plataforma de cursos en línea con evaluaciones integrales.",
    detailedDescription:
      "Modalidad virtual de la UAPA con videoconferencias, materiales multimedia, foros y evaluaciones automatizadas.",
    features: ["Cursos en línea", "Aulas virtuales", "Certificaciones", "Foros", "Multi-dispositivo"],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    demoUrl: "https://uapa.edu.do",
    gallery: G(4),
    color: "#00ffcc",
  },
  {
    id: "ia-educacion",
    title: "IA en Educación",
    organization: "UAPA × CADESOFT",
    career: "Inteligencia Artificial",
    shortDescription: "IA aplicada al aprendizaje personalizado y tutores virtuales.",
    detailedDescription:
      "Integración de modelos de IA generativa para tutores virtuales, asistentes de voz y personalización del aprendizaje.",
    features: ["Tutores IA", "Asistente de voz", "Personalización", "Análisis predictivo", "Gemini API"],
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    demoUrl: "https://uapa.edu.do",
    gallery: G(5),
    color: "#a78bfa",
  },
  {
    id: "innovacion",
    title: "Innovación Tecnológica",
    organization: "UAPA",
    career: "Investigación y Desarrollo",
    shortDescription: "Laboratorio de ideas y prototipos educativos.",
    detailedDescription:
      "Departamento de innovación que fomenta hackathons, incubadora de proyectos y colaboración con la industria.",
    features: ["Incubadora", "Hackathons", "Prototipado", "Industria", "Patentes"],
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(6),
    color: "#22d3ee",
  },
  {
    id: "ciberseguridad",
    title: "Ciberseguridad",
    organization: "UAPA",
    career: "Seguridad Informática",
    shortDescription: "Protección de datos y redes en entornos educativos.",
    detailedDescription:
      "Proyecto de auditoría de seguridad, firewalls, cifrado y buenas prácticas para proteger plataformas de la UAPA.",
    features: ["Auditoría", "Firewalls", "Cifrado", "Pentesting", "Capacitación"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    demoUrl: "https://uapa.edu.do",
    gallery: G(7),
    color: "#38bdf8",
  },
  {
    id: "blockchain",
    title: "Blockchain Educativo",
    organization: "UAPA",
    career: "Tecnologías Emergentes",
    shortDescription: "Certificados académicos verificables con blockchain.",
    detailedDescription:
      "Sistema de credenciales digitales inmutables para certificados y títulos de la universidad.",
    features: ["Certificados NFT", "Verificación", "Smart contracts", "Transparencia", "Web3"],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    demoUrl: "https://uapa.edu.do",
    gallery: G(8),
    color: "#818cf8",
  },
  {
    id: "realidad-aumentada",
    title: "Realidad Aumentada",
    organization: "CADESOFT",
    career: "Multimedia",
    shortDescription: "Experiencias AR para visualizar conceptos académicos.",
    detailedDescription:
      "App móvil que superpone modelos 3D y anotaciones sobre libros y laboratorios virtuales.",
    features: ["AR móvil", "Modelos 3D", "Marcadores", "Educación STEM", "Unity"],
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    demoUrl: "https://uapa.edu.do",
    gallery: G(9),
    color: "#c084fc",
  },
  {
    id: "big-data",
    title: "Big Data Analytics",
    organization: "UAPA",
    career: "Ciencia de Datos",
    shortDescription: "Análisis de datos académicos para mejorar la retención estudiantil.",
    detailedDescription:
      "Dashboards y modelos predictivos sobre rendimiento, asistencia y abandono estudiantil.",
    features: ["Dashboards", "Python", "Predicción", "Power BI", "ETL"],
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(10),
    color: "#2dd4bf",
  },
  {
    id: "app-movil-uapa",
    title: "App Móvil UAPA",
    organization: "CADESOFT",
    career: "Desarrollo Móvil",
    shortDescription: "Aplicación móvil para estudiantes con calificaciones y horarios.",
    detailedDescription:
      "App nativa/híbrida con notificaciones push, consulta de notas y mensajería con docentes.",
    features: ["iOS/Android", "Push", "Notas", "Horarios", "Mensajería"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(11),
    color: "#60a5fa",
  },
  {
    id: "cloud-campus",
    title: "Campus en la Nube",
    organization: "UAPA",
    career: "Cloud Computing",
    shortDescription: "Infraestructura cloud escalable para servicios universitarios.",
    detailedDescription:
      "Migración de servicios a la nube con alta disponibilidad, backups y monitoreo centralizado.",
    features: ["AWS/Azure", "Escalabilidad", "Backups", "DevOps", "Monitoreo"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    demoUrl: "https://uapa.edu.do",
    gallery: G(12),
    color: "#34d399",
  },
  {
    id: "robotica",
    title: "Robótica Educativa",
    organization: "UAPA",
    career: "Ingeniería en Software",
    shortDescription: "Brazos robóticos programables para enseñanza de automatización.",
    detailedDescription:
      "Kit de robótica con Arduino y sensores para prácticas de control y programación.",
    features: ["Arduino", "Sensores", "Brazo robótico", "Programación", "Automatización"],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    demoUrl: "https://uapa.edu.do",
    gallery: G(13),
    color: "#f472b6",
  },
  {
    id: "ecommerce",
    title: "E-Commerce UAPA",
    organization: "UAPA",
    career: "Negocios Digitales",
    shortDescription: "Tienda en línea para material académico y merchandising.",
    detailedDescription:
      "Plataforma de comercio electrónico integrada con pasarelas de pago y gestión de inventario.",
    features: ["Pasarelas de pago", "Inventario", "Carrito", "Facturación", "Logística"],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    demoUrl: "https://uapa.edu.do",
    gallery: G(14),
    color: "#fb923c",
  },
  {
    id: "gamedev",
    title: "Desarrollo de Videojuegos",
    organization: "UAPA",
    career: "Multimedia",
    shortDescription: "Videojuegos educativos para reforzar materias académicas.",
    detailedDescription:
      "Motor de juegos con mecánicas de gamificación aplicadas a matemáticas y ciencias.",
    features: ["Unity", "Gamificación", "3D", "Multijugador", "Educación"],
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    demoUrl: "https://uapa.edu.do",
    gallery: G(15),
    color: "#e879f9",
  },
  {
    id: "redes",
    title: "Redes y Telecomunicaciones",
    organization: "UAPA",
    career: "Redes",
    shortDescription: "Simulación y diseño de redes empresariales y campus.",
    detailedDescription:
      "Laboratorio virtual con Cisco Packet Tracer y configuración de VLANs, routing y Wi-Fi.",
    features: ["Cisco", "VLANs", "Routing", "Wi-Fi", "Simulación"],
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(16),
    color: "#4ade80",
  },
  {
    id: "biometria",
    title: "Biometría y Acceso",
    organization: "CADESOFT",
    career: "Seguridad Informática",
    shortDescription: "Control de acceso con huella y reconocimiento facial.",
    detailedDescription:
      "Sistema biométrico para aulas y laboratorios con registro de asistencia automático.",
    features: ["Huella", "Facial", "Asistencia", "Seguridad", "API REST"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    demoUrl: "https://uapa.edu.do",
    gallery: G(17),
    color: "#fbbf24",
  },
  {
    id: "erp-uapa",
    title: "ERP Universitario",
    organization: "CADESOFT",
    career: "Sistemas de Información",
    shortDescription: "ERP integral para gestión académica y administrativa.",
    detailedDescription:
      "Módulos de matrícula, finanzas, recursos humanos y reportes para la universidad.",
    features: ["Matrícula", "Finanzas", "RRHH", "Reportes", "Integración"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(18),
    color: "#94a3b8",
  },
  {
    id: "streaming",
    title: "Streaming Educativo",
    organization: "UAPA",
    career: "Comunicación Digital",
    shortDescription: "Plataforma de transmisión en vivo para clases y eventos.",
    detailedDescription:
      "Streaming de baja latencia con chat, grabación automática y subtítulos en tiempo real.",
    features: ["Live", "Grabación", "Chat", "Subtítulos", "CDN"],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    demoUrl: "https://uapa.edu.do",
    gallery: G(19),
    color: "#f87171",
  },
  {
    id: "sostenibilidad",
    title: "Campus Sostenible",
    organization: "UAPA",
    career: "Innovación Verde",
    shortDescription: "Monitoreo de consumo energético y huella de carbono del campus.",
    detailedDescription:
      "Sensores IoT para medir electricidad, agua y proponer acciones de sostenibilidad.",
    features: ["IoT", "Energía", "Sensores", "Dashboard", "Green IT"],
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    demoUrl: "https://uapa.edu.do",
    gallery: G(20),
    color: "#86efac",
  },
];
