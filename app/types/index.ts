export enum Role {
    USER = "user",
    BOT = "assistant",
    SYSTEM = "system"
}
  
export interface Message {
    role: Role;
    content: string;
}