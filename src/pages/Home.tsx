import T1 from '../components/title/tOne'
import T2 from '../components/title/tTwo'

export default function Home() {
  return (
    <>
        <main className="flex justify-center items-center h-full">
            <section>
                <T1 style="text-center text-3xl font-bold underline pb-5" title='Star Wars API 🚀' />
                <T2 style="text-center text-xl" title='A simple project using Vite, React, TypeScript and Tailwind CSS' />
            </section>
        </main>
    </>
  )
}