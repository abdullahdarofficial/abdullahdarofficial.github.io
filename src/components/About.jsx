import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    padding: '20px', // Added padding for better spacing
  },
  introImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Added padding for consistency
  },
  imageStyle: {
    maxWidth: '100%', // Ensure the image doesn't overflow
    height: 'auto', // Maintain aspect ratio
  },
};

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container fluid>
          {data ? (
            <Fade>
              {/* Ensure proper alignment for different screen sizes */}
              <Row className="d-flex flex-column flex-md-row align-items-center">
                {/* Text Column */}
                <Col xs={12} md={6} style={styles.introTextContainer}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Col>

                {/* Image Column */}
                <Col xs={12} md={6} style={styles.introImageContainer}>
                  <img src={data?.imageSource} alt="profile" style={styles.imageStyle} />
                </Col>
              </Row>
            </Fade>
          ) : (<FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
