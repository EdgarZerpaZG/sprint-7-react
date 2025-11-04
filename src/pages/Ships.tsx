import StarWars from '../assets/star_wars.svg'
import T1 from '../components/title/tOne'
import T2 from '../components/title/tTwo'

export default function StarShips() {
  return (
    <>
        <main className="flex justify-center items-center h-screen">
            <section>
                <img src={StarWars} alt="Star Wars logo" className="mx-auto mb-3 h-auto w-28" />
                <T1 style="text-center text-3xl font-bold underline pb-5" title='StarShips 🚀' />
                <T2 style="text-center text-xl" title='Starships collection' />
            </section>
        </main>
    </>
  )
}