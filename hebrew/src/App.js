import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import LessonsList from "./Components/LessonsList/LessonsList";
import Sidebar from "./Components/Sidebar/Sidebar";
import LessonContent from "./Components/LessonContent/LessonContent";
import LoginTemp from "./Components/LoginTemp/LoginTemp";
import SavedWords from "./Components/SavedWords/SavedWords";

function App() {
  // let id = useParams();

  return (
    <div className="overall">
      <Router>
        <Sidebar className="sidebar"></Sidebar>
        <Switch>
          <Route path="/lessonslist">
            <LessonsList></LessonsList>
          </Route>
          <Route path="/ReadText">
            <LessonContent></LessonContent>
          </Route>
          <Route path="/lessonNum/:lessonId">
            <LessonContent></LessonContent>
          </Route>
          <Route path="/login">
            <LoginTemp></LoginTemp>
          </Route>
          <Route path="/wordslist">
            <SavedWords></SavedWords>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
