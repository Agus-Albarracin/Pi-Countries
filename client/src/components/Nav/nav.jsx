import SearchBar from "../SearchBar/SearchBar"

import './nav.css'

export default function Nav(){
    return(
        <div className='navcontainer'>
            <div className='navcontainer-1'>
            <ul>
                <li>
                    <a href="/home">Home</a>
                    <a href="/create">Create Activity</a>
                </li>
            </ul>
            </div>
            {!window.location.pathname.includes('/detail') && !window.location.pathname.includes('/create') &&
            <div className='navcontainer-2'>
            <SearchBar/>     
            </div>}
            <div className='navcontainer-3'>
            <ul>
                <li>
                    <a href="/">Logout</a>
                </li>
            </ul>
            </div>
        </div>
    );
};