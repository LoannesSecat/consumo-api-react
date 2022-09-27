import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";

export default function HandleLoading({ data, Component }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component data={data} />
    </Suspense>
  );
}
