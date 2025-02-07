import React from 'react';

const TodoApp: React.FC = () => {
  const currentDate: string = new Date().toLocaleDateString();
  return (
    <div style={{marginBottom: '1rem', fontSize: '1.2rem', textAlign: 'center', color: '#ffffff'}}>
      <p>
        <strong>Date:</strong> {currentDate}
      </p>
    </div>
  );
};

export default TodoApp;
