import PNF from './Lottie/Animation - 1725443787498.json';
import Err500 from './Lottie/Animation - 1725446369208.json';
import CodeCompile from './Lottie/8ZAgfVvoQW.json';
import Loading from './Lottie/Animation - 1725467987093.json';
import boy from './Images/boy.webp';
import threebgm from './Audio/3.mpeg';


export const CLChoice = [
    {Lang:'cpp',Name:"C++",data:"#include<iostream>\nusing namespace std;\nint main()\n{\n\tcout<<\"Hello World\";\n}"},
    {Lang:'python',Name:"Python",data:"print(\"Hello World\")"},
    {Lang:'c',Name:"C",data:"#include<stdio.h>\nint main()\n{\nprintf(\"Hello World\");\n}"},
    {Lang:'javascript',Name:"JavaScript",data:"console.log(\"Hello World\")"},
    {Lang:'java',Name:"Java",data:"import java.util.*;\nclass Main{\n\tpublic static void main(String[]args){\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}"}
]

export const DarkTheme = [
    {name:"Dark(Default)",BG:"DarkBG",MD:"DarkMD",SD:"DarkSD",HD:"DarkHD",},
    {name:"Blue",BG:"DarkBG",MD:"BlueMD",SD:"BlueSD",HD:"BlueHD"},
    {name:"Red",BG:"DarkBG",MD:"RedMD",SD:"RedSD",HD:"RedHD"},
    {name:"Green",BG:"DarkBG",MD:"GreenMD",SD:"GreenSD",HD:"GreenHD"},
]


export const LightTheme = [
    {name:"Light(Default)",BG:"LightBG",MD:"LightMD",SD:"LightSD",HD:"LightHD"},
    {name:"Blue",BG:"LightBG",MD:"BlueMD",SD:"BlueSD",HD:"BlueHD"},
    {name:"Red",BG:"LightBG",MD:"RedMD",SD:"RedSD",HD:"RedHD"},
    {name:"Green",BG:"LightBG",MD:"GreenMD",SD:"GreenSD",HD:"GreenHD"},
]

export const  DartThrow=() =>
{
    return(
        <>
    <svg id="Target-Arrow-Bullseye--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height={20} width={20} style={{marginTop:"5px"}} ><desc>{"Target Arrow Bullseye Streamline Icon: https://streamlinehq.com"}</desc><defs /><path d="M13.555062499999998 4.689375C15.7205625 9.3524375 12.026125 14.611125000000001 6.905 14.155C1.783875 13.698812499999999 -0.9229999999999999 7.87 2.0325625 3.6630625C3.89125 1.0174375 7.378125 0.083125 10.310625 1.4449375" fill="none" stroke="#ffc100" strokeMiterlimit={10} strokeWidth={1} /><path d="M10.606187499999999 6.2798750000000005C10.76225 6.6691875 10.841125 7.085125 10.8384375 7.504499999999999C10.8384375 10.077875 8.0526875 11.686250000000001 5.8240625 10.399562499999998C3.5954375 9.112875 3.5954375 5.896125 5.8240625 4.609375C6.3323125000000005 4.316 6.9086875 4.1615 7.495500000000001 4.1615625000000005C7.914875 4.158875 8.3308125 4.23775 8.720125 4.39375" fill="none" stroke="#ffc100" strokeMiterlimit={10} strokeWidth={1} /><path d="M7.495500000000001 7.504499999999999L11.5070625 3.4929375V2.15575L12.844249999999999 0.818625V2.15575H14.181375000000001L12.844249999999999 3.4929375H11.5070625" fill="none" stroke="#ffc100" strokeMiterlimit={10} strokeWidth={1} /><path d="M6.8269375 7.504499999999999C6.8269375 8.019125 7.384062500000001 8.3408125 7.829812499999999 8.0835C8.036687500000001 7.9640625 8.164125 7.7433125 8.164125 7.504499999999999C8.164125 6.9898125 7.606937499999999 6.668125 7.16125 6.9254375C6.954375000000001 7.044875 6.8269375 7.265625 6.8269375 7.504499999999999" fill="none" stroke="#ffc100" strokeMiterlimit={10} strokeWidth={1} /></svg></>)
}




export const PageNotFoundd = PNF;
export const Error500 = Err500;
export const CodeCompileLoaded = CodeCompile;
export const LoadingScr = Loading;

export const ThreeBGM = threebgm;

export const Boy = boy;
export const Secret_Key = "Secret_KEY";