import { useContext } from "react";
import { KanbanBoardContext } from "../../Context/context";
import './index.css'

const OptionsContainer = () => {
    const { groupType, orderType , updateGroupType, updateOrderType } = useContext(KanbanBoardContext)

    return (
        <div className="display-options-container">
          <div className="display-options-row-container">
            <p className="display-options-title">Grouping</p>
            <select className="select-menu" id="grouping" defaultValue={groupType} onChange={() => updateGroupType(document.getElementById('grouping').value)} >
              <option value="userId">Users</option>
              <option value="priority">Priority</option>
              <option value="status" >Status</option>
            </select>
          </div>
          <div className="display-options-row-container">
            <p className="display-options-title">Ordering</p>
            <select className="select-menu" id="ordering" defaultValue={orderType} onChange={() => updateOrderType(document.getElementById('ordering').value)}>
              <option value="priority" >Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
    )
}

export default OptionsContainer