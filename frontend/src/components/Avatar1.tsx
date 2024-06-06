import { Link, useNavigate } from "react-router-dom";
import user from "../img/user.png"
import edit from '../img/edit.png';
import logout from '../img/log-out.png';
import '../index.css';
import { useEffect,useRef, useState } from "react";

interface DropdownItemProps {
    img: string;
    text: string;
    onClick?: () => void;
  }

export function Avatar1({name,about}:{name:string,about:string}){
    
    const [open, setOpen] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const handleSignout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
          setOpen(false); 
        }
      };
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);


    return (
        <div className="App">
      <div className='menu-container' >
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user}></img>
        </div>

        <div ref={searchBoxRef} className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{name}<br/><span>{about}</span></h3>
          <ul>
            <Link to={`/myBlogs`}><DropdownItem img = {user} text = {"My Blogs"}/></Link>
            <Link to={`/editProfile`}><DropdownItem img={edit} text={"Edit Profile"}/></Link>
            <DropdownItem img={logout} text={"Logout"} onClick={handleSignout}/>
          </ul>
        </div>
      </div>
    </div>
    )
}

const DropdownItem: React.FC<DropdownItemProps> = ({ img, text, onClick }) => {
    return(
      <li className = 'dropdownItem' onClick={onClick}>
        <img src={img}></img>
        <a> {text} </a>
      </li>
    );
  }