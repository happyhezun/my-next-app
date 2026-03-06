"use client"; // 声明为客户端组件以使用 state 和事件处理

import { useState, useEffect } from "react";
import type { Note } from "./lib/types";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";

const NOTES_STORAGE_KEY = "notepad-notes";

export default function NotepadPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 在组件首次挂载到客户端时，从 localStorage 加载数据
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes from local storage", error);
    }
    setIsLoading(false); // 标记初始加载已完成
  }, []); // 空依赖数组确保此 effect 只运行一次

  // 当 notes 状态发生变化时，将其保存到 localStorage (仅在初始加载后)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const handleAddNote = (text: string) => {
    setNotes([...notes, { id: Date.now(), text }]);
  };

  const handleDeleteNote = (idToDelete: number) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const handleSaveNote = (idToSave: number, newText: string) => {
    setNotes(
      notes.map((note) =>
        note.id === idToSave ? { ...note, text: newText } : note
      )
    );
  };

  const handleClearAllNotes = () => {
    // 这是一个破坏性操作，最好有确认提示
    if (window.confirm("您确定要清空所有记事吗？此操作无法撤销。")) {
      setNotes([]);
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