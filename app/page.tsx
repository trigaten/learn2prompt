import Chat from './components/Chat';
import Tutorial from './components/Tutorial';
import { InputProvider } from './components/InputContext';

export default function Home() {
  return (
      <InputProvider>
        <div className="flex items-stretch h-screen w-screen">
          <Tutorial />
          <Chat />
        </div>
      </InputProvider>
  );
}