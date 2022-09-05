import { useSelector } from 'react-redux';
import CardMedia from './CardMedia';
import HandleLoading from './HandleLoading';

export default function Media() {
  const { films } = useSelector((e) => e.film);

  const AuxMedia = () => {
    if (films === "loading") {
      return (
        <>
          <HandleLoading
            data={films}
          />
        </>
      )
    }

    if (films.length === 0) {
      return (
        <>
          <HandleLoading
            data={[]}
          />
        </>
      )
    }

    return (
      <>
        {
          films.map((e, i) => (
            <HandleLoading
              data={e}
              component={CardMedia}
              key={i}
            />
          ))
        }
      </>
    )
  }

  return (
    <div className='Media'>
      <AuxMedia />
    </div>
  )
}
