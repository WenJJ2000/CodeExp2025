import { use, createContext, type PropsWithChildren, useState } from "react";

const ShowTabContext = createContext<{
  setShow: (show: boolean) => void;
  show?: boolean;
}>({
  setShow: (show: boolean) => {
    console.warn("setUser function is not initialized");
  },
  show: false,
});

// This hook can be used to access the user info.
export function useShowTab() {
  const value = use(ShowTabContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function ShowTabProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(true);

  return (
    <ShowTabContext
      value={{
        setShow: (show: boolean) => {
          console.log("setShow called with:", show);
          setShow(show);
        },
        show: show,
      }}
    >
      {children}
    </ShowTabContext>
  );
}
