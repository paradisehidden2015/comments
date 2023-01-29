import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Badge, Button, Container, Row } from "react-bootstrap";

function App() {
  const [cm, setcm] = useState([]);
  const [comments, setcomments] = useState({});
  // const [select, setselect] = useState(0);
  const getCm = async () => {
    try {
      const { data } = await axios(
        "http://jsonplaceholder.typicode.com/comments"
      );
      setcm(data);
      const help = {};
      data.map((item) => {
        help[item.postId] = [];
      });
      data.map((item) => {
        help[item.postId] = [...help[item.postId], item];
      });
      setcomments(help);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCm();
  }, []);

  return (
    <div className="App">
      {Object.entries(comments).map(([key, value]) => {
        return (
          <Container>
            <Row>
              <Accordion>
                <Accordion.Item eventKey={key}>
                  <Accordion.Header>
                    <Button variant="primary">
                      {key} <Badge bg="secondary">{value.length}</Badge>
                    </Button>
                  </Accordion.Header>
                  <Accordion.Body>
                    {value.map((item) => (
                      <p>{item.name}</p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {/* <p key={key} onClick={() => setselect(key)}>
                {key}|{value.length}
              </p>
              {key === select ? (
                <>
                  {value.map((item) => (
                    <p>{item.name}</p>
                  ))}
                </>
              ) : (
                ""
              )} */}
            </Row>
          </Container>
        );
      })}
    </div>
  );
}

export default App;
