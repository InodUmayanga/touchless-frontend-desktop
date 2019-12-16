export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface Activity {
  INAgentMACID: string;
  Intime: number;
  OUTAgentMACID: string;
  Outtime: number;
  Platenumber: string;
  Status: string;
  Type: string;
  _id: string;
  __v: number;
}
