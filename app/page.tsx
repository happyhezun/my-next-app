"use client"; // 声明为客户端组件以使用 state 和事件处理

import { useState } from "react";

export default function NotepadPage() {
  // 使用 state 来存储记事列表
  const [notes, setNotes] = useState<string[]>([]);
  // 使用 state 来存储当前输入框的内容
  const [currentNote, setCurrentNote] = useState("");

  // 处理添加记事的逻辑
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表单提交导致页面刷新
    if (currentNote.trim() !== "") {
      setNotes([...notes, currentNote]); // 将新记事添加到列表中
      setCurrentNote(""); // 清空输入框
    }
  };

  // 处理删除记事的逻辑
  const handleDeleteNote = (indexToDelete: number) => {
    // 过滤掉要删除的记事
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-center text-4xl font-bold">我的记事本</h1>

      <form onSubmit={handleAddNote} className="mb-8 flex gap-3">
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

      <ul className="space-y-3">
        {notes.map((note, index) => (
          <li key={index} className="flex items-center justify-between rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
            <span className="break-all">{note}</span>
            <button onClick={() => handleDeleteNote(index)} className="ml-4 flex-shrink-0 text-sm text-red-500 hover:text-red-700">删除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}