export enum UserRole {
  ADMINSTRATOR = 'ADMINSTRATOR',
  MANAGER = 'MANAGER',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  REVIEW_STUDENT = 'REVIEW_STUDENT',
  MANAGER_CANDIDATE = 'MANAGER_CANDIDATE',
  TEACHER_CANDIDATE = 'TEACHER_CANDIDATE',
  STUDENT_CANDIDATE = 'STUDENT_CANDIDATE',
  REVIEW_STUDENT_CANDIDATE = 'REVIEW_STUDENT_CANDIDATE',
  HR_MANAGER = 'HR_MANAGER',
  ACADEMIC_MANAGER = 'ACADEMIC_MANAGER',
  PEDAGOGICAL_MANAGER = 'PEDAGOGICAL_MANAGER',
  IT_MANAGER = 'IT_MANAGER',
  MARKETING_MANAGER = 'MARKETING_MANAGER',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMINSTRATOR]: 'Administrador',
  [UserRole.MANAGER]: 'Gestor',
  [UserRole.TEACHER]: 'Professor',
  [UserRole.STUDENT]: 'Aluno',
  [UserRole.REVIEW_STUDENT]: 'Aluno de Revisão',
  [UserRole.MANAGER_CANDIDATE]: 'Candidato a Gestor',
  [UserRole.TEACHER_CANDIDATE]: 'Candidato a Professor',
  [UserRole.STUDENT_CANDIDATE]: 'Candidato a Aluno',
  [UserRole.REVIEW_STUDENT_CANDIDATE]: 'Candidato a Aluno de Revisão',
  [UserRole.HR_MANAGER]: 'Gestor - Gestão de Pessoas',
  [UserRole.ACADEMIC_MANAGER]: 'Gestor - Ensino',
  [UserRole.PEDAGOGICAL_MANAGER]: 'Gestor - Pedagógico',
  [UserRole.IT_MANAGER]: 'Gestor - T.I.',
  [UserRole.MARKETING_MANAGER]: 'Gestor - Marketing',
  [UserRole.FINANCE_MANAGER]: 'Gestor - Financeiro',
};

export const UserRoleUtils = {
  getLabel: (role: string): string => {
    return UserRoleLabels[role as UserRole] || 'Usuário';
  },

  candidates: (): UserRole[] => [
    UserRole.MANAGER_CANDIDATE,
    UserRole.TEACHER_CANDIDATE,
    UserRole.STUDENT_CANDIDATE,
    UserRole.REVIEW_STUDENT_CANDIDATE,
  ],

  members: (): UserRole[] => [
    UserRole.ADMINSTRATOR,
    UserRole.MANAGER,
    UserRole.TEACHER,
  ],

  managers: (): UserRole[] => [
    UserRole.ADMINSTRATOR,
    UserRole.MANAGER,
    UserRole.HR_MANAGER,
    UserRole.ACADEMIC_MANAGER,
    UserRole.PEDAGOGICAL_MANAGER,
    UserRole.IT_MANAGER,
    UserRole.MARKETING_MANAGER,
    UserRole.FINANCE_MANAGER,
  ],

  isManager: (role: string): boolean => {
    return UserRoleUtils.managers().includes(role as UserRole);
  },

  isCandidate: (role: string): boolean => {
    return UserRoleUtils.candidates().includes(role as UserRole);
  },
};