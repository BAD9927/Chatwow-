import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

interface Message {
  id: string;
  text: string;
  timestamp: any;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
      );
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      timestamp: new Date(),
    });

    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageCircle className="mr-2" />
          Chat Anónimo
        </h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white p-3 rounded-lg shadow">
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white border-t p-4">
        <form onSubmit={sendMessage} className="max-w-2xl mx-auto flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;