import Empty from "./Empty";
import Loading from "./Loading";

export default function HandleLoading({ data, component }) {
  const Aux_component = component

  if (data === "loading") return <Loading />;

  return Object.keys(data).length ? <Aux_component data={data} /> : <Empty />;
}
