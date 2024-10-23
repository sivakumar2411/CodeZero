import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { ThemeContext } from './GlobeData';
import '../Assets/Css/DashBoard.css';
import { Boy } from '../Assets/Datas';
import { useParams } from 'react-router-dom';
import { getUserByUName } from '../API/UserApi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { blue, green, red, yellow } from '@mui/material/colors';
import { getProblemForDash } from '../API/ProblemApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {

    const {Theme} = useContext(ThemeContext);
    const {username} = useParams();

    const [UData,setUData] = useState({});
    const [problems,setProblems] = useState([]);
    const [chartShow,setChartShow] = useState(0);
    const [ProblemStatics,setProblemStatics] = useState({tot:1,tots:0,etot:1,etots:0,mtot:1,mtots:0,htot:1,htots:0});
    const [showChartText,setShowChartText] = useState([]);
    // const [DonutCenter,setDonutCenter] = useState({});
    // const [DonutCenter,setDonutCenter] = useState({id: 'customCenterText',
    //     beforeDraw: function (chart) {
    //       const { width, height, ctx } = chart;
    //       const centerX = width / 2;
    //       const centerY = height / 2;
          
    //       ctx.save();
    //       ctx.font = 'bold 30px Arial'; 
    //       ctx.fillStyle = '#fff';  
    //       ctx.textAlign = 'center';
    //       ctx.textBaseline = 'middle';
    //       ctx.fillText('1', centerX - 10, centerY - 5);
    //       ctx.font = '18px Arial';
    //       ctx.fillText('/2', centerX + 15, centerY);
    //       ctx.font = '20px Arial';
    //       ctx.fillText("Solved",centerX,centerY + 20);


    //         ctx.restore();
    //     }});
    const [chartData,setchartData] = useState({
        labels: ['Solved',"Not Solved"],
        datasets: [
            {
              data: [1,2],
              backgroundColor: [
                blue.A400,
                "rgba(0,0,0,0.4)"
              ],
              borderColor:[
                "transparent",
                "transparent"
              ],
              borderWidth:5,
              hoverOffset: 4,
            cutout: '90%', 
            },
          ]
          ,});

    const chartOptions ={responsive:true,plugins:{legend:{display:false}},animation:{duration:1000,easing:"easeInOutQuart"},radius:"70%",rotation:210,circumference:300};

    useEffect(()=>{

        const fetchUser = async() =>{
            try{
                const res = await getUserByUName(username);
                setUData(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();

    },[])

    useEffect(()=>{
        const fetchProbs = async() =>{
            try{
                const res = await getProblemForDash();
                setProblems(res.data.problems);
            }
            catch(e){}
        }
        fetchProbs();
    },[])

    useEffect(()=>{
        const et = problems?.filter(({difficulty}) => difficulty === "Easy").length || 0;
        const ets = UData?.solp?.filter(({problemID}) => problemID.difficulty === "Easy").length || 0;
        const mt = problems?.filter(({difficulty}) => difficulty === "Medium").length || 0;
        const mts = UData?.solp?.filter(({problemID}) => problemID.difficulty === "Medium").length || 0;
        const ht = Math.max(problems?.length - (et + mt),0) , hts = Math.max(UData?.solp?.length - (ets - mts),0);

        setProblemStatics({tot:problems?.length,tots:UData?.solp?.length,etot:et,etots:ets,mtot:mt,mtots:mts,htot:ht,htots:hts});
        
    },[problems,UData])

    useEffect(()=>{

        
        if(chartShow === 0)
            setShowChartText([ProblemStatics.tot,ProblemStatics.tots]);
        else if(chartShow === 1)
            setShowChartText([ProblemStatics.etot,ProblemStatics.etots]);
        else if(chartShow === 2)
            setShowChartText([ProblemStatics.mtot,ProblemStatics.mtots]);
        else if(chartShow === 3)
            setShowChartText([ProblemStatics.htot,ProblemStatics.htots]);
        
        
        // setDonutCenter(UpdateDonutCenter(chartShow));
        // console.log(DonutCenter);
        

    },[chartShow,ProblemStatics])

    useEffect(()=>{
        setchartData(updateChartData());
    },[showChartText])

    const UpdateDonutCenter = () =>{
        return({
            id: 'customCenterText',
            beforeDraw: function (chart) {
                
                const { width, height, ctx } = chart;
                const centerX = width / 2;
                const centerY = height / 2;
                
                ctx.save();
                ctx.font = 'bold 30px Arial'; 
                ctx.fillStyle = '#fff';  
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(showChartText[1], centerX - 10, centerY - 5);
                ctx.font = '18px Arial';
                ctx.fillText("/"+showChartText[0], centerX + 15, centerY);
                ctx.fillText("Solved",centerX,centerY + 20);
      
                ctx.restore();
            }
        })
    }

    const updateChartData = () =>{

        let da = [],bg = [];
        if(chartShow === 0)
            bg = [blue.A400,blue[900]];
        else if(chartShow === 1)
            bg = [green.A400,green[900]];
        else if(chartShow === 2)
            bg = [yellow.A400,yellow[900]];
        else if(chartShow === 3)
            bg = [red.A400,red[900]];
            da = [showChartText[1],showChartText[0] - showChartText[1]];
            
        return(
            {...chartData,
                datasets: [
                    {
                      data: da,
                      backgroundColor:bg,
                      borderColor:[
                        "transparent",
                        "transparent"
                      ],
                      borderRadius:30,
                      borderWidth:5,
                      hoverOffset: 4,
                    cutout: '90%', 
                    },
                  ]
            })
    }

  return (
    <div className={`DashBaseDiv ${Theme.BG}`}>
        <div className="NavOnDash">
            <Navbar/>
        </div>

        <div className={`DashMainDiv`}>
            <div className="HolderOfDash">
                <div className={`ProfileDtsOnDB ${Theme.MD}`}>
                    <div className="NameAndBadgesOnDB">
                        <div className="NameandUName">
                            <div className='NameONNUN'>{UData.name}</div>
                            <div className='UNameONNUN'>{UData.uname}</div>
                        </div>
                        <div className="BadgeShow"></div>
                        <div className={`FloatDivOnNBDB ${Theme.SD}`}></div>
                    </div>
                    <div className="ProfImgOnDB">
                        <div className='ProfileImgONPODB'>
                            <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={UData.profilePic?UData.profilePic:Boy} alt={Boy} />
                        </div>
                        <div className={`FloatDivOnPIDB ${Theme.SD}`}></div>
                    </div>
                </div>
                <div className={`ProblemsSolvedGraphDiv ${Theme.MD}`}>
                    <div className="GraphHolder">
                        <Doughnut data={chartData} key={showChartText} plugins={[UpdateDonutCenter()]} options={chartOptions}/>
                    </div>
                    <div className="ProblemDatasForGraph">
                        <div className={`${Theme.SD}`} style={{color:green.A400}} onClick={()=>{setChartShow(1);}}>Easy</div>
                        <div className={`${Theme.SD}`} style={{color:yellow.A400}} onClick={()=>{setChartShow(2);}}>Medium</div>
                        <div className={`${Theme.SD}`} style={{color:red.A700}} onClick={()=>{setChartShow(3);}}>Hard</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default DashBoard