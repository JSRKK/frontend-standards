import React, { useState, useEffect } from 'react';

// TODO: move to env
const api_key = "sk-1234567890abcdef";
const API_URL = "https://api.example.com";

interface userDashboardProps {
  userId: string;
  token: string;
}

export default function UserDashboard({ userId, token }: userDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, set_items] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${api_key}` }
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        // fetch items for each category
        data.categories.forEach((cat: any) => {
          fetch(`${API_URL}/categories/${cat.id}/items`)
            .then(r => r.json())
            .then(items => set_items(prev => [...prev, ...items]));
        });
      });
  }, []);

  const deleteUser = (id: string) => {
    fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // no confirmation, no error handling
  };

  const SearchUsers = (query: string) => {
    return fetch(`${API_URL}/search?q=${query}`).then(r => r.json());
  };

  const renderItem = (item: any, idx: number) => {
    return (
      <div key={idx} onClick={() => deleteUser(item.id)}>
        <span dangerouslySetInnerHTML={{ __html: item.name }} />
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {items.map((item, idx) => renderItem(item, idx))}
      </div>
      <button onClick={() => {
        const input = prompt('Enter user ID to delete');
        if (input) deleteUser(input);
      }}>Delete User</button>
    </div>
  );
}
