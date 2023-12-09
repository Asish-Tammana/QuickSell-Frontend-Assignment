import { useContext } from "react";
import { KanbanBoardContext } from "../../Context/context";
import OptionsContainer from "../OptionsContainer";
import TaskCard from "../TaskCard";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import './index.css'

const priorityHeadings = [
  "No Priority",
  "Low",
  "Medium",
  "High",
  "Urgent"
]
const KanbanBoard = () => {

  const { usersList, userNamesObj, groupType, displayListObj, showBox, toggleBoxVisibility, } = useContext(KanbanBoardContext)
  let headings = null;

  if (Object.keys(displayListObj)[0] === '0') {
    headings = priorityHeadings
  } else if (Object.keys(displayListObj)[0] === 'usr-1') {
    headings = usersList.map(function (user) {
      return user.name;
    });
  } else {
    headings = Object.keys(displayListObj)
  }



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
        <div className="tasks-list-container">
          {Object.keys(displayListObj).map(each => {
            const tasksList = displayListObj[each]
            const jsx = (<div className="task-column" key={each}>
              <div className="heading-container">
                {groupType === 'priority' ? <h3>{priorityHeadings[each]}</h3> : groupType === 'status' ? <h3>{each}</h3> : <h3>{userNamesObj[each]}</h3>}
                <div className="heading-additional-icons">
                  <FaPlus />
                  <HiOutlineDotsHorizontal />
                </div>
              </div>
              {
                tasksList.map(eachTask => {
                  return <TaskCard key={each.id} taskDetails={eachTask} />
                })
              }
            </div>)
            return jsx
          })}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
