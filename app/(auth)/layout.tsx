import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
