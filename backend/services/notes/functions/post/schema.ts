export default {
  type: "object",
  properties: {
    owner: { type: "string" },
    content: { type: "string" },
  },
  required: ["content", "ownwer"],
} as const;
