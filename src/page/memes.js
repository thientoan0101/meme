import React from "react";
import axios from "axios";
import { Col, Row, Image, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import arrayShuffle from 'array-shuffle';
import { useQuery } from 'react-query'
import Carousel from 'better-react-carousel'
const Memes = () => {
    const loadMeme = async () => {
        const res = await axios.get("https://api.imgflip.com/get_memes")
        const json = await res.data
        console.log("json", json)
        return json.data.memes
    }

    const {data,isLoading,isError,error,refetch} = useQuery(['loadData'],loadMeme);

    const refetchData = ()=>{
        refetch();
    }
    
    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }
    if (isError) {
        return <div>{error.message}</div>
    }
    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <Button variant="primary" className="btn-primary" centered onClick={refetchData}>Refetch</Button>   
            <br/>
            <br/>
            <br/>
            <Carousel showDots={true} Autoplay={false} cols={3} rows={1} gap={0} loop>
                {
                    arrayShuffle(data)?.map((val, k) => {
                        return (
                        <Carousel.Item>
                            <img width="40%" height="40%" src={val.url} />
                        </Carousel.Item>
                    )})
                }
            </Carousel>
            
        </Container>  
    );
}

export default Memes