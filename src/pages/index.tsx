import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import PlaceHolder from "../../public/video-placeholder@desktop.png";
import Pic1 from "../../public/section2-image1.png";
import Pic2 from "../../public/section2-image2.png";
import Pic3 from "../../public/section2-image3.png";
import Pic4 from "../../public/section2-image4.png";
import Pic5 from "../../public/section2-image5.png";
import Pic6 from "../../public/section2-image6.png";

const Banner = styled.div`
  max-width: 100%;
`;

const Video = styled.video`
  width: 100%;
`;

const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 71.1111111vw;
  overflow: hidden;
  @media screen and (max-width: 375px) {
    height: 226.4vw;
  }
`;
const Text = styled.p`
  text-align: center;
  font-size: 3.33333vw;
  line-height: 4.5403vw;
  @media screen and (max-width: 375px) {
    font-size: 8.53333vw;
    line-height: 11.6213333vw;
  }
`;
const Image1 = styled(Image)`
  position: absolute;
  width: 28.681%;
  left: 0;
  top: 34.722222vw;
  @media screen and (max-width: 375px) {
    width: 55.2%;
    left: -41.3333vw;
    top: 132.26667vw;
  }
`;
const Image2 = styled(Image)`
  position: absolute;
  width: 24.6528%;
  left: 62.71vw;
  top: 45.139vw;
  @media screen and (max-width: 375px) {
    width: 57.3333%;
    left: 42.666667vw;
    top: 155.73333vw;
  }
`;
const Image3 = styled(Image)`
  position: absolute;
  width: 13.8889%;
  left: 87.361111vw;
  top: 30.555556vw;
  @media screen and (max-width: 375px) {
    width: 33.6%;
    left: 92vw;
    top: 72.266667vw;
  }
`;
const Image4 = styled(Image)`
  position: absolute;
  width: 11.944%;
  left: 69.1vw;
  top: 10.4167vw;
  @media screen and (max-width: 375px) {
    width: 21.6%;
    left: 70.13333vw;
    top: 54.66667vw;
  }
`;
const Image5 = styled(Image)`
  position: absolute;
  width: 16.04167%;
  left: 3.47222vw;
  top: 14.583333vw;
  @media screen and (max-width: 375px) {
    width: 34.13333%;
    left: 0;
    top: 58.93333vw;
  }
`;
const Image6 = styled(Image)`
  position: absolute;
  width: 23.055555%;
  left: 32.778vw;
  top: 2.9861vw;
  @media screen and (max-width: 375px) {
    width: 40.5333333%;
    left: 9.6vw;
    top: 9.6vw;
  }
`;

const fetchVideo = async () => {
  const res = await fetch("/api/video");
  const data = await res.json();
  return data;
};

export default function Home() {
  const [video, setVideo] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let videoCache = localStorage.getItem("video");
    if (!videoCache) {
      fetchVideo().then((data) => {
        setVideo(data.src);
        localStorage.setItem(
          "video",
          JSON.stringify({
            video: data.src,
            time: Date.now(),
          })
        );
      });
      return;
    }
    const { video, time } = JSON.parse(videoCache);
    const diff = (Date.now() - time) / 1000;

    if (diff >= 3600) {
      fetchVideo().then((data) => {
        setVideo(data.src);
        localStorage.setItem(
          "video",
          JSON.stringify({
            video: data.src,
            time: Date.now(),
          })
        );
      });
    } else {
      setVideo(video);
    }
  }, []);

  useEffect(() => {
    if (!video || !videoRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (!videoRef.current) return;
      if (entries[0].isIntersecting) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    });

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [video]);

  return (
    <>
      <Head>
        <title>Riv Studio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner>
        {video ? (
          <Video ref={videoRef} src={video} autoPlay loop />
        ) : (
          <Image
            src={PlaceHolder}
            alt="placeholder"
            object-fit="contain"
            object-position="center"
          ></Image>
        )}
      </Banner>
      <Main>
        <Text>
          Creating perfect
          <br />
          lines and imposing
          <br />
          presence
        </Text>
        <Image1 src={Pic1} alt="image1"></Image1>
        <Image2 src={Pic2} alt="image2"></Image2>
        <Image3 src={Pic3} alt="image3"></Image3>
        <Image4 src={Pic4} alt="image4"></Image4>
        <Image5 src={Pic5} alt="image5"></Image5>
        <Image6 src={Pic6} alt="image6"></Image6>
      </Main>
    </>
  );
}
