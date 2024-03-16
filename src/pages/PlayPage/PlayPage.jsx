import React from 'react'

const PlayPage = () => {


    const TagCard = ({ value }) => (
        <div className="tagcardmain456">
            <p className="tagcardmain456a">
                {value}
            </p>
        </div>
    );

    return (
        <div className='playerpage2345'>
            <div className="playermainarea232">
                <div className="playerrow1left">
                    <div className="iframeplayer32">
                        <iframe
                            className="iframereal342"
                            src={`https://${selectedServer.url}/embed/${type}/${id}${type === "tv" ? "/" + season + "/" + episode : ""
                                }`}
                            title="StreamPod video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="leftbelowif34">
                        <div className="belowif34left">
                            <div className="belowif34left4646">
                                {servers.map((server) => {
                                    return (
                                        <button
                                            key={server.index}
                                            onClick={() => setServer(server.index)}
                                            className={`buttonserverplay1 ${server.index == selectedServer.index
                                                ? "buttonserverplay2"
                                                : ""
                                                } buttonserverplay3`}
                                        >
                                            {server.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {type == "tv" && (<div className='belowif34right'>
                            <Link
                                to={
                                    episode > 1
                                        ? `/play/${type}/${id}/${season}/${episode - 1}`
                                        : ""
                                }
                                className="prevepiplay23"
                            >
                                <TbPlayerTrackPrevFilled fontSize={"16px"} />
                                Prev
                            </Link>
                            <Link
                                to={
                                    episode < seasonDetails.episodes?.length
                                        ? `/play/${type}/${id}/${season}/${+episode + 1}`
                                        : ""
                                }
                                className="nextepiplay23"
                            >
                                Next
                                <TbPlayerTrackNextFilled fontSize={"16px"} />
                            </Link>

                        </div>
                        )}
                    </div>
                </div>
                {type === "tv" && (
                    <div className="playerrow1right">
                        <ListEpisodes
                            id={id}
                            noOfSeasons={data.number_of_seasons}
                            currentSeason={season}
                            selectedSeason={selectedSeason}
                            onSeasonClick={setSelectedSeason}
                            currentEpisode={episode}
                            seasonDetails={seasonDetails}
                        />
                    </div>
                )}

                <div
                    className={`playerdetailsleft456 ${type == "movie"
                        ? "playerrow1right87a"
                        : "playerrow1right87b"
                        } playerrow1right87c `}
                >
                    <PlayerDetails data={data} type={type} />
                    <div
                        className={`playerrow1right87under34 ${type == "tv" ? "playerrow1right87under34a" : "playerrow1right87under34b"
                            } playerrow1right87under34c`}
                    >
                        <div className="playerrow1right87under34under879">
                            <IoMdPricetags />
                            <h3>Tags:</h3>
                        </div>
                        {(type == "tv"
                            ? data.keywords?.results
                            : data.keywords?.keywords) &&
                            (type == "tv"
                                ? data.keywords?.results
                                : data.keywords?.keywords
                            ).map((tag) => (
                                <TagCard key={tag.id} title="Production" value={tag.name} />
                            ))}
                    </div>
                </div>
            </div>
            <playerRecommentions />
        </div>
    )
}

export default PlayPage