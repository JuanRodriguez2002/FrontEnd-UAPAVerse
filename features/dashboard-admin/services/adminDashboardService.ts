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
  resources?: BackendProjectResource[];
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

export type AdminPlaceholderKey = "proyectos" | "reportes" | "seguridad" | "configuracion";

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
      href: string;
      icon: AdminIconKey;
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
  placeholders: Record<
    AdminPlaceholderKey,
    {
      eyebrow: string;
      title: string;
      description: string;
      icon: AdminIconKey;
    }
  >;
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
    logoSrc: "/images/logo-uapaverse.PNG",
    logoAlt: "UAPAVerse",
    brand: "UAPAVERSE",
    subtitle: "Admin control",
    navigationTitle: "Navegación",
    closeMenuLabel: "Cerrar menú",
    closeSidebarLabel: "Cerrar sidebar",
    navigation: [
      { id: "dashboard", label: "Dashboard Admin", href: "/dashboard-admin", icon: "dashboard" },
      { id: "users", label: "Gestión de usuarios", href: "/dashboard-admin/usuarios", icon: "users" },
      { id: "stands", label: "Gestión de stands", href: "/dashboard-admin/stands", icon: "stand" },
      { id: "projects", label: "Gestión de proyectos", href: "/dashboard-admin/proyectos", icon: "projects" },
      { id: "reports", label: "Reportes y estadísticas", href: "/dashboard-admin/reportes", icon: "reports" },
      { id: "security", label: "Seguridad", href: "/dashboard-admin/seguridad", icon: "security" },
      { id: "settings", label: "Configuración", href: "/dashboard-admin/configuracion", icon: "settings" },
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
  placeholders: {
    proyectos: {
      eyebrow: "Gestión de proyectos",
      title: "Módulo de proyectos preparado",
      description: "Este espacio queda reservado para integrar el flujo administrativo de proyectos.",
      icon: "projects",
    },
    reportes: {
      eyebrow: "Reportes y estadísticas",
      title: "Módulo de reportes preparado",
      description: "Este espacio queda reservado para integrar analíticas, exportaciones y seguimiento ejecutivo.",
      icon: "reports",
    },
    seguridad: {
      eyebrow: "Seguridad",
      title: "Módulo de seguridad preparado",
      description: "Este espacio queda reservado para integrar políticas de acceso, auditoría y controles de protección.",
      icon: "security",
    },
    configuracion: {
      eyebrow: "Configuración",
      title: "Módulo de configuración preparado",
      description: "Este espacio queda reservado para integrar parámetros globales, preferencias y ajustes del sistema.",
      icon: "settings",
    },
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

const ADMIN_API_BASE_URL = "https://backend-uapaverse.onrender.com/api/uapaverse";

type BackendRoleName = "ADMIN" | "ACADEMICO" | "EMPRESARIO" | "EXPOSITOR";

type BackendRole = {
  id: number;
  name_rol: BackendRoleName | string;
};

type BackendUser = {
  id: number | string;
  name_usuario?: string | null;
  email_usuario?: string | null;
  rol_id?: number | null;
  role?: BackendRole | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type BackendCategory = {
  id: number;
  name_categoria?: string | null;
};

export type BackendProjectResource = {
  id?: number | string;
  name_recurso?: string | null;
  type_recurso?: string | null;
  route_recurso?: string | null;
};

type BackendProject = {
  id: number | string;
  name_proyecto?: string | null;
  descripcion_proyecto?: string | null;
  estado_proyecto?: string | null;
  nombre_grupo?: string | null;
  id_categoria?: number | string | null;
  category?: BackendCategory | null;
  resources?: BackendProjectResource[] | null;
};

const backendRoleToAdminRole: Record<BackendRoleName, AdminUserRole> = {
  ADMIN: "Administrador",
  ACADEMICO: "Coordinador",
  EMPRESARIO: "Empresa",
  EXPOSITOR: "Presentador",
};

const fallbackRoleIds: Record<AdminUserRole, number> = {
  Administrador: 1,
  Coordinador: 2,
  Empresa: 3,
  Presentador: 4,
};

const standAccents: AdminStand["accent"][] = ["blue", "purple", "cyan"];

let cachedRoles: BackendRole[] | null = null;
let cachedCategories: BackendCategory[] | null = null;

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function adminApiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Admin API error ${response.status} for ${path}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function ensureArray<T>(data: T[] | { data?: T[] }): T[] {
  return Array.isArray(data) ? data : data.data ?? [];
}

function normalizeBackendRole(role?: string | null): BackendRoleName | null {
  if (!role) return null;
  const normalized = role.trim().toUpperCase();
  if (normalized in backendRoleToAdminRole) return normalized as BackendRoleName;
  return null;
}

function mapBackendRoleToAdminRole(role?: string | null): AdminUserRole {
  const normalizedRole = normalizeBackendRole(role);
  return normalizedRole ? backendRoleToAdminRole[normalizedRole] : "Presentador";
}

function getInitials(name: string): string {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials.toUpperCase() || "US";
}

function formatDateTime(value?: string | null): string {
  if (!value) return "No disponible";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-DO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function mapBackendUser(user: BackendUser): AdminUser {
  const name = user.name_usuario?.trim() || "Usuario sin nombre";

  return {
    id: String(user.id),
    name,
    email: user.email_usuario?.trim() || "Correo no disponible",
    initials: getInitials(name),
    role: mapBackendRoleToAdminRole(user.role?.name_rol),
    status: "Activo",
    lastActive: formatDateTime(user.created_at),
  };
}

function mapBackendProjectStatus(status?: string | null): AdminStandStatus {
  const normalized = status?.trim().toUpperCase();

  if (normalized === "APROBADO" || normalized === "ACTIVO") return "Activo";
  if (normalized === "PENDIENTE") return "Pendiente";

  return "Revisión";
}

function mapBackendProject(project: BackendProject, index = 0): AdminStand {
  return {
    id: String(project.id),
    name: project.name_proyecto?.trim() || "Proyecto sin nombre",
    company: project.nombre_grupo?.trim() || "Organización no disponible",
    category: project.category?.name_categoria?.trim() || "Sin categoría",
    status: mapBackendProjectStatus(project.estado_proyecto),
    resources: project.resources ?? [],
    visits: 0,
    accent: standAccents[index % standAccents.length],
  };
}

async function getBackendRoles(): Promise<BackendRole[]> {
  if (cachedRoles) return cachedRoles;

  const roles = ensureArray(await adminApiRequest<BackendRole[] | { data?: BackendRole[] }>("/role/list"));
  cachedRoles = roles;

  return roles;
}

async function getBackendCategories(): Promise<BackendCategory[]> {
  if (cachedCategories) return cachedCategories;

  const categories = ensureArray(
    await adminApiRequest<BackendCategory[] | { data?: BackendCategory[] }>("/category/list"),
  );
  cachedCategories = categories;

  return categories;
}

async function resolveRoleId(role: AdminUserRole): Promise<number> {
  const roles = await getBackendRoles();
  const backendRole = roles.find((item) => mapBackendRoleToAdminRole(item.name_rol) === role);

  return backendRole?.id ?? fallbackRoleIds[role];
}

async function resolveCategoryId(categoryName: string): Promise<number | undefined> {
  const categories = await getBackendCategories();
  const normalizedCategoryName = categoryName.trim().toUpperCase();
  const category = categories.find(
    (item) => item.name_categoria?.trim().toUpperCase() === normalizedCategoryName,
  );

  return category?.id;
}

export async function getAdminDashboardStats(
  adminUsers?: AdminUser[],
  adminStands?: AdminStand[],
): Promise<AdminDashboardStats> {
  const [usersFromApi, standsFromApi] =
    adminUsers && adminStands ? [adminUsers, adminStands] : await Promise.all([getAdminUsers(), getAdminStands()]);

  return {
    totalUsers: usersFromApi.length,
    activeStands: standsFromApi.length,
    interactions: 0,
    pendingRequests: 0,
    userGrowth: 0,
    standGrowth: 0,
    interactionGrowth: 0,
    pendingGrowth: 0,
  };
}

export async function getAdminUsers() {
  const backendUsers = ensureArray(
    await adminApiRequest<BackendUser[] | { data?: BackendUser[] }>("/user/list"),
  );

  return backendUsers.map(mapBackendUser);
}

export async function getAdminStands() {
  const backendProjects = ensureArray(
    await adminApiRequest<BackendProject[] | { data?: BackendProject[] }>("/project/list"),
  );

  return backendProjects.map(mapBackendProject);
}

export async function getRecentAdminActivity() {
  return simulateApiResponse(activity);
}

export async function getAdminDashboardContent() {
  const roles = await getBackendRoles();
  const availableRoles = roles.map((role) => mapBackendRoleToAdminRole(role.name_rol));

  return simulateApiResponse({
    ...content,
    users: {
      ...content.users,
      availableRoles: availableRoles.length ? availableRoles : content.users.availableRoles,
    },
  });
}

export async function updateAdminUserRole(userId: string, role: AdminUserRole) {
  const [user, roleId] = await Promise.all([
    adminApiRequest<BackendUser>(`/user/${userId}`),
    resolveRoleId(role),
  ]);

  await adminApiRequest<BackendUser>(`/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      name_usuario: user.name_usuario,
      email_usuario: user.email_usuario,
      rol_id: roleId,
    }),
  });

  return { success: true, message: `Rol de ${user.name_usuario ?? userId} actualizado a ${role}.` };
}

export async function disableAdminUser(userId: string) {
  return {
    success: false,
    message: `La acción de banear usuarios aún no está disponible en el backend. Usuario: ${userId}.`,
  };
}

export async function getAdminUserDetails(userId: string) {
  const user = mapBackendUser(await adminApiRequest<BackendUser>(`/user/${userId}`));
  return { success: true, message: `Detalles de ${user.name} cargados desde el backend.` };
}

export async function getAdminStandDetails(standId: string) {
  const stand = mapBackendProject(await adminApiRequest<BackendProject>(`/project/${standId}`));
  return { success: true, message: `Detalles del stand ${stand.name} cargados desde el backend.` };
}

export async function approveStand(standId: string) {
  await adminApiRequest<BackendProject>(`/project/${standId}`, {
    method: "PUT",
    body: JSON.stringify({
      estado_proyecto: "APROBADO",
    }),
  });

  return { success: true, message: `Stand ${standId} aprobado correctamente.` };
}

export async function prepareStandEditor(standId: string, update: AdminStandUpdateInput) {
  const currentProject = await adminApiRequest<BackendProject>(`/project/${standId}`);
  const categoryId = await resolveCategoryId(update.category);

  await adminApiRequest<BackendProject>(`/project/${standId}`, {
    method: "PUT",
    body: JSON.stringify({
      name_proyecto: update.name,
      nombre_grupo: update.company,
      id_categoria: categoryId ?? currentProject.id_categoria ?? currentProject.category?.id,
    }),
  });

  return { success: true, message: `Cambios de ${update.name} guardados en el backend.` };
}

export async function markStandForDeletion(standId: string) {
  await adminApiRequest<void>(`/project/${standId}`, {
    method: "DELETE",
  });

  return { success: true, message: `Stand ${standId} eliminado correctamente.` };
}
