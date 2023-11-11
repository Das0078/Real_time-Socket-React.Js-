// App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001', { transports: ['websocket'] });

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Listen for initial data
    // socket.on('initialData', (data) => {
    //   setItems(data);
    // });
    socket.on('update', (data) => {
      setItems(data);
    })

    // Listen for data changes
    // socket.on('dataChange', (changedItem) => {
    //   setItems((prevItems) => {
    //     const updatedItems = prevItems.map((item) =>
    //       item._id === changedItem._id ? changedItem : item
    //     );
    //     return updatedItems;
    //   });
    // });

    return () => {
      // Clean up event listeners on component unmount
      // socket.off('initialData');
      // socket.off('dataChange');
    };
  }, []);

  return (
    <div>
      {items.map((item) => (
        <p key={item._id}>{item.value}</p>
      ))}
    </div>
  );
}

export default App;
