export interface UserModel {
  username: string;
  email: string;
  password_hash: string;
  diary_name: string;

  profile: {
    display_name: string;
    avatar_url: string;
  };

  settings: {
    theme: "light" | "dark";
    daily_reminder_time: string;
    is_private: boolean;
  };

  created_at: Date;
}