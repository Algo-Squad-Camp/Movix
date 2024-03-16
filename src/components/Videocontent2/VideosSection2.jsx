import React, { useState } from "react";

import "./style.scss";
import { useSelector } from "react-redux";


import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import Line from "../line/Line"
import Stream from "../stream/Stream";
import { PlayIcon } from "../../pages/details/Playbtn";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const VideosSection2 = ({ data, loading, title, mediaType, id, name }) => {

    const { url } = useSelector((state) => state.home);
    const [stream, setStream] = useState(false);
    const [episode, setEpisode] = useState(1);
    const [season, setSeason] = useState(1);
    const [titlestr, setTitle] = useState("");
    const [openstream, setOpenstream] = useState(false);


    console.log(data?.episodes);

    const handleEpisodeClick = (item) => {
        setSeason(item?.season_number);
        setEpisode(item?.episode_number);
        setTitle(`${name} season ${season} Episode ${episode}`);
        setOpenstream(!openstream);
        setStream(!stream);
        if (openstream) {
            toast.info("Video Space closed!")
        } else {
            toast.info("Scroll down to watch online!");
        }
    };


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <>
            <div className="videosSection">
                <ContentWrapper>
                    <div className="sectionHeading">{title}</div>
                    {!loading ? (
                        <div className="videos">
                            {data?.episodes?.map((item) => (
                                <div
                                    className="videoItem"
                                    key={item.id}
                                    onClick={() => { handleEpisodeClick(item) }}
                                >
                                    <div className="videoThumbnail">
                                        <Img
                                            src={url.poster + item.still_path}
                                        />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle"><b>Episode Number:</b> {item.episode_number}</div>
                                    <div className="videoTitle"><b>Episode Name:</b> {item.name}</div>
                                    <div className="videoTitle"><b>Episode Air Date:</b>  {dayjs(
                                        item.air_date
                                    ).format("MMM D, YYYY")}</div>
                                    <div className="videoTitle"><b>Episode Runtime:</b> {item.runtime}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )}
                </ContentWrapper>
                {stream && <Stream EndPoint={mediaType} id={id} title={titlestr} season={season} episode={episode} />}
            </div>
            <Line />
        </>
    );
};

export default VideosSection2;
