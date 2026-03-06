"use client";

import { useState } from "react";

type NoteFormProps = {
  onAddNote: (text: string) => void;
};

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [currentNote, setCurrentNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentNote.trim() !== "") {
      onAddNote(currentNote);
      setCurrentNote("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
      <input
        type="text"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="输入新的记事..."
        className="flex-grow rounded-md border border-zinc-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!currentNote.trim()}
      >
        添加
      </button>
    </form>
  );
}