import React, { useEffect, useState } from 'react'
import "./style.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Line from '../line/Line';

function Stream({ EndPoint, id, title, season, episode }) {
    const [seasonNum, setSeasonNum] = useState(1);
    const [episodeNum, setEpisodeNum] = useState(1);

    useEffect(() => {
        setSeasonNum(season);
        setEpisodeNum(episode);
    }, [season, episode]);

    return (
        <>
            <ContentWrapper>

                <div className="main-streamarea">
                    <h1>Streaming {EndPoint} '{title}' </h1>
                    <div className='stream-main'>
                        <div className="stream-body">
                            <iframe src={`https://vidsrc.to/embed/${EndPoint}/${id}${season && EndPoint === "tv" ? "/" + seasonNum + "/" + episodeNum : ""
                                }`} className='iframe-stream' frameborder="0" title="Movieverse video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>

                            </iframe>
                        </div>
                    </div>
                </div>

            </ContentWrapper>
            <div className='notplaystream342'>
                <span className="notplaystream34256">Video not coming ? Use VPN and enjoy!</span>
                <span className="notplaystream34256">Use desktop or pc for better Experience!</span>
            </div>
            {!season && <Line />}
        </>
    )
}

export default Stream