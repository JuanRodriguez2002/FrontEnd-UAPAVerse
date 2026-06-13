export type AdminDashboardStats = {
  totalUsers: number;
  activeStands: number;
  interactions: number;
  pendingRequests: number;
  userGrowth: number;
  standGrowth: number;
  interactionGrowth: number;
  pendingGrowth: number;
};

export type AdminUserRole = "Administrador" | "Coordinador" | "Empresa" | "Presentador";
export type AdminUserStatus = "Activo" | "Pendiente" | "Baneado";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  lastActive: string;
};

export type AdminStandStatus = "Activo" | "Pendiente" | "Revisión";

export type AdminStand = {
  id: string;
  name: string;
  company: string;
  category: string;
  status: AdminStandStatus;
  visits: number;
  accent: "blue" | "purple" | "cyan";
};

export type AdminStandUpdateInput = {
  name: string;
  company: string;
  category: string;
};

export type AdminActivity = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "user" | "stand" | "security" | "system";
};

export type AdminActionResult = {
  success: boolean;
  message: string;
};

export const ADMIN_DASHBOARD_LOAD_ERROR = "ADMIN_DASHBOARD_LOAD_ERROR";

export type AdminIconKey =
  | "activity"
  | "clock"
  | "dashboard"
  | "interactions"
  | "projects"
  | "reports"
  | "security"
  | "settings"
  | "stand"
  | "users";

export type AdminMetricKey =
  | "totalUsers"
  | "activeStands"
  | "interactions"
  | "pendingRequests";

export type AdminGrowthKey =
  | "userGrowth"
  | "standGrowth"
  | "interactionGrowth"
  | "pendingGrowth";

export type AdminDashboardContent = {
  header: {
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    notificationsLabel: string;
    openMenuLabel: string;
    admin: {
      initials: string;
      name: string;
      role: string;
    };
  };
  sidebar: {
    logoSrc: string;
    logoAlt: string;
    brand: string;
    subtitle: string;
    navigationTitle: string;
    closeMenuLabel: string;
    closeSidebarLabel: string;
    navigation: Array<{
      id: string;
      label: string;
      icon: AdminIconKey;
      active: boolean;
    }>;
    futureModuleMessage: string;
    security: {
      title: string;
      label: string;
      value: string;
      progress: number;
    };
    logoutLabel: string;
  };
  metrics: {
    sectionId: string;
    comparisonLabel: string;
    items: Array<{
      key: AdminMetricKey;
      growthKey: AdminGrowthKey;
      label: string;
      icon: AdminIconKey;
      format: "integer" | "compact";
      tone: "blue" | "purple" | "cyan" | "orange";
    }>;
  };
  chart: {
    sectionId: string;
    eyebrow: string;
    title: string;
    description: string;
    optionsLabel: string;
    ariaLabel: string;
    areaPath: string;
    linePath: string;
    highlightPoints: Array<{ x: number; y: number }>;
    hours: string[];
    gridLines: number;
    summary: Array<{
      label: string;
      value: string;
      tone: "green" | "blue" | "purple" | "orange";
    }>;
  };
  recentActivity: {
    title: string;
    description: string;
    liveLabel: string;
    loadingRows: number;
  };
  users: {
    sectionId: string;
    title: string;
    description: string;
    viewAllLabel: string;
    columns: string[];
    availableRoles: AdminUserRole[];
    actionLabels: {
      changeRole: string;
      details: string;
      ban: string;
      more: string;
    };
    loadingRows: number;
  };
  stands: {
    sectionId: string;
    title: string;
    description: string;
    exploreLabel: string;
    visitsLabel: string;
    approvalStatus: AdminStandStatus;
    actionLabels: {
      approve: string;
      view: string;
      edit: string;
      delete: string;
    };
    loadingRows: number;
  };
  error: {
    message: string;
    retryLabel: string;
  };
  footer: {
    version: string;
    status: string;
  };
  toast: {
    title: string;
    closeLabel: string;
    duration: number;
  };
  modals: {
    common: {
      closeLabel: string;
      cancelLabel: string;
    };
    userDetails: {
      eyebrow: string;
      title: string;
      fields: Array<{ key: keyof AdminUser; label: string }>;
    };
    banUser: {
      eyebrow: string;
      title: string;
      description: string;
      confirmLabel: string;
    };
    standDetails: {
      eyebrow: string;
      title: string;
      fields: Array<{ key: keyof AdminStand; label: string }>;
    };
    editStand: {
      eyebrow: string;
      title: string;
      description: string;
      submitLabel: string;
      fields: Array<{
        key: keyof AdminStandUpdateInput;
        label: string;
        placeholder: string;
      }>;
    };
    deleteStand: {
      eyebrow: string;
      title: string;
      description: string;
      confirmLabel: string;
    };
    approveStand: {
      eyebrow: string;
      title: string;
      description: string;
      confirmLabel: string;
    };
  };
};

