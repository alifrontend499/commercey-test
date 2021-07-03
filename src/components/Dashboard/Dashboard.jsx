import React from 'react'

// bootstrap
import {
    Container
} from 'react-bootstrap'


export default function Dashboard() {
    return (
        <section id="app-dashboard" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-dashboard">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading st-fw-600 st-fs-20 text-capitalize">Dashboard</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
