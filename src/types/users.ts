export type User = {
  user_id: string;
  password: string;
  username: string;
  email: string;
  phone?: string;
  firstname: string;
  lastname: string;
  avatar_url?: string;
  status: "active" | "inactive" | "banned";
  created_at: string;
  updated_at: string;
  role: "admin" | "subscriber";
};
