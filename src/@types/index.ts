import db from '../models';

interface IDecodedUser {
  id: string;
  name: string;
  email: string;
  Farms: any[];
}

declare global {
  namespace Express {
    interface Request {
      decodedUser?: IDecodedUser;
    }
  }
}
