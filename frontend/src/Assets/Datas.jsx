import PNF from './Lottie/Animation - 1725443787498.json';
import Err500 from './Lottie/Animation - 1725446369208.json';
import CodeCompile from './Lottie/8ZAgfVvoQW.json';
import Loading from './Lottie/Animation - 1725467987093.json';
import boy from './Images/boy.webp';
import threebgm from './Audio/3.mpeg'


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



export const PageNotFound = PNF;
export const Error500 = Err500;
export const CodeCompileLoaded = CodeCompile;
export const LoadingScr = Loading;

export const ThreeBGM = threebgm;

export const Boy = boy;