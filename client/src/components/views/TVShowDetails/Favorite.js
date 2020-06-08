import React, {useEffect, useState } from 'react';
import { Button } from "antd";
import Axios from 'axios';

function Favorite(props) {

    const [favoriteNumber, setfavoriteNumber] = useState(0)
    const [favoriteSelect, setfavoriteSelect] = useState(false)

    const variable = {
        userFrom: props.userFrom,
        tvShowID: props.tvShowID,
        tvShowName: props.tvInfo.original_name,
        tvShowImage: props.tvInfo.backdrop_path 
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variable)
        .then(response => {
            if(response.data.success) {
                setfavoriteNumber(response.data.favoriteNumber)
            } else {
                 alert('Failed to get favorite number')
            }
        })

        Axios.post('/api/favorite/favoriteSelect', variable)
        .then(response => {
            if(response.data.success) {
                setfavoriteSelect(response.data.favoriteSelect)
            } else {
                 alert('Failed to get favorite info')
            }
        })

    }, [])

    //Favorite button clicker to add or remove from Favorite List
    const onClickFavorite = () => {
        if(favoriteSelect) {
            // When already added

        } else {
            //When not adding
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    // setfavoriteSelect(response.data.favoriteSelect)
                } else {
                     alert('Failed to add to Favorite List')
                }
            })
        }

    }

    return (
        <div>
            <Button onClick={onClickFavorite} > {favoriteSelect ? " Remove from Favorite List " : " Add to Favorite List "} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite
