import Empty from "./Empty";
import Loading from "./Loading";

export default function HandleLoading({ data, Component }) {
  if (data === "loading") return <Loading />;

  return Object.keys(data).length
    ? <Component data={data} />
    : <Empty />;
}
