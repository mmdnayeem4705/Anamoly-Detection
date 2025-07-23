/* eslint-disable @next/next/no-img-element */
'use client'

async function getIncidents() {
    const res = await fetch('http://localhost:3000/api/incidents', {
        cache: 'no-store',
    })
    return res.json()
}

type Camera = {
    name: string;
    location: string;
};

type Incident = {
    id: string | number;
    thumbnail: string;
    type: string;
    tsStart: string | number | Date;
    tsEnd: string | number | Date;
    camera?: Camera;
    resolved?: boolean;
};

import { useEffect, useState } from 'react'

export default function HomePage() {
    const [incidents, setIncidents] = useState<Incident[]>([])

    useEffect(() => {
        async function fetchIncidents() {
            const data = await getIncidents()
            setIncidents(data)
        }
        fetchIncidents()
    }, [])

    const handleResolve = async (id: string | number) => {
        try {
            await fetch(`http://localhost:3000/api/incidents/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ resolved: true }),
                headers: { 'Content-Type': 'application/json' },
            })
            setIncidents((prev) =>
                prev.map((incident) =>
                    incident.id === id ? { ...incident, resolved: true } : incident
                )
            )
        } catch (err) {
            console.error('Failed to mark as resolved:', err)
        }
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Incident Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incidents.map((incident) => (
                    <div
                        key={incident.id}
                        className="border rounded-lg shadow-md overflow-hidden"
                    >
                        {/* FIXED: Use img instead of next/image */}
                        <img
                            src={
                                incident.thumbnail && typeof incident.thumbnail === 'string' && incident.thumbnail.trim() !== ''
                                    ? incident.thumbnail.startsWith('/')
                                        ? incident.thumbnail
                                        : `/thumbnails/${incident.thumbnail}`
                                    : "/thumbnails/thumb_532.jpg"
                            }
                            alt="Anomaly thumbnail"
                            width={320}
                            height={240}
                            className="w-full h-auto"
                            onError={e => { e.currentTarget.src = "/thumbnails/thumb_532.jpg"; }}
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1">{incident.type}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                {new Date(incident.tsStart).toLocaleString()} -{' '}
                                {new Date(incident.tsEnd).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Camera: {incident.camera?.name} @ {incident.camera?.location}
                            </p>
                            {!incident.resolved && (
                                <button
                                    onClick={() => handleResolve(incident.id)}
                                    className="mt-3 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Mark as Resolved
                                </button>
                            )}
                            {incident.resolved && (
                                <span className="inline-block mt-3 text-green-700 font-semibold">
                                    ✅ Resolved
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
import { PrismaClient } from '@prisma/client'