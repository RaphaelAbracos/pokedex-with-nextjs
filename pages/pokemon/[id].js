import Header from "../../components/Header";

export async function getStaticPaths() {
  return {
    paths: [{
      params: {
        id: '1'
      }
    }],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    props: {
      id: id,
      data: data
    }
  }
}

const pokemon = ({ data }) => {

  return (
    <>
      <Header />
      <div className='block items-center justify-center sm:block md:flex'>
        <div className='flex-initial'>
          <p className='font-black text-3xl'>{data.name.charAt(0).toUpperCase(0) + data.name.slice(1)}</p>
          <img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name} + image`} width='350' height='305'></img>
        </div>
        <div className="md:w-4/12 flex-initial sm:w-full">
          <p className="text-2xl font-bold mx-auto">Stats</p>
          {data.stats.map((dados) => (
            <div key={dados.stat.name}>
              <h1 className="font-bold">{dados.stat.name}</h1>
              <div className="h-5 relative max-w-xl rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div className="h-full bg-green-500 absolute px-2 font-semibold" style={{ width: `${dados.base_stat}%` }}>{dados.base_stat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default pokemon