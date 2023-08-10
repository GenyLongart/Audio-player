import React from 'react'
import { FaBackward, FaPlay, FaForward } from 'react-icons/fa6'

const Player = () => {
    return (
        <>

            <div className="container">
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item">Soy una canción</li>
                    <li className="list-group-item">Soy una canción</li>
                    <li className="list-group-item">Soy una canción</li>
                    <li className="list-group-item">Soy una canción</li>
                    <li className="list-group-item">Soy una canción</li>
                    <li className="list-group-item">Soy una canción</li>
                </ol>
            </div>
            <footer className="container">
                <button className='btn btn-light'>
                    <FaBackward />
                </button>
                <button className='btn btn-light'>
                    <FaPlay />
                </button>
                <button className='btn btn-light'>
                    <FaForward />
                </button>
            </footer>

        </>
    )
}

export default Player