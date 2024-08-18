export enum Role {
    USER = "user",
    BOT = "assistant",
    SYSTEM = "system"
}
  
export interface Message {
    role: Role;
    content: string;
}

export enum Condition {
    FIND_STRING = "FIND_STRING",
    PRESS_ENTER = "PRESS_ENTER",
    CONTINUE_BUTTON = "CONTINUE_BUTTON"
}
  
export interface TutorialStage {
    index: number,
    messages: Message[],
    condition: Condition,
    string?: string
}