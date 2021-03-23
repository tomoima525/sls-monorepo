import { useCallback } from "react";
import { postApi } from "../../utils/api";

export default function useContent() {
  const postContent = useCallback(async (userId, content) => {
    if (!userId) return;
    const r = await postApi("notes-dev", "/note/post", {
      owner: userId,
      content,
    });
    return r;
  }, []);

  return postContent;
}
