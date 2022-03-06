import "./App.css";
import API from "axios";
import { Container, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import TweetList from "./components/TweetList";
import TweetBox from "./components/TweetBox";
import FollowingList from "./components/FollowingList";
import FollowList from "./components/FollowList";
import UsersDropdown from "./components/UsersDropdown";
import CreateUser from "./components/CreateUser";
import img from "./4k.jpeg";

function App() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersFollowed, setUsersFollowed] = useState([]);
  const [currentUser, setCurrentUser] = useState(1);
  const [submitToggle, setSubmitToggle] = useState(false);

  useEffect(() => {
    API.get(`http://localhost:3000/tweets/${currentUser}`).then((tweets) =>
      setTweets(tweets.data)
    );
    API.get(`http://localhost:3000/users`).then((users) =>
      setUsers(users.data)
    );
    API.get(`http://localhost:3000/follows/${currentUser}`).then(
      (usersFollowed) => setUsersFollowed(usersFollowed.data)
    );
  }, [currentUser, submitToggle]);

  function getUserName(id) {
    if (users.length > 0) {
      const user = users.filter(function (el) {
        return el.uid === id;
      });
      return user[0].username;
    }
  }

  return (
    <Container>
      <div className="one">
        <Image src={img} id="icon-image" />
        NFTweeter
      </div>
      <div className="two">
        <UsersDropdown
          users={users}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          getUserName={getUserName}
        />
        <CreateUser
          submitToggle={submitToggle}
          setSubmitToggle={setSubmitToggle}
        />
        <TweetBox
          currentUser={currentUser}
          getUserName={getUserName}
          submitToggle={submitToggle}
          setSubmitToggle={setSubmitToggle}
        />
      </div>
      <div className="three">
        <FollowingList
          currentUser={currentUser}
          usersFollowed={usersFollowed}
          setUsersFollowed={setUsersFollowed}
          submitToggle={submitToggle}
          setSubmitToggle={setSubmitToggle}
        />
        <FollowList
          currentUser={currentUser}
          users={users}
          usersFollowed={usersFollowed}
          setUsersFollowed={setUsersFollowed}
          submitToggle={submitToggle}
          setSubmitToggle={setSubmitToggle}
        />
        <TweetList tweets={tweets} getUserName={getUserName} />
      </div>
    </Container>
  );
}

export default App;
