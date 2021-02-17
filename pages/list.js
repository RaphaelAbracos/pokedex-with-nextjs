const list = ({ data }) => {
  return (
    <div className="container mx-auto py-4">
      {data.results.map((dados) => (
        <div key={dados.name} className="shadow py-2 my-2">{dados.name}</div>
      ))}
    </div>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
  const data = await res.json()
  return {
    props: { data: data }
  }
}

export default list

