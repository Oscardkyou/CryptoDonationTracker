'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

interface DonationMapProps {
  donations: Array<{
    id: number
    organization: string
    amount: string
    latitude: number
    longitude: number
  }>
}

export const DonationMap: React.FC<DonationMapProps> = ({ donations }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 0],
      zoom: 1
    })

    map.current.on('load', () => {
      donations.forEach((donation) => {
        new mapboxgl.Marker()
          .setLngLat([donation.longitude, donation.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${donation.organization}</h3>
            <p>Пожертвование: ${donation.amount}</p>
          `))
          .addTo(map.current!)
      })
    })

    return () => map.current?.remove()
  }, [donations])

  return <div ref={mapContainer} className="w-full h-[400px]" />
}

