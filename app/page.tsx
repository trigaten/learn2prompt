import Chat from './Chat';

export enum Sender {
  USER = "USER",
  BOT = "BOT"
}

export interface Message {
  sender: Sender;
  text: string
}

export default function Home() {
  return (
    <div>
      <div className="flex items-stretch h-screen w-screen">
          <Chat starter={Sender.BOT} />
          <Chat starter={Sender.USER} color={'bg-gray-200'} />
      </div>
    </div>
  );
}
