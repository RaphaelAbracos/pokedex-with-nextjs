import Link from 'next/link'
const Header = () => {
  return (
    <header className="flex justify-center text-4xl font-black bg-gradient-to-r from-gray-50 to-gray-100 py-2 rounded-xl">
      <Link href="/">
        Pokedex
      </Link>
    </header>
  )
}

export default Header