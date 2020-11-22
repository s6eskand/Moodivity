import React from 'react';

// styling
import './About.css';

// images
import clock from '../../media/images/clock_productive.png';
import brain from '../../media/images/mental_health_brain.png';

function About() {

    return(
        <div className="main-about container">
            <div className="main-content-text-1">
                <div className="text-block">
                    <h1>What does it do?</h1>
                    <p className="explanation-1">
                        Moodivity combines productivity and mental health, ensuring that you can stay productive as possible, while
                        staying healthy and happy. Once you create an account, you will be prompted to create a profile for
                        yourself. This is where you will set goals, tasks you do on a daily basis, and basic habits. <br/>
                        <br/>
                        Our software will then guide you along your set goals, allowing you to reflect upon good, and bad days.
                        This is done through audio logs that you record and can keep track of, and our powerful Machine Learning
                        algorithms will sense your mood, providing you with feedback to keep you on track to meet your goals, or
                        improve upon them!
                    </p>
                </div>
                <img className="img-1" src={clock} alt=""/>
            </div>
            <div className="main-content-text-2">
                <img className="img-2" src={brain} alt=""/>
                <div className="text-block">
                    <h1 className="title-2">Why is it important?</h1>
                    <p className="explanation-2">
                        Mental health is no joke. No matter how busy your plate gets, you should not sacrifice your well
                        being. Moodivity keeps you productive, without deteriorating your mental health. By setting goals, you
                        keep yourself accountable, we'll simply guide you along the right path. <br/>
                        <br/>
                        Often times, individuals fall into bad states where they do not understand why they are being less
                        productive than other days, weeks, or months. By prompting you to record an audio log that will be
                        analyzed by AI, Moodivity allows you to reflect on these moments. In addition, there will be a log
                        that you can always refer back to, allowing you to find patterns in your productivity, whether it is
                        good or bad.
                    </p>
                </div>
            </div>
        </div>
    )

}

export default About;