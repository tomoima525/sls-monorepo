export default {
  type: "object",
  properties: {
    owner: { type: "string" },
  },
  required: ["owner"],
} as const;
