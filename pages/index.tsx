import { Image, GetServerSideProps } from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  vectors: [Vector];
}

interface Vector {
  id: number;
  name: string;
  body: string
}

export default function Home({ vectors }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link
        href="/create"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Vector
      </Link>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/hello`);
  const data = await res.json();

  return { props: { vectors: data.vectors } };
};
