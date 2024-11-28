export interface IJob {
  id: string;
  title?: string;
  type?: string;
  location?: string;
  description?: string;
  salary?: string;
  company?: {
    name?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
}

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
