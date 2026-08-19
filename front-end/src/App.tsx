import { useEffect, useState } from 'react';
import { getStudents, createStudent, deleteStudent, type Student } from './api/students';

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Impossible de charger les étudiants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await createStudent(name);
    setName('');
    loadStudents();
  } catch (err) {
    setError('Erreur lors de la création');
  }
};

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Étudiants</h1>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDelete(student.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;