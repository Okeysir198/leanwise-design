"use client";
import * as React from "react";
function useMergedRef(localRef, forwardedRef) {
  return React.useCallback(
    (node) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [localRef, forwardedRef]
  );
}
export {
  useMergedRef
};
