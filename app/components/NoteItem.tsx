"use client";

import { useState } from "react";
import type { Note } from "../lib/types";

type NoteItemProps = {
  note: Note;
  onDelete: (id: number) => void;
  onSave: (id: number, text: string) => void;
};

export default function NoteItem({ note, onDelete, onSave }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(note.text);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note.id, editingText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
      {isEditing ? (
        <form onSubmit={handleSave} className="flex w-full items-center gap-2">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="flex-grow rounded-md border border-zinc-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            autoFocus
          />
          <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700">保存</button>
          <button type="button" onClick={() => setIsEditing(false)} className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600">取消</button>
        </form>
      ) : (
        <>
          <span className="break-all">{note.text}</span>
          <div className="ml-4 flex flex-shrink-0 gap-2">
            <button onClick={() => setIsEditing(true)} className="text-sm text-blue-500 hover:text-blue-700">编辑</button>
            <button onClick={() => onDelete(note.id)} className="text-sm text-red-500 hover:text-red-700">删除</button>
          </div>
        </>
      )}
    </li>
  );
}