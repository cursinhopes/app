export enum UserType {
  ADMINSTRATOR = 'ADMINSTRATOR',
  MEMBER = 'MEMBER',
  STUDENT = 'STUDENT',
  CANDIDATE = 'CANDIDATE',
  PARTICIPANT = 'PARTICIPANT',
}

export const UserTypeLabels: Record<UserType, string> = {
  [UserType.ADMINSTRATOR]: 'Administrador',
  [UserType.MEMBER]: 'Membro',
  [UserType.STUDENT]: 'Aluno',
  [UserType.CANDIDATE]: 'Candidato',
  [UserType.PARTICIPANT]: 'Participante',
};

export const UserTypeUrls: Record<UserType, string> = {
  [UserType.ADMINSTRATOR]: '/administrador',
  [UserType.MEMBER]: '/membro',
  [UserType.STUDENT]: '/aluno',
  [UserType.CANDIDATE]: '/candidato',
  [UserType.PARTICIPANT]: '/participante',
};

export const UserTypeUtils = {
  getLabel: (type: string | null | undefined): string => {
    if (!type) return 'Usuário';
    return UserTypeLabels[type as UserType] || 'Usuário';
  },

  getUrl: (type: string | null | undefined): string => {
    if (!type) return '/';
    return UserTypeUrls[type as UserType] || '/';
  }
};