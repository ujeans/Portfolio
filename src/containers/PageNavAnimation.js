import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
// modules
import { closePage } from "../modules/pageloadings";
import animations from "../styles/animation";

const PageNavAnimation = ({ limitTime = 800, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const anime = useSelector(state => state.pageloading.pageChanged);

  const [visited, setVisited] = useState(0);

  /* eslint-disable */
  useEffect(() => {
    setVisited(visited + 1);
    if (visited && !anime) {
      return;
    }

    let e1 = null,
      e2 = null;
    document.body.style.overflow = "hidden";

    if (visited) {
      e1 = setTimeout(() => {
        dispatch(closePage());
        navigate(anime);
        e2 = setTimeout(() => {
          document.body.style.overflow = "";
        }, limitTime - 50);
      }, limitTime - 50);
    } else {
      e1 = setTimeout(() => {
        document.body.style.overflow = "";
      }, limitTime);
    }

    return () => {
      clearTimeout(e1);
      clearTimeout(e2);
    };
  }, [dispatch, history, anime, limitTime]);
  /* eslint-enable */

  return (
    <Container time={limitTime} visited={visited} animeOn={anime}>
      {children}
    </Container>
  );
};

export default PageNavAnimation;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  ${props =>
    (props.visited < 2 &&
      css`
        animation: ${animations.fadeIn} ease ${props => props.time + "ms"};
      `) ||
    (!!props.animeOn &&
      css`
        animation: ${animations.loadingOff} ease ${props => props.time + "ms"};
      `) ||
    css`
      animation: ${animations.loadingOn} ease ${props => props.time + "ms"};
    `};

  &::-webkit-scrollbar {
    display: none;
  }
`;
