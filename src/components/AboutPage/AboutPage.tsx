import { FC } from 'react';
import Clock from '../Clock/Clock';
import NavBar from '../NavBar/NavBar';
import './AboutPage.css';

const AboutPage: FC = () => {
    return (
        <div className='about-page'>
            <NavBar text={"Close"} to='/' />
            <div className="about-page__info-wrapper">
                <div className="about-page__info">
                    <div className="about-page__info-text">
                        <h3>about</h3>
                        <p>Introducing "Doomsday Clock AI" – an innovative countdown timer inspired by the original Doomsday Clock, designed to estimate the time until the AGI superintelligence singularity. Please keep in mind that predicting the exact time of AGI development is uncertain and challenging. However, we have created an approximate formula based on several factors, each with a simulated score provided by GPT-4*. These factors include progress in AI research, hardware development, investment and resources, regulatory and ethical developments, and public perception and social impact.</p>
                        <br />
                        <p>Our formula assigns weights to each factor, which have been determined by a hypothetical group of top AI experts and researchers. Using these weights, we calculate the current state of "Doomsday Clock AI" and map the resulting value to a time scale representing the estimated time until AGI singularity.</p>
                        <br />
                        <p>Please note that this calculation is based on simulated data* and an arbitrary time scale. It is meant to be a thought-provoking and engaging representation of the challenges and uncertainties surrounding AGI development, rather than an accurate prediction. We invite you to explore "Doomsday Clock AI" and provide feedback on the scores and weights used in the formula. We value your input and aim to improve and refine our approach. To share your thoughts, please email us at feedback@doomsdayclock.ai.</p>
                        <br />
                        <p>*Disclaimer: The scores used in the formula were non-scientifically simulated by GPT-4 and should not be considered accurate representations of the current state of AGI development.</p>
                        <br />
                    </div>
                    <Clock />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;