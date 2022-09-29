export default function Paragraph({ param }) {
  if (param) {
    return (
      <>
        <p>{param}</p>
        <br />
      </>
    );
  }

  return null;
}
