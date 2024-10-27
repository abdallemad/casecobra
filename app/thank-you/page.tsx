import { Suspense } from "react";
import ThankYou from "./ThankYou";

export default function page() {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
}
