export interface CompanyData {
  id?: string;
  name: string;
  count: number;
}

export interface ModalComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  id?: string;
  editData?: CompanyData;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  username: string;
  password: string;
}

export interface ModalComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  editData?: CompanyData;
}

export interface User {
  message: string;
  [key: string]: any;
}

export interface AuthState {
  isLoading: boolean;
  loggedIn: boolean;
  error: string | null;
  user: User | null;
}
