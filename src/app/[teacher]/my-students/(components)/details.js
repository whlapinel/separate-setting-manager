'use client';

export default function DetailsModal({hidden, handleShowDetails, children}) {
    console.log('rerendering DetailsModal (client component)');

    return (
        <div className={hidden?"modal hidden":"modal"}
        onClick={handleShowDetails}>
            <div className="modal-content">
            <p>details below</p>
            {children}
            </div>
        </div>
    )
}