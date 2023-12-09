import { useContext } from "react";
import { KanbanBoardContext } from "../../Context/context";
import OptionsContainer from "../OptionsContainer";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import './index.css'

const KanbanBoard = () => {

  const { displayList ,showBox, toggleBoxVisibility, } = useContext(KanbanBoardContext)


  return (
    <div>
      <nav className='navbar-container'>
        <button className='display-button' onClick={() => toggleBoxVisibility(!showBox)}>
          <HiMiniAdjustmentsHorizontal />
          <span className='button-text'>Display</span>
          <IoIosArrowDown />
        </button>
      </nav>
      <div className="main-board">
        {showBox && <OptionsContainer />}
        <h1>hi</h1>
      </div>
    </div>
  );
}

export default KanbanBoard;
