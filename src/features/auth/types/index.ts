export interface LoginCredentials {
  user: string;
  password: string;
}

export interface UserData {
  token: string;
  firstName: string;
  lastName: string;
  nickname: string;
  type: string;
  roles: string[];
}

export interface AuthSuccessResponse {
  status: string;
  data: UserData;
}

export interface AuthErrorResponse {
  status: string;
  code: number;
  message: string;
}