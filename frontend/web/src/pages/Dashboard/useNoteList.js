import { useCallback, useState } from "react";
import { getApi } from "../../utils/api";

export default function useNoteList() {
  const [notes, setNotes] = useState(null);

  const requestNotes = useCallback(async (userId) => {
    if (!userId) return;
    const r = await getApi("notes-dev", "/notes", {
      owner: userId,
    });
    setNotes(r.list);
  }, []);

  return [requestNotes, notes];
}
