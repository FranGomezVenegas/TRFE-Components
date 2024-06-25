import { css } from 'lit';

export const flipCardStyles = css`
    /* Colors */
:root {
    --background-color: #ece0e8;
    --primary-light: #ca3782;
    --primary-dark: #1e0b36;
    --black: #000;
    --gray-dark: #aaa;
    --gray-light: #eee;
    --white: #fff;
}

/* Reset */
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    height: 100vh;
    background-color: var(--background-color);
    font-family: 'Inconsolata', monospace;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card-container {
    perspective: 1000px;
}

.flip-card {
    width: 30rem;
    height: 40rem;
    position: relative;
}

.flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
    position: relative;
}

.flip-card-front,
.flip-card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
}

.flip-card-front {
    background-image: linear-gradient(
        to right bottom,
        rgba(30, 11, 54, 0.65),
        rgba(202, 55, 130, 0.7)
    ),
    url('https://cdn.spacetelescope.org/archives/images/screen/heic0406a.jpg');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card-back {
    background-color: var(--white);
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.card-content {
    text-align: center;
    color: var(--white);
}

.card-header {
    margin-bottom: 4rem;
}

.card-role {
    letter-spacing: 0.5rem;
    font-size: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
}

.card-title {
    font-family: 'VT323', monospace;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
}

.card-cover {
    position: relative;
    width: 100%;
    height: 14rem;
    background-size: cover;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    background-image: linear-gradient(
            to top right,
            rgba(30, 11, 54, 0.65),
            rgba(202, 55, 130, 0.65)
        ),
        url('https://cdn.spacetelescope.org/archives/images/screen/heic0406a.jpg');
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-heading {
    text-align: center;
    color: var(--white);
}

.card-heading-text {
    font-family: 'VT323', monospace;
    font-size: 3rem;
    font-weight: 300;
    text-transform: uppercase;
    padding: 1rem 1.5rem;
}

.card-details {
    padding: 2rem;
    text-align: center;
}

.skills-list {
    list-style: none;
    padding: 0;
}

.skills-list li {
    font-size: 1.4rem;
    padding: 1rem 0;
}

.skills-list li:not(:last-child) {
    border-bottom: 1px solid var(--gray-light);
}

/* Responsivity */
@media only screen and (max-width: 600px) {
    .flip-card {
        width: 80%;
        height: auto;
    }

    .flip-card-front,
    .flip-card-back {
        height: auto;
        box-shadow: none;
    }

    .card-cover {
        height: 10rem;
    }

    .card-title {
        font-size: 3rem;
    }

    .card-heading-text {
        font-size: 2rem;
    }
}

`;
