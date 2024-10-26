import { CHANGED } from "../constants";

export const codexist = (codexist: any = null, action: any) => {
  switch (action.type) {
    case CHANGED:
      codexist = {
        ...codexist,
        state: action.state,
      };
      return codexist;
  }

  return codexist;
};
