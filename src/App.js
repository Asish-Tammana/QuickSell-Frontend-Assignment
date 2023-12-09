import { KanbanBoardProvider } from "./Context/context";
import KanbanBoard from "./Components/KanbanBoard";

const App = () => {


  return (

    <KanbanBoardProvider>
      <KanbanBoard />
    </KanbanBoardProvider>
  )
}

export default App;
