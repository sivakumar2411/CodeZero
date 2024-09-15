import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import '../Assets/Css/Home.css'
import { MdOutlineEmail} from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Navbar from './Navbar';
import { FiMinusCircle } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";



const Home = () => {

  const [showopn,Setshowopen] = useState(null);
  const toggleFAQ = (index) =>{
    if(showopn === index)
      Setshowopen(null);
    else
      Setshowopen(index);
  }

  const faqarr = [
    {id:1,qs:"What is CodeZero?",ans:"CodeZero is a coding platform that helps you practice, learn, and compete in coding challenges to improve your skills."},
    {id:2,qs:"How many languages does CodeZero support?",ans:"CodeZero supports over 20 programming languages, including Python, JavaScript, Java, and C++."},
    {id:3,qs:"Can I challenge my friends on CodeZero?",ans:"Yes, you can create challenges and compete with friends on CodeZero!"},
    {id:4,qs:"Is CodeZero beginner-friendly?",ans:"Definitely! We offer beginner-friendly challenges, tutorials, and learning paths."},
    {id:5,qs:"How can I track my progress?",ans:"Track your progress with your personal dashboard, badges, and performance metrics."},
    {id:6,qs:"Does CodeZero offer solutions or hints?",ans:"Yes, you can view hints and solutions to learn different coding approaches.But it will be affect your Will Points"}
  ];

    const {Theme} = useContext(ThemeContext);

  return (
    <div className={`HomeBaseDiv ${Theme.BG}`}>

        <div className="NavOnHome">
            <Navbar/>
        </div>

        <div className="HomeMainDiv">
          <div className="HomeWelcomeDiv">
            <h1 style={{textAlign:"start"}}>Unlock Your Coding Potential</h1>
            <p style={{color:"gold",fontFamily:"Mulish",textAlign:"start"}}>Practice, learn, and compete with coding problems crafted by top engineers.</p>
            <button>Get Started </button>
          </div>
          <div className="herosecimage"></div>
        </div>

      {/* AboutPage Contents----------------------------- */}

        <div className='AboutusmainDiv' id='AboutusmainDiv'>
          <h2>About Us</h2>
          <div className="underlinediv"></div>
          <p>Welcome to CodeZero, where coding meets opportunity. Our mission is simple: to empower developers of all levels to excel in coding, ace technical interviews, and reach their full potential.</p>
          <p>Founded by passionate engineers and educators, CodeZero is more than just a coding platform. It’s a community-driven space where learners, problem solvers, and professionals come together to practice, compete, and grow. Whether you're a beginner taking your first steps in coding or a seasoned programmer prepping for your next big interview, we’ve got challenges and resources to match your journey.</p>
          <span>Join us, and let’s code the future together!</span>
        </div>

        
      {/* ContactPage Contents----------------------------- */}

      <div className='ContactusmainDiv' id='ContactusmainDiv'>
        <div className="ContactleftDiv">
          <div id="contactleft1">
            <h2>Contact Us</h2>
            <p>Email, Call or complete the form to learn how CodeZero can solve your problem.</p>
            <span><MdOutlineEmail/> codezero@gmail.com</span><br />
            <span><FaPhoneAlt /> 321-123-458</span>
          </div>
          <div id="contactleft2">
            <div id="contactleft2box">
                <h3>Customer Support</h3>
                <p>Our support team is available around the clock to address any concerns or queries you may have.</p>
            </div>
            <div id="contactleft2box">
                <h3>Feedback and Suggestions</h3>
                <p>We value your feedback and are continuously working to improve our platform. Your input is crucial in shaping our future.</p>
            </div>
          </div>
        </div>
        <div className="ContactrightDiv">
          <h2>Get in Touch</h2>
          <p>You can reach us anytime</p>
          <form action="">
            <input type="text" name="" id="" placeholder='Name' />
            <input type="text" name="" id="" placeholder='Email' />
            <input type="text" name="" id="" placeholder='Phone Number' />
            <textarea name="" id="" rows="5" cols="20" placeholder='how can we Help?'></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>

      <div className="FaqMainDiv">
        <h3>FAQ's</h3>
        <h1 style={{marginTop:"-20px"}}>Frequently asked questions</h1>
        <p>Have questions?We're here to help.</p>
        <div  className="faqBox">
        {faqarr.map((eachfaq,index)=>
        <>
          <div className="eachfaq" key={index}>
          <p style={{color:"white",fontSize:"20px",textAlign:"start"}}>{eachfaq.qs}</p>
          {showopn === index ? <FiMinusCircle onClick={()=>{toggleFAQ(index)}} />:<IoMdAddCircleOutline onClick={()=>{toggleFAQ(index)}} />}
          </div>
            {showopn === index?<p style={{fontSize:"18px",textAlign:"start",marginLeft:"30px",textIndent:"10px",color:"gold"}}>{eachfaq.ans}</p>:null}
            </>)}
        </div>
        <h3 style={{fontSize:"20px",marginTop:"60px"}}>Still have questions?</h3>
        <p style={{marginTop:"-20px"}}>Please Chat to our friendly team</p>
      </div>
    </div>
  )
}

export default Home