export interface IloginInput {
  email: string;
  password: string;
}

export interface ILoginRespone {
  message: string;
  code: number;
  metadata: {
    user: {
      id: string;
      userName: string;
      userRole: string;
    };
    tokenPair: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterRespone {
  message: string;
  code: number;
  metadata: string;
}

export interface IVerifyAccountInput {
  email: string;
  verifyCode: number;
}

export interface IVerifyAccountResponse {
  message: string;
  code: number;
  metadata: {
    user: {
      _id: string;
      user_name: string;
      user_roles: string;
    };
    tokenPair: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface ILogoutRespone {
  message: string;
  code: number;
}

export interface IRePassowrdInput {
  email?: string;
  verifyCode?: string;
  newPassword?: string;
}

export interface ISentEmail {
  email: string;
}

export interface IUpdatePassword {
  verifyCode: string;
  newPassword: string;
}