const stats: AdminDashboardStats = {
  totalUsers: 12840,
  activeStands: 156,
  interactions: 482900,
  pendingRequests: 24,
  userGrowth: 12.5,
  standGrowth: 8.2,
  interactionGrowth: 18.7,
  pendingGrowth: -6.4,
};

const users: AdminUser[] = [
  {
    id: "USR-2048",
    name: "María Rodríguez",
    email: "maria.rodriguez@uapa.edu.do",
    initials: "MR",
    role: "Coordinador",
    status: "Activo",
    lastActive: "Ahora",
  },
  {
    id: "USR-2047",
    name: "Carlos Méndez",
    email: "carlos@novatech.do",
    initials: "CM",
    role: "Empresa",
    status: "Activo",
    lastActive: "Hace 8 min",
  },
  {
    id: "USR-2046",
    name: "Laura Santos",
    email: "laura.santos@uapa.edu.do",
    initials: "LS",
    role: "Presentador",
    status: "Pendiente",
    lastActive: "Hace 24 min",
  },
  {
    id: "USR-2045",
    name: "Diego Guzmán",
    email: "diego@virtual-labs.io",
    initials: "DG",
    role: "Empresa",
    status: "Activo",
    lastActive: "Hace 1 h",
  },
];

const stands: AdminStand[] = [
  {
    id: "STD-031",
    name: "AI Learning Hub",
    company: "Facultad de Ingeniería UAPA",
    category: "Inteligencia artificial",
    status: "Pendiente",
    visits: 0,
    accent: "blue",
  },
  {
    id: "STD-087",
    name: "NovaTech Immersive",
    company: "NovaTech Dominicana",
    category: "Realidad extendida",
    status: "Activo",
    visits: 1842,
    accent: "purple",
  },
  {
    id: "STD-102",
    name: "Cyber Defense Lab",
    company: "Virtual Labs",
    category: "Ciberseguridad",
    status: "Revisión",
    visits: 956,
    accent: "cyan",
  },
];

const activity: AdminActivity[] = [
  {
    id: "ACT-401",
    title: "Nuevo stand enviado",
    description: "AI Learning Hub espera aprobación.",
    time: "Hace 4 min",
    type: "stand",
  },
  {
    id: "ACT-400",
    title: "Rol actualizado",
    description: "María Rodríguez ahora es Coordinador.",
    time: "Hace 18 min",
    type: "user",
  },
  {
    id: "ACT-399",
    title: "Control de seguridad completado",
    description: "No se detectaron amenazas en el sistema.",
    time: "Hace 42 min",
    type: "security",
  },
  {
    id: "ACT-398",
    title: "Pico de actividad registrado",
    description: "3,820 visitantes conectados simultáneamente.",
    time: "Hace 1 h",
    type: "system",
  },
];

