"use client"; // 声明为客户端组件以使用 state 和事件处理

import { useState } from "react";
import type { Note } from "./lib/types";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";

export default function NotepadPage() {
  const [notes, setNotes] = useState<Note[]>([]);

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

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-center text-4xl font-bold">我的记事本</h1>

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