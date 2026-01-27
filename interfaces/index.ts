export interface results {
  text: string;
  percent?: number;
}

export interface options {
  id: number;
  text: string;
}

export interface loginprops {
  email: string;
  password: string;
  remember: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  loading: boolean;
  setRemember: (remember: boolean) => void;
  goodleLogin: () => void;
  setloading: (loading: boolean) => void;
}
