import React, {useEffect, useState } from 'react';
import Axios from 'axios';
import { IMAGE_BASE_URL, POSTER_GRID_SIZE } from '../../Config';
import { Typography, Button, Popover } from "antd";
import './FavoritePage.css'

const { Title } = Typography;

function FavoritePage(props) {

    const variable = {
        userFrom: localStorage.getItem('userId')}

        const [FavoriteTVShows, setFavoriteTVShows] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoriteTVShow', variable)

            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.favorites)
                    setFavoriteTVShows(response.data.favorites)
                    // setLoading(false)
                } else {
                    alert('Failed to get favorite TV show')
                }
            })
    }, [])

    //Rendering of Favorite table list
    const renderTableBody = FavoriteTVShows.map((tvShow, index) => {

        const popOver = (
            <div>
                {tvShow.tvShowImage ?
                    <img src ={`${IMAGE_BASE_URL}${POSTER_GRID_SIZE}${tvShow.tvShowImage}`} alt="tvShowImage"/>
                    :
                    "Image Not Available"
                }
            </div>
        )

        return <tr key={index}>
        <Popover content={popOver} title={tvShow.tvShowName} >
        <td>{tvShow.tvShowName}</td>
        </Popover>
        <td><a href={tvShow.tvShowHomepage} target="_blank" rel="noopener noreferrer">{tvShow.tvShowHomepage}</a></td>
        <td><Button>Remove from Favorites</Button></td> 

        </tr>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite TV Shows </Title>
            <hr />
            
            <table>
                    <thead>
                        <tr>
                            <th>TV Show Title</th>
                            <th>TV Show Website</th>
                            <th>Remove from Favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody}
                    </tbody>

                </table>

        </div>
    )
}

export default FavoritePage
