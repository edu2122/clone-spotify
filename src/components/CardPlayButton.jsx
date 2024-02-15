import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id }) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);
  const isPlayingList = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    if (isPlayingList) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { playlist, songs } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, songs, song: songs[0] });
      });

    // const response = await fetch(`/api/get-info-playlist?id=${id}`);
    // const data = await response.json();
    // const { playlist, songs } = data;
    // setIsPlaying(true);
    // setCurrentMusic({ playlist: id, songs, song: songs[0] });
  };
  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 "
    >
      {isPlayingList ? <Pause /> : <Play />}
    </button>
  );
}
