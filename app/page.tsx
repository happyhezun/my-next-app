"use client"; // 声明为客户端组件以使用 state 和事件处理

import { useState, useEffect } from "react";
import type { Note } from "./lib/types";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";

export default function NotepadPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 在组件首次挂载到客户端时，从 API 加载数据
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data: Note[] = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
        // 在这里可以设置一个错误状态，向用户显示消息
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []); // 空依赖数组确保此 effect 只运行一次

  const handleAddNote = async (text: string) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      const newNote: Note = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (idToDelete: number) => {
    try {
      const response = await fetch(`/api/notes/${idToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(notes.filter((note) => note.id !== idToDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveNote = async (idToSave: number, newText: string) => {
    try {
      const response = await fetch(`/api/notes/${idToSave}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) {
        throw new Error('Failed to save note');
      }
      const updatedNote: Note = await response.json();
      setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearAllNotes = async () => {
    // 这是一个破坏性操作，最好有确认提示
    if (window.confirm("您确定要清空所有记事吗？此操作无法撤销。")) {
      try {
        const response = await fetch('/api/notes', { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to clear notes');
        }
        setNotes([]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">我的记事本</h1>
        {notes.length > 0 && !isLoading && (
          <button onClick={handleClearAllNotes} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
            清空所有
          </button>
        )}
      </div>

      <NoteForm onAddNote={handleAddNote} />

      <ul className="space-y-3">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={handleDeleteNote}
            onSave={handleSaveNote}
          />
        ))}
      </ul>
    </main>
  );
}