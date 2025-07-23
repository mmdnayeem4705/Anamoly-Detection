import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Incident = {
  id: number
  type: string
  tsStart: string
  tsEnd: string
  resolved: boolean
  thumbnail: string
  camera: {
    id: number
    name: string
    location: string
  }
}

export default function IncidentListPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])

  async function fetchData() {
    const res = await fetch('/api/incidents')
    const data = await res.json()
    setIncidents(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function markAsResolved(id: number) {
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' })
    fetchData()
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Incident List</h1>
      <div className="grid gap-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-4 border rounded shadow bg-white flex gap-4">
            <Image src={incident.thumbnail} alt="thumb" width={120} height={90} />
            <div className="flex-1">
              <h2 className="font-bold text-lg">{incident.type}</h2>
              <p>{incident.camera.name} — {incident.camera.location}</p>
              <p>{new Date(incident.tsStart).toLocaleString()} → {new Date(incident.tsEnd).toLocaleString()}</p>
              <p className={incident.resolved ? 'text-green-600' : 'text-red-600'}>
                {incident.resolved ? 'Resolved ✅' : 'Unresolved ⚠️'}
              </p>
              {!incident.resolved && (
                <button
                  onClick={() => markAsResolved(incident.id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
