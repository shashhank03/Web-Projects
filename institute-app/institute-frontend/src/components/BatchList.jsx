import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

function BatchList({ onComplete }) {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/batch')
      .then(res => setBatches(res.data))
      .catch(err => setError('Failed to fetch batches'))
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = async (batchId) => {
    try {
      await axios.put(`/api/batch/${batchId}/complete`);
      setBatches(batches => batches.map(b => b.id === batchId ? { ...b, status: 'completed' } : b));
      if (onComplete) onComplete(batchId);
    } catch {
      setError('Failed to complete batch');
    }
  };

  if (loading) return <div>Loading batches...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Batches</h2>
      <ul>
        {batches.map(batch => (
          <li key={batch.id}>
            {batch.name} ({batch.status})
            {batch.status === 'active' && (
              <button onClick={() => handleComplete(batch.id)}>Mark Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BatchList;
