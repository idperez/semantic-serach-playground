import { useState } from 'react';
import { Image, GetServerSideProps } from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface RequestParams {
    name: string;
    body: string;
}

type Props = {
    host: string | null
};

export default function Create({ host }) {
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');

    async function createVector() {
        if (name.length === 0 || body.length === 0) {
            alert('name and body must be present');
        } else if (name.length > 100) {
            alert('name must be less than 100 characters');
        } else if (body.length > 500) {
            alert('body must be less than 500 characters');
        } else {
            const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
            const baseUrl = `${protocol}://${host}`;

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    body
                })
            };

            const response = await fetch(`${baseUrl}/api/create`, options);

            if (!response.ok) {
                alert('error creating a vector');
            }

            const data = await response.json();

            console.log(data);
        }
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Vector Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder=""
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Vector Body
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="body"
                            type="text"
                            placeholder=""
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => createVector()}
                        >
                            Create
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    Creates a vector using the name and body
                </p>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps<Props> =
    async context => ({ props: { host: context.req.headers.host || null } });
