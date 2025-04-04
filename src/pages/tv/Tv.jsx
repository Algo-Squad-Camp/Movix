import React, { useEffect, useState } from "react";

import "./style.scss";
// import "./movies.css";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import InTheaters from "./theaters/InTheaters";
import Upcoming from "./upcoming/Upcoming";
import Animation from "./animation/Animation";
import ReleaseYear from "./releaseYear/ReleaseYear";
import Country from "./country/Country";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import CustomLiked1 from "../home/usercustomliked1/CustomLiked1";
import useFetch from "../../hooks/useFetch";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import ScrollButton from "../../components/scrollbutton/ScrollButton";



const Tv = () => {

    const { user } = UserAuth();
    const [likedMovies, setLikedMovies] = useState([]);
    const [watchMovies, setWatchMovies] = useState([]);
    const [showLiked, setShowLiked] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", controlScrollButton);
        return () => {
            window.removeEventListener("scroll", controlScrollButton);
        };
    }, [lastScrollY]);

    const controlScrollButton = () => {
        if (window.scrollY > 500) {
            if (window.scrollY > lastScrollY) {
                setShow(true);
            } else {
                setShow(false);
            }
        } else {
            setShow(false);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setLikedMovies(doc.data()?.savedLiked);
            setWatchMovies(doc.data()?.savedWatchLater);
        })
    }, [user?.email]);

    const id01 = likedMovies && likedMovies[2]?.id;
    const endpoint01 = likedMovies && likedMovies[2]?.media_type;
    const title01 = likedMovies && likedMovies[2]?.title;
    const title1 = "Because You Liked " + " " + title01;
    const { data: data01, loading: loading01 } = useFetch(`/${endpoint01}/${id01}/recommendations`);


    const id03 = watchMovies && watchMovies[1]?.id;
    const endpoint03 = watchMovies && watchMovies[1]?.media_type;
    const title03 = watchMovies && watchMovies[1]?.title;
    const title3 = "Because You added " + " " + title03 + " " + "to Watch Later List";
    const { data: data03, loading: loading03 } = useFetch(`/${endpoint03}/${id03}/recommendations`);

    return (
        <>
            <main>
                <div className="homePage">
                    <HeroBanner />
                    <Trending />
                    <Popular />
                    <TopRated />
                    {endpoint01 === "tv" && <CustomLiked1 data={data01} loading={loading01} endpoint={endpoint01} title={title1} />}
                    <ReleaseYear />
                    <Animation />
                    <InTheaters />
                    {endpoint03 === "tv" && <CustomLiked1 data={data03} loading={loading03} endpoint={endpoint03} title={title3} />}
                    <Upcoming />
                    <Country />
                </div>
                <div className="alternateswipergfhf6677">
                    <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
                    <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly..</span>
                </div>
            </main>
            {show && <ScrollButton />}
        </>
    );
};

export default Tv;