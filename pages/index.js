import next from "next";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Header from "../components/Header";

const index = () => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState([])
  const [results, setResults] = useState([])
  const [query, setQuery] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`);
  const nextPage = () => {
    setQuery(data.next)
  }

  const prevPage = () => {
    setQuery(data.previous)
  }
  useEffect(() => {
    if (query == null) return

    const fetchData = async () => {
      setStatus('fetching')
      const response = await fetch(query);
      const data = await response.json();
      setData(data)
      setResults(data.results)
      setStatus('fetched')
    };
    fetchData();
  }, [query])

  return (
    <>
      <Header />
      <div className="container mx-auto py-4">
        {status == 'fetching' && <img className="animate-spin w-36 h-36 m-auto" src="/img/load-spin.svg" layout='fill'></img>}
        {status == 'fetched' && results.map((dados) => (
          <Link href={`/pokemon/${dados.name}`}>
            <div key={dados.name} className="flex shadow py-2 my-1 px-2 text-xl rounded-md justify-between cursor-pointer">
              {dados.name.charAt(0).toUpperCase(0) + dados.name.slice(1)}
              <img className="w-auto h-auto" src="/img/info-circle.svg" alt="infos" />
            </div>
          </Link>
        ))}
        <div className="flex justify-between">
          <button className="bg-gray-100 pt-1 rounded-lg pt-auto items-center w-20 group" onClick={() => prevPage()}>
            <Image className="group-hover:opacity-40" src="/img/bx-left-arrow.svg" alt="" width={36} height={36} />
          </button>
          <button className="bg-gray-100 pt-1 rounded-lg pt-auto items-center w-20 group" onClick={() => nextPage()}>
            <Image className="group-hover:opacity-40" src="/img/bx-right-arrow.svg" alt="" width={36} height={36} />
          </button>
        </div>
      </div>
    </>
  )
}

export default index