const content: AdminDashboardContent = {
  header: {
    eyebrow: "Centro de comando",
    title: "Dashboard Admin",
    description: "Control global y monitoreo en tiempo real de UAPAVerse.",
    searchPlaceholder: "Buscar en el sistema...",
    notificationsLabel: "Notificaciones",
    openMenuLabel: "Abrir menú",
    admin: {
      initials: "AG",
      name: "Admin General",
      role: "Super admin",
    },
  },
  sidebar: {
    logoSrc: "/images/image.png",
    logoAlt: "UAPAVerse",
    brand: "UAPAVERSE",
    subtitle: "Admin control",
    navigationTitle: "Navegación",
    closeMenuLabel: "Cerrar menú",
    closeSidebarLabel: "Cerrar sidebar",
    navigation: [
      { id: "dashboard", label: "Dashboard Admin", icon: "dashboard", active: true },
      { id: "users", label: "Gestión de usuarios", icon: "users", active: false },
      { id: "stands", label: "Gestión de stands", icon: "stand", active: false },
      { id: "projects", label: "Gestión de proyectos", icon: "projects", active: false },
      { id: "reports", label: "Reportes y estadísticas", icon: "reports", active: false },
      { id: "security", label: "Seguridad", icon: "security", active: false },
      { id: "settings", label: "Configuración", icon: "settings", active: false },
    ],
    futureModuleMessage: "Módulo preparado para futura integración",
    security: {
      title: "Sistema protegido",
      label: "Estado general",
      value: "Óptimo",
      progress: 94,
    },
    logoutLabel: "Cerrar sesión",
  },
  metrics: {
    sectionId: "vista-general",
    comparisonLabel: "vs. período anterior",
    items: [
      { key: "totalUsers", growthKey: "userGrowth", label: "Usuarios totales", icon: "users", format: "integer", tone: "blue" },
      { key: "activeStands", growthKey: "standGrowth", label: "Stands activos", icon: "stand", format: "integer", tone: "purple" },
      { key: "interactions", growthKey: "interactionGrowth", label: "Interacciones", icon: "interactions", format: "compact", tone: "cyan" },
      { key: "pendingRequests", growthKey: "pendingGrowth", label: "Solicitudes pendientes", icon: "clock", format: "integer", tone: "orange" },
    ],
  },
  chart: {
    sectionId: "actividad",
    eyebrow: "Live analytics",
    title: "Actividad global de la feria",
    description: "Interacciones y visitantes durante las últimas 12 horas.",
    optionsLabel: "Más opciones",
    ariaLabel: "Gráfica de actividad",
    areaPath: "M0 196 C70 190 80 155 145 165 S230 206 290 141 S385 95 435 116 S530 159 590 89 S680 45 800 36 L800 250 L0 250 Z",
    linePath: "M0 196 C70 190 80 155 145 165 S230 206 290 141 S385 95 435 116 S530 159 590 89 S680 45 800 36",
    highlightPoints: [{ x: 590, y: 89 }, { x: 800, y: 36 }],
    hours: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
    gridLines: 5,
    summary: [
      { label: "Visitantes online", value: "3,820", tone: "green" },
      { label: "Sesiones activas", value: "1,295", tone: "blue" },
      { label: "Tiempo promedio", value: "18m 24s", tone: "purple" },
      { label: "Tasa de retorno", value: "68.4%", tone: "orange" },
    ],
  },
  recentActivity: {
    title: "Actividad reciente",
    description: "Eventos importantes del sistema.",
    liveLabel: "En vivo",
    loadingRows: 4,
  },
  users: {
    sectionId: "usuarios",
    title: "Gestión de usuarios",
    description: "Control de roles, acceso y perfiles.",
    viewAllLabel: "Ver todos",
    columns: ["Usuario", "Rol", "Estado", "Actividad", "Acciones"],
    availableRoles: ["Administrador", "Coordinador", "Empresa", "Presentador"],
    actionLabels: {
      changeRole: "Cambiar rol de",
      details: "Ver detalles",
      ban: "Banear usuario",
      more: "Más acciones",
    },
    loadingRows: 4,
  },
  stands: {
    sectionId: "stands",
    title: "Gestión de stands",
    description: "Aprobación y moderación de espacios.",
    exploreLabel: "Explorar",
    visitsLabel: "visitas",
    approvalStatus: "Pendiente",
    actionLabels: {
      approve: "Aprobar stand",
      view: "Ver stand",
      edit: "Editar stand",
      delete: "Eliminar stand inapropiado",
    },
    loadingRows: 3,
  },
  error: {
    message: "No pudimos cargar el panel administrativo. Intenta nuevamente.",
    retryLabel: "Reintentar",
  },
  footer: {
    version: "UAPAVerse Admin System · v1.0",
    status: "Todos los sistemas operativos",
  },
  toast: {
    title: "Acción preparada",
    closeLabel: "Cerrar aviso",
    duration: 3200,
  },
  modals: {
    common: {
      closeLabel: "Cerrar modal",
      cancelLabel: "Cancelar",
    },
    userDetails: {
      eyebrow: "Perfil administrativo",
      title: "Detalles del usuario",
      fields: [
        { key: "id", label: "ID de usuario" },
        { key: "name", label: "Nombre completo" },
        { key: "email", label: "Correo electrónico" },
        { key: "role", label: "Rol asignado" },
        { key: "status", label: "Estado" },
        { key: "lastActive", label: "Última actividad" },
      ],
    },
    banUser: {
      eyebrow: "Control de acceso",
      title: "Confirmar bloqueo de usuario",
      description: "Esta acción restringirá el acceso del usuario a UAPAVerse. Podrá revertirse desde la futura gestión de usuarios.",
      confirmLabel: "Banear usuario",
    },
    standDetails: {
      eyebrow: "Información del stand",
      title: "Detalles del stand",
      fields: [
        { key: "id", label: "ID del stand" },
        { key: "name", label: "Nombre" },
        { key: "company", label: "Organización" },
        { key: "category", label: "Categoría" },
        { key: "status", label: "Estado" },
        { key: "visits", label: "Visitas registradas" },
      ],
    },
    editStand: {
      eyebrow: "Editor administrativo",
      title: "Editar stand",
      description: "Actualiza la información principal antes de guardar los cambios.",
      submitLabel: "Guardar cambios",
      fields: [
        { key: "name", label: "Nombre del stand", placeholder: "Nombre del stand" },
        { key: "company", label: "Organización", placeholder: "Nombre de la organización" },
        { key: "category", label: "Categoría", placeholder: "Categoría del stand" },
      ],
    },
    deleteStand: {
      eyebrow: "Moderación de contenido",
      title: "Confirmar eliminación del stand",
      description: "El stand será marcado como inapropiado y preparado para eliminación definitiva.",
      confirmLabel: "Eliminar stand",
    },
    approveStand: {
      eyebrow: "Validación administrativa",
      title: "Confirmar aprobación del stand",
      description: "El stand quedará aprobado y preparado para publicarse en la feria.",
      confirmLabel: "Aprobar stand",
    },
  },
};

