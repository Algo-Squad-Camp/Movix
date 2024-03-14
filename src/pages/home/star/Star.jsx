import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { UserAuth } from "../../../context/AuthContext.jsx";
import { db } from "../../../firebase.js";
import './star.css';
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js"
import Axios from "axios";
import PosterFallback from "../../../assets/no-poster.png";



function Star() {

    const { user } = UserAuth();
    const [details, setDetails] = useState({});
    const [get, setGet] = useState(false);
    const movieID = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        const emailuser = user?.email;
        Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
            email: emailuser,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "success") {
                setGet(true);
            }
            setDetails(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const saveWatchList = async (movie) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedWatchLater: arrayUnion({
                    id: movie.id || id,
                    title: movie.name || movie.title,
                    img: movie.backdrop_path,
                    media_type: movie.media_type,
                })
            })
            const title435 = movie?.title || movie?.name;
            const msgg = title435 + " " + "added to Watch later list";
            toast.success(msgg);
        } else {
            const title234456 = data.name || data.title;
            const msggg = "Please Login to add " + title234456;;
            toast.warn(msggg);
        }
    }

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/week");
    const [background, setBackground] = useState("");
    const [movie, setMovie] = useState();

    useEffect(() => {
        const movies = data?.results?.[Math.floor(Math.random() * 20)];
        setMovie(movies);
        const bg = url.backdrop + movies?.backdrop_path;
        setBackground(bg);
    }, [data]);

    useEffect(() => {
        toast.info("Data not coming ? Try VPN, Enjoy!")
    }, [])

    return (
        <>
            {!loading ? (
                <div class="container-home-banner">
                    <div class="list">
                        <div class="item">
                            <Img src={background} />
                            <div className="opacity-layer"></div>

                            <div class="content">
                                <div className="nameuserstar2345">Hi, </div>
                                <div className="nameuserstar23">{details?.name || "Guest"}</div>
                                <div class="author">{movie?.media_type?.toUpperCase()}</div>
                                <div class="title">{movie?.title || movie?.name}</div>
                                <div class="topic">{movie?.release_date}</div>
                                <div class="des">{movie?.overview}
                                </div>
                                <div class="buttons">
                                    <button onClick={() => {
                                        navigate(`/${movie?.media_type}/${movie?.id}`)
                                    }}>See Details</button>
                                    <button onClick={() => saveWatchList(movie)}>Add to WatchList</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="thumbnail">
                        {data?.results?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;

                            return (
                                <div class="item" key={item?.id} onClick={() => {
                                    setMovie(item);
                                    setBackground(posterUrl);
                                }}>
                                    <img src={posterUrl} />
                                    <div class="content">
                                        <div class="title">
                                            {data?.title || data?.name}
                                        </div>
                                        <div class="description">
                                            {data?.release_date}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (<div className="loaderstar34">
                <HashLoader
                    color="#421202"
                    size={100}
                    aria-label="Loading Spinner"
                />
            </div>)}
        </>
    )
}

export default Star