'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, KeyRound, Lock } from 'lucide-react';

export default function LoginPage() {
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ accessKey }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin');
            } else {
                setError(data.message || 'Invalid key');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 text-center">
                <div className="flex gap-1 justify-center">
                    <KeyRound size={20} />
                    <h1 className="text-md font-semibold mb-4">What is your access key?</h1>
                </div>
                <input
                    type="password"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4 text-sm"
                    placeholder="Enter key"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded w-full flex items-center justify-center text-sm font-semibold"
                    disabled={loading}
                >
                    Request Access
                </button>
                {error && (
                    <p className="text-red-600 mt-4 flex items-center justify-center gap-2">
                        ⚠️ {error}
                    </p>
                )}
            </form>
        </div>
    );
}
