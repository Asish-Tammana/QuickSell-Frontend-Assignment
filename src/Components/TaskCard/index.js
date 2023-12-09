import './index.css'

const TaskCard = (props) => {
    const { taskDetails } = props
    const { id, title, tag } = taskDetails

    return (
        <div className="card-container">
            <div className='card-top'>
                <p>{id}</p>
                <img className='user-image' src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="user-image" />
            </div>
            <h5 className='card-title'>{title}</h5>
            <div className='tag-container'>
                <div className='dot'>{' '}</div>
                <p>{tag && tag[0]}</p>
            </div>


        </div>
    )
}

export default TaskCard