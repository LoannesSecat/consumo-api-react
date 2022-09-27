export default function Paragraph({ param }) {
  if (param) {
    return <p>{param}</p>;
  }

  return null;
}