const simulateApiResponse = async <T>(data: T): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return structuredClone(data);
};

const simulateAdminAction = async (message: string): Promise<AdminActionResult> => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return { success: true, message };
};

export async function getAdminDashboardStats() {
  return simulateApiResponse(stats);
}

export async function getAdminUsers() {
  return simulateApiResponse(users);
}

export async function getAdminStands() {
  return simulateApiResponse(stands);
}

export async function getRecentAdminActivity() {
  return simulateApiResponse(activity);
}

export async function getAdminDashboardContent() {
  return simulateApiResponse(content);
}

export async function updateAdminUserRole(userId: string, role: AdminUserRole) {
  return simulateAdminAction(`Rol de ${userId} actualizado a ${role}.`);
}

export async function disableAdminUser(userId: string) {
  return simulateAdminAction(`Usuario ${userId} baneado correctamente.`);
}

export async function getAdminUserDetails(userId: string) {
  return simulateAdminAction(`Detalles de ${userId} preparados para visualizar.`);
}

export async function getAdminStandDetails(standId: string) {
  return simulateAdminAction(`Detalles del stand ${standId} preparados para visualizar.`);
}

export async function approveStand(standId: string) {
  return simulateAdminAction(`Stand ${standId} aprobado correctamente.`);
}

export async function prepareStandEditor(standId: string, update: AdminStandUpdateInput) {
  return simulateAdminAction(`Cambios de ${update.name} preparados para el stand ${standId}.`);
}

export async function markStandForDeletion(standId: string) {
  return simulateAdminAction(`Stand ${standId} marcado para eliminación.`);
}
