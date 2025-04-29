import { Container, Row, Col } from "react-bootstrap";



export const Footer = () => {
    return (
      <footer className="footer" style={{position:"fixed"}}>
        <Container>
          <Row className="align-items-center" style={{display:'flex', width:'600px', position:'relative', bottom:'50px', left:'580px'}}>
          
              {/* <p style={{position:'relative'}}>@Money Trail Copyright 2023. All Rights Reserved</p> */}
            
          </Row>
        </Container>
      </footer>
    )
  }
  