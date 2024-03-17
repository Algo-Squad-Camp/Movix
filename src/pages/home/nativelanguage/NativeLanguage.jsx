import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const NativeLanguage = ({ language, title }) => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/discover/${endpoint}?sort_by=popularity.desc&with_original_language=${language}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection" style={{ backgroundColor: "var(--customliked)", paddingTop: "15px" }}>
            <ContentWrapper>
                <span className="carouselTitle">{title}</span>
                <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="movie" />
        </div>
    );
};

export default NativeLanguage;
