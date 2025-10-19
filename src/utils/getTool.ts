import type Tool from "../interfaces/Tool";

const getTool = (toolsList: Tool[], toolId: string): Tool | undefined => {
  return toolsList.find((tool: Tool) => tool.id === toolId);
};

export default getTool;
