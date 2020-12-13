import React, { createRef, useEffect } from 'react';
import NavigationBar from '../../components/navigation/navigation-bar.component';
import './report.styles.scss';
import { FaThumbsUp } from 'react-icons/fa';
import Chart from 'chart.js';

const ReportScreen = props => {

    const barChart1 = createRef(null);
    const barChart2 = createRef(null);

    useEffect(() => {
        new Chart(barChart1.current,{
            type:'bar',
            data:{
                labels:["Mon", "Tue", "Wed",'Thu',"Fri","Sat","Sun"],
                datasets: [{
                    label: 'Time spent on cheering your mind (minutes)',
                    data: [50, 60, 42, 45, 71, 45, 65],
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        new Chart(barChart2.current,{
            type:'bar',
            data:{
                labels:["Mon", "Tue", "Wed",'Thu',"Fri","Sat","Sun"],
                datasets: [{
                    label: 'Time spent with personal counselor/trainer (minutes)',
                    data: [41, 60.5, 30, 55, 35, 63, 28],
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)',
                        'rgb(204, 239, 241)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }, [])


    return(
        <div className='report-container'>
            <NavigationBar />
            <div className='title-container'>
                <FaThumbsUp color="#72b198" size="40" className='thumbs-up' />
                <p className='title'>Your <span style={{color:'#72b198'}}>MyndsCare</span> health and your contributions are greatly benefitting your overall health!<br/>Keep up the good work!</p>
            </div>

            <div className='graphs-container'>
                <div className='graph-holder'>
                    <canvas ref={barChart1} width="400" height="400"  />
                </div>

                <div className='graph-holder'>
                    <canvas ref={barChart2} width="400" height="400"  />
                </div>
            </div>
        </div>
    )
}

export default ReportScreen;