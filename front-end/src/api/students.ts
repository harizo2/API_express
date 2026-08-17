const API_URL = import.meta.env.VITE_API_URL;

export interface Student {
  id: number;
  name: string;
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des étudiants');
  }
  return response.json();
}

export async function createStudent(name: string): Promise<Student> {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création');
  }
  return response.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression');
  }
}