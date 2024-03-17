import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Revenue = () => {

    const { data, loading } = useFetch(`/discover/movie?sort_by=revenue.desc`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Overall Revenue</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </div>
    );
};

export default Revenue;
