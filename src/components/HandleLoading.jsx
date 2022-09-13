import { Suspense } from "react";
import Loading from "./Loading";

export default function HandleLoading({ data, Component }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component data={data} />
    </Suspense>
  );
}
