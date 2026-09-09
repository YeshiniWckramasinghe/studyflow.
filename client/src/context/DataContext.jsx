import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [subjects, setSubjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [subjectsData, tasksData] = await Promise.all([api.getSubjects(), api.getTasks()])
      setSubjects(subjectsData)
      setTasks(tasksData)
    } catch (err) {
      setError(err.message || 'Could not reach the StudyFlow API.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const addSubject = useCallback(async (data) => {
    const created = await api.createSubject(data)
    setSubjects((prev) => [...prev, created])
    return created.id
  }, [])

  const updateSubject = useCallback(async (id, patch) => {
    const updated = await api.updateSubject(id, patch)
    setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)))
  }, [])

  const deleteSubject = useCallback(async (id) => {
    await api.deleteSubject(id)
    setSubjects((prev) => prev.filter((s) => s.id !== id))
    setTasks((prev) => prev.filter((t) => t.subjectId !== id))
  }, [])

  const addTask = useCallback(async (data) => {
    const created = await api.createTask(data)
    setTasks((prev) => [...prev, created])
    return created.id
  }, [])

  const updateTask = useCallback(async (id, patch) => {
    const updated = await api.updateTask(id, patch)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }, [])

  const deleteTask = useCallback(async (id) => {
    await api.deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleTaskStatus = useCallback(async (id) => {
    // optimistic flip, corrected by the server's response
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t)))
    try {
      const updated = await api.toggleTask(id)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      // revert on failure
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t)))
      throw err
    }
  }, [])

  const value = useMemo(
    () => ({
      subjects,
      tasks,
      loading,
      error,
      refresh: loadAll,
      addSubject,
      updateSubject,
      deleteSubject,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
    }),
    [subjects, tasks, loading, error, loadAll, addSubject, updateSubject, deleteSubject, addTask, updateTask, deleteTask, toggleTaskStatus],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
