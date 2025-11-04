import T1 from '../components/title/tOne'
import Vite from '/vite.svg'

export default function Home() {
  return (
    <>
        <main className="flex justify-center items-center h-screen">
            <section>
                <img src={Vite} alt="Vite logo" className="mx-auto mb-3 max-w-full h-auto" />
                <T1 style="text-center text-3xl font-bold underline pb-5" title='Star Wars API 🚀' />
            </section>
        </main>
    </>
  )
}