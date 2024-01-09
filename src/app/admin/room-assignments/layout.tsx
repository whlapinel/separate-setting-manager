// should have header and tabs

import Heading from '@/ui/heading'
import Link from 'next/link'
import React from 'react'

export default function RoomAssignmentsLayout({ children }) {
    return (
        <>
            <Heading>Room Assignments</Heading>
            <div className='flex gap-2'>
                <Link href="/admin/room-assignments/primary">
                    Primary
                </Link>
                <Link href="/admin/room-assignments/secondary">
                    Secondary
                </Link>
                <Link href="/admin/room-assignments/tertiary">
                    Tertiary
                </Link>
                <Link href="/admin/room-assignments/one-to-one">
                    One-to-One
                </Link>
            </div>
            {children}
        </>
    )
}
